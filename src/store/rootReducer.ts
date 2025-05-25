import { combineReducers } from '@reduxjs/toolkit'

// A simple placeholder reducer
const placeholderReducer = (state = null, action: any) => {
  return state
}

const rootReducer = combineReducers({
  _placeholder: placeholderReducer,
})

export default rootReducer
