import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer' // Your root reducer

export const store = configureStore({
  reducer: rootReducer,
  // Middleware can be added here. Redux Toolkit includes some defaults like 'redux-thunk'.
  // devTools: process.env.NODE_ENV !== 'production', // DevTools enabled in development
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {auth: AuthState, chores: ChoresState, ...}
export type AppDispatch = typeof store.dispatch

export default store
