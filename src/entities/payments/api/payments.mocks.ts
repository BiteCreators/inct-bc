import { HttpResponse, http } from 'msw'

export const paymentsHandlers = [
  http.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/subscriptions/my-payments`, () => {
    return HttpResponse.json({
      data: Array.from({ length: 120 }, (_, ind) => ({
        dateOfPayment: '2024-11-05T18:42:55.367Z',
        endDateOfSubscription: '2024-11-05T18:42:55.367Z',
        paymentType: `${ind % 2 === 0 ? 'Paypal' : 'Stripe'}`,
        price: ind,
        subscriptionId: '',
        subscriptionType: `${ind % 2 === 0 ? '1 day' : '1 month'}`,
        userId: 0,
      })),
    })
  }),
]
