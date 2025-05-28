import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Globe, Monitor, Phone, Mail, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-amber-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="text-xl font-bold">Лого</div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-amber-200 transition-colors">
                О нас
              </a>
              <a href="#how-it-works" className="hover:text-amber-200 transition-colors">
                Как это работает
              </a>
              <a href="#reviews" className="hover:text-amber-200 transition-colors">
                Отзывы
              </a>
              <a href="#contacts" className="hover:text-amber-200 transition-colors">
                Контакты
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-amber-600 to-orange-500 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.png"
            alt="Desert landscape with railway"
            fill
            className="object-cover opacity-80"
            priority
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-8 w-full">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Вся жизнь -<br />
                <span className="text-amber-200">путешествие!</span>
              </h1>
            </div>
            <div className="bg-black/30 backdrop-blur-sm p-6 rounded-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-white text-sm mb-2 block">Направление</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Откуда" className="bg-white" />
                    <Input placeholder="Куда" className="bg-white" />
                  </div>
                </div>
                <div>
                  <label className="text-white text-sm mb-2 block">Дата</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="date" className="bg-white" />
                    <Input type="date" className="bg-white" />
                  </div>
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3">
                  НАЙТИ БИЛЕТЫ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">О НАС</h2>
          <div className="border-l-4 border-amber-500 pl-6 space-y-4">
            <p className="text-gray-700">
              Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше
              людей заказывают ж/д билеты через интернет.
            </p>
            <p className="text-gray-700">
              Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем
              о преимуществах заказа через интернет.
            </p>
            <p className="text-gray-700">
              <strong>Покупать ж/д билеты дешево можно за 90 суток до отправления поезда.</strong>
              <br />
              Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-16 bg-gradient-to-r from-amber-600 to-orange-500 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-20">
          <Image src="/hero-bg.png" alt="Background" fill className="object-cover" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">КАК ЭТО РАБОТАЕТ</h2>
            <Button variant="outline" className="text-amber-600 border-white hover:bg-white">
              Узнать больше
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Удобный заказ</h3>
              <p className="text-sm">на сайте</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Нет необходимости</h3>
              <p className="text-sm">ехать в офис</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-10 h-10 text-amber-600" />
              </div>
              <h3 className="font-semibold mb-2">Огромный выбор</h3>
              <p className="text-sm">направлений</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">ОТЗЫВЫ</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Екатерина Вальнова"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold mb-2">Екатерина Вальнова</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Пользуюсь услугами этого сайта уже не первый раз. Все быстро, удобно, надежно! Рекомендую всем!
                    </p>
                    <div className="text-amber-500">★★★★★</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Евгений Стрижало"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold mb-2">Евгений Стрижало</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Отличный сервис! Быстро нашел нужные билеты, оплата прошла без проблем. Очень доволен!
                    </p>
                    <div className="text-amber-500">★★★★★</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-6">Свяжитесь с нами</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5" />
                  <span>8 (800) 000 00 00</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5" />
                  <span>inbox@mail.ru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🎫</span>
                  <span>tu.train.tickets</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5" />
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
                <Input placeholder="Ваш email" className="bg-gray-800 border-gray-700 text-white" />
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
