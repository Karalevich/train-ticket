import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


export default function HeroSection() {
  return (
    <section
      className="h-[51vw] bg-[url('@/assets/images/hero-section.png')]
      bg-cover bg-center -mt-20 mx-auto px-16  items-center grid md:grid-cols-2 gap-8 w-full"
    >
      <h1 className="text-6xl font-bold mb-4 text-white">
        All Live -<br/>
        <span className="text-amber-200">just Traveling!</span>
      </h1>
      <article className="h-[30vw] bg-black/30 backdrop-blur-sm p-6 rounded-lg self-end space-y-4">
        <div>
          <label className="text-white text-sm mb-2 block">Направление</label>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="Откуда" className="bg-white"/>
            <Input placeholder="Куда" className="bg-white"/>
          </div>
        </div>
        <div>
          <label className="text-white text-sm mb-2 block">Дата</label>
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" className="bg-white"/>
            <Input type="date" className="bg-white"/>
          </div>
        </div>
        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3">
          FIND TICKETS
        </Button>
      </article>
    </section>
  )
}