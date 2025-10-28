import { css, html, LitElement } from "lit";

export class MovementsHistoryPage extends LitElement {
  static properties = {
    access: {
      type: Object
    },
    user: {
      type: Object,
      state: true
    },
    movements: {
      type: Array,
      state: true
    },
    isLoading: {
      type: Boolean,
      state: true
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    main {
      max-width: 1400px;
      margin: 0 auto;
      padding: 30px 20px;
    }

    .page-header {
      margin-bottom: 30px;
    }

    .page-header h1 {
      font-size: 28px;
      margin-bottom: 10px;
    }

    .page-header p {
      color: #a0a0b0;
      font-size: 14px;
    }

    .loading {
      text-align: center;
      padding: 40px 20px;
      color: #a0a0b0;
      font-size: 16px;
    }

    .movements-container {
      background: rgba(30, 30, 45, 0.9);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }

    .no-movements {
      text-align: center;
      padding: 40px 20px;
      color: #a0a0b0;
      font-size: 16px;
    }
  `;

  constructor() {
    super();
    this.user = { };
    this.movements = [];
    this.isLoading = true;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.loadStoredUserId();
    await this.fetchUser();
    await this.fetchAllMovements();
  }

  loadStoredUserId() {
    const access = localStorage.getItem('access');
        
    if (!access) {
      Router.navigate('login');
      throw new Error('Acceso no autorizado');
    }

    this.access = JSON.parse(access);
  }

  async fetchUser() {
    const { userId, token } = this.access;
    
    if (!userId || !token) {
      Router.navigate('login');
      throw new Error('Acceso no autorizado');  
    }

    const params = new URLSearchParams({ id: userId })

    const response = await fetch(`http://localhost:3000/users?${ params }`);

    if (!response.ok) {
      Router.navigate('login');
      throw new Error('Error en el servidor');  
    }

    const user = (await response.json())[0];

    delete user.password;

    if (!user) {
      Router.navigate('login');
      throw new Error('Acceso no autorizado');
    }

    this.user = user;
  }

  async fetchAllMovements() {
    this.isLoading = true;

    const { userId } = this.access;

    const params = new URLSearchParams({
      userId: userId
    });

    const response = await fetch(`http://localhost:3000/transactions?${ params }`);
    const movements = await response.json();

    this.movements = movements;
  }

  render() {
    return html`
      <dashboard-header
        .user=${ this.user }
        backButton
        previousRoute="dashboard"
      ></dashboard-header>

      <main>
        <section class="page-header">
          <h1>Historial de Movimientos</h1>
          <p>Visualiza todos tus movimientos bancarios</p>
        </section>

        ${
          this.movements && this.movements.length > 0
            ? html`
                <dashboard-user-movements
                  .movements=${this.movements}
                  .isComplete=${ true }
                ></dashboard-user-movements>
              `
            : html`<div class="no-movements">No hay movimientos registrados</div>`
        }
      </main>
    `;
  }
}