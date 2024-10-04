import React from 'react'

import { Alert, Button, Card, FormInput, Modal, Recaptcha, Typography } from '@/common/ui'
import { useForgotPassword } from '@/features/auth/model/useForgotPassword'
import Link from 'next/link'

export const ForgotPasswordForm = () => {
  const {
    apiError,
    control,
    getValues,
    handleSubmit,
    isModalOpen,
    isSubmitting,
    isValid,
    onRecaptchaChange,
    setApiError,
    setIsModalOpen,
    t,
  } = useForgotPassword()

  return (
    <Card
      className={
        'px-4 py-0 sm:p-6 flex flex-col gap-6 max-w-96 w-screen bg-transparent sm:bg-dark-500 sm:border-2 border-transparent sm:border-dark-300'
      }
    >
      <Typography className={'text-center'} variant={'h1'}>
        {t.forgotPassword}
      </Typography>
      <form className={'flex flex-col gap-6'} onSubmit={handleSubmit}>
        <FormInput
          control={control}
          label={t.email}
          name={'email'}
          placeholder={'email@yandex.ru'}
          required
        />
        <Typography className={'text-light-900 -mt-5'} variant={'small-text'}>
          {t.enterYourEmail}
        </Typography>
        <Button disabled={!isValid || isSubmitting} type={'submit'}>
          {t.emailSendButton}
        </Button>
        <div className={'flex justify-center'}>
          <Button type={'button'} variant={'text'}>
            <Link href={'/auth/sign-in'}>{t.backToSignIn}</Link>
          </Button>
        </div>
        <Recaptcha
          className={'self-center'}
          onChange={onRecaptchaChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
          theme={'dark'}
        />
      </form>
      {!!apiError && <Alert message={apiError} onClose={() => setApiError('')} type={'error'} />}
      <Modal
        isOpen={isModalOpen}
        mode={'default'}
        onOpenChange={setIsModalOpen}
        title={t.emailSent}
      >
        <div className={'flex flex-col gap-[18px] pb-6 pt-[18px] w-72 sm:w-80'}>
          <Typography
            className={'text-center sm:text-start'}
          >{`${t.weHaveSent} ${getValues('email')}`}</Typography>

          <Button
            className={'self-center sm:self-end w-full sm:w-[96px]'}
            onClick={() => setIsModalOpen(false)}
          >
            OK
          </Button>
        </div>
      </Modal>
    </Card>
  )
}
