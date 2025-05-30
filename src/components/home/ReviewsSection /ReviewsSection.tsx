'use client'

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem
} from '@/components/ui/carousel';

const reviews = [
  {
    name: 'Ekaterina Valnova',
    text: 'I have used the services of this site more than once. Everything is fast, convenient, and reliable! I recommend it to everyone!',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=80&h=80&facepad=2',
    rating: 5,
  },
  {
    name: 'Evgeny Strizhalo',
    text: 'Great service! Quickly found the tickets I needed, payment went smoothly. Very satisfied!',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=80&h=80&facepad=2',
    rating: 5,
  },
  {
    name: 'Anna Petrova',
    text: 'User-friendly interface and excellent support. Booking tickets was a breeze!',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=80&h=80&facepad=2',
    rating: 4,
  },
  {
    name: 'Dmitry Ivanov',
    text: 'Affordable prices and a wide selection of routes. Will use again!',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=80&h=80&facepad=2',
    rating: 5,
  },
  {
    name: 'Maria Sokolova',
    text: 'Everything went smoothly, from searching to payment. Highly recommend!',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=80&h=80&facepad=2',
    rating: 5,
  },
];

export default function ReviewsSection() {


  return (
    <section id="reviews" className="py-16 bg-white px-28">
      <h2 className="text-3xl font-bold mb-12">REVIEWS</h2>
      <Carousel className="w-full">
        <CarouselContent className="-ml-1">
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card>
                <CardContent className="p-6 h-40 flex flex-col justify-between">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={review.image}
                      alt={review.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold mb-2">{review.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{review.text}</p>
                      <div className="text-amber-500">{'★★★★★'.slice(0, review.rating)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselDots/>
      </Carousel>
    </section>
  );
}