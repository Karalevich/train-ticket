import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 bg-white container px-28">
      <h2 className="text-3xl font-bold mb-12">REVIEWS</h2>
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
    </section>
  );
}