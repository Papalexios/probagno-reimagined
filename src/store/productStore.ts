import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, Category } from '@/types/product';
import { products as initialProducts, categories as initialCategories } from '@/data/products';

interface ProductStore {
  products: Product[];
  categories: Category[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getFeaturedProducts: () => Product[];
  getBestSellers: () => Product[];
  searchProducts: (query: string) => Product[];
  addCategory: (category: Category) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  resetToInitial: () => void;
  syncWithInitial: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      categories: initialCategories,

      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductById: (id) => {
        return get().products.find((p) => p.id === id);
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug);
      },

      getProductsByCategory: (category) => {
        return get().products.filter((p) => p.category === category);
      },

      getFeaturedProducts: () => {
        return get().products.filter((p) => p.featured);
      },

      getBestSellers: () => {
        return get().products.filter((p) => p.bestSeller);
      },

      searchProducts: (query) => {
        const lowerQuery = query.toLowerCase();
        return get().products.filter(
          (p) =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.nameEn.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery)
        );
      },

      addCategory: (category) => {
        set((state) => ({
          categories: [...state.categories, category],
        }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        }));
      },

      resetToInitial: () => {
        set({
          products: initialProducts,
          categories: initialCategories,
        });
      },

      syncWithInitial: () => {
        // Merge initial products with stored, keeping stored changes but adding any new products
        set((state) => {
          const storedIds = new Set(state.products.map(p => p.id));
          const newProducts = initialProducts.filter(p => !storedIds.has(p.id));
          
          // Also restore any products that were incorrectly modified (e.g., renamed to "Alexis")
          const restoredProducts = state.products.map(storedProduct => {
            const initialProduct = initialProducts.find(p => p.id === storedProduct.id);
            // If the product exists in initial and the name was completely changed (not by admin), restore it
            if (initialProduct && storedProduct.name !== initialProduct.name && !storedProduct.name.includes('Έπιπλο')) {
              return initialProduct;
            }
            return storedProduct;
          });
          
          return {
            products: [...restoredProducts, ...newProducts],
            categories: initialCategories,
          };
        });
      },
    }),
    {
      name: 'probagno-products',
    }
  )
);
