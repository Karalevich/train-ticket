import { Mail, MapPin, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer id='footer' className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-6">Contact us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5"/>
                <span>+1 (253) 000 00 00</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5"/>
                <span>inbox@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>🎫</span>
                <span>usa.train.tickets</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5"/>
                <div>
                  <div>1600 Pennsylvania Ave NW</div>
                  <div>Washington, DC</div>
                  <div>20500</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">Subscription</h3>
            <p className="mb-4">Keep up to date with events</p>
            <div className="flex space-x-2">
              <Input placeholder="Your email" className="bg-gray-800 border-gray-700 text-white"/>
              <Button variant="ghost" className="">SEND</Button>
            </div>
            <div className="mt-6">
              <p className="mb-3">Subscribe to us</p>
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
          <Image src="/images/logo.webp" alt="Logo" width={80} height={80}/>
          <div className="text-sm text-gray-400">2025 WEB</div>
        </div>
      </div>
    </footer>
  )
}