import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Header } from '@/components/HeaderNav/HeaderNav';
import HeroSection from '@/components/home/HeroSection/HeroSection';
import AboutSection from '@/components/home/AboutSection/AboutSection';
import HowItWorksSection from '@/components/home/HowItWorksSection/HowItWorksSection';
import ReviewsSection from '@/components/home/ReviewsSection /ReviewsSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <HeroSection>

      </HeroSection>

      <AboutSection/>

      <HowItWorksSection/>

      <ReviewsSection/>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Свяжитесь с нами</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5"/>
                  <span>8 (800) 000 00 00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5"/>
                  <span>inbox@mail.ru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🎫</span>
                  <span>tu.train.tickets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5"/>
                  <div>
                    <div>г. Москва</div>
                    <div>ул. Московская 27-35</div>
                    <div>555 555</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Подписка</h3>
              <p className="mb-4">Будьте в курсе событий</p>
              <div className="flex space-x-2">
                <Input placeholder="Ваш email" className="bg-gray-800 border-gray-700 text-white"/>
                <Button className="bg-gray-700 hover:bg-gray-600">ОТПРАВИТЬ</Button>
              </div>
              <div className="mt-6">
                <p className="mb-3">Подписывайтесь на нас</p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">📺</div>
                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">💼</div>
                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">🌐</div>
                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">📘</div>
                  <div className="w-8 h-8 bg-gray-700 rounded flex items-center justify-center">🐦</div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex justify-between items-center">
            <div className="text-xl font-bold">Лого</div>
            <div className="text-sm text-gray-400">2018 WEB</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
