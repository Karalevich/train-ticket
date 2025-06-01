import { Header } from '@/components/HeaderNav/HeaderNav';
import HeroSection from '@/components/home/HeroSection/HeroSection';
import AboutSection from '@/components/home/AboutSection/AboutSection';
import HowItWorksSection from '@/components/home/HowItWorksSection/HowItWorksSection';
import ReviewsSection from '@/components/home/ReviewsSection /ReviewsSection';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <HeroSection>

      </HeroSection>

      <AboutSection/>

      <HowItWorksSection/>

      <ReviewsSection/>

      <Footer/>
    </div>
  )
}
