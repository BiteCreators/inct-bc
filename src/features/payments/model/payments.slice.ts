import { AccountType } from '@/entities/payments'
import { SUBSCRIPTION_TYPES } from '@byte-creators/utils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
  accountType: AccountType
  autoRenewal: boolean
  newSubscriptionType: SUBSCRIPTION_TYPES | null
}

const initialState: InitialState = {
  accountType: 'Personal',
  autoRenewal: false,
  newSubscriptionType: SUBSCRIPTION_TYPES.DAY,
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
    setNewSubscriptionType: (state, action: PayloadAction<SUBSCRIPTION_TYPES | null>) => {
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
