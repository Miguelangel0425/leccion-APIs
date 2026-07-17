import { Post, CreatePostDto, ApiError } from "../types/post.types.js";

const BASE_URL = 'https://jsonplaceholder.typicode.com';
const POSTS_ENDPOINT = '/posts';

export class ApiService {
    private baseUrl: string;

    constructor(baseUrl: string = BASE_URL) {
        this.baseUrl = baseUrl;
    }

    // Obtener todas las publicaciones
    async getPosts(): Promise<Post[]> {
        const response = await fetch(`${this.baseUrl}${POSTS_ENDPOINT}`);
        if (!response.ok) throw this.createError(response);
        return await response.json();
    }

    // Obtener publicación por ID
    async getPostById(id: number): Promise<Post | null> {
        try {
            const response = await fetch(`${this.baseUrl}${POSTS_ENDPOINT}/${id}`);
            if (response.status === 404) return null;
            if (!response.ok) throw this.createError(response);
            return await response.json();
        } catch (error) {
            if (error instanceof Error) throw error;
            throw new Error('Error desconocido al obtener la publicación');
        }
    }

    // Filtrar publicaciones por usuario
    async getPostsByUser(userId: number): Promise<Post[]> {
        const response = await fetch(`${this.baseUrl}${POSTS_ENDPOINT}?userId=${userId}`);
        if (!response.ok) throw this.createError(response);
        return await response.json();
    }

    // Crear nueva publicación
    async createPost(postData: CreatePostDto): Promise<Post> {
        const response = await fetch(`${this.baseUrl}${POSTS_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        if (!response.ok) throw this.createError(response);
        return await response.json();
    }

    // Actualizar título con PATCH
    async updatePostTitle(_id: number, title: string): Promise<Post> {
        const response = await fetch(`${this.baseUrl}${POSTS_ENDPOINT}/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });
        if (!response.ok) throw this.createError(response);
        return await response.json();
    }

    // Eliminar publicación
    async deletePost(id: number): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}${POSTS_ENDPOINT}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw this.createError(response);
        return true;
    }

    // Manejo de errores
    private createError(response: Response): ApiError {
        return {
            message: `Error en la solicitud: ${response.status} ${response.statusText}`,
            status: response.status,
            statusText: response.statusText,
        };
    }
}