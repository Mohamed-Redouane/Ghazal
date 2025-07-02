"use client";
import { memo } from "react";
import { Sparkles } from "lucide-react";

const DIVIDER_CLASSES = "w-32 lg:w-40 h-px bg-gradient-to-r from-transparent via-gold to-transparent";
const SPARKLES_SIZE = "w-8 lg:w-10 h-8 lg:h-10";
const HEADING_SIZE = "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl";
const DESCRIPTION_SIZE = "text-lg sm:text-xl lg:text-2xl";

const MenuHeader = memo(() => {
  return (
    <header className="text-center mb-16 lg:mb-20 px-4">
      {/* Decorative divider */}
      <div 
        className="flex items-center justify-center mb-8 lg:mb-10"
        aria-hidden="true"
      >
        <div className={DIVIDER_CLASSES} />
        <div className="mx-6 lg:mx-8">
          <Sparkles 
            className={`${SPARKLES_SIZE} text-gold`} 
            aria-hidden="true"
          />
        </div>
        <div className={DIVIDER_CLASSES} />
      </div>
      
      {/* Content */}
      <section aria-labelledby="menu-heading">
        <h1 
          id="menu-heading"
          className={`${HEADING_SIZE} font-display font-bold text-cream mb-6 lg:mb-8 tracking-wide`}
        >
          Notre Menu
        </h1>
        <p className={`${DESCRIPTION_SIZE} text-cream/90 font-light max-w-4xl mx-auto leading-relaxed px-4`}>
          Une symphonie de saveurs authentiques et créatives,{" "}
          <span className="text-gold font-medium">
            orchestrée avec les plus beaux ingrédients
          </span>
        </p>
      </section>
    </header>
  );
});

MenuHeader.displayName = "MenuHeader";
export default MenuHeader;