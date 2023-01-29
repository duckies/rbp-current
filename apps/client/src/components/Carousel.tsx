"use client"

import type { Slide } from "@rbp/server"
import { Swiper, SwiperSlide } from "swiper/react"

import { Container } from "components/Container"
import Image from "next/image"
import "swiper/css"

type CarouselProps = {
  slides: Slide[]
}

export function Carousel({ slides }: CarouselProps) {
  return (
    <Swiper className="h-[500px] ">
      {slides.map((slide, i) => (
        <SwiperSlide
          className="relative [text-shadow:0_1px_0_#000] after:pointer-events-none after:absolute after:inset-0 after:z-10 after:bg-gradient-to-t after:from-surface-900 after:to-surface-900/20"
          key={slide.id}
        >
          <Image
            className="h-auto w-full object-cover"
            src={slide.url}
            alt={slide.caption || ""}
            fill
            quality={100}
            {...(i === 0 && { priority: true })}
          />
          <Container className="relative z-20 flex h-full flex-col content-center justify-center">
            <p className="mb-2 block text-4xl font-bold tracking-tight sm:text-5xl">
              {slide.title}
            </p>
            <p className="text-2xl text-gray-100">{slide.caption}</p>
          </Container>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
