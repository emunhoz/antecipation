const template = document.createElement("template");
template.innerHTML = `
  <style>
    .base-card {
      margin: 0 auto;
      background: var(--light);
      border: 1px solid #d1dce3;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 41px 56px 44px;
      max-width: 608px;
      width: 100%;
    }
  </style>
  <div class="base-card">
    <slot></slot>
  </div>
`;

class BaseCard extends HTMLElement {
  constructor() {
    super();
    const shadowDOM = this.attachShadow({ mode: "open" });

    shadowDOM.appendChild(template.content.cloneNode(true));
  }
}

export default BaseCard;
