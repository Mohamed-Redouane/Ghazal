"use client";
import { memo } from "react";
import { Sparkles } from "lucide-react";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

const ANIMATION_DELAY_FACTOR = 0.15;
const FLOATING_ELEMENT_DELAY = '0.5s';

const MenuCard = memo(({ item, index }: MenuCardProps) => {
  const isReversed = index % 2 !== 0;
  const animationDelay = `${index * ANIMATION_DELAY_FACTOR}s`;
  
  // Precompute layout classes
  const layoutClass = isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row';
  const textAlignmentClass = isReversed ? 'lg:text-right' : 'lg:text-left';
  const dividerAlignmentClass = isReversed ? 'lg:ml-auto lg:mr-0' : 'lg:ml-0';
  const sparklesAlignmentClass = isReversed ? 'lg:justify-end' : 'lg:justify-start';

  return (
    <div 
      className="group opacity-0 animate-fade-in"
      style={{ 
        animationDelay,
        animationFillMode: 'forwards' 
      }}
    >
      <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-12 ${layoutClass}`}>
        {/* Image Container */}
        <div className="relative w-full lg:w-80 xl:w-96 h-64 lg:h-80 flex-shrink-0 overflow-hidden rounded-2xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          
          {/* Overlays */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
            aria-hidden="true"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-teal/10 opacity-50" 
            aria-hidden="true"
          />
          
          {/* Price Badge */}
          <div className="absolute top-4 lg:top-6 right-4 lg:right-6">
            <div 
              className="glass-effect bg-charcoal/90 text-gold px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl font-display font-bold text-lg lg:text-xl border border-gold/30 shadow-gold-glow backdrop-blur-xl"
              aria-hidden="true"
            >
              {item.price}
            </div>
          </div>

          {/* Floating Elements */}
          <div 
            className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 w-3 lg:w-4 h-3 lg:h-4 bg-gold/60 rounded-full animate-float-gentle opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
            aria-hidden="true"
          />
          <div 
            className="absolute top-1/3 left-6 lg:left-8 w-2 h-2 bg-cream/40 rounded-full animate-float-gentle opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
            style={{ animationDelay: FLOATING_ELEMENT_DELAY }} 
            aria-hidden="true"
          />
        </div>

        {/* Content Container */}
        <div className={`flex-1 space-y-4 lg:space-y-6 text-center lg:text-left ${textAlignmentClass}`}>
          <div>
            <h3 
              className="text-2xl lg:text-4xl xl:text-5xl font-display font-bold text-cream mb-4 lg:mb-6 group-hover:text-gold transition-colors duration-500 leading-tight"
            >
              {item.name}
            </h3>
            
            <div 
              className={`w-16 lg:w-24 h-0.5 lg:h-1 bg-gradient-to-r from-gold to-gold/50 mb-4 lg:mb-6 mx-auto lg:mx-0 ${dividerAlignmentClass} group-hover:w-20 lg:group-hover:w-32 transition-all duration-700`}
              aria-hidden="true"
            />
          </div>
          
          <p className="text-cream/90 font-light leading-relaxed text-lg lg:text-xl xl:text-2xl max-w-2xl mx-auto lg:mx-0">
            {item.description}
          </p>

          {/* Decorative Line */}
          <div 
            className={`flex items-center mt-6 lg:mt-8 justify-center ${sparklesAlignmentClass}`}
            aria-hidden="true"
          >
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div 
                className="w-0 h-px bg-gold group-hover:w-12 lg:group-hover:w-16 transition-all duration-700" 
                aria-hidden="true"
              />
              <Sparkles 
                className="w-4 lg:w-5 h-4 lg:h-5 text-gold/70 animate-pulse" 
                aria-hidden="true"
              />
              <div 
                className="w-0 h-px bg-gold group-hover:w-12 lg:group-hover:w-16 transition-all duration-700" 
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

MenuCard.displayName = 'MenuCard';
export default MenuCard;