"use client";
import { memo } from "react";
import Image from "next/image";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

interface MenuItemProps {
  item: MenuItem;
  index: number;
  priority?: boolean;
}

const MILKSHAKE_CATEGORY = "Milkshake";

const MenuItem = memo(({ item, priority = false }: MenuItemProps) => {
  const isMilkshake = item.category === MILKSHAKE_CATEGORY;
  
  return (
    <article className="group will-change-auto translate-z-0">
      <div className="relative mb-4">
        <div 
          className={`relative w-full overflow-hidden rounded-lg ${
            isMilkshake 
              ? "aspect-[3/4] max-w-xs mx-auto" 
              : "aspect-[4/3]"
          }`}
        >
          <Image
            src={item.image}
            alt={`${item.name} - ${item.category}`}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            quality={85}
          />
        </div>
      </div>
      
      <div className="text-center space-y-3">
        <h3 className="text-xl lg:text-2xl font-display font-bold text-cream">
          {item.name}
        </h3>
        <p className="text-cream/90 font-light leading-relaxed text-sm lg:text-base max-w-xl mx-auto">
          {item.description}
        </p>
        <div 
          className="inline-flex items-center text-teal-light px-3 py-1 text-sm font-medium rounded-full bg-teal/20 border border-teal/30"
          aria-label={`Category: ${item.category}`}
        >
          <span className="w-2 h-2 bg-teal-light rounded-full mr-2" aria-hidden="true"></span>
          {item.category}
        </div>
      </div>
    </article>
  );
});

MenuItem.displayName = "MenuItem";
export default MenuItem;