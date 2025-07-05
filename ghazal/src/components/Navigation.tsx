"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const menuItems = [
    { label: "Accueil", href: "#home" },
    { label: "Menu", href: "#menu" },
    { label: "À propos", href: "#about" },
    { label: "Galerie", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ]

  const getTextColor = () => "text-black"
  const getHoverColor = () => "hover:text-gold"

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-effect backdrop-blur-2xl border-b border-border/20 shadow-premium" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <div className="flex items-center group">
            <div className="relative">
              <Image
                src="/9725a374-555e-4788-9fbc-8725ebb59068.png"
                alt="Ghazal Restaurant Logo"
                width={80}
                height={80}
                className="h-16 lg:h-20 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
            </div>
          </div>

          {/* Desktop Menu with Premium Effects */}
          <div className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`group relative ${getTextColor()} ${getHoverColor()} font-body font-light text-lg tracking-wide transition-all duration-300 animate-slide-in-elegant`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-gold-dark to-gold-light transition-all duration-500 group-hover:w-full"></span>
                <span className="absolute inset-0 bg-gold/5 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Button with Enhanced Style */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-3 ${getTextColor()} ${getHoverColor()} transition-all duration-300 rounded-xl ${isScrolled ? "glass-effect" : ""}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glass-effect backdrop-blur-2xl border-t border-border/20 shadow-premium rounded-b-2xl">
            <div className="py-6 space-y-1">
              {menuItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 text-black hover:text-gold hover:bg-gold/5 transition-all duration-300 font-body text-lg tracking-wide rounded-xl mx-2 animate-slide-in-elegant"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
