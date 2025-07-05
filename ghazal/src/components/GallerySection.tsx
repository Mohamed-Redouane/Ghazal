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
    src: "/99.avif",
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

    const containerClasses = `group relative overflow-hidden rounded-3xl cursor-pointer bg-white/60 backdrop-blur-xl border border-emerald-200/50 shadow-lg hover:shadow-2xl transition-all ${HOVER_TRANSITION_DURATION} hover:scale-105 hover:-translate-y-2`
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
        style={{ animationDelay, animationFillMode: "forwards" }}
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
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={imageClasses}
            priority={priority}
            quality={85}
            onLoad={() => setIsLoading(false)}
          />

          <div className={overlayClasses} />
          <div className={contentClasses}>
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
            <div className="text-white">
              <h3 className="font-display font-semibold text-xl mb-2">{image.alt}</h3>
              <p className="text-sm opacity-90 font-body mb-3">{image.description}</p>
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
  }
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
  }) => {
    // 🔒 Lock scroll when modal is open
    useEffect(() => {
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = "auto"
      }
    }, [])

    return (
      <div
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xl"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Image agrandie"
      >
        <div
          className="relative max-w-6xl w-full h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain rounded-2xl"
            sizes="100vw"
            quality={95}
            priority
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-12 h-12 text-white bg-emerald-600/80 rounded-full flex items-center justify-center hover:bg-emerald-700 transition duration-300"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 bg-black/60 rounded-xl p-4 text-white backdrop-blur-xl">
            <h3 className="font-display font-semibold text-lg mb-1">{alt}</h3>
            <p className="text-sm opacity-80 font-body">Cliquez en dehors de l’image pour fermer</p>
          </div>
        </div>
      </div>
    )
  }
)

GalleryModal.displayName = "GalleryModal"

const GalleryHeader = memo(() => (
  <header className="text-center mb-16 lg:mb-20">
    <div className="flex items-center justify-center mb-8">
      <div className="w-20 lg:w-32 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
      <Camera className="w-10 lg:w-12 h-10 lg:h-12 text-teal-600 mx-6" />
      <h2 className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-700 bg-clip-text text-transparent mx-6">
        Galerie
      </h2>
      <Eye className="w-10 lg:w-12 h-10 lg:h-12 text-emerald-600 mx-6" />
      <div className="w-20 lg:w-32 h-px bg-gradient-to-l from-transparent via-emerald-500 to-transparent" />
    </div>
    <div className="w-40 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 mx-auto mb-8" />
    <p className="text-xl lg:text-2xl text-slate-600 font-body font-light max-w-4xl mx-auto leading-relaxed">
      Plongez dans l&apos;univers raffiné de Ghazal Restaurant à travers{" "}
      <span className="text-teal-600 font-medium">nos créations culinaires</span> et notre{" "}
      <span className="text-emerald-600 font-medium">ambiance élégante</span>
    </p>
  </header>
))

GalleryHeader.displayName = "GalleryHeader"

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    preloadImageBatch(GALLERY_IMAGES.map((img) => img.src), true)
  }, [])

  const handleSelectImage = useCallback((image: GalleryImage) => {
    setSelectedImage(image)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null)
  }, [])

  return (
    <section
      id="gallery"
      className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-300/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <GalleryHeader />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {GALLERY_IMAGES.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              priority={index < 3}
              onClick={() => handleSelectImage(image)}
            />
          ))}
        </div>

        {selectedImage && (
          <GalleryModal
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </section>
  )
}

export default GallerySection
