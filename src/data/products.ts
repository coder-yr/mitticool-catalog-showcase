import blackSpade from "@/assets/p-black-spade.jpg";
import dancingDoll from "@/assets/p-dancing-doll.jpg";
import lantern from "@/assets/p-lantern.jpg";
import rockingHorse from "@/assets/p-rocking-horse.jpg";
import peacock from "@/assets/p-peacock.jpg";
import handi from "@/assets/p-handi.jpg";
import biryani from "@/assets/p-biryani.jpg";
import kadai from "@/assets/p-kadai.jpg";
import frypan from "@/assets/p-frypan.jpg";
import bottle from "@/assets/p-bottle.jpg";
import glasses from "@/assets/p-glasses.jpg";
import bowls from "@/assets/p-bowls.jpg";

export type Category = "Water Pots" | "Kitchen" | "Drinkware";

export interface Product {
  slug: string;
  name: string;
  category: Category;
  capacities: string[];
  tag: string;
  image: string;
  description: string;
  features: string[];
  featured?: boolean;
}

export const products: Product[] = [
  {
    slug: "black-spade",
    name: "Black Spade",
    category: "Water Pots",
    capacities: ["6.5L", "11L", "13L"],
    tag: "Natural Cooling",
    image: blackSpade,
    description:
      "A modern take on the traditional matki, finished in a smoke-fired matte black. The Black Spade cools water naturally and makes a statement on any countertop.",
    features: [
      "Hand-thrown from natural river clay",
      "Smoke-fired matte black finish",
      "Keeps water 8–10°C below room temperature",
      "Chemical-free and 100% biodegradable",
    ],
    featured: true,
  },
  {
    slug: "dancing-doll",
    name: "Dancing Doll",
    category: "Water Pots",
    capacities: ["8L"],
    tag: "Artisan Crafted",
    image: dancingDoll,
    description:
      "Inspired by folk terracotta figurines of Gujarat, the Dancing Doll pot is as much sculpture as it is everyday vessel.",
    features: [
      "Hand-carved relief detailing",
      "Traditional Gujarati motifs",
      "Naturally cools water",
      "Unique — no two are identical",
    ],
    featured: true,
  },
  {
    slug: "lantern-design",
    name: "Lantern Design",
    category: "Water Pots",
    capacities: ["10L"],
    tag: "Keeps Water Cool",
    image: lantern,
    description:
      "Geometric cutouts give this pot its lantern-like silhouette while letting the clay breathe and keep water cool.",
    features: [
      "Breathable clay construction",
      "Geometric relief carving",
      "Ideal centerpiece pot",
      "Food-safe natural clay",
    ],
    featured: true,
  },
  {
    slug: "rocking-horse",
    name: "Rocking Horse",
    category: "Water Pots",
    capacities: ["9L"],
    tag: "Heritage Design",
    image: rockingHorse,
    description:
      "A nostalgic form resting on a hand-moulded rocking horse base. A collector's piece that still works beautifully.",
    features: [
      "Sculptural rocking horse base",
      "Two-tone natural finish",
      "Hand-moulded in small batches",
      "Keeps water cool for hours",
    ],
  },
  {
    slug: "royal-peacock",
    name: "Royal Peacock",
    category: "Water Pots",
    capacities: ["12L", "16L"],
    tag: "Royal Collection",
    image: peacock,
    description:
      "Deep relief peacock motifs curl around a generous body — a ceremonial piece rooted in Mughal-era pottery.",
    features: [
      "Deep-carved peacock relief",
      "Large family-size capacity",
      "Ornate lid included",
      "Natural terracotta finish",
    ],
    featured: true,
  },
  {
    slug: "handi",
    name: "Clay Handi",
    category: "Kitchen",
    capacities: ["1.5L", "2.5L"],
    tag: "Slow Cooking",
    image: handi,
    description:
      "The original slow cooker. Our clay handi enhances flavour, retains nutrients, and adds an earthy note to every dish.",
    features: [
      "Unglazed food-safe clay",
      "Retains flavour and nutrients",
      "Safe on gas and open flame",
      "Perfect for curries and dals",
    ],
    featured: true,
  },
  {
    slug: "biryani-pot",
    name: "Biryani Pot",
    category: "Kitchen",
    capacities: ["3L", "5L"],
    tag: "Dum Cooking",
    image: biryani,
    description:
      "Wide-bellied and sealed tight, this pot is built for the slow dum cooking that makes biryani unforgettable.",
    features: [
      "Wide body for even layering",
      "Tight-fitting clay lid",
      "Enhances aroma and flavour",
      "Hand-thrown craftsmanship",
    ],
  },
  {
    slug: "kadai",
    name: "Clay Kadai",
    category: "Kitchen",
    capacities: ["1L", "2L"],
    tag: "Everyday Cooking",
    image: kadai,
    description:
      "A sleek matte-finish kadai for sabzis, stir-fries, and quick sautés — the clay adds depth you can taste.",
    features: [
      "Matte smoke-fired finish",
      "Ergonomic side handle",
      "Low-oil cooking",
      "Gas-safe with diffuser",
    ],
  },
  {
    slug: "fry-pan",
    name: "Clay Fry Pan",
    category: "Kitchen",
    capacities: ["1.2L"],
    tag: "Healthy Cooking",
    image: frypan,
    description:
      "Shallow, wide, and finished with a sturdy wooden handle. Fry and sauté the traditional way.",
    features: [
      "Natural wooden handle",
      "Wide shallow base",
      "Retains heat evenly",
      "Food-safe unglazed clay",
    ],
  },
  {
    slug: "clay-water-bottle",
    name: "Clay Water Bottle",
    category: "Drinkware",
    capacities: ["300ml", "800ml", "1L"],
    tag: "Carry Cool",
    image: bottle,
    description:
      "A slim, portable clay bottle with a cork stopper — naturally alkaline water, wherever you go.",
    features: [
      "Cork stopper for tight seal",
      "Naturally alkaline water",
      "Lightweight slim profile",
      "Hand-finished matte surface",
    ],
    featured: true,
  },
  {
    slug: "glass-set",
    name: "Clay Glass Set",
    category: "Drinkware",
    capacities: ["200ml"],
    tag: "Set of 4",
    image: glasses,
    description:
      "Tapered clay tumblers for water, lassi, or chai. Sold as a set of four, each one slightly unique.",
    features: [
      "Set of four tumblers",
      "Handcrafted — each unique",
      "Natural terracotta finish",
      "Keeps beverages cool",
    ],
  },
  {
    slug: "bowl-set",
    name: "Clay Bowl Set",
    category: "Drinkware",
    capacities: ["150ml"],
    tag: "Set of 4",
    image: bowls,
    description:
      "A stacking set of small clay bowls — perfect for chutneys, curd, or evening chai service.",
    features: [
      "Stackable design",
      "Set of four bowls",
      "Versatile serving size",
      "Hand-thrown clay",
    ],
  },
];

export const categories: { name: Category; blurb: string; image: string }[] = [
  {
    name: "Water Pots",
    blurb: "Naturally cooled water, the way it's been done for centuries.",
    image: blackSpade,
  },
  {
    name: "Kitchen",
    blurb: "Handi, kadai, and biryani pots that deepen every flavour.",
    image: handi,
  },
  {
    name: "Drinkware",
    blurb: "Bottles, glasses, and bowls for everyday earthy rituals.",
    image: bottle,
  },
];

export const allCapacities = [
  "150ml", "200ml", "300ml", "800ml", "1L", "1.2L", "1.5L", "2L", "2.5L",
  "3L", "5L", "6.5L", "8L", "9L", "10L", "11L", "12L", "13L", "16L",
];
