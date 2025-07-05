"use client"

import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import Image from "next/image"
import { preloadImages, preloadImageBatch } from "../lib/imageUtils"

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isVideoMuted, setIsVideoMuted] = useState(true) // Start muted for mobile compatibility
  const [loadedSlides, setLoadedSlides] = useState<Set<number>>(new Set([0]))
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isVideoHovered, setIsVideoHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Memoize slides array to prevent unnecessary re-renders
  const slides = useMemo(
    () => [
      {
        id: 1,
        type: "image" as const,
        image: "/20.avif",
        title: "Sandwich Ultra Ghazal",
        subtitle: "Mixte de viandes premium",
        description:
          "Pain maison, mixte de viandes (poulet, kefta, merguez), trois fromages, garniture fraîche et sauce au choix",
        slogan: "الأَكْل حلْ لكِلّ مشكِلْ",
        theme: "sandwich", // Add sandwich theme
      },
      {
        id: 2,
        type: "image" as const,
        image: "/23.avif",
        title: "Notre Pain Artisanal",
        subtitle: "Fait maison chaque jour",
        description: "Pain croustillant à l'extérieur et moelleux à l'intérieur, préparé avec amour dans nos cuisines",
        slogan: "GHAZAL\nوَٱلطَّعْمُ خَيَالٌ",
        theme: "bread", // Keep existing bread theme
      },
      {
        id: 3,
        type: "image" as const,
        image: "/6.avif",
        title: "GHAZAL Croustillante",
        subtitle: "L'art de la crêpe parfaite",
        description: "Crêpes croustillantes garnies avec 5 ingrédients au choix, une explosion de saveurs sucrées",
        theme: "crepes", // Keep theme but remove slogan
      },
      {
        id: 4,
        type: "image" as const,
        image: "/N.avif",
        title: "Milkshakes Ghazal",
        subtitle: "Onctueux et rafraîchissants",
        description:
          "Milkshakes crémeux préparés avec des ingrédients de qualité, chantilly généreuse et décoration gourmande",
        theme: "milkshakes", // Keep theme but remove slogan
      },
      {
        id: 5,
        type: "video" as const,
        video: "/video 2.mov",
        title: "L'Expérience Ghazal",
        subtitle: "Découvrez notre savoir-faire",
        description:
          "Plongez dans l'univers authentique de notre restaurant où chaque bouchée est une explosion de saveurs",
      },
    ],
    [],
  )

  // Enhanced preload function using the provided utilities
  const preloadSlide = useCallback(
    (index: number) => {
      if (loadedSlides.has(index) || index >= slides.length) return

      const slide = slides[index]
      if (slide.type === "image" && slide.image) {
        preloadImages(slide.image)
        setLoadedSlides((prev) => new Set(prev).add(index))
      } else {
        setLoadedSlides((prev) => new Set(prev).add(index))
      }
    },
    [slides, loadedSlides],
  )

  // Preload all images on component mount
  useEffect(() => {
    const imageSlides = slides.filter((slide) => slide.type === "image" && slide.image).map((slide) => slide.image!)

    if (imageSlides.length > 0) {
      preloadImageBatch(imageSlides, true)
    }
  }, [slides])

  // Handle temporary pause on user interaction
  const handleUserInteraction = useCallback(() => {
    setUserPaused(true)

    // Clear existing pause timer
    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current)
    }

    // Resume auto-play after 10 seconds of no interaction
    pauseTimerRef.current = setTimeout(() => {
      setUserPaused(false)
    }, 10000)
  }, [])

  // Enhanced slide transition
  const changeSlide = useCallback(
    (newIndex: number, userTriggered = false) => {
      if (isTransitioning || newIndex === currentSlide) return

      setIsTransitioning(true)
      if (userTriggered) handleUserInteraction()

      // Preload next slide
      preloadSlide((newIndex + 1) % slides.length)

      setTimeout(() => {
        setCurrentSlide(newIndex)
        setIsTransitioning(false)
      }, 100)
    },
    [currentSlide, isTransitioning, handleUserInteraction, preloadSlide, slides.length],
  )

  // Enhanced video controls with mobile support
  const toggleVideoPlayback = useCallback(async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (isVideoPlaying) {
        await video.pause()
        setIsVideoPlaying(false)
      } else {
        // For mobile, ensure video is muted before playing
        if (isMobile) {
          video.muted = true
          setIsVideoMuted(true)
        }
        await video.play()
        setIsVideoPlaying(true)
      }
    } catch (error) {
      console.warn("Video playback failed:", error)
      // Fallback for mobile - ensure muted playback
      if (!isMobile) {
        try {
          video.muted = true
          await video.play()
          setIsVideoPlaying(true)
          setIsVideoMuted(true)
        } catch (fallbackError) {
          console.error("Video playback failed even with muted fallback:", fallbackError)
        }
      }
    }

    handleUserInteraction()
  }, [isVideoPlaying, handleUserInteraction, isMobile])

  const toggleVideoMute = useCallback(async () => {
    const video = videoRef.current
    if (!video) return

    try {
      // For mobile, we need to handle unmuting differently
      if (isMobile) {
        // On mobile, we might need to pause and play again to enable sound
        const wasPlaying = !video.paused
        if (wasPlaying) {
          await video.pause()
        }
        video.muted = !video.muted
        setIsVideoMuted(!isVideoMuted)
        if (wasPlaying) {
          await video.play()
        }
      } else {
        video.muted = !video.muted
        setIsVideoMuted(!isVideoMuted)
      }
    } catch (error) {
      console.warn("Failed to toggle mute:", error)
    }

    handleUserInteraction()
  }, [isVideoMuted, handleUserInteraction, isMobile])

  // Auto-slide functionality with refined behavior
  useEffect(() => {
    if (isTransitioning || userPaused) return

    const currentSlideData = slides[currentSlide]

    if (currentSlideData.type === "video") {
      const video = videoRef.current
      if (video && isVideoPlaying) {
        const handleVideoEnd = () => {
          changeSlide((currentSlide + 1) % slides.length)
        }

        video.addEventListener("ended", handleVideoEnd)
        return () => video.removeEventListener("ended", handleVideoEnd)
      } else {
        // If video is not playing, continue sliding after a delay
        autoPlayTimerRef.current = setTimeout(() => {
          changeSlide((currentSlide + 1) % slides.length)
        }, 6000)
      }
    } else {
      // For image slides, use consistent timing
      const timing = currentSlideData.slogan ? 6000 : 4500
      autoPlayTimerRef.current = setTimeout(() => {
        changeSlide((currentSlide + 1) % slides.length)
      }, timing)
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current)
      }
    }
  }, [currentSlide, slides, isTransitioning, userPaused, isVideoPlaying, changeSlide])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault()
          changeSlide((currentSlide - 1 + slides.length) % slides.length, true)
          break
        case "ArrowRight":
          event.preventDefault()
          changeSlide((currentSlide + 1) % slides.length, true)
          break
        case " ":
          if (slides[currentSlide].type === "video") {
            event.preventDefault()
            toggleVideoPlayback()
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, slides, changeSlide, toggleVideoPlayback])

  // Navigation functions
  const nextSlide = () => changeSlide((currentSlide + 1) % slides.length, true)
  const prevSlide = () => changeSlide((currentSlide - 1 + slides.length) % slides.length, true)
  const goToSlide = (index: number) => changeSlide(index, true)

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) {
        clearTimeout(autoPlayTimerRef.current)
      }
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current)
      }
    }
  }, [])

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
      role="banner"
      aria-label="Hero section with restaurant showcase"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-dark via-charcoal to-teal-dark">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(45,93,47,0.1),transparent_50%)]"></div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-black/20">
        <div
          className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-300 ease-out"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`,
          }}
        ></div>
      </div>

      {/* Carousel Container */}
      <div className="relative h-full flex items-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => {
              slideRefs.current[index] = el
            }}
            className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0 scale-100"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full scale-95"
                  : "opacity-0 translate-x-full scale-95"
            }`}
            aria-hidden={index !== currentSlide}
          >
            {slide.type === "video" ? (
              // Enhanced Video Section with better mobile support
              <div className="absolute inset-0 w-full h-full flex items-center justify-center pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8">
                <div className="relative w-full h-full max-w-6xl">
                  {/* Refined Background Effects */}
                  <div className="absolute -inset-2 sm:-inset-4 lg:-inset-6 bg-gradient-to-r from-gold/20 via-teal/30 to-gold/20 blur-lg sm:blur-xl lg:blur-2xl animate-pulse opacity-60 rounded-lg sm:rounded-2xl lg:rounded-3xl"></div>
                  <div className="absolute -inset-1 sm:-inset-2 lg:-inset-3 bg-gradient-to-br from-gold-light/30 to-teal-light/30 blur-md sm:blur-lg lg:blur-xl opacity-50 rounded-lg sm:rounded-xl lg:rounded-2xl"></div>

                  {/* Main Video Container - Enhanced mobile support */}
                  <div
                    className="relative w-full h-full bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl shadow-gold/20 border border-gold/10"
                    onMouseEnter={() => setIsVideoHovered(true)}
                    onMouseLeave={() => setIsVideoHovered(false)}
                  >
                    <video
                      ref={videoRef}
                      src={slide.video}
                      playsInline
                      loop
                      muted={isVideoMuted}
                      preload="metadata"
                      className="w-full h-full object-cover"
                      onPlay={() => setIsVideoPlaying(true)}
                      onPause={() => setIsVideoPlaying(false)}
                      onLoadedData={() => {
                        // Auto-play for desktop, require user interaction for mobile
                        if (!isMobile && videoRef.current) {
                          videoRef.current.play().catch(() => {
                            // Fallback to muted autoplay
                            if (videoRef.current) {
                              videoRef.current.muted = true
                              setIsVideoMuted(true)
                              videoRef.current.play()
                            }
                          })
                        }
                      }}
                      aria-label={slide.description}
                    />

                    {/* Play button overlay when video is not playing - Only show when video is paused */}
                    {!isVideoPlaying && (
                      <div
                        className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer z-20"
                        onClick={toggleVideoPlayback}
                      >
                        <div className="bg-black/70 backdrop-blur-md rounded-full p-4 sm:p-6 lg:p-8 hover:bg-black/80 transition-all duration-300 hover:scale-110">
                          <Play className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white ml-1" />
                        </div>
                      </div>
                    )}

                    {/* Enhanced Video Controls - Only show on hover for desktop, always visible on mobile when playing */}
                    {((isVideoHovered && !isMobile) || (isMobile && isVideoPlaying)) && isVideoPlaying && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 flex items-center justify-center z-10">
                        <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6 bg-black/70 backdrop-blur-md rounded-lg sm:rounded-xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-lg sm:shadow-xl border border-gold/20">
                          <button
                            onClick={toggleVideoPlayback}
                            className="text-white hover:text-gold transition-all duration-200 p-2 sm:p-2.5 lg:p-3 rounded-full hover:bg-white/10 hover:scale-110 transform"
                            aria-label="Pause video"
                          >
                            <Pause size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                          </button>
                          <button
                            onClick={toggleVideoMute}
                            className="text-white hover:text-gold transition-all duration-200 p-2 sm:p-2.5 lg:p-3 rounded-full hover:bg-white/10 hover:scale-110 transform"
                            aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
                          >
                            {isVideoMuted ? (
                              <VolumeX size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                            ) : (
                              <Volume2 size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Brand Overlay */}
                    <div className="absolute top-2 sm:top-4 lg:top-6 left-2 sm:left-4 lg:left-6 z-10 pointer-events-none">
                      <div className="bg-black/60 backdrop-blur-sm px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-md sm:rounded-lg border border-gold/30">
                        <span className="text-gold-premium font-accent text-xs sm:text-sm md:text-base lg:text-lg tracking-wide font-semibold">
                          Ghazal Restaurant
                        </span>
                      </div>
                    </div>

                    {/* Video Title Overlay */}
                    <div className="absolute bottom-2 sm:bottom-4 lg:bottom-6 left-2 sm:left-4 lg:left-6 right-2 sm:right-4 lg:right-6 z-10 pointer-events-none">
                      <div className="bg-gradient-to-r from-black/70 to-black/50 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-md sm:rounded-lg border border-gold/20">
                        <h3 className="text-white font-display text-sm sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5 sm:mb-1">
                          {slide.title}
                        </h3>
                        <p className="text-gold-premium font-accent text-xs sm:text-sm md:text-base lg:text-lg italic mb-0.5 sm:mb-1">
                          {slide.subtitle}
                        </p>
                        <p className="text-white/90 font-body text-xs sm:text-sm md:text-base">{slide.description}</p>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-6 sm:top-8 lg:top-12 right-6 sm:right-8 lg:right-12 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 bg-gold/20 rounded-full blur-lg sm:blur-xl animate-pulse opacity-60 pointer-events-none"></div>
                    <div className="absolute bottom-12 sm:bottom-16 lg:bottom-24 right-8 sm:right-12 lg:right-16 w-6 sm:w-8 lg:w-12 h-6 sm:h-8 lg:h-12 bg-teal/30 rounded-full blur-md sm:blur-lg opacity-50 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            ) : (
              // Enhanced image slides
              <div className="container mx-auto px-8 sm:px-12 lg:px-16 xl:px-20 h-full">
                <div className="flex flex-col lg:flex-row items-center justify-between h-full py-8 lg:py-16 gap-8 lg:gap-12">
                  {/* Left Content */}
                  <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8 max-w-xl lg:max-w-2xl order-2 lg:order-1">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-center lg:justify-start space-x-3 sm:space-x-4 animate-slide-in-elegant">
                        <div className="h-px bg-gradient-to-r from-gold to-gold-light w-8 sm:w-12 lg:w-16 animate-shimmer-gold"></div>
                        <span className="text-gold-premium font-accent text-xs sm:text-sm md:text-base lg:text-lg tracking-wider">
                          Ghazal Restaurant
                        </span>
                      </div>

                      {/* Enhanced Arabic Slogan with Theme-Specific Styling */}
                      {slide.slogan && (
                        <div className="relative mb-8 animate-reveal-up" style={{ animationDelay: "0.3s" }}>
                          {slide.theme === "bread" ? (
                            // Special styling for bread slide
                            <div className="text-center space-y-3">
                              <div className="relative">
                                <p className="text-gold-premium font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wider animate-text-glow">
                                  GHAZAL
                                </p>
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                              </div>
                              <p
                                className="text-gold-premium font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl tracking-wide leading-relaxed animate-text-glow"
                                style={{ direction: "rtl", fontFamily: 'Georgia, "Times New Roman", serif' }}
                              >
                                وَٱلطَّعْمُ خَيَالٌ
                              </p>
                              {/* Enhanced decorative elements for bread theme */}
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-shimmer-gold"></div>
                              <div
                                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-40 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-shimmer-gold"
                                style={{ animationDelay: "1s" }}
                              ></div>
                              {/* Bread-themed decorative dots */}
                              <div className="absolute top-1/2 -left-8 w-2 h-2 bg-gold/40 rounded-full animate-pulse"></div>
                              <div
                                className="absolute top-1/2 -right-8 w-2 h-2 bg-gold/40 rounded-full animate-pulse"
                                style={{ animationDelay: "0.5s" }}
                              ></div>
                            </div>
                          ) : slide.theme === "sandwich" ? (
                            // Special styling for sandwich slide
                            <div className="text-center space-y-4">
                              <div className="relative">
                                <p
                                  className="text-gold-premium font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wide leading-relaxed animate-text-glow"
                                  style={{ direction: "rtl", fontFamily: 'Georgia, "Times New Roman", serif' }}
                                >
                                  {slide.slogan}
                                </p>
                                {/* Sandwich-themed decorative elements */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent animate-shimmer-gold"></div>
                                <div
                                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent animate-shimmer-gold"
                                  style={{ animationDelay: "0.8s" }}
                                ></div>
                                {/* Sandwich-themed corner accents */}
                                <div className="absolute top-0 -left-6 w-1 h-1 bg-gold/60 rounded-full animate-pulse"></div>
                                <div
                                  className="absolute top-0 -right-6 w-1 h-1 bg-gold/60 rounded-full animate-pulse"
                                  style={{ animationDelay: "0.3s" }}
                                ></div>
                                <div
                                  className="absolute bottom-0 -left-4 w-1 h-1 bg-gold/40 rounded-full animate-pulse"
                                  style={{ animationDelay: "0.6s" }}
                                ></div>
                                <div
                                  className="absolute bottom-0 -right-4 w-1 h-1 bg-gold/40 rounded-full animate-pulse"
                                  style={{ animationDelay: "0.9s" }}
                                ></div>
                              </div>
                            </div>
                          ) : slide.theme === "crepes" ? (
                            // Special styling for crepes slide
                            <div className="text-center space-y-4">
                              <div className="relative">
                                <p
                                  className="text-gold-premium font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wide leading-relaxed animate-text-glow"
                                  style={{ direction: "rtl", fontFamily: 'Georgia, "Times New Roman", serif' }}
                                >
                                  {slide.slogan}
                                </p>
                                {/* Crepes-themed decorative elements - curved lines */}
                                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                                  <div className="w-28 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-shimmer-gold transform rotate-2"></div>
                                </div>
                                <div
                                  className="absolute -bottom-5 left-1/2 transform -translate-x-1/2"
                                  style={{ animationDelay: "0.7s" }}
                                >
                                  <div className="w-36 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent animate-shimmer-gold transform -rotate-1"></div>
                                </div>
                                {/* Crepes-themed scattered dots */}
                                <div className="absolute top-1/4 -left-10 w-1.5 h-1.5 bg-gold/50 rounded-full animate-pulse"></div>
                                <div
                                  className="absolute top-3/4 -right-10 w-1.5 h-1.5 bg-gold/50 rounded-full animate-pulse"
                                  style={{ animationDelay: "0.4s" }}
                                ></div>
                                <div
                                  className="absolute top-1/2 -left-12 w-1 h-1 bg-gold/30 rounded-full animate-pulse"
                                  style={{ animationDelay: "0.8s" }}
                                ></div>
                                <div
                                  className="absolute top-1/3 -right-12 w-1 h-1 bg-gold/30 rounded-full animate-pulse"
                                  style={{ animationDelay: "1.2s" }}
                                ></div>
                              </div>
                            </div>
                          ) : slide.theme === "milkshakes" ? (
                            // Special styling for milkshakes slide
                            <div className="text-center space-y-4">
                              <div className="relative">
                                <p
                                  className="text-gold-premium font-display font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl tracking-wide leading-relaxed animate-text-glow"
                                  style={{ direction: "rtl", fontFamily: 'Georgia, "Times New Roman", serif' }}
                                >
                                  {slide.slogan}
                                </p>
                                {/* Milkshakes-themed decorative elements - wavy lines */}
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                                  <div className="flex space-x-1">
                                    <div className="w-6 h-px bg-gold/50 animate-pulse transform rotate-12"></div>
                                    <div className="w-8 h-px bg-gold/60 animate-pulse transform -rotate-6"></div>
                                    <div className="w-6 h-px bg-gold/50 animate-pulse transform rotate-12"></div>
                                  </div>
                                </div>
                                <div
                                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
                                  style={{ animationDelay: "0.6s" }}
                                >
                                  <div className="flex space-x-1">
                                    <div className="w-8 h-px bg-gold/60 animate-pulse transform -rotate-12"></div>
                                    <div className="w-10 h-px bg-gold/70 animate-pulse transform rotate-6"></div>
                                    <div className="w-8 h-px bg-gold/60 animate-pulse transform -rotate-12"></div>
                                  </div>
                                </div>
                                {/* Milkshakes-themed bubbles */}
                                <div
                                  className="absolute top-0 -left-8 w-2 h-2 bg-gold/40 rounded-full animate-bounce"
                                  style={{ animationDelay: "0s", animationDuration: "2s" }}
                                ></div>
                                <div
                                  className="absolute top-1/4 -right-6 w-1.5 h-1.5 bg-gold/50 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}
                                ></div>
                                <div
                                  className="absolute bottom-1/4 -left-6 w-1 h-1 bg-gold/30 rounded-full animate-bounce"
                                  style={{ animationDelay: "1s", animationDuration: "3s" }}
                                ></div>
                                <div
                                  className="absolute bottom-0 -right-8 w-1.5 h-1.5 bg-gold/45 rounded-full animate-bounce"
                                  style={{ animationDelay: "1.5s", animationDuration: "2.2s" }}
                                ></div>
                              </div>
                            </div>
                          ) : (
                            // Regular slogan styling for other slides
                            slide.slogan
                              .split("\n")
                              .map((line, index) => (
                                <p
                                  key={index}
                                  className="text-gold-premium font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center tracking-wide leading-relaxed animate-text-glow"
                                  style={{
                                    direction: line.includes("وَٱلطَّعْمُ") ? "rtl" : "ltr",
                                    fontFamily: line.includes("وَٱلطَّعْمُ")
                                      ? 'Georgia, "Times New Roman", serif'
                                      : "inherit",
                                    marginBottom: index === 0 ? "0.5rem" : "0",
                                  }}
                                >
                                  {line}
                                </p>
                              ))
                          )}
                        </div>
                      )}

                      <h1
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-display font-bold text-white leading-tight animate-reveal-up"
                        style={{ animationDelay: "0.5s" }}
                      >
                        {slide.title}
                      </h1>

                      <h2
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-accent text-gold-premium italic animate-reveal-scale"
                        style={{ animationDelay: "0.7s" }}
                      >
                        {slide.subtitle}
                      </h2>

                      <p
                        className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 font-body leading-relaxed max-w-md lg:max-w-lg mx-auto lg:mx-0 animate-reveal-up"
                        style={{ animationDelay: "0.9s" }}
                      >
                        {slide.description}
                      </p>
                    </div>

                    <div
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center lg:justify-start pt-4 animate-reveal-up"
                      style={{ animationDelay: "1.1s" }}
                    >
                      <Button
                        size="lg"
                        className="text-background font-body font-medium px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
                        style={{
                          background: "linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light))",
                        }}
                        onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Découvrir le menu
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="glass-effect text-white hover:bg-white/10 font-body font-medium px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg rounded-xl transition-all duration-300 border-2 border-white/30 hover:border-white/60 w-full sm:w-auto hover:scale-105 bg-transparent"
                        onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                      >
                        Contact
                      </Button>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div
                    className={`flex-1 flex justify-center items-center relative order-1 lg:order-2 w-full max-w-md sm:max-w-lg lg:max-w-none ${
                      slides[index].id === 3 ? "lg:max-w-2xl xl:max-w-3xl" : ""
                    }`}
                  >
                    <div
                      className={`relative w-full flex items-center justify-center ${
                        slides[index].id === 3
                          ? "h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[32rem] 2xl:h-[36rem]"
                          : slides[index].id === 4
                            ? "h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem] 2xl:h-[36rem]"
                            : "h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 2xl:h-[28rem]"
                      }`}
                    >
                      {!loadedSlides.has(index) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-lg"></div>
                      )}
                      <div className="relative w-full h-full">
                        <Image
                          src={slide.image || "/placeholder.svg"}
                          alt={slide.title}
                          fill
                          className={`drop-shadow-2xl transform hover:scale-105 transition-all duration-700 ${
                            loadedSlides.has(index) ? "opacity-100" : "opacity-0"
                          } ${
                            slides[index].id === 4
                              ? "object-contain scale-125 sm:scale-110 lg:scale-100"
                              : "object-contain"
                          }`}
                          priority={index === 0}
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          onLoad={() => setLoadedSlides((prev) => new Set(prev).add(index))}
                        />
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute -top-4 sm:-top-8 lg:-top-12 -right-4 sm:-right-8 lg:-right-12 w-6 sm:w-12 lg:w-20 xl:w-28 h-6 sm:h-12 lg:h-20 xl:h-28 bg-gold/20 rounded-full blur-lg sm:blur-xl lg:blur-2xl animate-particle-dance"></div>
                      <div
                        className="absolute top-1/2 sm:top-1/3 lg:-bottom-8 -left-4 sm:-left-8 lg:-left-12 w-4 sm:w-8 lg:w-14 xl:w-20 h-4 sm:h-8 lg:h-14 xl:h-20 bg-teal/20 rounded-full blur-md sm:blur-lg lg:blur-xl animate-float-gentle"
                        style={{ animationDelay: "1s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Navigation Arrows - Fixed positioning to avoid text overlap */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 lg:left-6 xl:left-8 top-1/2 transform -translate-y-1/2 glass-effect p-2 sm:p-3 lg:p-4 rounded-full text-white hover:bg-white/20 transition-all duration-300 group z-30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-lg"
        aria-label="Previous slide"
        disabled={isTransitioning}
        style={{ marginLeft: "max(0.5rem, env(safe-area-inset-left))" }}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 lg:right-6 xl:right-8 top-1/2 transform -translate-y-1/2 glass-effect p-2 sm:p-3 lg:p-4 rounded-full text-white hover:bg-white/20 transition-all duration-300 group z-30 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50 shadow-lg"
        aria-label="Next slide"
        disabled={isTransitioning}
        style={{ marginRight: "max(0.5rem, env(safe-area-inset-right))" }}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Enhanced Carousel Dots - Pushed to the very bottom edge */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10 bg-black/30 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-3"
        style={{
          bottom: "0.40rem", // Very close to the bottom edge - 12px from bottom
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 ${
              index === currentSlide
                ? "bg-gold-premium scale-125 shadow-gold-glow"
                : "bg-white/40 hover:bg-white/60 hover:scale-110"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSection
