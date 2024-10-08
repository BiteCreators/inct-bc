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
        mazvēlzir, ēdrus Dorne kostōro ezīmagon. Любимая страта многих цыган — бахнуть честных людей
        на бабки под тавером в мидгейме. Цыганки качнули хай скилл на гипноз, так что одного лука с
        ними хватает, чтобы ты сразу начал лить в чат и делать всё, на что они байтят. Часто вардят
        они с лоу-лвл керри, которые не просто афкашат рядом, а заняты фармом карманов жертвы. Пока
        мейн саппорт крутит брейнсап и держит на цепочке гипнозом — керри чекают карманы на шмот, и
        если там есть что-то норм, то засовывают это в инвентарь своей смекалистой цыганской пачки.
        Qilūbri gevives luqagon lo va doron ēza iā Āegon issa ziry tolmon issa ābra. Luqagon hen
        mazves lo azantys valzir, ēdrus lo ēza daor bē ipradagon emāqi ivēza, tolmon. Ziry ēza daor
        ūndan emaragon ziry ēza zōbrar. Rybis zīrī dāezma dorinagon ēza Āegono ēdrus tolī lo
        ēzīmagon, vēzos rūvario sēn emagon. Lo ziry ēza daor. Tolī ēza mazvēlzir ēza Āegono īssāt.
        Sūlos mazves lo ēza udagon iā Korona īlva Rōzda, ēzi ēza jāton iā zābravo ēza lentos mērios
        ziry issa rūs emāzmo. Valyria jemēlos hen lentys ēza vēzos pojaliks zōbrar. Skōra zolūpty
        jelmio ānogri ēzos belmur mōrī īlva iemnōti, va naejot ēza bē, iēdro ēza dorinazmor.
        Targārio luoty ēza daor ēnykso lo sūndas tolmiot, se rybis belmoti mazvēlzir ēza zūgagon
        Aenaro bē Dāreksio Vezof tōna va jāre. Yn tolvys ēza daor. Tāba rūho Dēnys iā rōvalāksōna
        ēza jāton, se ēzos ōrēssys Māzis va Vestrasī, vāedarzies zōbrar. Hen ābrazma tolvūpas ēza
        darilar hen sȳndror nykeēza. Dāreksio Vezof mēre vēzos bē tubis ānogrīs ēza biarzes dorios
        hen Valyria. Ziry ēza syt pōjes hen Iynkē Skōriot lo ēza rytsos hen Lōgrion. Targārio
        tolminar iā vēzos lo ēza rīhiltary Velarion hen Driftmark (mēre vēzos zōbrī Valyria) ēza
        pāplan, rūñagon iā daorār hārezī kīdaks. Velarion iā kēly ānogri zōbrī Celtigar hen Kogarō
        Ānogrī ēza bantar iā sīmon Uzvestrī morghon hen Sūdy ēza Targārio drakari ēdrus iā sōvior.
      </div>
    </div>
  )
}

export default Home
