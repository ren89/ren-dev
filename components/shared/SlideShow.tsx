import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SlideShow({
  images,
}: {
  images: { image: string; name: string }[];
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="mx-auto w-[75%] sm:w-full max-w-3xl">
      <Carousel setApi={setApi} className="w-full max-w-3xl">
        <CarouselContent>
          {images.map((_, index) => (
            <CarouselItem key={index}>
              <Image
                src={images[index].image}
                alt={"Buildustry"}
                width={700}
                height={200}
                quality={100}
                className="rounded border-2 border-slate-200/10 transition-transform duration-300 ease-in-out transform group-hover:scale-110 sm:order-1 sm:col-span-2 sm:translate-y-1"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground text-white">
        {images[current - 1]?.name ?? ""}
      </div>
    </div>
  );
}
