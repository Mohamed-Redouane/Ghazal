"use client";
import { useState } from "react";
import { Camera, Eye, Heart, ZoomIn } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=600&q=75",
      alt: "Intérieur raffiné du restaurant",
      category: "ambiance",
      description: "Atmosphère chaleureuse et élégante"
    },
    {
      src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=75",
      alt: "Plat signature gastronomique",
      category: "cuisine",
      description: "Créations culinaires d'exception"
    },
    {
      src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=75",
      alt: "Détail de décoration florale",
      category: "détails",
      description: "Attention portée aux moindres détails"
    },
    {
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=75",
      alt: "Présentation artistique d'un plat",
      category: "cuisine",
      description: "L'art de la présentation"
    },
    {
      src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=75",
      alt: "Vue sur la terrasse",
      category: "ambiance",
      description: "Espaces accueillants et raffinés"
    },
    {
      src: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=600&q=75",
      alt: "Création culinaire d'exception",
      category: "cuisine",
      description: "Excellence gastronomique"
    }
  ];

  const categories = [
    { id: "all", label: "Tout", icon: Camera },
    { id: "cuisine", label: "Cuisine", icon: Heart },
    { id: "ambiance", label: "Ambiance", icon: Eye },
    { id: "détails", label: "Détails", icon: ZoomIn }
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set(prev).add(index));
  };

  return (
    <section id="gallery" className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
      {/* Simplified Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 lg:w-32 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
            <Camera className="w-10 lg:w-12 h-10 lg:h-12 text-teal-600 mx-6" />
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-700 bg-clip-text text-transparent mx-6">
              Galerie
            </h2>
            <Eye className="w-10 lg:w-12 h-10 lg:h-12 text-emerald-600 mx-6" />
            <div className="w-20 lg:w-32 h-px bg-gradient-to-l from-transparent via-emerald-500 to-transparent"></div>
          </div>
          
          <div className="w-40 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 mx-auto mb-8"></div>
          
          <p className="text-xl lg:text-2xl text-slate-600 font-body font-light max-w-4xl mx-auto leading-relaxed">
            Plongez dans l'univers raffiné de Ghazal Restaurant à travers 
            <span className="text-teal-600 font-medium"> nos créations culinaires</span> et notre 
            <span className="text-emerald-600 font-medium"> ambiance élégante</span>
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-3 border border-emerald-200/50 shadow-xl">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`group flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                        : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-body font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Optimized Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl cursor-pointer bg-white/60 backdrop-blur-xl border border-emerald-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedImage(image.src)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative overflow-hidden">
                {!loadedImages.has(index) && !failedImages.has(index) && (
                  <Skeleton className="w-full h-80 bg-emerald-100" />
                )}
                
                {!failedImages.has(index) && (
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-80 object-cover transition-all duration-300 group-hover:scale-110 ${
                      loadedImages.has(index) ? 'opacity-100' : 'opacity-0 absolute inset-0'
                    }`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => handleImageLoad(index)}
                    onError={() => handleImageError(index)}
                  />
                )}
                
                {failedImages.has(index) && (
                  <div className="w-full h-80 bg-emerald-100 flex items-center justify-center">
                    <p className="text-slate-500">Image non disponible</p>
                  </div>
                )}
                
                {/* Simplified Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-xl">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                      <div className="w-12 h-12 bg-emerald-500/30 rounded-full flex items-center justify-center backdrop-blur-xl">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="text-white">
                      <h4 className="font-display font-semibold text-xl mb-2">{image.alt}</h4>
                      <p className="text-sm opacity-90 font-body mb-3">{image.description}</p>
                      <div className="w-20 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-6xl max-h-full">
              <img
                src={selectedImage}
                alt="Image agrandie"
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
                loading="lazy"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 w-12 h-12 text-white bg-emerald-600/80 rounded-full flex items-center justify-center hover:bg-emerald-700/90 transition-all duration-300"
              >
                <span className="sr-only">Fermer</span>
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
