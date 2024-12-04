import dynamic from 'next/dynamic'

const StatisticsPage = dynamic(() =>
  import('admin/statistics-page').then(mod => mod.StatisticsPage)
)

export default function Page() {
  return <StatisticsPage />
}
