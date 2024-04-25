import { useState } from 'react';
import { useNavigate } from 'react-router';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { useForm, FormProvider } from 'react-hook-form';
import { CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getPaymentIntent } from '@/app/payment/paymentThunks';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { NewPaymentCardForm } from '@/components/payment/NewPaymentCardForm';
import { Button } from '@/components/UI/Button/Button';
import { Checkbox } from '@/components/UI/Checkbox/Checkbox';
import Icon from '@/components/UI/Icon/Icon';
import { RadioButton } from '@/components/UI/RadioButton/RadioButton';
import { PaymentPopup } from '@/components/payment/PaymentPopup';
import { Checkout } from '@/components/payment/Checkout';

export const PaymentForm = () => {
  const [isSuccessfulPayment, setIsSuccessfulPayment] = useState<boolean>(false);
  const { date, appointmentDuration, pricePerHour } = useAppSelector(state => state.payment.data);
  const [paymentDetails, setPaymentDetails] = useState({ id: '', created: 0 });

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const methods = useForm({
    mode: 'onChange',
  });

  const [status, setStatus] = useState<string>('new-card');
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate('/dashboard');
    setIsOpenModal(false);
  };

  const onSubmit = async () => {
    if (!elements || !stripe) {
      return;
    }
    const cardElement = elements?.getElement(CardNumberElement);

    if (!cardElement || !stripe) {
      return;
    }

    const postData = {
      userId: '1',
      doctorId: '1',
      date: date,
      appointmentDuration: appointmentDuration,
      pricePerHour: pricePerHour,
    };

    try {
      const actionResult = await dispatch(getPaymentIntent(postData));
      const clientSecret = actionResult.payload;

      const paymentMethod = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (!paymentMethod.paymentMethod) {
        return;
      }

      const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.paymentMethod.id,
      });

      if (confirmPayment.error) {
        setIsSuccessfulPayment(false);
        setIsOpenModal(true);
      } else {
        const { id, created } = confirmPayment.paymentIntent;
        setPaymentDetails({ id, created });
        setIsSuccessfulPayment(true);
        setIsOpenModal(true);
      }
    } catch (error) {
      setIsSuccessfulPayment(false);
      setIsOpenModal(true);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <section className='flex w-full max-w-[941px] flex-col items-center gap-6 md:flex-row md:items-start'>
          <div className='w-full max-w-[381px] md:max-w-[600px]'>
            <button
              type='button'
              className='mb-5 flex items-center text-sm font-medium leading-5 text-text'
              onClick={navigateBack}
            >
              <Icon variant='arrow-right' className='rotate-180' />
              Back
            </button>
            <div className='flex w-full flex-col items-start gap-6 rounded-xl bg-white p-6'>
              <h3 className='text-lg leading-6 text-black'>Payment Method</h3>
              <RadioButton
                label='Saved payment methods'
                id='saved'
                name='payment'
                selected={status === 'saved'}
                onClick={e => setStatus(e.target.value || 'saved')}
              />
              {status === 'saved' && <p className='text-text'>You do not have any bank cards saved</p>}

              <RadioButton
                label='Bank card'
                id='bank'
                name='payment'
                selected={status === 'new-card'}
                onClick={e => setStatus(e.target.value || 'new-card')}
              />
              {status === 'new-card' && <NewPaymentCardForm />}
            </div>
          </div>
          <div className='flex w-full max-w-[381px] flex-col items-start gap-4 md:max-w-[309px]'>
            <h3 className='text-lg leading-6 text-black'>Your appointment</h3>
            <Checkout />

            <form id='payment' onSubmit={e => e.preventDefault()} className='grid gap-4'>
              <Checkbox id='confirm' className='self-start' errorMessage='Please check the checkbox'>
                <p>
                  By clicking Pay now button, I confirm that I have read and accept{' '}
                  <span className='underline'>General Terms and Conditions</span>, and{' '}
                  <span className='underline'>Privacy statement</span>
                </p>
              </Checkbox>

              <Button
                type='primary'
                className='w-full'
                onClick={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
                btnType='submit'
              >
                Pay now
              </Button>
            </form>
          </div>
        </section>
      </FormProvider>
      {isOpenModal && (
        <PaymentPopup
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          isSuccessfulPayment={isSuccessfulPayment}
          navigateBack={navigateBack}
          paymentDetails={paymentDetails}
        />
      )}
    </>
  );
};
