import { ComponentType, SVGProps } from 'react';

export interface HowItWorksCardProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}