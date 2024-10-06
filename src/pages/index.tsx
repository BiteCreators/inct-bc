import React from 'react'

import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <div className={'flex gap-4 flex-col'}>
      <h1>StartPage</h1>
      <Link className={'text-red-600 text-4xl'} href={'/auth'}>
        Auth
      </Link>
      <Link href={'/profile'}>Profile</Link>
      <div className={'text-[50px]'}>
        Aegon Targārio Ānogār Luqisūti Daor rhaenagon iā tubis jēdi. Yn ziry iāndes korona iā
        Qēlioroz brōzi kesrio tolī ēza lēda hāre ossȳngas, se vēzos tubis luqagon daor ēza
        mazvēlzir, ēdrus Dorne kostōro ezīmagon. Любимая фишка многих цыган — развод честных людей
        на деньги средь бела дня. Многие цыганки хорошо владеют практиками гипноза, поэтому одного
        простого зрительного контакта с ними достаточно для того, чтобы начать слушать и выполнять
        все то, что они скажут. Также часто взрослые цыганки ходят в сопровождении ребятишек,
        которые не просто поздно шатаются рядом с мамой, а выполняют свою незатейливую работу по
        опустошению карманов жертвы. Пока мама заговаривает жертве зубы и отвлекает внимание
        мимолетным гипнозом — ребятишки проверяют содержимое карманов на предмет наличия ценных
        вещей, если таковые попадаются то самым невозбранным образом отправляются во владение
        предприимчивой цыганской семейки. Qilūbri gevives luqagon lo va doron ēza iā Āegon issa ziry
        tolmon issa ābra. Luqagon hen mazves lo azantys valzir, ēdrus lo ēza daor bē ipradagon emāqi
        ivēza, tolmon. Ziry ēza daor ūndan emaragon ziry ēza zōbrar. Rybis zīrī dāezma dorinagon ēza
        Āegono ēdrus tolī lo ēzīmagon, vēzos rūvario sēn emagon. Lo ziry ēza daor. Tolī ēza
        mazvēlzir ēza Āegono īssāt. Sūlos mazves lo ēza udagon iā Korona īlva Rōzda, ēzi ēza jāton
        iā zābravo ēza lentos mērios ziry issa rūs emāzmo. Valyria jemēlos hen lentys ēza vēzos
        pojaliks zōbrar. Skōra zolūpty jelmio ānogri ēzos belmur mōrī īlva iemnōti, va naejot ēza
        bē, iēdro ēza dorinazmor. Targārio luoty ēza daor ēnykso lo sūndas tolmiot, se rybis belmoti
        mazvēlzir ēza zūgagon Aenaro bē Dāreksio Vezof tōna va jāre. Yn tolvys ēza daor. Tāba rūho
        Dēnys iā rōvalāksōna ēza jāton, se ēzos ōrēssys Māzis va Vestrasī, vāedarzies zōbrar. Hen
        ābrazma tolvūpas ēza darilar hen sȳndror nykeēza. Dāreksio Vezof mēre vēzos bē tubis ānogrīs
        ēza biarzes dorios hen Valyria. Ziry ēza syt pōjes hen Iynkē Skōriot lo ēza rytsos hen
        Lōgrion. Targārio tolminar iā vēzos lo ēza rīhiltary Velarion hen Driftmark (mēre vēzos
        zōbrī Valyria) ēza pāplan, rūñagon iā daorār hārezī kīdaks. Velarion iā kēly ānogri zōbrī
        Celtigar hen Kogarō Ānogrī ēza bantar iā sīmon Uzvestrī morghon hen Sūdy ēza Targārio
        drakari ēdrus iā sōvior.
      </div>
    </div>
  )
}

export default Home
