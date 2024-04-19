// import type { AppStore } from '../../app/store';
// import { makeStore } from '../../app/store';

// interface LocalTestContext {
//   store: AppStore;
// }

// describe<LocalTestContext>('counter reducer', it => {
//   beforeEach<LocalTestContext>(context => {
//     const initialState: CounterSliceState = {
//       value: 3,
//       status: 'idle',
//     };

//     const store = makeStore({ counter: initialState });

//     context.store = store;
//   });

//   it('Should handle initial state', () => {
//     expect(counterSlice.reducer(undefined, { type: 'unknown' })).toStrictEqual({
//       value: 0,
//       status: 'idle',
//     });
//   });

//   it('Should handle increment', ({ store }) => {
//     expect(selectCount(store.getState())).toBe(3);

//     store.dispatch(increment());

//     expect(selectCount(store.getState())).toBe(4);
//   });

//   it('Should handle decrement', ({ store }) => {
//     expect(selectCount(store.getState())).toBe(3);

//     store.dispatch(decrement());

//     expect(selectCount(store.getState())).toBe(2);
//   });

//   it('Should handle incrementByAmount', ({ store }) => {
//     expect(selectCount(store.getState())).toBe(3);

//     store.dispatch(incrementByAmount(2));

//     expect(selectCount(store.getState())).toBe(5);
//   });
// });
