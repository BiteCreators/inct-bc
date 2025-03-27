import { MemoryGameComponent } from '@/features/games/ui/MemoryGameComponent'

export default function MemoryGame() {
  return (
    <div className={'flex items-center justify-center'}>
      <MemoryGameComponent columns={6} rows={6} />
    </div>
  )
}
