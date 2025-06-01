import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePickerWithRange } from '@/components/ui/dataRangePicker';
//min-h-[51vw]

export default function HeroSection() {
  return (
    <section
      className="bg-[url('@/assets/images/hero-section.png')]
      bg-cover bg-center -mt-20 mx-auto px-16  items-center grid md:grid-cols-2 gap-8 w-full"
    >
      <h1 className="text-6xl font-bold mb-8 mt-52 md:mb-52 md:mt-64 text-white">
        All Live -<br/>
        <span className="text-amber-200">just Traveling!</span>
      </h1>
      <article className="bg-black/30 backdrop-blur-sm p-6 rounded-lg self-end space-y-8">
        <div>
          <label className="text-white text-sm mb-2 block">Direction</label>
          <div className="grid grid-cols-2 gap-2">
            <Input placeholder="From" className="bg-white"/>
            <Input placeholder="To" className="bg-white"/>
          </div>
        </div>
        <div>
          <label className="text-white text-sm mb-2 block">Date</label>
          <div className="grid grid-cols-2 gap-2">
            <DatePickerWithRange/>
          </div>
        </div>
        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3">
          FIND TICKETS
        </Button>
      </article>
    </section>
  )
}