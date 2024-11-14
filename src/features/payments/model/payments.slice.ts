import { AccountType, TYPE_DESCRIPTIONS } from '@/entities/payments'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  accountType: AccountType
  autoRenewal: boolean
  newSubscriptionType: TYPE_DESCRIPTIONS | null
}

const initialState: InitialState = {
  accountType: 'Personal',
  autoRenewal: false,
  newSubscriptionType: TYPE_DESCRIPTIONS.DAY,
  autoRenewal: false,
  newSubscriptionType: null,
}

export const paymentsSlice = createSlice({
  initialState,
  name: 'payments',
  reducers: {
    setAccountType: (state, action: PayloadAction<AccountType>) => {
      state.accountType = action.payload
    },
    setAutoRenewal: (state, action: PayloadAction<boolean>) => {
      state.autoRenewal = action.payload
    },
    setNewSubscriptionType: (state, action: PayloadAction<TYPE_DESCRIPTIONS | null>) => {
      state.newSubscriptionType = action.payload
    },
    // toggleAutoRenewal: state => {
    //   state.autoRenewal = !state.autoRenewal
    // },
  },
  selectors: {
    selectAccountType: state => state.accountType,
    selectAutoRenewal: state => state.autoRenewal,
    selectNewSubscriptionType: state => state.newSubscriptionType,
  },
})
