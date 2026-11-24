"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Menu, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export interface NavigationSection {
  title: string
  href: string
  isActive?: boolean
}

export interface HeaderProps {
  navigationData: NavigationSection[]
}

export default function Header({ navigationData }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Sparkles className="h-5 w-5" />
          </span>
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            Atelier Agency
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navigationData.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`transition-colors hover:text-foreground/80 ${
                item.isActive
                  ? "text-foreground font-semibold"
                  : "text-foreground/60"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Sheet Trigger */}
        <div className="flex items-center space-x-3">
          <Button variant="default" size="sm" className="hidden sm:inline-flex gap-1.5 shadow-sm">
            <span>Get Started</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="font-serif text-left">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 py-6">
                  {navigationData.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-base transition-colors hover:text-foreground ${
                        item.isActive
                          ? "font-semibold text-foreground"
                          : "text-foreground/70"
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button className="w-full justify-center">Get Started</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

