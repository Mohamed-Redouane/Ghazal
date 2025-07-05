"use client"

import { useState, useEffect, useCallback, memo } from "react"
import Image from "next/image"
import { Camera, Eye, X } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { preloadImageBatch } from "@/lib/imageUtils"

// Types
type GalleryImage = {
  id: string
  src: string
  alt: string
  description: string
}

// Constants
const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "1",
    src: "/1.avif",
    alt: "Intérieur raffiné du restaurant Ghazal",
    description: "Atmosphère chaleureuse et élégante",
  },
  {
    id: "2",
    src: "/2.avif",
    alt: "Plat signature gastronomique",
    description: "Créations culinaires d'exception",
  },
  {
    id: "3",
    src: "/3.avif",
    alt: "Ambiance authentique du restaurant",
    description: "Attention portée aux moindres détails",
  },
  {
    id: "4",
    src: "/4.avif",
    alt: "Présentation artistique d'un plat",
    description: "L'art de la présentation culinaire",
  },
  {
    id: "5",
    src: "/5.avif",
    alt: "Espace accueillant du restaurant",
    description: "Espaces accueillants et raffinés",
  },
]

// Animation constants
const ANIMATION_DELAY_FACTOR = 0.15
const HOVER_TRANSITION_DURATION = "duration-500"
const SCALE_TRANSITION_DURATION = "duration-700"

// Sub-components
const GalleryItem = memo(
  ({
    image,
    onClick,
    index,
    priority = false,
  }: {
    image: GalleryImage
    onClick: () => void
    index: number
    priority?: boolean
  }) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const animationDelay = `${index * ANIMATION_DELAY_FACTOR}s`

    // Precompute classes for performance
    const containerClasses = `group relative overflow-hidden rounded-3xl cursor-pointer bg-white/60 backdrop-blur-xl border border-emerald-200/50 shadow-lg hover:shadow-2xl transition-all ${HOVER_TRANSITION_DURATION} hover:scale-105 hover:-translate-y-2 will-change-auto translate-z-0`

    const imageClasses = `object-cover transition-all ${SCALE_TRANSITION_DURATION} group-hover:scale-110 ${
      isLoading ? "opacity-0" : "opacity-100"
    }`

    const overlayClasses = `absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent transition-opacity ${HOVER_TRANSITION_DURATION} ${
      isHovered ? "opacity-100" : "opacity-60"
    }`

    const contentClasses = `absolute inset-0 flex flex-col justify-between p-6 transition-all ${HOVER_TRANSITION_DURATION} ${
      isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-80"
    }`

    return (
      <article
        className={`opacity-0 animate-fade-in ${containerClasses}`}
        style={{
          animationDelay,
          animationFillMode: "forwards",
        }}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Voir l'image: ${image.alt}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        <div className="relative overflow-hidden aspect-square">
          {isLoading && <Skeleton className="w-full h-full bg-emerald-100 absolute inset-0 z-10" />}

          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={imageClasses}
            priority={priority}
            quality={85}
            onLoad={() => setIsLoading(false)}
          />

          {/* Gradient Overlay */}
          <div className={overlayClasses} aria-hidden="true" />

          {/* Content Overlay */}
          <div className={contentClasses}>
            {/* Top Icons */}
            <div className="flex justify-between items-start">
              <div
                className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-300 ${
                  isHovered ? "scale-110 bg-white/30" : ""
                }`}
              >
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div
                className={`w-12 h-12 bg-emerald-500/30 rounded-full flex items-center justify-center backdrop-blur-xl transition-all duration-300 ${
                  isHovered ? "scale-110 bg-emerald-500/50" : ""
                }`}
              >
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Bottom Content */}
            <div className="text-white">
              <h3 className="font-display font-semibold text-xl mb-2 leading-tight">{image.alt}</h3>
              <p className="text-sm opacity-90 font-body mb-3 leading-relaxed">{image.description}</p>
              <div
                className={`h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 transition-all ${HOVER_TRANSITION_DURATION} ${
                  isHovered ? "w-24" : "w-16"
                }`}
              />
            </div>
          </div>
        </div>
      </article>
    )
  },
)

GalleryItem.displayName = "GalleryItem"

const GalleryModal = memo(
  ({
    src,
    alt,
    onClose,
  }: {
    src: string
    alt: string
    onClose: () => void
  }) => (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image agrandie"
    >
      <div className="relative max-w-7xl max-h-full w-full">
        <div className="relative w-full h-[80vh]">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            fill
            sizes="100vw"
            className="object-contain rounded-2xl"
            quality={95}
            priority
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 text-white bg-emerald-600/80 rounded-full flex items-center justify-center hover:bg-emerald-700/90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white backdrop-blur-xl"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Info */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-xl rounded-xl p-4 text-white">
          <h3 className="font-display font-semibold text-lg mb-1">{alt}</h3>
          <p className="text-sm opacity-80 font-body">Cliquez n&apos;importe où pour fermer</p>
        </div>
      </div>
    </div>
  ),
)

GalleryModal.displayName = "GalleryModal"

const GalleryHeader = memo(() => (
  <header className="text-center mb-16 lg:mb-20">
    <div className="flex items-center justify-center mb-8">
      <div
        className="w-20 lg:w-32 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
        aria-hidden="true"
      />
      <Camera className="w-10 lg:w-12 h-10 lg:h-12 text-teal-600 mx-6" aria-hidden="true" />
      <h2
        id="gallery-heading"
        className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-700 bg-clip-text text-transparent mx-6"
      >
        Galerie
      </h2>
      <Eye className="w-10 lg:w-12 h-10 lg:h-12 text-emerald-600 mx-6" aria-hidden="true" />
      <div
        className="w-20 lg:w-32 h-px bg-gradient-to-l from-transparent via-emerald-500 to-transparent"
        aria-hidden="true"
      />
    </div>

    <div
      className="w-40 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 mx-auto mb-8"
      aria-hidden="true"
    />

    <p className="text-xl lg:text-2xl text-slate-600 font-body font-light max-w-4xl mx-auto leading-relaxed">
      Plongez dans l&apos;univers raffiné de Ghazal Restaurant à travers{" "}
      <span className="text-teal-600 font-medium">nos créations culinaires</span> et notre{" "}
      <span className="text-emerald-600 font-medium">ambiance élégante</span>
    </p>
  </header>
))

GalleryHeader.displayName = "GalleryHeader"

// Main Component
const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  // Preload all gallery images on mount for super fast loading
  useEffect(() => {
    const imageSources = GALLERY_IMAGES.map((image) => image.src)
    preloadImageBatch(imageSources, true)
  }, [])

  const handleSelectImage = useCallback((image: GalleryImage) => {
    setSelectedImage(image)
    // Track image view in analytics
    console.log("Image viewed:", image.id)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  return (
    <section
      id="gallery"
      className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden will-change-auto translate-z-0"
      aria-labelledby="gallery-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-300/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <GalleryHeader />

        {/* Optimized Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              priority={index < 3} // Prioritize first 3 images
              onClick={() => handleSelectImage(image)}
            />
          ))}
        </div>

        {/* Modal */}
        {selectedImage && <GalleryModal src={selectedImage.src} alt={selectedImage.alt} onClose={handleCloseModal} />}
      </div>
    </section>
  )
}

export default GallerySection