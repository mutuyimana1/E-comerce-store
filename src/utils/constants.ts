export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com";

export const ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id: number | string) => `/products/${id}`,
  PRODUCT_SEARCH: "/products/search",
  CATEGORY_LIST: "/products/category-list",
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
} as const;
