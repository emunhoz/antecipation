export default class AlertMessage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._alert = {
      show: false,
      message: ''
    }
  }

  connectedCallback() {
    this.render();

    this.addEventListener('alert-message', (e) => {
      this._alert = {
        show: e.detail.show,
        message: e.detail.message
      }
      this.render()
    })
  }

  render() {
    const renderMessage = `
      <div class="alert">
        ${this._alert.message}
      </div>
    `

    const alertMessage = this._alert.show ? renderMessage : ''

    this.shadow.innerHTML = `
    <style>
      .alert {
        background: #ff9999;
        color: #bb0606;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 20px;
      }
    </style>
    ${alertMessage}
    `
  }
}
