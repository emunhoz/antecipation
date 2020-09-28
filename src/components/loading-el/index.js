export default class LoadingEl extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._loading = false
  }

  connectedCallback() {
    this.render();

    this.addEventListener('loading', (e) => {
      this._loading = e.detail
      this.render()
    })
  }

  render() {
    const renderLoading = `
      <div class="loading">
        <div class="spinner"></div>
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
        right: 0;
        left: 0;
        top: 0;
        background: #ffffffd6;
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
    </style>
    ${loadingEl}
    `
  }
}
