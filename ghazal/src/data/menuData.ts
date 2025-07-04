export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export interface MenuCategory {
  id: string;
  label: string;
}

export const CATEGORY_IDS = {
  SANDWICHES: "sandwiches",
  TACOS: "tacos",
  BURGERS: "burgers",
  CREPES: "crepes",
  MILKSHAKES: "milkshakes",
} as const;

export const CATEGORY_LABELS = {
  [CATEGORY_IDS.SANDWICHES]: "Sandwiches",
  [CATEGORY_IDS.TACOS]: "Tacos",
  [CATEGORY_IDS.BURGERS]: "Burgers",
  [CATEGORY_IDS.CREPES]: "Crêpes",
  [CATEGORY_IDS.MILKSHAKES]: "Milkshakes",
} as const;

export const ITEM_CATEGORIES = {
  SIGNATURE: "Signature",
  CLASSIC: "Classic",
  CHICKEN: "Chicken",
  BEEF: "Beef",
  MERGUEZ: "Merguez",
  MIXED: "Mixed",
  VEGETARIAN: "Vegetarian",
  FISH: "Fish",
  CHOCOLATE: "Chocolate",
  FRUITY: "Fruity",
  NUTTY: "Nutty",
  PATISSERIE: "Pâtisserie",
  BRAND_SPECIAL: "Brand Special",
  FLAVORED: "Flavored",
  COOKIE: "Cookie",
  GOURMET: "Gourmet",
  MILKSHAKE: "Milkshake",
} as const;

