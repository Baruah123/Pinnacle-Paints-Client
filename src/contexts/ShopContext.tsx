
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  brand: string;
  brandLogo?: string;
  image: string;
  gallery?: string[];
  inStock: boolean;
  isEcoFriendly: boolean;
  isNew: boolean;
  isPopular: boolean;
  rating: number;
  reviews: number;
  features: string[];
  coverage: string;
  finish: string;
  technicalSpecs?: TechnicalSpec[];
  certifications?: string[];
  usageInstructions?: string;
  requestQuoteOnly?: boolean;
}

export interface TechnicalSpec {
  name: string;
  value: string;
  unit?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuoteRequest {
  id: string;
  product: Product;
  quantity: number;
  customerInfo: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  message?: string;
  createdAt: Date;
}

export interface ShopState {
  products: Product[];
  cart: CartItem[];
  filters: {
    category: string;
    brand: string;
    priceRange: [number, number];
    ecoFriendly: boolean;
    inStock: boolean;
    finish: string;
  };
  sorting: 'price-low' | 'price-high' | 'newest' | 'popular' | 'rating';
  searchQuery: string;
  isCartOpen: boolean;
  selectedProduct: Product | null;
  viewMode: 'categories' | 'products';
}

// Mock products data
const mockProducts: Product[] = [
  // Decorative Paints
  {
    id: '1',
    name: 'Metallic Pigment 8oz Black',
    sku: 'DCP-MP-8BK-001',
    price: 89.99,
    originalPrice: 99.99,
    description: 'Premium decorative metallic paint with superior durability and stunning visual appeal.',
    category: 'Decorative Paints',
    brand: 'Diamond Collection',
    brandLogo: '💎',
    image: '/products/Metallic Pigment 8oz Black.jpg',
    inStock: true,
    isEcoFriendly: false,
    isNew: true,
    isPopular: true,
    rating: 4.8,
    reviews: 127,
    features: ['Metallic Finish', 'Premium Quality', 'Easy Application'],
    coverage: '12-14 sq m per litre',
    finish: 'Metallic',
    technicalSpecs: [
      { name: 'Volume', value: '8', unit: 'oz' },
      { name: 'Coverage', value: '12-14', unit: 'sq m per litre' },
      { name: 'Dry Time', value: '2-4', unit: 'hours' },
      { name: 'Recoat Time', value: '4-6', unit: 'hours' }
    ],
    certifications: ['ISO 9001', 'GREENGUARD'],
    usageInstructions: 'Apply with brush or roller in thin, even coats. Allow proper drying time between coats.'
  },
  {
    id: '2',
    name: 'Venetian Plaster Gold',
    price: 156.99,
    description: 'Luxurious decorative finish that creates depth and elegance on walls.',
    category: 'Decorative Paints',
    image: '/products/Bead 50 - 100, 32 oz.png',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: true,
    rating: 4.7,
    reviews: 89,
    features: ['Venetian Style', 'Gold Accent', 'Textured Finish'],
    coverage: '8-10 sq m per litre',
    finish: 'Textured'
  },
  {
    id: '3',
    name: 'Decorative Chalk Paint',
    price: 78.50,
    description: 'Matte decorative paint perfect for furniture and accent pieces.',
    category: 'Decorative Paints',
    image: '/products/TSE Part B - EZ, Half Gal.jpg',
    inStock: true,
    isEcoFriendly: true,
    isNew: false,
    isPopular: false,
    rating: 4.5,
    reviews: 156,
    features: ['Chalk Finish', 'Easy Distressing', 'Low VOC'],
    coverage: '10-12 sq m per litre',
    finish: 'Matte'
  },

  // Eco-Friendly Paints
  {
    id: '4',
    name: 'Zero VOC Interior Paint',
    price: 94.99,
    description: 'Completely non-toxic paint safe for children and pets with excellent coverage.',
    category: 'Eco-Friendly Paints',
    image: '/products/Acrylic Sealer WB Accent, 5 Gal copy.png',
    inStock: true,
    isEcoFriendly: true,
    isNew: true,
    isPopular: true,
    rating: 4.9,
    reviews: 234,
    features: ['Zero VOC', 'Non-Toxic', 'Child Safe'],
    coverage: '12-15 sq m per litre',
    finish: 'Eggshell'
  },
  {
    id: '5',
    name: 'Natural Clay Paint',
    price: 67.99,
    description: 'Made from natural clay minerals, breathable and environmentally friendly.',
    category: 'Eco-Friendly Paints',
    image: '/products/Polyaspartic 72 Part A EZ Clear 1 gal.jpg',
    inStock: true,
    isEcoFriendly: true,
    isNew: false,
    isPopular: true,
    rating: 4.6,
    reviews: 178,
    features: ['Natural Clay', 'Breathable', 'Antimicrobial'],
    coverage: '10-12 sq m per litre',
    finish: 'Matte'
  },
  {
    id: '6',
    name: 'Organic Milk Paint',
    price: 45.99,
    description: 'Traditional milk-based paint made from organic ingredients.',
    category: 'Eco-Friendly Paints',
    image: '/products/Epoxy Patch Part B FC 1 gal.jpg',
    inStock: true,
    isEcoFriendly: true,
    isNew: false,
    isPopular: false,
    rating: 4.4,
    reviews: 92,
    features: ['Organic', 'Biodegradable', 'Traditional Formula'],
    coverage: '8-10 sq m per litre',
    finish: 'Flat'
  },

  // Industrial Solutions
  {
    id: '7',
    name: 'Heavy Duty Epoxy Coating',
    price: 189.99,
    description: 'Industrial-grade epoxy coating for high-traffic areas and harsh environments.',
    category: 'Industrial Solutions',
    image: '/products/Metallic Pigment 8oz Black.jpg',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: true,
    rating: 4.8,
    reviews: 145,
    features: ['Chemical Resistant', 'High Durability', 'Anti-Slip'],
    coverage: '6-8 sq m per litre',
    finish: 'High Gloss'
  },
  {
    id: '8',
    name: 'Anti-Corrosion Primer',
    price: 134.50,
    description: 'Specialized primer for metal surfaces in industrial applications.',
    category: 'Industrial Solutions',
    image: '/products/Bead 50 - 100, 32 oz.png',
    inStock: true,
    isEcoFriendly: false,
    isNew: true,
    isPopular: false,
    rating: 4.7,
    reviews: 67,
    features: ['Rust Prevention', 'Metal Adhesion', 'Long Lasting'],
    coverage: '8-10 sq m per litre',
    finish: 'Primer'
  },
  {
    id: '9',
    name: 'Chemical Resistant Coating',
    price: 245.99,
    description: 'Ultimate protection against chemicals and extreme conditions.',
    category: 'Industrial Solutions',
    image: '/products/TSE Part B - EZ, Half Gal.jpg',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: false,
    rating: 4.9,
    reviews: 34,
    features: ['Chemical Proof', 'Extreme Durability', 'Professional Grade'],
    coverage: '5-7 sq m per litre',
    finish: 'Satin'
  },

  // Premera Floor Coatings
  {
    id: '10',
    name: 'Premera Garage Floor Epoxy',
    price: 167.99,
    description: 'Professional-grade garage floor coating with superior adhesion and durability.',
    category: 'Premera Floor Coatings',
    image: '/products/Acrylic Sealer WB Accent, 5 Gal copy.png',
    inStock: true,
    isEcoFriendly: false,
    isNew: true,
    isPopular: true,
    rating: 4.8,
    reviews: 198,
    features: ['Garage Grade', 'Oil Resistant', 'Easy Clean'],
    coverage: '7-9 sq m per litre',
    finish: 'High Gloss'
  },
  {
    id: '11',
    name: 'Premera Basement Floor Sealer',
    price: 123.50,
    description: 'Moisture-resistant basement floor coating that prevents water damage.',
    category: 'Premera Floor Coatings',
    image: '/products/Polyaspartic 72 Part A EZ Clear 1 gal.jpg',
    inStock: true,
    isEcoFriendly: true,
    isNew: false,
    isPopular: true,
    rating: 4.6,
    reviews: 156,
    features: ['Moisture Barrier', 'Crack Resistant', 'Long Lasting'],
    coverage: '9-11 sq m per litre',
    finish: 'Semi-Gloss'
  },
  {
    id: '12',
    name: 'Premera Commercial Floor Coating',
    price: 289.99,
    description: 'Heavy-duty commercial floor coating for high-traffic areas.',
    category: 'Premera Floor Coatings',
    image: '/products/Epoxy Patch Part B FC 1 gal.jpg',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: false,
    rating: 4.7,
    reviews: 87,
    features: ['Commercial Grade', 'High Traffic', 'Slip Resistant'],
    coverage: '6-8 sq m per litre',
    finish: 'Textured'
  },

  // Endurable Floor Coatings
  {
    id: '13',
    name: 'Endurable Polyaspartic Floor Coating',
    price: 198.99,
    description: 'Fast-curing polyaspartic coating with exceptional durability and UV resistance.',
    category: 'Endurable Floor Coatings',
    image: '/products/Metallic Pigment 8oz Black.jpg',
    inStock: true,
    isEcoFriendly: true,
    isNew: true,
    isPopular: true,
    rating: 4.9,
    reviews: 167,
    features: ['Fast Cure', 'UV Resistant', 'Crystal Clear'],
    coverage: '8-10 sq m per litre',
    finish: 'High Gloss'
  },
  {
    id: '14',
    name: 'Endurable Concrete Stain',
    price: 87.50,
    description: 'Penetrating concrete stain that enhances and protects concrete surfaces.',
    category: 'Endurable Floor Coatings',
    image: '/products/Bead 50 - 100, 32 oz.png',
    inStock: true,
    isEcoFriendly: true,
    isNew: false,
    isPopular: false,
    rating: 4.5,
    reviews: 123,
    features: ['Penetrating Stain', 'Natural Look', 'Long Lasting'],
    coverage: '12-15 sq m per litre',
    finish: 'Natural'
  },
  {
    id: '15',
    name: 'Endurable Metallic Epoxy',
    price: 234.99,
    description: 'Stunning metallic epoxy floor coating with unique visual effects.',
    category: 'Endurable Floor Coatings',
    image: '/products/TSE Part B - EZ, Half Gal.jpg',
    inStock: false,
    isEcoFriendly: false,
    isNew: true,
    isPopular: true,
    rating: 4.8,
    reviews: 89,
    features: ['Metallic Effects', 'Unique Patterns', 'Show Stopping'],
    coverage: '6-8 sq m per litre',
    finish: 'Metallic'
  },

  // Rustoleum
  {
    id: '16',
    name: 'Rustoleum Universal Primer',
    sku: 'RST-UP-001',
    price: 45.99,
    description: 'All-surface primer that bonds to any surface without sanding.',
    category: 'Rustoleum',
    brand: 'Rustoleum',
    brandLogo: '🔧',
    image: '/products/Acrylic Sealer WB Accent, 5 Gal copy.png',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: true,
    rating: 4.6,
    reviews: 345,
    features: ['No Sanding', 'All Surface', 'Quick Dry'],
    coverage: '10-12 sq m per litre',
    finish: 'Primer',
    technicalSpecs: [
      { name: 'Coverage', value: '10-12', unit: 'sq m per litre' },
      { name: 'Dry Time', value: '30', unit: 'minutes' },
      { name: 'Recoat Time', value: '1', unit: 'hour' },
      { name: 'Temperature Range', value: '10-32', unit: '°C' }
    ],
    certifications: ['GREENGUARD Gold'],
    usageInstructions: 'Clean surface thoroughly. Apply thin, even coat. No sanding required on most surfaces.'
  },
  {
    id: '17',
    name: 'Rustoleum Rust Reformer',
    price: 38.50,
    description: 'Converts rust to a protective coating, stopping rust in its tracks.',
    category: 'Rustoleum',
    image: '/products/Polyaspartic 72 Part A EZ Clear 1 gal.jpg',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: true,
    rating: 4.7,
    reviews: 278,
    features: ['Rust Converter', 'Protective Coating', 'Easy Application'],
    coverage: '8-10 sq m per litre',
    finish: 'Protective'
  },
  {
    id: '18',
    name: 'Rustoleum Hammered Metal Paint',
    price: 52.99,
    description: 'Distinctive hammered metal finish that hides surface imperfections.',
    category: 'Rustoleum',
    image: '/products/Epoxy Patch Part B FC 1 gal.jpg',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: false,
    rating: 4.4,
    reviews: 156,
    features: ['Hammered Finish', 'Hides Imperfections', 'Rust Protection'],
    coverage: '9-11 sq m per litre',
    finish: 'Hammered'
  },

  // Zinsser
  {
    id: '19',
    name: 'Zinsser Bulls Eye 1-2-3 Primer',
    price: 67.99,
    description: 'Water-base primer-sealer-stain blocker that bonds to all surfaces.',
    category: 'Zinsser',
    image: '/products/Metallic Pigment 8oz Black.jpg',
    inStock: true,
    isEcoFriendly: true,
    isNew: false,
    isPopular: true,
    rating: 4.8,
    reviews: 456,
    features: ['Stain Blocker', 'All Surface', 'Water Base'],
    coverage: '11-13 sq m per litre',
    finish: 'Primer'
  },
  {
    id: '20',
    name: 'Zinsser BIN Primer',
    price: 89.50,
    description: 'Shellac-base primer that seals, primes and blocks stains on all surfaces.',
    category: 'Zinsser',
    image: '/products/Bead 50 - 100, 32 oz.png',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: true,
    rating: 4.9,
    reviews: 234,
    features: ['Shellac Base', 'Superior Adhesion', 'Stain Blocking'],
    coverage: '9-11 sq m per litre',
    finish: 'Primer'
  },
  {
    id: '21',
    name: 'Zinsser Perma-White Mold Paint',
    price: 78.99,
    description: 'Self-priming paint that prevents mold and mildew growth.',
    category: 'Zinsser',
    image: '/products/TSE Part B - EZ, Half Gal.jpg',
    inStock: true,
    isEcoFriendly: true,
    isNew: true,
    isPopular: false,
    rating: 4.7,
    reviews: 167,
    features: ['Mold Prevention', 'Self Priming', 'Antimicrobial'],
    coverage: '10-12 sq m per litre',
    finish: 'Satin'
  },

  // International Paints
  {
    id: '22',
    name: 'International Marine Antifouling',
    price: 156.99,
    description: 'Professional marine antifouling paint for boat hulls and underwater surfaces.',
    category: 'International Paints',
    image: '/products/Acrylic Sealer WB Accent, 5 Gal copy.png',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: true,
    rating: 4.8,
    reviews: 123,
    features: ['Marine Grade', 'Antifouling', 'Long Lasting'],
    coverage: '7-9 sq m per litre',
    finish: 'Marine'
  },
  {
    id: '23',
    name: 'International Yacht Varnish',
    price: 134.50,
    description: 'Premium yacht varnish with UV protection for marine wood surfaces.',
    category: 'International Paints',
    image: '/products/Polyaspartic 72 Part A EZ Clear 1 gal.jpg',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: false,
    rating: 4.6,
    reviews: 89,
    features: ['UV Protection', 'Marine Wood', 'High Gloss'],
    coverage: '8-10 sq m per litre',
    finish: 'High Gloss'
  },
  {
    id: '24',
    name: 'International Toplac Enamel',
    price: 98.99,
    description: 'Single-pack polyurethane enamel for marine and industrial use.',
    category: 'International Paints',
    image: '/products/Epoxy Patch Part B FC 1 gal.jpg',
    inStock: false,
    isEcoFriendly: false,
    isNew: true,
    isPopular: true,
    rating: 4.7,
    reviews: 145,
    features: ['Polyurethane', 'Marine Grade', 'Weather Resistant'],
    coverage: '9-11 sq m per litre',
    finish: 'Gloss'
  },

  // Devoe Coatings
  {
    id: '25',
    name: 'Devoe Wonder-Tones Interior',
    price: 89.99,
    description: 'Premium interior paint with exceptional color retention and coverage.',
    category: 'Devoe Coatings',
    image: '/products/Metallic Pigment 8oz Black.jpg',
    inStock: true,
    isEcoFriendly: true,
    isNew: false,
    isPopular: true,
    rating: 4.6,
    reviews: 234,
    features: ['Color Retention', 'Premium Quality', 'Easy Clean'],
    coverage: '11-13 sq m per litre',
    finish: 'Eggshell'
  },
  {
    id: '26',
    name: 'Devoe Bar-Rust Primer',
    price: 67.50,
    description: 'High-performance anti-corrosive primer for metal surfaces.',
    category: 'Devoe Coatings',
    image: '/products/Bead 50 - 100, 32 oz.png',
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: false,
    rating: 4.8,
    reviews: 156,
    features: ['Anti-Corrosive', 'Metal Primer', 'Industrial Grade'],
    coverage: '8-10 sq m per litre',
    finish: 'Primer'
  },
  {
    id: '27',
    name: 'Devoe Miracle Gloss Enamel',
    price: 112.99,
    description: 'High-gloss enamel paint with superior durability and finish quality.',
    category: 'Devoe Coatings',
    image: '/products/TSE Part B - EZ, Half Gal.jpg',
    inStock: true,
    isEcoFriendly: false,
    isNew: true,
    isPopular: false,
    rating: 4.7,
    reviews: 98,
    features: ['High Gloss', 'Superior Durability', 'Professional Grade'],
    coverage: '9-11 sq m per litre',
    finish: 'High Gloss'
  }
];

type ShopAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_FILTERS'; payload: Partial<ShopState['filters']> }
  | { type: 'SET_SORTING'; payload: ShopState['sorting'] }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_VIEW_MODE'; payload: 'categories' | 'products' };

const initialState: ShopState = {
  products: mockProducts,
  cart: [],
  filters: {
    category: '',
    brand: '',
    priceRange: [0, 300],
    ecoFriendly: false,
    inStock: false,
    finish: ''
  },
  sorting: 'popular',
  searchQuery: '',
  isCartOpen: false,
  selectedProduct: null,
  viewMode: 'categories'
};

function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { product: action.payload, quantity: 1 }]
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_SORTING':
      return { ...state, sorting: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    case 'LOAD_CART':
      return { ...state, cart: action.payload };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.payload };
    default:
      return state;
  }
}

const ShopContext = createContext<{
  state: ShopState;
  dispatch: React.Dispatch<ShopAction>;
} | null>(null);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('graphene-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('graphene-cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <ShopContext.Provider value={{ state, dispatch }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
