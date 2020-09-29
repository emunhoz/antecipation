export default class LoadingEl extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "open" })
    this._loading = false
    this._message = 'Buscando...'
  }

  connectedCallback() {
    this.render()

    this.addEventListener('loading', (e) => {
      this._loading = e.detail
      this.render()
      this.setInitialLoadingMessage()
    })
  }

  slowConnectionMessage() {
    setTimeout(() => {
      this._message = 'Conexão lenta! Aguarde mais um pouco...'
      this.render()
    }, 6000)
  }

  setInitialLoadingMessage() {
    setTimeout(() => {
      this._message = 'Ainda buscando...';
      this.render()
      this.slowConnectionMessage()
    }, 3000)
  }

  render() {
    const renderLoading = `
      <div class="loading">
        <div class="spinner"></div>
        <div class="message">${this._message}</div>
      </div>
    `

    const loadingEl = this._loading ? renderLoading : ''

    this.shadow.innerHTML = `
    <style>
      .loading {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        right: 0;
        left: 0;
        top: 0;
        background: #ffffffd6;
        margin-bottom: 6px;
      }

      @keyframes spin {
        to { transform: rotate(360deg);}
      }

      .spinner {
        border: 8px solid rgba(0, 0, 0, 0.1);
        border-left-color: var(--text-secondary);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }

      .message {
        margin-top: 6px;
      }
    </style>
    ${loadingEl}
    `
  }
}
