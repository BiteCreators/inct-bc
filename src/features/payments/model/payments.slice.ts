import { AccountType, TYPE_DESCRIPTIONS } from '@/entities/payments'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  accountType: AccountType
  newSubscriptionType: TYPE_DESCRIPTIONS | null
}

const initialState: InitialState = {
  accountType: 'Personal',
  newSubscriptionType: TYPE_DESCRIPTIONS.DAY,
}

export const paymentsSlice = createSlice({
  initialState,
  name: 'payments',
  reducers: {
    setAccountType: (state, action: PayloadAction<AccountType>) => {
      state.accountType = action.payload
    },
    setNewSubscriptionType: (state, action: PayloadAction<TYPE_DESCRIPTIONS | null>) => {
      state.newSubscriptionType = action.payload
    },
  },
  selectors: {
    selectAccountType: state => state.accountType,
    selectNewSubscriptionType: state => state.newSubscriptionType,
  },
})
