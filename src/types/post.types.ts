export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export interface CreatePostDto {
    userId: number;
    title: string;
    body: string;
}

export interface UpdatePostDto {
    userId?: number;
    title?: string;
    body?: string;
}

export interface ApiError {
    message: string;
    status?: number;
    statusText?: string;
}
