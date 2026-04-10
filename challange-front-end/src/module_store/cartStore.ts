import { create } from "zustand"
import type { ProductListDomain } from "../core/module_product/api/domain/types"

export const useCartStore = create<{
  products: Record<string, ProductListDomain.Model>
  addProductInCart(product: ProductListDomain.Model): void
  removeProductInCart(product: ProductListDomain.Model): void
}>((set) => ({
  products: {},
  addProductInCart: (product: ProductListDomain.Model) => {
    set((state) => ({
      ...state,
      products: { ...state.products, [product.id]: product },
    }))
  },
  removeProductInCart: (product: ProductListDomain.Model) => {
    set((state) => {
      return {
        ...state,
        products: (() => {
          delete state.products[product.id]
          return { ...state.products }
        })(),
      }
    })
  },
}))
