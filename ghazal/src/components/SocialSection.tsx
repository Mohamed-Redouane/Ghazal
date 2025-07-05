"use client"

import { Instagram, Heart, Users, Camera, Play } from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"

const SocialSection = () => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [playingTikToks, setPlayingTikToks] = useState<Set<string>>(new Set())
  const instagramRef = useRef<HTMLDivElement>(null)
  const tiktokRef = useRef<HTMLDivElement>(null)

  // Custom TikTok icon component
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )

  const socialLinks = [
    {
      icon: Instagram,
      name: "Instagram",
      handle: "@ghazal.restaurant_",
      url: "https://www.instagram.com/ghazal.restaurant_/",
      gradient: "from-purple-500 via-pink-500 to-orange-400",
      followers: "240",
    },
    {
      icon: TikTokIcon,
      name: "TikTok",
      handle: "@GhazalRestaurant",
      url: "https://www.tiktok.com/@ghazalresto",
      gradient: "from-black to-gray-800",
      followers: "41.6K",
    },
  ]

  // Intersection Observer for lazy loading sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section")
            if (sectionId) {
              setVisibleSections((prev) => new Set(prev).add(sectionId))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      },
    )

    const refs = [instagramRef.current, tiktokRef.current].filter(Boolean) as Element[]
    refs.forEach(ref => observer.observe(ref))

    return () => {
      refs.forEach(ref => observer.unobserve(ref))
      observer.disconnect()
    }
  }, [])

  // Load Instagram embed script only when needed
  useEffect(() => {
    if (
      visibleSections.has("instagram") &&
      !document.querySelector('script[src="https://www.instagram.com/embed.js"]')
    ) {
      const script = document.createElement("script")
      script.src = "https://www.instagram.com/embed.js"
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    }
  }, [visibleSections])

  // Handle TikTok load on user interaction
  const handleTikTokLoad = useCallback((postId: string) => {
    setPlayingTikToks(prev => new Set(prev).add(postId))
  }, [])

  // Instagram posts data
  const instagramPosts = [
    {
      id: "DLEai1Igb60",
      url: "https://www.instagram.com/p/DLEai1Igb60/",
      embedUrl: "https://www.instagram.com/p/DLEai1Igb60/embed/",
    },
    {
      id: "DLBRxLNsmym",
      url: "https://www.instagram.com/reel/DLBRxLNsmym/",
      embedUrl: "https://www.instagram.com/reel/DLBRxLNsmym/embed/",
    },
    {
      id: "DKcx34WxQG_",
      url: "https://www.instagram.com/reel/DKcx34WxQG_/",
      embedUrl: "https://www.instagram.com/reel/DKcx34WxQG_/embed/",
    },
  ]

  // TikTok posts data
  const tiktokPosts = [
    {
      id: "7511803135434788101",
      url: "https://www.tiktok.com/@ghazalresto/video/7511803135434788101",
      embedUrl: "https://www.tiktok.com/embed/v2/7511803135434788101",
    },
    {
      id: "7504422507064151302",
      url: "https://www.tiktok.com/@ghazalresto/video/7504422507064151302",
      embedUrl: "https://www.tiktok.com/embed/v2/7504422507064151302",
    },
    {
      id: "7518106414229769478",
      url: "https://www.tiktok.com/@ghazalresto/video/7518106414229769478",
      embedUrl: "https://www.tiktok.com/embed/v2/7518106414229769478",
    },
  ]

  return (
    <section
      id="social"
      className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden"
      aria-label="Réseaux sociaux"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute top-10 left-10 w-60 h-60 bg-emerald-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-emerald-500" aria-hidden="true"></div>
            <Camera className="w-10 h-10 text-teal-600 mx-4" aria-hidden="true" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-700 bg-clip-text text-transparent mx-6">
              Suivez-nous
            </h2>
            <Heart className="w-10 h-10 text-emerald-600 mx-4" aria-hidden="true" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-emerald-500" aria-hidden="true"></div>
          </div>

          <div
            className="w-40 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 mx-auto mb-8"
            aria-hidden="true"
          ></div>

          <p className="text-xl text-slate-600 font-body font-light max-w-3xl mx-auto leading-relaxed">
            Découvrez l&apos;univers culinaire de Ghazal à travers nos réseaux sociaux. Plats signature, coulisses de cuisine
            et moments gourmands vous attendent !
          </p>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-emerald-200/50 hover:border-emerald-400/70 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl w-full max-w-xs"
                aria-label={`Visitez notre ${social.name}`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}
                  aria-hidden="true"
                ></div>

                <div className="relative z-10 flex items-center space-x-4 md:space-x-6">
                  <div
                    className={`relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${social.gradient} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" aria-hidden="true" />
                  </div>

                  <div className="text-left">
                    <h3 className="font-display font-semibold text-lg md:text-xl text-slate-800 group-hover:text-emerald-700 transition-colors duration-300 mb-1">
                      {social.name}
                    </h3>
                    <p className="text-slate-600 text-sm font-body mb-2 truncate max-w-[120px]">{social.handle}</p>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                      <span className="text-sm font-body text-emerald-600 font-medium">{social.followers} abonnés</span>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        {/* Instagram Feed */}
        <div ref={instagramRef} data-section="instagram" className="mt-20 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-semibold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-4">
              Nos dernières créations
            </h3>
            <div className="flex items-center justify-center space-x-4 mb-6" aria-hidden="true">
              <div className="w-12 h-px bg-emerald-500"></div>
              <Instagram className="w-6 h-6 text-teal-600" />
              <div className="w-12 h-px bg-emerald-500"></div>
            </div>
            <p className="text-slate-600 font-body max-w-2xl mx-auto">
              Plongez dans l&apos;univers visuel de Ghazal Restaurant et laissez-vous inspirer par nos plats d&apos;exception
            </p>
          </div>

          {/* Instagram Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {instagramPosts.map((post) => (
              <div
                key={`instagram-${post.id}`}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full max-w-md mx-auto"
              >
                {visibleSections.has("instagram") ? (
                  <iframe
                    src={post.embedUrl}
                    width="100%"
                    height="600"
                    frameBorder="0"
                    scrolling="no"
                    allow="encrypted-media"
                    className="border-0 rounded-2xl w-full"
                    title={`Instagram post ${post.id}`}
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-[600px] bg-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-4">
                      <Instagram className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">Chargement de la publication...</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Instagram Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-emerald-200/50 shadow-lg max-w-md mx-auto">
              <h4 className="text-xl font-display font-semibold text-slate-800 mb-4">Plus de contenu gourmand !</h4>
              <p className="text-slate-600 font-body mb-6 text-sm">
                Découvrez toutes nos créations culinaires et l&apos;ambiance unique de notre restaurant
              </p>
              <a
                href="https://www.instagram.com/ghazal.restaurant_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-body font-medium hover:scale-105 transition-all duration-300 shadow-lg w-full max-w-xs mx-auto"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
                <span>Suivre sur Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* TikTok Feed */}
        <div ref={tiktokRef} data-section="tiktok" className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-display font-semibold bg-gradient-to-r from-gray-800 to-black bg-clip-text text-transparent mb-4">
              Nos vidéos TikTok
            </h3>
            <div className="flex items-center justify-center space-x-4 mb-6" aria-hidden="true">
              <div className="w-12 h-px bg-gray-700"></div>
              <TikTokIcon className="w-6 h-6 text-gray-800" />
              <div className="w-12 h-px bg-gray-700"></div>
            </div>
            <p className="text-slate-600 font-body max-w-2xl mx-auto">
              Découvrez nos moments culinaires les plus créatifs et amusants sur TikTok
            </p>
          </div>

          {/* TikTok Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {tiktokPosts.map((post) => (
              <div
                key={`tiktok-${post.id}`}
                className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group aspect-[9/16] min-h-[300px]"
              >
                {visibleSections.has("tiktok") ? (
                  playingTikToks.has(post.id) ? (
                    <iframe
                      src={`${post.embedUrl}?autoplay=1`}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      allow="encrypted-media; autoplay"
                      className="border-0 rounded-2xl w-full h-full"
                      title={`TikTok video ${post.id}`}
                      loading="lazy"
                    />
                  ) : (
                    <div 
                      className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center cursor-pointer hover:from-gray-800 hover:to-gray-900 transition-all duration-300 group"
                      onClick={() => handleTikTokLoad(post.id)}
                    >
                      <div className="text-center p-6">
                        <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-4 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                          <Play className="w-12 h-12 text-white ml-1" fill="currentColor" />
                        </div>
                        <h4 className="text-white font-semibold text-lg mb-2">Vidéo TikTok</h4>
                        <p className="text-gray-300 text-sm">Cliquez pour charger et lire</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-4">
                      <TikTokIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">Chargement de la vidéo...</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* TikTok Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-gray-200/50 shadow-lg max-w-md mx-auto">
              <h4 className="text-xl font-display font-semibold text-slate-800 mb-4">Plus de vidéos créatives !</h4>
              <p className="text-slate-600 font-body mb-6 text-sm">
                Suivez-nous sur TikTok pour plus de contenus amusants et créatifs
              </p>
              <a
                href="https://www.tiktok.com/@ghazalresto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-black to-gray-800 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-body font-medium hover:scale-105 transition-all duration-300 shadow-lg w-full max-w-xs mx-auto"
              >
                <TikTokIcon className="w-5 h-5" aria-hidden="true" />
                <span>Suivre sur TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SocialSection