export const menuItems = {
  [CATEGORY_IDS.SANDWICHES]: [

    {
      name: "Sandwich Classique Poulet",
      description: "Pain maison, filet de poulet grillé, fromage fondu, garniture fraîche et sauce au choix",
      price: "$28",
      image: "/Poulet-com.avif",
      category: ITEM_CATEGORIES.CHICKEN
    },
    {
      name: "Sandwich Classique Kefta",
      description: "Pain maison, kefta épicée grillée, cheddar fondu, garniture fraîche et sauce au choix",
      price: "$32",
      image: "/kefta.avif",
      category: ITEM_CATEGORIES.BEEF
    },
    {
      name: "Sandwich Classique Merguez",
      description: "Pain maison, merguez grillée, fromage fondu, garniture fraîche et sauce au choix",
      price: "$26", 
      image: "/23.avif",
      category: ITEM_CATEGORIES.MERGUEZ
    },
   {
      name: "Sandwich Ghazal",
      description: "Pain maison, deux viandes au choix (poulet, kefta, merguez), double fromage, garniture fraîche et sauce au choix",
      price: "$26", 
      image: "/19.avif",
      category: ITEM_CATEGORIES.MIXED
    },
    {
      name: "Sandwich Ultra Ghazal",
      description: "Pain maison, mixte de viandes (poulet, kefta, merguez), trois fromages, garniture fraîche et sauce au choix",
      price: "$32",
      image: "/20.avif",
      category: ITEM_CATEGORIES.SIGNATURE
    },

    
  ],
  [CATEGORY_IDS.TACOS]: [
    {
      name: "Tacos Poulet",
      description: "Poulet grillé aux epices et herbes, accompagné de frites et de sauce fromagère et algérienne",
      price: "$24",
      image: "/Tacos.avif",
      category: ITEM_CATEGORIES.CHICKEN
    },
      {
      name: "Tacos Merguez",
      description: "Merguez grillée aux épices et herbes, accompagnée de frites et de sauce fromagère et algérienne",
      price: "$22",
      image: "/Tacos-merguez.avif",
      category: ITEM_CATEGORIES.MERGUEZ
    },
    {
      name: "Tacos Viande",
      description: "Viande hachée grillée aux épices et herbes, accompagnée de frites et de sauce fromagère et algérienne",
      price: "$27",
      image: "/Tacos-viande.avif",
      category: ITEM_CATEGORIES.BEEF
    },
  
    {
      name: "Tacos XL",
      description: "Tacos en grand format, extra large, avec votre choix de viande (poulet, viande hachée, merguez), frites et sauce fromagère et algérienne",
      price: "$30",
      image: "/XL.avif",
      category: ITEM_CATEGORIES.SIGNATURE
    }
  ],
  [CATEGORY_IDS.BURGERS]: [
    {
      name: "Burger Classique",
      description: "Pain brioché artisanal, steak haché de bœuf premium, fromage cheddar, salade, tomate et sauce maison",
      price: "$18",
      image: "/13.avif",
      category: ITEM_CATEGORIES.CLASSIC
    },
    {
      name: "Burger BBQ",
      description: "Double steak de bœuf, bacon croustillant, fromage fumé, oignons frits et sauce barbecue",
      price: "$24",
      image: "/13.avif",
      category: ITEM_CATEGORIES.SIGNATURE
    },
    {
      name: "Chicken Burger",
      description: "Escalope de poulet grillée, avocat, salade croquante, tomate et sauce à l'ail",
      price: "$20",
      image: "/13.avif",
      category: ITEM_CATEGORIES.CHICKEN
    },
    {
      name: "Veggie Burger",
      description: "Steak végétal aux légumes, fromage de chèvre, salade, tomate et sauce aux herbes",
      price: "$16",
      image: "/13.avif",
      category: ITEM_CATEGORIES.VEGETARIAN
    },
    {
      name: "Fish Burger",
      description: "Filet de poisson pané, salade iceberg, tomate, cornichons et sauce tartare maison",
      price: "$19",
      image: "/13.avif",
      category: ITEM_CATEGORIES.FISH
    }
  ],
  [CATEGORY_IDS.CREPES]: [
     {
      name: "Croustillante Nutella Chocolat",
      description: "Crêpes croustillantes garnies de Nutella",
      price: "$12",
      image: "/9.avif",
      category: ITEM_CATEGORIES.CHOCOLATE
    },
    {
      name: "Croustillante Fraise",
      description: "Crêpes croustillantes garnies de fraises fraîches et Nutella",
      price: "$13",
      image: "/7.avif",
      category: ITEM_CATEGORIES.FRUITY
    },
      {
      name: "Croustillante Banane",
      description: "Crêpes croustillantes garnies de bananes et Nutella",
      price: "$11",
      image: "/8.avif",
      category: ITEM_CATEGORIES.FRUITY
    },
     {
      name: "Croustillante Dubai",
      description: "Servi avec pistaches et kunafa",
      price: "$16",
      image: "/1.avif",
      category: ITEM_CATEGORIES.NUTTY
    },
    {
      name: "Croustillante Fruity",
      description: "Crêpes croustillantes garnies de fruits 3 choisis et Nutella",
      price: "$14",
      image: "/99.avif",
      category: ITEM_CATEGORIES.FRUITY
    },
   
   
    {
      name: "Croustillante Noix",
      description: "Crêpes croustillantes garnies de amandes, noix de grenoble, pistaches et Nutella",
      price: "$12",
      image: "/4.avif",
      category: ITEM_CATEGORIES.NUTTY
    },
    {
      name: " GHAZAL Croustillante",
      description: "Crêpes croustillantes garnies avec 5 ingrédients au choix",
      price: "$15",
      image: "/6.avif",
      category: ITEM_CATEGORIES.BRAND_SPECIAL
    },
    {
      name: "Croustillante Spéciale Ferrero Rocher",
      description: "Crêpes croustillantes garnies de Ferrero Rocher et Nutella",
      price: "$18",
      image: "/2.avif",
      category: ITEM_CATEGORIES.SIGNATURE
    },
    {
      name: "Croustillante Speciale KitKat",
      description: "Crêpes croustillantes garnies de KitKat et Nutella",
      price: "$14",
      image: "/3.avif",
      category: ITEM_CATEGORIES.BRAND_SPECIAL
    },
    
    {
      name: "Croustillante Spéciale Oreo",
      description: "Crêpes croustillantes garnies de biscuits Oreo et Nutella",
      price: "$16",
      image: "/ORE.avif",
      category: ITEM_CATEGORIES.BRAND_SPECIAL
    },
    
    
  
    {
      name: "Croustillante Spéciale Kinder Bueno",
      description: "Crêpes croustillantes garnies de Kinder Bueno et Nutella",
      price: "$13",
      image: "/10.avif",
      category: ITEM_CATEGORIES.BRAND_SPECIAL
    }
  ],
  [CATEGORY_IDS.MILKSHAKES]: [
    {
      name: "Milkshake Bueno",
      description: "Milkshake au Kinder Bueno, chantilly et éclats de Kinder",
      price: "$12",
      image: "/B.avif",
      category: ITEM_CATEGORIES.MILKSHAKE
    },
    {
      name: "Milkshake Fraise",
      description: "Milkshake à la fraise fraîche, chantilly et coulis de fraise",
      price: "$12",
      image: "/F.avif", 
      category: ITEM_CATEGORIES.MILKSHAKE
    },
    {
      name: "Milkshake Ghazal",
      description: "Milkshake signature avec mélange d'avocat, dattes, lait frappé et chantilly",
      price: "$11",
      image: "/G.avif",
      category: ITEM_CATEGORIES.MILKSHAKE
    },
    {
      name: "Milkshake Oreo",
      description: "Milkshake à la vanille avec biscuits Oreo mixés, chantilly et décoration Oreo",
      price: "$13",
      image: "/O.avif",
      category: ITEM_CATEGORIES.MILKSHAKE
    },
    {
      name: "Milkshake Nutella",
      description: "Milkshake au Nutella, chantilly et éclats de noisettes",
      price: "$14",
      image: "/N.avif",
      category: ITEM_CATEGORIES.MILKSHAKE
    },
     {
      name: "Milkshake KitKat",
      description: "Milkshake au KitKat, chantilly et morceaux de KitKat",
      price: "$14",
      image: "/K.avif",
      category: ITEM_CATEGORIES.MILKSHAKE
    }
  ]
} as const;

export const categories: MenuCategory[] = Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
  id,
  label
}));