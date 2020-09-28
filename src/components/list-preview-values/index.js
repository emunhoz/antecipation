import { maskCurrency } from '../../utils/formatCurrency'

export default class ListPreviewValues extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this._data = {
      1: 0,
      15: 0,
      30: 0,
      90: 0
    };
  }

  updateValues() {
    this.addEventListener('request-data', (e) => {
      this._data = e.detail
      this.render()
    })
  }

  connectedCallback() {
    this.render();
    this.updateValues()
  }

  render() {
    this.shadow.innerHTML = `
    <style>
      :host {
        display: flex;
      }

      .forecast-values {
        background: var(--secondary-bg-color);
        font-style: italic;
        width: 100%;
        padding: 54px;
      }
      
      .forecast-values .title {
        font-size: var(--font-size-md);
        color: var(--text-secondary);
        text-transform: uppercase;
        border-bottom: 1px solid #5d9cec52;
        margin-bottom: 16px;
        padding-bottom: 6px;
      }
      
      .forecast-values ul {
        list-style: none;
        padding: 0;
        margin: 0;
        color: var(--secondary-text-light);
      }
      
      .forecast-values ul li {
        list-style: none;
        color: var(--secondary-text-light);
        font-size: var(--font-size-md);
        line-height: 44px;
        font-weight: lighter;
      }
      
      .forecast-values ul li span {
        font-weight: bold;
      }
      
      @media only screen and (min-width: 600px) {
        .forecast-values {
          padding: 83px 35px;
          width: 180px;
        }
      }

      @media only screen and (max-width: 390px) {
        .forecast-values {
          padding: 20px;
        }
      }
    </style>
    <div class="forecast-values">
      <h2 class="title">Você receberá</h2>
      <ul>
        <li>Amanhã: <span>${maskCurrency(this._data[1])}</span></li>
        <li>Em 15 dias: <span>${maskCurrency(this._data[15])}</span></li>
        <li>Em 30 dias: <span>${maskCurrency(this._data[30])}</span></li>
        <li>Em 90 dias: <span>${maskCurrency(this._data[90])}</span></li>
      </ul>
    </div>
    `
  }
}
