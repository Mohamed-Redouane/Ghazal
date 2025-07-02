"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import MenuHeader from "./MenuHeader";
import MenuItem from "./MenuItem";
import MenuNavigation from "./MenuNavigation";
import { menuItems, categories, CATEGORY_IDS } from "../data/menuData";
import { preloadImages } from "@/lib/imageUtils";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORY_IDS.SANDWICHES);
  
  // Preload all category images on mount
  useEffect(() => {
    Object.values(menuItems).flat().forEach(item => {
      preloadImages(item.image);
    });
  }, []);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  return (
    <section
      id="menu"
      className="py-16 lg:py-24 bg-gradient-to-br from-teal-dark via-charcoal to-teal-dark will-change-auto translate-z-0"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <MenuHeader />
        
        <MenuNavigation
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        {/* Optimized category container */}
        <div className="relative">
          {Object.entries(menuItems).map(([categoryId, items]) => (
            <div
              key={categoryId}
              className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 lg:gap-16 xl:gap-20 transition-opacity duration-300 ${
                activeCategory === categoryId 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 absolute inset-0 z-0 pointer-events-none'
              }`}
            >
              {items.map((item, index) => (
                <MenuItem 
                  key={`${categoryId}-${item.name}-${index}`}
                  item={item} 
                  index={index}
                  priority={index < 3} // Prioritize first 3 items
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;