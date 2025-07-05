// Image preloading utility
export const preloadImages = (src: string) => {
  if (typeof window === "undefined") return
  const img = new Image()
  img.src = src
}

interface CategoryItem {
  image: string
}

export const preloadCategoryImages = (categoryItems: CategoryItem[]) => {
  categoryItems.forEach((item) => preloadImages(item.image))
}

// Add batch preloading function for gallery
export const preloadImageBatch = (images: string[], priority = false) => {
  if (typeof window === "undefined") return
  images.forEach((src, index) => {
    const img = new Image()
    img.src = src
    // Set loading priority for first few images
    if (priority && index < 3) {
      // Type assertion for the loading property
      ;(img as HTMLImageElement & { loading: string }).loading = "eager"
    }
  })
}
