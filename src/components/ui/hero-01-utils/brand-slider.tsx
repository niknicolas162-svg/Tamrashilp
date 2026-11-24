"use client"

import React from "react"
import { ShieldCheck, Award, Sparkles, Feather, Gem } from "lucide-react"

export interface BrandList {
  image: string
  lightimg?: string
  name: string
}

export interface BrandSliderProps {
  brandList: BrandList[]
}

const fallbackIcons = [ShieldCheck, Award, Sparkles, Feather, Gem]

export default function BrandSlider({ brandList }: BrandSliderProps) {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-8">
          Recognized by Leading Houses & Heritage Foundations
        </p>

        {/* Brand Logo Grid / Slider */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 md:gap-16 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          {brandList.map((brand, index) => {
            const FallbackIcon = fallbackIcons[index % fallbackIcons.length]
            return (
              <div
                key={index}
                className="flex items-center space-x-2 text-foreground/80 hover:text-foreground transition-colors group cursor-default"
                title={brand.name}
              >
                {brand.image ? (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="h-7 w-auto object-contain dark:hidden"
                    onError={(e) => {
                      // Fallback if SVG/URL fails to load
                      (e.target as HTMLElement).style.display = "none"
                    }}
                  />
                ) : null}

                {brand.lightimg ? (
                  <img
                    src={brand.lightimg}
                    alt={brand.name}
                    className="h-7 w-auto object-contain hidden dark:block"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none"
                    }}
                  />
                ) : null}

                <div className="flex items-center space-x-1.5 font-serif text-sm font-medium tracking-wide">
                  <FallbackIcon className="h-4 w-4 text-primary shrink-0" />
                  <span>{brand.name}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

