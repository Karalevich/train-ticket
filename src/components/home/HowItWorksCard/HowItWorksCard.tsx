import { HowItWorksCardProps } from '@/components/home/HowItWorksCard/types';

export default function HowItWorksCard({ icon: Icon, title, description }: HowItWorksCardProps) {
  return (
    <div className="text-center">
      <div className="w-[11vw] h-[11vw] bg-white/40 rounded-full flex items-center justify-center mx-auto">
        <div className="w-[10vw] h-[10vw] bg-white rounded-full flex items-center justify-center">
          <Icon className="w-[6vw] h-[6vw] text-amber-600"/>
        </div>
      </div>

      <h3 className="font-semibold mb-2">{title}
        <br/>
        {description}
      </h3>
    </div>
  );
}