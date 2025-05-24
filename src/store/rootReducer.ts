import { combineReducers } from '@reduxjs/toolkit'

// Import your feature slices here once they are created
// For example:
// import authReducer from '../features/auth/store/authSlice';

const rootReducer = combineReducers({
  // Add feature reducers here:
  // auth: authReducer,
  // chores: choresReducer,
  // ...
  // For now, we can leave it empty or add a placeholder if needed
  // For example, a dummy reducer to avoid an empty object error if combineReducers requires at least one:
  // _placeholder: (state = null) => state,
})

export default rootReducer
