"use client";
import { memo, useMemo } from "react";

interface MenuCategory {
  id: string;
  label: string;
}

interface MenuCategoryButtonProps {
  category: MenuCategory;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
}

const BUTTON_BASE_CLASSES = [
  "relative",
  "px-4 sm:px-6 lg:px-8",
  "py-3 sm:py-4",
  "rounded-full",
  "transition-all duration-300",
  "whitespace-nowrap",
  "text-sm sm:text-base lg:text-lg",
  "font-display font-semibold",
  "tracking-wide",
  "transform hover:scale-105",
  "will-change-transform",
  "backface-hidden",
  "translate-z-0"
];

const ACTIVE_CLASSES = [
  "bg-gold",
  "text-charcoal",
  "shadow-lg"
];

const INACTIVE_CLASSES = [
  "text-cream/90",
  "hover:text-cream",
  "hover:bg-gold/20"
];

const MenuCategoryButton = memo(({
  category,
  isActive,
  onClick,
  onHover
}: MenuCategoryButtonProps) => {
  const buttonClasses = useMemo(() => [
    ...BUTTON_BASE_CLASSES,
    ...(isActive ? ACTIVE_CLASSES : INACTIVE_CLASSES)
  ].join(" "), [isActive]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={onHover}
      className={buttonClasses}
      aria-pressed={isActive}
      aria-label={`${category.label} category`}
    >
      {category.label}
      
      {isActive && (
        <span 
          className="absolute -top-1 -right-1 w-3 h-3 bg-gold-light rounded-full will-change-transform"
          aria-hidden="true"
        />
      )}
    </button>
  );
});

MenuCategoryButton.displayName = 'MenuCategoryButton';
export default MenuCategoryButton;