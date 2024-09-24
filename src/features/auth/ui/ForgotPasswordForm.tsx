import React from 'react'

import { Button } from '@/common/components/button/Button'
import { Card } from '@/common/components/card/Card'
import { FormInput } from '@/common/components/form/FormInput'
import { Modal } from '@/common/components/modal/Modal'
import { Recaptcha } from '@/common/components/reCaptcha/Recaptcha'
import Typography from '@/common/components/typography/Typography'
import { useForgotPassword } from '@/features/auth/model/useForgotPassword'
import Link from 'next/link'

export const ForgotPasswordForm = () => {
  const {
    control,
    handleSubmit,
    isModalOpen,
    isSubmitting,
    isValid,
    onRecaptchaChange,
    setIsModalOpen,
    submit,
  } = useForgotPassword()

  return (
    <Card className={'p-6 flex flex-col gap-6 max-w-96 w-screen'}>
      <Typography className={'text-center'} variant={'h1'}>
        Forgot Password
      </Typography>
      <form className={'flex flex-col gap-6'} onSubmit={handleSubmit(submit)}>
        <FormInput
          control={control}
          label={'email'}
          name={'email'}
          placeholder={'email@yandex.ru'}
          required
        />
        <Typography className={'text-light-900 -mt-6'} variant={'small-text'}>
          Enter your email address and we will send you further instructions{' '}
        </Typography>
        <Button disabled={!isValid || isSubmitting} type={'submit'}>
          Send Link
        </Button>
        <Button type={'button'} variant={'text'}>
          <Link href={'/auth/sign-in'}>Back to Sign In</Link>
        </Button>
        <Recaptcha
          className={'self-center'}
          onChange={onRecaptchaChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
          theme={'dark'}
        />
      </form>
      <Modal isOpen={isModalOpen} mode={'default'} onOpenChange={setIsModalOpen} title={'title'}>
        <div className={'flex flex-col gap-[18px] pb-6 pt-[18px]'}>
          <Typography>{'Typography'}</Typography>
          <Button className={'self-end w-[96px]'} onClick={() => setIsModalOpen(false)}>
            Ok
          </Button>
        </div>
      </Modal>
    </Card>
  )
}
