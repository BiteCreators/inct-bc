import React from 'react'

import { useGetAllPostsTestQuery } from '@/app/inct.api'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  const { data } = useGetAllPostsTestQuery()

  return (
    <div className={'flex gap-4 flex-col'}>
      <h1>StartPage</h1>
      <Link className={'text-red-600 text-4xl'} href={'/auth'}>
        Auth
      </Link>
      <Link href={'/profile'}>Profile</Link>
      <div className={'text-[50px]'}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem beatae eos, rerum omnis
        consectetur ab velit accusantium nostrum adipisci expedita, alias unde laboriosam eligendi,
        dicta odit maiores exercitationem optio modi. Doloribus voluptas at tempora vitae hic
        excepturi rerum magnam facere, numquam omnis sint beatae nisi a, consequuntur odio non
        molestiae voluptatibus harum sed repellat sit! Ipsam provident odio qui sit! Molestias fuga
        magni suscipit porro quo cum quos? Ducimus accusantium maiores labore, tempora expedita quos
        explicabo sunt velit voluptatum iure consequatur. Magni nesciunt doloribus sapiente minima
        laudantium placeat odit veniam. Nobis veritatis nemo voluptas ipsam. Modi, maxime voluptatum
        hic, rerum nihil natus beatae eveniet nisi delectus nobis sapiente veritatis quis ab officia
        perspiciatis. Illo facere deserunt maiores, delectus obcaecati nihil? A tempora odit dicta
        necessitatibus doloremque dolores qui eveniet explicabo molestias quisquam, suscipit rerum
        delectus expedita cupiditate inventore? Repudiandae dicta reprehenderit velit dolorum quam
        accusamus ut. Velit, nostrum? Fugiat, magnam? Exercitationem ea recusandae consectetur animi
        obcaecati eligendi similique necessitatibus rem porro labore quas provident non, nostrum
        velit, ipsam ipsum veritatis laboriosam molestias quam cum eos autem incidunt. Odit, quis
        suscipit. Cumque optio voluptatem vitae in doloremque voluptatum animi fugiat inventore
        culpa magnam, corrupti impedit a possimus expedita voluptate porro totam sapiente quae, illo
        aspernatur! Laborum a mollitia saepe vitae totam. Maiores nulla repellat perspiciatis omnis
        hic quisquam autem animi. Minus tenetur fugit error delectus eos. Pariatur non eum, aliquam
        sapiente ab eos perferendis debitis hic voluptatum cupiditate eligendi accusantium ipsum.
        Labore quis soluta qui dolore exercitationem, id sunt tempore ea deserunt. Sapiente, fuga!
        Laborum, vel provident a delectus placeat, non eius excepturi velit accusantium recusandae
        nemo cum magnam magni repudiandae. Dolorum voluptas in excepturi cupiditate sequi totam
        consectetur. Eum iste numquam quibusdam exercitationem officia iure soluta, modi vel ipsam
        sapiente quas voluptatem odio omnis inventore veritatis, eius quidem, vitae quis.
      </div>
    </div>
  )
}

export default Home
