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
  SPECIALITE: "Spécialité",
  CLASSIQUE: "Classique",
  VOLAILLE: "Volaille",
  VIANDE: "Viande",
  CHOCOLAT: "Chocolat",
  FRUITS: "Fruits",
  PATISSERIE: "Pâtisserie",
  CREPES: "Crêpes",
  VEGETARIEN: "Végétarien",
  POISSON: "Poisson",
  MILKSHAKE: "Milkshake",
} as const;

export const menuItems = {
  [CATEGORY_IDS.SANDWICHES]: [
    {
      name: "Wrap Signature Ghazal",
      description: "Double steak haché de bœuf premium, merguez artisanales, fromage fondu et sauce spéciale",
      price: "$32",
      image: "/19.avif",
      category: ITEM_CATEGORIES.SIGNATURE
    },
    {
      name: "Wrap Merguez Premium",
      description: "Merguez artisanales grillées, fromage cheddar, crudités fraîches et sauce harissa douce",
      price: "$24",
      image: "/20.avif",
      category: ITEM_CATEGORIES.SPECIALITE
    },
    {
      name: "Wrap Triple Steak",
      description: "Triple steak haché grillé, fromage cheddar, cornichons croquants et sauce barbecue",
      price: "$28",
      image: "/21.avif",
      category: ITEM_CATEGORIES.CLASSIQUE
    },
    {
      name: "Wrap Poulet Grillé",
      description: "Blanc de poulet mariné et grillé, fromage fondu, salade croquante et sauce à l'ail",
      price: "$22",
      image: "/22.avif",
      category: ITEM_CATEGORIES.VOLAILLE
    },
    {
      name: "Wrap Chicken Deluxe",
      description: "Escalope de poulet panée croustillante, fromche cheddar, avocat et sauce ranch",
      price: "$26", 
      image: "/23.avif",
      category: ITEM_CATEGORIES.VOLAILLE
    }
  ],
  [CATEGORY_IDS.TACOS]: [
    {
      name: "Wrap Mushroom Supreme",
      description: "Morceaux de poulet grillé, champignons sautés, fromage fondu et sauce crémeuse",
      price: "$24",
      image: "/11.avif",
      category: ITEM_CATEGORIES.SPECIALITE
    },
    {
      name: "Wrap Beef Royale",
      description: "Émincé de bœuf grillé, fromage cheddar fondu, oignons caramélisés et sauce barbecue",
      price: "$27",
      image: "/12.avif",
      category: ITEM_CATEGORIES.VIANDE
    },
    {
      name: "Taco de Bœuf Épicé",
      description: "Tortilla de maïs, bœuf haché épicé, fromage cheddar et guacamole",
      price: "$22",
      image: "/13.avif",
      category: ITEM_CATEGORIES.VIANDE
    }
  ],
  [CATEGORY_IDS.BURGERS]: [
    {
      name: "Burger Classique",
      description: "Pain brioché artisanal, steak haché de bœuf premium, fromage cheddar, salade, tomate et sauce maison",
      price: "$18",
      image: "/13.avif",
      category: ITEM_CATEGORIES.CLASSIQUE
    },
    {
      name: "Burger BBQ Bacon",
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
      category: ITEM_CATEGORIES.VOLAILLE
    },
    {
      name: "Veggie Burger",
      description: "Steak végétal aux légumes, fromage de chèvre, salade, tomate et sauce aux herbes",
      price: "$16",
      image: "/13.avif",
      category: ITEM_CATEGORIES.VEGETARIEN
    },
    {
      name: "Fish Burger",
      description: "Filet de poisson pané, salade iceberg, tomate, cornichons et sauce tartare maison",
      price: "$19",
      image: "/13.avif",
      category: ITEM_CATEGORIES.POISSON
    }
  ],
  [CATEGORY_IDS.CREPES]: [
    {
      name: "Gâteau au Chocolat Fondant",
      description: "Gâteau moelleux au chocolat noir, ganache onctueuse et décoration chocolat blanc",
      price: "$16",
      image: "/1.avif",
      category: ITEM_CATEGORIES.CHOCOLAT
    },
    {
      name: "Soufflé au Chocolat",
      description: "Soufflé léger au chocolat, cœur coulant et poudre de cacao",
      price: "$18",
      image: "/2.avif",
      category: ITEM_CATEGORIES.SIGNATURE
    },
    {
      name: "Tarte aux Fruits Rouges",
      description: "Pâte sablée, crème pâtissière vanille, fruits rouges frais et glaçage brillant",
      price: "$14",
      image: "/3.avif",
      category: ITEM_CATEGORIES.FRUITS
    },
    {
      name: "Éclair au Chocolat",
      description: "Pâte à choux dorée, crème pâtissière chocolat et glaçage chocolat brillant",
      price: "$12",
      image: "/4.avif",
      category: ITEM_CATEGORIES.PATISSERIE
    },
    {
      name: "Religieuse Café",
      description: "Choux garnis de crème au café, glaçage fondant et décoration traditionnelle",
      price: "$16",
      image: "/5.avif",
      category: ITEM_CATEGORIES.PATISSERIE
    },
    {
      name: "Fondant au Chocolat",
      description: "Moelleux au chocolat noir, cœur coulant et glace vanille",
      price: "$15",
      image: "/6.avif",
      category: ITEM_CATEGORIES.CHOCOLAT
    },
    {
      name: "Tarte Citron Meringuée",
      description: "Pâte sablée, crème citron acidulée et meringue française dorée",
      price: "$13",
      image: "/7.avif",
      category: ITEM_CATEGORIES.CLASSIQUE
    },
    {
      name: "Crêpes au Chocolat",
      description: "Crêpes fines garnies de pâte à tartiner chocolat, chantilly et biscuits croquants",
      price: "$11",
      image: "/8.avif",
      category: ITEM_CATEGORIES.CREPES
    },
    {
      name: "Crêpes aux Amandes",
      description: "Crêpes garnies de crème d'amande, poudre d'amandes et miel",
      price: "$12",
      image: "/9.avif",
      category: ITEM_CATEGORIES.CREPES
    },
    {
      name: "Crêpes Oreo",
      description: "Crêpes garnies de crème chocolat Oreo, chantilly et éclats de biscuits",
      price: "$13",
      image: "/10.avif",
      category: ITEM_CATEGORIES.CREPES
    }
  ],
  [CATEGORY_IDS.MILKSHAKES]: [
    {
      name: "Milkshake Fraise",
      description: "Milkshake onctueux à la fraise fraîche, chantilly et sirop de fraise",
      price: "$12",
      image: "/14.avif",
      category: ITEM_CATEGORIES.MILKSHAKE
    },
    {
      name: "Milkshake Chocolat",
      description: "Milkshake au chocolat belge, chantilly généreuse et copeaux de chocolat",
      price: "$12",
      image: "/15.avif", // Fixed double slash
      category: ITEM_CATEGORIES.MILKSHAKE
    },
    {
      name: "Milkshake Vanille",
      description: "Milkshake à la vanille Madagascar, chantilly et essence de vanille naturelle",
      price: "$11",
      image: "/16.avif",
      category: ITEM_CATEGORIES.MILKSHAKE
    },
    {
      name: "Milkshake Caramel",
      description: "Milkshake au caramel beurre salé, chantilly et éclats de caramel croquant",
      price: "$13",
      image: "/17.avif",
      category: ITEM_CATEGORIES.MILKSHAKE
    },
    {
      name: "Milkshake Oreo",
      description: "Milkshake à la vanille avec biscuits Oreo mixés, chantilly et décoration Oreo",
      price: "$14",
      image: "/18.avif",
      category: ITEM_CATEGORIES.MILKSHAKE
    }
  ]
} as const;

export const categories: MenuCategory[] = Object.entries(CATEGORY_LABELS).map(([id, label]) => ({
  id,
  label
}));