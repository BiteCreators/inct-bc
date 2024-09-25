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
    getValues,
    handleSubmit,
    isModalOpen,
    isSubmitting,
    isValid,
    onRecaptchaChange,
    setIsModalOpen,
    t,
  } = useForgotPassword()

  return (
    <Card className={'p-6 flex flex-col gap-6 max-w-96 w-screen'}>
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
        <Typography className={'text-light-900 -mt-6'} variant={'small-text'}>
          {t.enterYourEmail}
        </Typography>
        <Button disabled={!isValid || isSubmitting} type={'submit'}>
          {t.emailSentButton}
        </Button>
        <Button type={'button'} variant={'text'}>
          <Link href={'/auth/sign-in'}>{t.backToSignIn}</Link>
        </Button>
        <Recaptcha
          className={'self-center'}
          onChange={onRecaptchaChange}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}
          theme={'dark'}
        />
      </form>
      <Modal
        isOpen={isModalOpen}
        mode={'default'}
        onOpenChange={setIsModalOpen}
        title={t.emailSent}
      >
        <div className={'flex flex-col gap-[18px] pb-6 pt-[18px]'}>
          <Typography>{`${t.weHaveSent} ${getValues('email')}`}</Typography>

          <Button className={'self-end w-[96px]'} onClick={() => setIsModalOpen(false)}>
            OK
          </Button>
        </div>
      </Modal>
    </Card>
  )
}
