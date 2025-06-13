import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface CategoryData {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  featured: boolean;
  gradient: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryState {
  categories: CategoryData[];
  loading: boolean;
  error: string | null;
}

type CategoryAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CATEGORIES'; payload: CategoryData[] }
  | { type: 'ADD_CATEGORY'; payload: CategoryData }
  | { type: 'UPDATE_CATEGORY'; payload: CategoryData }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'TOGGLE_FEATURED'; payload: string };

const initialCategories: CategoryData[] = [
  {
    id: '1',
    name: 'Decorative Paints',
    description: 'Premium decorative finishes including metallic pigments and specialty textures',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop',
    icon: 'Palette',
    featured: true,
    gradient: 'from-purple-600/20 to-pink-600/20',
    order: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Eco-Friendly Paints',
    description: 'Sustainable, zero-VOC paints safe for children and pets',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop',
    icon: 'Leaf',
    featured: true,
    gradient: 'from-green-600/20 to-emerald-600/20',
    order: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Industrial Solutions',
    description: 'Heavy-duty coatings for industrial and commercial applications',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop',
    icon: 'Building',
    featured: true,
    gradient: 'from-gray-600/20 to-slate-600/20',
    order: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Rustoleum',
    description: 'Trusted Rustoleum brand products for rust prevention and surface protection',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    icon: 'Wrench',
    featured: true,
    gradient: 'from-orange-600/20 to-red-600/20',
    order: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Premera Floor Coatings',
    description: 'Professional-grade floor coating solutions for garages and commercial spaces',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
    icon: 'Shield',
    featured: false,
    gradient: 'from-blue-600/20 to-cyan-600/20',
    order: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Endurable Floor Coatings',
    description: 'Fast-curing polyaspartic and epoxy floor coating systems',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop',
    icon: 'Droplets',
    featured: false,
    gradient: 'from-teal-600/20 to-blue-600/20',
    order: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    name: 'Zinsser',
    description: 'Premium primers and specialty coatings for professional results',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    icon: 'Package',
    featured: false,
    gradient: 'from-red-600/20 to-pink-600/20',
    order: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    name: 'International Paints',
    description: 'Marine and industrial paints for demanding environments',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    icon: 'Paintbrush',
    featured: false,
    gradient: 'from-blue-600/20 to-indigo-600/20',
    order: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '9',
    name: 'Devoe Coatings',
    description: 'High-performance coatings for residential and commercial applications',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop',
    icon: 'Shield',
    featured: false,
    gradient: 'from-purple-600/20 to-violet-600/20',
    order: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const initialState: CategoryState = {
  categories: initialCategories,
  loading: false,
  error: null
};

const categoryReducer = (state: CategoryState, action: CategoryAction): CategoryState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_CATEGORY':
      return { 
        ...state, 
        categories: [...state.categories, action.payload].sort((a, b) => a.order - b.order)
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(cat => 
          cat.id === action.payload.id ? { ...action.payload, updatedAt: new Date() } : cat
        ).sort((a, b) => a.order - b.order)
      };
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(cat => cat.id !== action.payload)
      };
    case 'TOGGLE_FEATURED':
      return {
        ...state,
        categories: state.categories.map(cat => 
          cat.id === action.payload ? { ...cat, featured: !cat.featured, updatedAt: new Date() } : cat
        )
      };
    default:
      return state;
  }
};

interface CategoryContextType {
  state: CategoryState;
  dispatch: React.Dispatch<CategoryAction>;
  getFeaturedCategories: () => CategoryData[];
  getRegularCategories: () => CategoryData[];
  getCategoryByName: (name: string) => CategoryData | undefined;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const getFeaturedCategories = () => {
    return state.categories.filter(cat => cat.featured).sort((a, b) => a.order - b.order);
  };

  const getRegularCategories = () => {
    return state.categories.filter(cat => !cat.featured).sort((a, b) => a.order - b.order);
  };

  const getCategoryByName = (name: string) => {
    return state.categories.find(cat => cat.name === name);
  };

  return (
    <CategoryContext.Provider value={{
      state,
      dispatch,
      getFeaturedCategories,
      getRegularCategories,
      getCategoryByName
    }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategory must be used within a CategoryProvider');
  }
  return context;
};

export default CategoryContext;
