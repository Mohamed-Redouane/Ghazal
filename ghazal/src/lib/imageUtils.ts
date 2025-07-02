// lib/imageUtils.ts
export const preloadImages = (src: string) => {
  if (typeof window === 'undefined') return;
  
  const img = new Image();
  img.src = src;
};

interface CategoryItem {
  image: string;
}

export const preloadCategoryImages = (categoryItems: CategoryItem[]) => {
  categoryItems.forEach(item => preloadImages(item.image));
};