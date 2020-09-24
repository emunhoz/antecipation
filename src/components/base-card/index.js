export default class BaseCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
    <style>
      .base-card {
        margin: 0 auto;
        background: var(--light);
        border: 1px solid #d1dce3;
        box-sizing: border-box;
        border-radius: 4px;
        max-width: 608px;
        width: 100%;
      }
    </style>
    <div class="base-card">
      <slot></slot>
    </div>
    `
  }
}
