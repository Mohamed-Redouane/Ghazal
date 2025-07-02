// lib/imageUtils.ts
export const preloadImages = (src: string) => {
  if (typeof window === 'undefined') return;
  
  const img = new Image();
  img.src = src;
};

export const preloadCategoryImages = (categoryItems: any[]) => {
  categoryItems.forEach(item => preloadImages(item.image));
};