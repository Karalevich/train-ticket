import { Button } from '@/components/ui/button';
import { Calendar, Globe, Monitor } from 'lucide-react';
import HowItWorksCard from '@/components/home/HowItWorksCard/HowItWorksCard';

const cards = [
  {
    icon: Monitor,
    title: 'Convenient order',
    description: 'on the website',
  },
  {
    icon: Calendar,
    title: 'There is no need',
    description: 'to go to the office',
  },
  {
    icon: Globe,
    title: 'A huge selection of',
    description: 'destinations',
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-[linear-gradient(to_right,rgba(251,191,36,0.6),rgba(249,115,22,0.5)),url('@/assets/images/about-section.png')]
        py-16 bg-cover bg-center bg-blend-multiply text-white overflow-hidden px-26 pe-14"
    >
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl font-bold">HOW IT WORKS</h2>
        <Button variant="ghost" className="text-white w-48">
          Know more
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <HowItWorksCard
            key={idx}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>

    </section>
  )
}