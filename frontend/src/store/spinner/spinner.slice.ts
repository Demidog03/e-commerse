import {CaseReducer, createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit'
import {RootState} from '../index.ts'
import {SpinnerState} from './spinner.types.ts'

const initialState: SpinnerState = {
  open: false
}

interface Reducers<State> extends SliceCaseReducers<State> {
  setSpinnerOpen: CaseReducer<State, PayloadAction<boolean>>
}

const spinnerSlice = createSlice<SpinnerState, Reducers<SpinnerState>>({
  name: 'post',
  initialState,
  reducers: {
    setSpinnerOpen: (state, action) => {
      state.open = action.payload
    }
  }
})

export const {
  setSpinnerOpen
} = spinnerSlice.actions

export const spinnerSelector = (state: RootState): boolean => state.spinner.open

export default spinnerSlice.reducer
