// import { useState } from 'react';
// import { useAppDispatch } from '../../app/hooks';
// import { cn } from '../../utils/cn';
// import styles from './Counter.module.css';
// // import { decrement, increment, incrementAsync, incrementByAmount, incrementIfOdd } from './counterSlice';

// export const Counter = () => {
//   const dispatch = useAppDispatch();
//   // const count = useAppSelector(selectCount);
//   // const status = useAppSelector(selectStatus);
//   const [incrementAmount, setIncrementAmount] = useState('2');

//   const incrementValue = Number(incrementAmount) || 0;

//   return (
//     <div>
//       <div className={cn(styles.row)}>
//         <button className={cn(styles.button)} aria-label='Decrement value' onClick={() => dispatch(decrement())}>
//           -
//         </button>
//         <span aria-label='Count' className={cn(styles.value)}>
//           {/* {count} */}
//         </span>
//         <button className={cn(styles.button)} aria-label='Increment value' onClick={() => dispatch(increment())}>
//           +
//         </button>
//       </div>
//       <div className={cn(styles.row)}>
//         <input
//           className={cn(styles.textbox)}
//           aria-label='Set increment amount'
//           value={incrementAmount}
//           type='number'
//           onChange={e => {
//             setIncrementAmount(e.target.value);
//           }}
//         />
//         <button className={cn(styles.button)} onClick={() => dispatch(incrementByAmount(incrementValue))}>
//           Add Amount
//         </button>
//         <button
//           className={cn(styles.asyncButton)}
//           disabled={status !== 'idle'}
//           onClick={() => dispatch(incrementAsync(incrementValue))}
//         >
//           Add Async
//         </button>
//         <button
//           className={cn(styles.button)}
//           onClick={() => {
//             dispatch(incrementIfOdd(incrementValue));
//           }}
//         >
//           Add If Odd
//         </button>
//       </div>
//     </div>
//   );
// };
