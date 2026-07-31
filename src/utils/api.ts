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
  try {
    const [catRes, prodRes] = await Promise.all([
      api.get(ENDPOINTS.CATEGORIES),
      api.get("/products?limit=100&select=category,thumbnail"),
    ]);

    const categoryImageMap: Record<string, string> = {};
    if (prodRes.data?.products && Array.isArray(prodRes.data.products)) {
      for (const p of prodRes.data.products) {
        if (p.category && p.thumbnail && !categoryImageMap[p.category]) {
          categoryImageMap[p.category] = p.thumbnail;
        }
      }
    }

    const data = catRes.data;
    if (!Array.isArray(data)) return [];

    return data.map((item: string | CategoryItem) => {
      let slug = "";
      let name = "";

      if (typeof item === "string") {
        slug = item;
        name = item.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      } else {
        slug = item.slug;
        name = item.name;
      }

      const image = categoryImageMap[slug] || "";
      return { slug, name, image };
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}
