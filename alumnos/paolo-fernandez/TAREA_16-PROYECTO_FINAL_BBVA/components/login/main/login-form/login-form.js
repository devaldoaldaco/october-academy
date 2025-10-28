import { css, html, LitElement } from "lit";
import { isValidDocumentNumber, isValidPassword } from "../../../../utils/validators";
import { Router } from "../../../../router";

export class LoginForm extends LitElement {
  static properties = {
    documentTypeOptions: {
      type: Array,
      state: true
    },
    formData: {
      type: Object,
      state: true
    }
  }

  static styles = css`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .forgot-link {
      color: #00D4FF;
      text-decoration: none;
      font-size: 14px;
      display: inline-block;
      margin-top: 5px;
      transition: color 0.3s;
    }

    .forgot-link:hover {
      color: #00A8CC;
      text-decoration: underline;
    }

    .button-group {
      display: flex;
      gap: 15px;
      margin-top: 30px;
    }

    .btn {
      padding: 14px 30px;
      border: none;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #00D4FF 0%, #0099CC 100%);
      color: #0F1419;
      flex: 1;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(0, 212, 255, 0.4);
    }

    .btn-secondary {
      background-color: transparent;
      color: #00D4FF;
      border: 2px solid #404050;
      flex: 1;
    }

    .btn-secondary:hover {
      border-color: #00D4FF;
      background-color: rgba(0, 212, 255, 0.1);
    }
  `;

  constructor() {
    super();
    this.documentTypeOptions = [
      { value: 'DNI', label: 'DNI' },
      { value: 'RUC', label: 'RUC' },
      { value: 'CE', label: 'Carné de Extranjería' },
    ];

    const savedDocument = localStorage.getItem('document');
    const document = savedDocument ? JSON.parse(savedDocument) : { };
    
    this.formData = {
      documentType: document.documentType || this.documentTypeOptions[0].value,
      documentNumber: document.documentNumber || '',
      remember: !!savedDocument,
      password: ''
    }
  }

  render() {
    return html`
      <form 
        id="loginForm" 
        @submit=${ this.login }
        @input-change=${ this.handleInputChange }  
      >
        <div class="form-group">
          <select-input
            id="documentType"
            label="Tipo de documento"
            .options=${ this.documentTypeOptions }
            .value=${ this.formData.documentType }
          ></select-input>
        </div>

        <div class="form-group">
          <text-input
            id="documentNumber"
            label="Número de documento"
            placeholder="Ingresa tu número"
            .value=${ this.formData.documentNumber }
          ></text-input>
        </div>

        <div class="form-group">
          <checkbox-input
            id="remember"
            label="Recordar documento"
            .value=${ this.formData.remember }
          ></checkbox-input>
        </div>

        <div class="form-group">
          <password-input
            id="password"
            label="Contraseña de Banca por Internet"
            placeholder="Ingresa tu contraseña"
          ></password-input>
        </div>

        <a href="#" class="forgot-link">
          ¿Olvidaste o bloqueaste tu contraseña?
        </a>

        <div class="button-group">
          <button type="submit" class="btn btn-primary">Ingresar</button>
          <button type="button" class="btn btn-secondary">Afiliate</button>
        </div>
      </form>
    `;
  }

  async login(event) {
    event.preventDefault();
    console.log(this.formData)
    const { 
      documentType, 
      documentNumber,
      remember,
      password
    } = this.formData;
    
    if (!isValidDocumentNumber(documentType, documentNumber)) {
      alert('Número de documento no válido');
      return;
    }
    
    if (!isValidPassword(password)) {
      alert('Contraseña de Banca por Internet no válida');
      return;
    }

    const params = new URLSearchParams({
      documentType,
      documentNumber,
      password
    });

    const userResponse = await fetch(`http://localhost:3000/users?${ params }`);
    const user = await userResponse.json();

    if (!user || user.length === 0) {
      alert('Credenciales incorrectas');
      return;
    }

    if (remember) {
      const document = { documentType, documentNumber };
      localStorage.setItem('document', JSON.stringify(document));
    }

    const token = crypto.randomUUID();
    const access = { userId: user[0].id, token };

    const tokenResponse = await fetch('http://localhost:3000/tokens', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(access)
    })

    if (!tokenResponse.ok) {
      throw new Error('Error en el servidor');
    }

    localStorage.setItem('access', JSON.stringify(access));

    Router.navigate('dashboard');
  }

  handleInputChange(event) {
    const { id, value } = event.detail;
    this.formData = {
      ...this.formData,
      [id]: value
    };
  }
}