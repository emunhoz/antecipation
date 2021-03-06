import { formatCurrency } from '../../utils/formatCurrency'
import kebabCase from '../../utils/kebabCase'

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

  get mask() {
    return this.getAttribute('mask') || '';
  }

  get max() {
    return this.getAttribute('max');
  }

  get min() {
    return this.getAttribute('min');
  }

  get maxLength() {
    return this.getAttribute('maxLength');
  }

  formatValue(e) {
    return e.target.value = formatCurrency(e.target.value)
  }

  connectedCallback() {
    this.render();

    let inputWithMaskMoney = this.shadow.querySelector("[data-mask='money']");
    inputWithMaskMoney && inputWithMaskMoney.addEventListener('input', this.formatValue.bind(this), false);
  }

  render() {
    const { label, type, helpMessage, mask, max, min, maxLength } = this

    const maxAttr = max && `max="${max}"` || '';
    const minAttr = min && `min="${min}"` || '';
    const maxLengthAttr = maxLength && `maxlength="${maxLength}"` || '';

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
        color: var(--text);
      }
    </style>
    <div class="base-input">

      <label for="${kebabCase(label)}">${label}</label>
      <input type="${type}" ${minAttr} ${maxAttr} ${maxLengthAttr} data-mask="${mask}" id="${kebabCase(label)}" />
      <small class="help-message">${helpMessage}</small>
    </div>
    `
  }
}
