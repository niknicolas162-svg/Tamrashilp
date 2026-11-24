"use client"

import React from "react"
import { ArrowRight, Star, ShieldCheck, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface AvatarList {
  image: string
  name?: string
}

export interface HeroSectionProps {
  avatarList: AvatarList[]
}

export default function HeroSection({ avatarList }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      {/* Background ambient radial gradients */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-30">
        <div className="h-[450px] w-[600px] rounded-full bg-gradient-to-tr from-primary/30 to-accent blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          {/* Subtle announcement pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            <span>Excellence in Craft & Digital Design</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-primary font-semibold">Award-Winning 2026</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="font-serif text-4xl font-normal tracking-tight text-foreground sm:text-6xl lg:text-7xl leading-[1.1]">
            Transforming Ideas Into{" "}
            <span className="italic text-primary font-medium">Timeless</span>{" "}
            Masterpieces
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed font-body">
            We partner with visionary founders and discerning brands to design generational products,
            artisanal aesthetics, and tactile digital experiences that endure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Button size="lg" className="w-full sm:w-auto gap-2 text-sm font-medium shadow-md">
              <span>Start Your Journey</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-sm font-medium">
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Watch Showreel</span>
            </Button>
          </div>

          {/* Social Proof Avatar Stack */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex -space-x-2.5 overflow-hidden p-1">
              {avatarList.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar.image}
                  alt={avatar.name || `Patron ${idx + 1}`}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-background object-cover shadow-sm"
                  onError={(e) => {
                    // Fallback to stock unsplash image if remote asset fails
                    (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80`
                  }}
                />
              ))}
            </div>

            <div className="text-left space-y-1">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
                <span className="ml-1.5 text-xs font-semibold text-foreground">5.0</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Trusted by <strong className="font-medium text-foreground">2,500+</strong> patrons & discerning brands
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

