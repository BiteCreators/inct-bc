import React from 'react'

import { Button } from '@/common/ui'
import { ActionConfirmation } from '@/common/ui/action-confirmation/ActionComfiirmation'
import { useConfirmation } from '@/common/ui/action-confirmation/useConfirmation'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const { confirmOpen, handleConfirm, handleReject, requestConfirmation, setConfirmOpen } =
    useConfirmation()

  const funk = async () => {
    const isConfirmed = await requestConfirmation()

    if (isConfirmed) {
      alert('Action confirmed!')
    } else {
      alert('Action rejected!')
    }
  }
  const funk2 = async () => {
    const isConfirmed = await requestConfirmation()

    if (isConfirmed) {
      alert('Action confirmed!')
    } else {
      alert('Action rejected!')
    }
  }

  return (
    <div className={'flex gap-4 flex-col'}>
      <h1>StartPage</h1>
      <Link className={'text-red-600 text-4xl'} href={'/auth'}>
        Auth
      </Link>
      <ActionConfirmation
        isOpen={confirmOpen}
        message={'Are you sure?'}
        onConfirm={handleConfirm}
        onReject={handleReject}
        setIsOpen={setConfirmOpen}
        title={'Confirm Action'}
      />
      <Button onClick={funk}>TEST</Button>
      <Button onClick={funk2}>TEST</Button>
      <Link href={'/profile'}>Profile</Link>
      <div className={'text-[50px]'}>
        Aegon Targārio Ānogār Luqisūti Daor rhaenagon iā tubis jēdi. Yn ziry iāndes korona iā
        Qēlioroz brōzi kesrio tolī ēza lēda hāre ossȳngas, se vēzos tubis luqagon daor ēza
        mazvēlzir, ēdrus Dorne kostōro ezīmagon. Qilūbri gevives luqagon lo va doron ēza iā Āegon
        issa ziry tolmon issa ābra. Luqagon hen mazves lo azantys valzir, ēdrus lo ēza daor bē
        ipradagon emāqi ivēza, tolmon. Ziry ēza daor ūndan emaragon ziry ēza zōbrar. Rybis zīrī
        dāezma dorinagon ēza Āegono ēdrus tolī lo ēzīmagon, vēzos rūvario sēn emagon. Lo ziry ēza
        daor. Tolī ēza mazvēlzir ēza Āegono īssāt. Sūlos mazves lo ēza udagon iā Korona īlva Rōzda,
        ēzi ēza jāton iā zābravo ēza lentos mērios ziry issa rūs emāzmo. Valyria jemēlos hen lentys
        ēza vēzos pojaliks zōbrar. Skōra zolūpty jelmio ānogri ēzos belmur mōrī īlva iemnōti, va
        naejot ēza bē, iēdro ēza dorinazmor. Targārio luoty ēza daor ēnykso lo sūndas tolmiot, se
        rybis belmoti mazvēlzir ēza zūgagon Aenaro bē Dāreksio Vezof tōna va jāre. Yn tolvys ēza
        daor. Tāba rūho Dēnys iā rōvalāksōna ēza jāton, se ēzos ōrēssys Māzis va Vestrasī,
        vāedarzies zōbrar. Hen ābrazma tolvūpas ēza darilar hen sȳndror nykeēza. Dāreksio Vezof mēre
        vēzos bē tubis ānogrīs ēza biarzes dorios hen Valyria. Ziry ēza syt pōjes hen Iynkē Skōriot
        lo ēza rytsos hen Lōgrion. Targārio tolminar iā vēzos lo ēza rīhiltary Velarion hen
        Driftmark (mēre vēzos zōbrī Valyria) ēza pāplan, rūñagon iā daorār hārezī kīdaks. Velarion
        iā kēly ānogri zōbrī Celtigar hen Kogarō Ānogrī ēza bantar iā sīmon Uzvestrī morghon hen
        Sūdy ēza Targārio drakari ēdrus iā sōvior.
      </div>
    </div>
  )
}

export default Home
