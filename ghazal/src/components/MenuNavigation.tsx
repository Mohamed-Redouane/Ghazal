"use client";
import { memo, useCallback } from "react";
import MenuCategoryButton from "./MenuCategoryButton";
import { preloadCategoryImages } from "@/lib/imageUtils";
import { menuItems } from "../data/menuData";

interface MenuCategory {
  id: string;
  label: string;
}

interface MenuNavigationProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const MenuNavigation = memo(({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: MenuNavigationProps) => {
  
  const handleCategoryClick = useCallback((categoryId: string) => {
    onCategoryChange(categoryId);
  }, [onCategoryChange]);

  const handleCategoryHover = useCallback((categoryId: string) => {
    preloadCategoryImages(menuItems[categoryId] || []);
  }, []);

  return (
    <nav 
      className="flex justify-center mb-16 lg:mb-20 px-4"
      aria-label="Menu categories navigation"
    >
      <div className="relative w-full max-w-4xl">
        <div 
          className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm rounded-full border border-gold/20 shadow-lg will-change-transform"
          aria-hidden="true"
        />
        
        <div className="relative z-10 flex flex-wrap gap-2 sm:gap-3 justify-center p-3 sm:p-4">
          {categories.map((category) => (
            <MenuCategoryButton
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
              onHover={() => handleCategoryHover(category.id)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
});

MenuNavigation.displayName = 'MenuNavigation';
export default MenuNavigation;