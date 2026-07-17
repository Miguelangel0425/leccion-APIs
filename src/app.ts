import { ApiService } from './services/api.service.js';
import { PostUI } from './components/post-ui.js';
import { CreatePostDto } from './types/post.types.js';

// Inicializar servicios
const apiService = new ApiService();
const postUI = new PostUI('posts-container');

// Funciones principales
async function loadAllPosts(): Promise<void> {
    try {
        postUI.showLoading();
        const posts = await apiService.getPosts();
        postUI.renderPosts(posts);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al cargar publicaciones';
        postUI.showError(message);
    }
}

async function loadPostById(id: number): Promise<void> {
    try {
        postUI.showLoading();
        const post = await apiService.getPostById(id);
        if (post) {
            postUI.renderSinglePost(post);
        } else {
            postUI.showError(`No se encontró publicación con ID ${id}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al consultar publicación';
        postUI.showError(message);
    }
}

async function filterPostsByUser(userId: number): Promise<void> {
    try {
        postUI.showLoading();
        const posts = await apiService.getPostsByUser(userId);
        if (posts.length > 0) {
            postUI.renderPosts(posts);
        } else {
            postUI.showError(`No hay publicaciones para el usuario ${userId}`);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al filtrar publicaciones';
        postUI.showError(message);
    }
}

async function createNewPost(title: string, body: string, userId: number): Promise<void> {
    try {
        const postData: CreatePostDto = { title, body, userId };
        const newPost = await apiService.createPost(postData);
        postUI.showSuccess(`Publicación creada exitosamente con ID: ${newPost.id}`);
        await loadAllPosts();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al crear publicación';
        postUI.showError(message);
    }
}

async function updatePostTitle(id: number, newTitle: string): Promise<void> {
    try {
        if (!newTitle || newTitle.trim().length === 0) {
            throw new Error('El título no puede estar vacío');
        }
        await apiService.updatePostTitle(id, newTitle);
        postUI.showSuccess(`Título de la publicación #${id} actualizado exitosamente`);
        await loadAllPosts();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al actualizar título';
        postUI.showError(message);
    }
}

async function deletePost(id: number): Promise<void> {
    try {
        const confirmDelete = confirm(`¿Está seguro de eliminar la publicación #${id}?`);
        if (!confirmDelete) return;

        await apiService.deletePost(id);
        postUI.showSuccess(`Publicación #${id} eliminada exitosamente`);
        await loadAllPosts();
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error al eliminar publicación';
        postUI.showError(message);
    }
}

// Configurar eventos del DOM
function setupEventListeners(): void {
    // Botón para cargar todas las publicaciones
    document.getElementById('btn-load-all')?.addEventListener('click', loadAllPosts);

    // Formulario para consultar por ID
    const searchForm = document.getElementById('search-form') as HTMLFormElement | null;
    searchForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('search-id') as HTMLInputElement;
        const id = parseInt(input.value);
        if (id > 0) {
            loadPostById(id);
            searchForm.reset();
        } else {
            postUI.showError('Ingrese un ID válido (número positivo)');
        }
    });

    // Formulario para filtrar por usuario
    const filterForm = document.getElementById('filter-form') as HTMLFormElement | null;
    filterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('filter-user') as HTMLInputElement;
        const userId = parseInt(input.value);
        if (userId > 0) {
            filterPostsByUser(userId);
            filterForm.reset();
        } else {
            postUI.showError('Ingrese un ID de usuario válido (número positivo)');
        }
    });

    // Formulario para crear publicación
    const createForm = document.getElementById('create-form') as HTMLFormElement | null;
    createForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const titleInput = document.getElementById('create-title') as HTMLInputElement;
        const bodyInput = document.getElementById('create-body') as HTMLTextAreaElement;
        const userIdInput = document.getElementById('create-user') as HTMLInputElement;

        const title = titleInput.value.trim();
        const body = bodyInput.value.trim();
        const userId = parseInt(userIdInput.value);

        if (title && body && userId > 0) {
            createNewPost(title, body, userId);
            createForm.reset();
        } else {
            postUI.showError('Complete todos los campos correctamente');
        }
    });

    // Formulario para actualizar título
    const updateForm = document.getElementById('update-form') as HTMLFormElement | null;
    updateForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const idInput = document.getElementById('update-id') as HTMLInputElement;
        const titleInput = document.getElementById('update-title') as HTMLInputElement;

        const id = parseInt(idInput.value);
        const title = titleInput.value.trim();

        if (id > 0 && title) {
            updatePostTitle(id, title);
            updateForm.reset();
        } else {
            postUI.showError('Ingrese un ID válido y un título');
        }
    });

    // Formulario para eliminar
    const deleteForm = document.getElementById('delete-form') as HTMLFormElement | null;
    deleteForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('delete-id') as HTMLInputElement;
        const id = parseInt(input.value);
        if (id > 0) {
            deletePost(id);
            deleteForm.reset();
        } else {
            postUI.showError('Ingrese un ID válido para eliminar');
        }
    });
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadAllPosts();
});