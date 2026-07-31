import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "./constants";
import type { Product, ProductsResponse, CategoryItem } from "../types";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface FetchParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  q?: string;
  category?: string;
}

export async function fetchProducts(params: FetchParams = {}): Promise<ProductsResponse> {
  const { limit = 12, skip = 0, sortBy, order, q, category } = params;

  let url: string = ENDPOINTS.PRODUCTS;
  if (category) {
    url = ENDPOINTS.PRODUCTS_BY_CATEGORY(category);
  } else if (q?.trim()) {
    url = ENDPOINTS.PRODUCT_SEARCH;
  }

  const queryParams: Record<string, string | number> = { limit, skip };

  if (q?.trim() && !category) {
    queryParams.q = q.trim();
  }

  if (sortBy) {
    queryParams.sortBy = sortBy;
    if (order) queryParams.order = order;
  }

  const res = await api.get<ProductsResponse>(url, { params: queryParams });
  return res.data;
}

export async function fetchProductById(id: number | string): Promise<Product> {
  const res = await api.get<Product>(ENDPOINTS.PRODUCT_BY_ID(id));
  return res.data;
}

export async function fetchCategories(): Promise<CategoryItem[]> {
  const res = await api.get(ENDPOINTS.CATEGORIES);
  const data = res.data;

  if (!Array.isArray(data)) return [];

  return data.map((item: string | CategoryItem) => {
    if (typeof item === "string") {
      const name = item.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return { slug: item, name };
    }
    return item;
  });
}
