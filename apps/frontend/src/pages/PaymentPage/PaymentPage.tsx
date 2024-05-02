import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from '@/pages/PaymentPage/component/PaymentForm';
import { useAppSelector } from '@/app/hooks';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

export const PaymentPage = () => {
  const { appointmentId } = useAppSelector(state => state.payment.data);

  return appointmentId ? (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  ) : (
    <section className='flex h-screen flex-col items-center justify-center gap-2'>
      <h1 className='text-2xl sm:text-4xl'>Ops. Something wrong :(</h1>
      <p className='text-center text-sm sm:text-base'>
        The page you are looking for cannot be found. Please check the URL.
      </p>
    </section>
  );
};
