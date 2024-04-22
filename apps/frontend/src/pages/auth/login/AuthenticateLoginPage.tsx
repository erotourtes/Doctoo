import { Button } from '@/components/UI/Button/Button';
import { LogoWithTitle, AuthMainContainer, AuthCreateAccount } from '@/pages/auth/auth-components';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { FormProvider, useForm } from 'react-hook-form';
import InputCode from '../../../components/UI/Input/InputCode';

const EMAIL_VERIFICATION_CODE_LEN = 6;

type CodeType = {
  code: string;
};

const codeSchema = Joi.object<CodeType>({
  code: Joi.string().length(EMAIL_VERIFICATION_CODE_LEN).required(),
});

const AuthenticateLoginPage = () => {
  const form = useForm<CodeType>({
    mode: 'onTouched',
    defaultValues: { code: '' },
    resolver: joiResolver(codeSchema),
  });
  const code = form.watch('code');
  const onSubmit = ({ code }: { code: string }) => {
    console.log(code);
  };

  const onBack = () => {};

  return (
    <AuthMainContainer>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='my-20 flex w-[360px] flex-col justify-between gap-y-6'>
          <LogoWithTitle />
          <div>
            <h1 className='mb-2 text-xl font-medium leading-none tracking-tight'>Authenticate Your Account</h1>
            <p className='text-grey-1'>
              Protecting your account is our top priority. Please confirm your account by entering the authorization
              code sent to your email
            </p>
          </div>

          <InputCode codeLength={EMAIL_VERIFICATION_CODE_LEN} onChange={e => form.setValue('code', e.target.value)} />

          <div>
            <p>
              It may take a minute to receive your code. Haven’t received it?{' '}
              <span className='text-main'>Resend a new code</span>
            </p>
          </div>

          <div className='space-y-6'>
            <div className='flex justify-around'>
              <Button btnType='button' onClick={onBack} type='secondary' className='w-[150px]'>
                Back
              </Button>
              <Button disabled={code.length != EMAIL_VERIFICATION_CODE_LEN} type='primary' className='w-[150px]'>
                Submit
              </Button>
            </div>
            <AuthCreateAccount />
          </div>
        </form>
      </FormProvider>
    </AuthMainContainer>
  );
};

export default AuthenticateLoginPage;
