"use client";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const footerElement = document.getElementById("footer");
    if (footerElement) {
      observer.observe(footerElement);
    }

    return () => observer.disconnect();
  }, []);

  const hours = [
    { day: "Samedi", time: "11h - 4h" },
    { day: "Dimanche", time: "11h - 2h" },
    { day: "Lundi", time: "11h - 2h" },
    { day: "Mardi", time: "11h - 2h" },
    { day: "Mercredi", time: "11h - 2h" },
    { day: "Jeudi", time: "11h - 2h" },
    { day: "Vendredi", time: "14h - 4h" }
  ];

  return (
    <footer id="footer" className="relative bg-teal-dark overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/3 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Glass Morphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-dark/90 via-teal-dark/95 to-charcoal/90 backdrop-blur-sm"></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Logo Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <Image
                src="/784f679a-d9b9-4c38-bf02-c74f66562bc7.png"
                alt="Ghazal Restaurant Logo"
                width={128}
                height={128}
                className="w-32 h-32 object-contain filter drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          <h3 className="text-4xl font-heading font-bold text-gold mb-4">Ghazal Restaurant</h3>
          <p className="text-primary-foreground/80 font-body text-lg max-w-2xl mx-auto">
            Une expérience culinaire raffinée inspirée de l&rsquo;élégance de la gazelle
          </p>
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6"></div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <h4 className="text-xl font-heading font-semibold mb-8 text-gold relative">
              Contact
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold"></div>
            </h4>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-gold/30 group-hover:bg-gold/30 transition-all duration-300 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">3766 St Laurent Blvd</p>
                  <p className="text-primary-foreground/70">Montreal, Quebec H2W 1X6</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-gold/30 group-hover:bg-gold/30 transition-all duration-300 flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">(514) 379-5003</p>
                  <p className="text-primary-foreground/70">Appelez-nous</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-gold/30 group-hover:bg-gold/30 transition-all duration-300 flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">saint.laurent514@gmail.com</p>
                  <p className="text-primary-foreground/70">Écrivez-nous</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "200ms" }}>
            <h4 className="text-xl font-heading font-semibold mb-8 text-gold relative">
              Navigation
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold"></div>
            </h4>
            <nav className="space-y-4">
              {[
                { label: "Accueil", href: "#home" },
                { label: "Menu", href: "#menu" },
                { label: "À propos", href: "#about" },
                { label: "Galerie", href: "#gallery" },
                { label: "Contact", href: "#contact" }
              ].map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-primary-foreground/80 hover:text-gold transition-all duration-300 font-body relative group py-2"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="absolute left-0 top-0 w-0 h-full bg-gold/10 rounded-r-lg transition-all duration-300 group-hover:w-full"></div>
                </a>
              ))}
            </nav>
          </div>

          {/* Hours Section */}
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "400ms" }}>
            <h4 className="text-xl font-heading font-semibold mb-8 text-gold relative">
              Horaires
              <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gold"></div>
            </h4>

            <div className="space-y-3">
              {hours.map((schedule, index) => (
                <div
                  key={schedule.day}
                  className="flex justify-between items-center p-3 rounded-lg bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300 group"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="text-primary-foreground/80 font-body">{schedule.day}</span>
                  <span className="text-gold font-semibold group-hover:scale-105 transition-transform duration-200">{schedule.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t border-primary-foreground/20 pt-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: "600ms" }}>
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6">
              <p className="text-primary-foreground/60 font-body text-sm">
                © 2025 Ghazal Restaurant. Tous droits réservés.
              </p>
            </div>
            <div className="flex items-center text-primary-foreground/60 font-body text-sm">
              <span>Créé par Redouane</span>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;
