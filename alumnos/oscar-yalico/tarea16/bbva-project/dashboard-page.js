import { LitElement, html, css } from 'lit';

class DashboardPage extends LitElement {
  static properties = {
    user: { type: String },
  };

  static styles = css`
    .dashboard {
      padding: 2rem;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #003c81ff;
      color: white;
      padding: 1rem 2rem;
      border-radius: 0 0 12px 12px;
    }
    button {
      background: white;
      color: #003c81ff;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: 0.3s;
    }
    button:hover {
      background: #e0e0e0;
    }
    main {
      margin-top: 2rem;
    }
    .card {
      background: white;
      border-radius: 10px;
      padding: 1rem;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      margin-bottom: 1rem;
    }
  `;

  handleLogout() {
    this.dispatchEvent(new CustomEvent('logout', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <header>
        <h2>Bienvenido, ${this.user}</h2>
        <button @click=${this.handleLogout}>Cerrar Sesión</button>
      </header>
      <main class="dashboard">
        <div class="card">Panel principal</div>
        <div class="card">Reportes</div>
        <div class="card">Configuración</div>
      </main>
    `;
  }
}

customElements.define('dashboard-page', DashboardPage);
