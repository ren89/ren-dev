import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="mx-auto w-full">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((_, index) => (
            <CarouselItem key={index}>
              <Image
                src={images[index].image}
                alt={"Buildustry"}
                width={700}
                height={200}
                quality={100}
                className="rounded-lg border-2 w-full border-slate-200/10 transition-transform duration-300 ease-in-out transform group-hover:scale-110 sm:order-1 sm:col-span-2 sm:translate-y-1"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="text-center text-sm text-muted-foreground text-white">
        {images.map((_, index) => (
          <span
            key={index}
            className={`inline-block w-1 h-1 sm:w-2 sm:h-2 mx-1 rounded-full ${
              current === index ? "bg-slate-200" : "bg-slate-200/50"
            }`}
          ></span>
        ))}
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground text-white">
        {images[current]?.name ?? ""}
      </div>
    </div>
  );
}
