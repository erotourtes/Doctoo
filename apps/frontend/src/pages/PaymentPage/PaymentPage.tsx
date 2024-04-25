import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { PaymentForm } from '@/pages/PaymentPage/component/PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

export const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};
