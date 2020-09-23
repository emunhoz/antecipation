export default class BaseInput extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  get helpMessage() {
    return this.getAttribute('helpMessage') || ''
  }

  get label() {
    return this.getAttribute('label')
  }

  get type() {
    return this.getAttribute('type')
  }

  set label(val) {
    this.setAttribute('label', val)
  }

  set type(val) {
    this.setAttribute('label', val)
  }

  static get observedAttributes() {
    return ["label", "type"];
  }

  attributeChangedCallback(prop, oldVal, newVal) {
    if (prop === "label") {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { label, type, helpMessage } = this

    this.shadow.innerHTML = `
    <style>
      .base-input {
        margin-bottom: 26px;
      }
      .base-input label {
        margin-bottom: 6px;
        display: block;
        color: var(--text);
      }
      .base-input input {
        background: var(--light);
        border: 1px solid var(--border-input);
        box-sizing: border-box;
        border-radius: 4px;
        padding: 10px;
        width: 100%;
      }
      .base-input input:focus {
        outline: none;
        border: 1px solid var(--border-input-focus);
      }
      .base-input .help-message {
        font-weight: bold;
        font-size: var(--font-size-sm);
        color: var(--text-light);
      }
    </style>
    <div class="base-input">
      <label for="${label}">${label}</label>
      <input type="${type}" id="${label}" />
      <small class="help-message">${helpMessage}</small>
    </div>
    `
  }
}
