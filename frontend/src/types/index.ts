export interface Product {
    id: number;
    name: string;
    description: string;
    material: string;
    price: number;
    categoryId: number;
    categoryName: string;
    imageUrls: string[];
}

export interface Category {
    id: number;
    name: string;
    description: string;
}

// AuthResponse is no longer used – the access token is stored in an HTTP-only cookie
// and never exposed to JavaScript. Kept as legacy so existing imports don't break.
export interface AuthResponse {
    token?: string;
    tokenType?: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface ProductDTO {
    name: string;
    description: string;
    material: string;
    price: number;
    categoryId: number;
    imageUrls: string[];
}

export interface User {
    username: string;
    role: 'USER' | 'ADMIN';
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc';
