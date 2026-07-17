import { Post } from "../types/post.types.js";

export class PostUI {
  private container: HTMLElement;

  constructor(containerId: string) {
    const element = document.getElementById(containerId);
    if (!element) throw new Error(`Contenedor #${containerId} no encontrado`);
    this.container = element;
  }

  // Renderizar lista de publicaciones
  renderPosts(posts: Post[]): void {
    if (posts.length === 0) {
      this.container.innerHTML = `
        <div class="alert alert-info">
          📭 No hay publicaciones para mostrar.
        </div>
      `;
      return;
    }

    let html = '<div class="posts-grid">';
    posts.forEach(post => {
      html += this.createPostCard(post);
    });
    html += '</div>';
    this.container.innerHTML = html;
  }

  // Renderizar una sola publicación
  renderSinglePost(post: Post): void {
    this.container.innerHTML = `
      <div class="post-detail">
        <div class="post-meta">
          <span class="badge">📌 Publicación #${post.id}</span>
          <span class="badge">👤 Usuario ${post.userId}</span>
        </div>
        <h2>${this.escapeHtml(post.title)}</h2>
        <p>${this.escapeHtml(post.body)}</p>
      </div>
    `;
  }

  // Mostrar mensaje de error
  showError(message: string): void {
    this.container.innerHTML = `
      <div class="alert alert-danger">
        ❌ <strong>Error:</strong> ${this.escapeHtml(message)}
      </div>
    `;
  }

  // Mostrar mensaje de éxito
  showSuccess(message: string): void {
    const alertHtml = `
      <div class="alert alert-success" id="success-message">
        ✅ ${this.escapeHtml(message)}
      </div>
    `;
    this.container.insertAdjacentHTML('afterbegin', alertHtml);

    setTimeout(() => {
      const successElement = document.getElementById('success-message');
      if (successElement) {
        successElement.style.transition = 'opacity 0.5s';
        successElement.style.opacity = '0';
        setTimeout(() => successElement.remove(), 500);
      }
    }, 5000);
  }

  // Mostrar indicador de carga
  showLoading(): void {
    this.container.innerHTML = `
      <div class="alert alert-info">
        ⏳ Cargando publicaciones...
      </div>
    `;
  }

  // Crear tarjeta de publicación
  private createPostCard(post: Post): string {
    return `
      <div class="post-card" data-id="${post.id}">
        <div class="post-header">
          <span class="post-id">#${post.id}</span>
          <span class="user-badge">👤 Usuario ${post.userId}</span>
        </div>
        <h4>${this.escapeHtml(post.title)}</h4>
        <p>${this.escapeHtml(post.body)}</p>
      </div>
    `;
  }

  // Escapar HTML para prevenir XSS
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Limpiar el contenedor
  clear(): void {
    this.container.innerHTML = '';
  }
}