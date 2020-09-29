import toNumber from '../../utils/toNumber'
import { sendDataSimulation } from '../../services/simulation'

export default class HomePage extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: "open" })
    this._amount = 0
    this._installments = 0
    this._mdr = 0
    this._loading = false
  }

  setLoading(bool) {
    this.shadowRoot.querySelector('loading-el').dispatchEvent(new CustomEvent('loading', {
      bubbles: true,
      detail: bool
    }))
  }

  setAlert(show, message) {
    this.shadowRoot.querySelector('alert-message').dispatchEvent(new CustomEvent('alert-message', {
      bubbles: true,
      detail: { show, message }
    }))
  }

  addInputListener () {
    this.shadow.getElementById('amount').addEventListener('blur', () => {
      this._amount = this.shadowRoot.querySelectorAll('base-input')[0].shadowRoot.querySelector('input').value
      this.attemptSubmitForm()
    })
    
    this.shadow.getElementById('installments').addEventListener('blur', () => {
      this._installments = this.shadowRoot.querySelectorAll('base-input')[1].shadowRoot.querySelector('input').value
      this.attemptSubmitForm()
    })

    this.shadow.getElementById('mdr').addEventListener('blur', () => {
      this._mdr = this.shadowRoot.querySelectorAll('base-input')[2].shadowRoot.querySelector('input').value
      this.attemptSubmitForm()
    })
  }

  async attemptSubmitForm() {
    if (this._amount === 0 || this._installments === 0 || this._mdr === 0) return;
    
    this.setLoading(true)
    this.setAlert(false, '')

    const data = {
      amount: toNumber(this._amount),
      installments: toNumber(this._installments),
      mdr: toNumber(this._mdr)
    }

    try {
      const resp = await sendDataSimulation({ ...data })

      this.shadowRoot.querySelector('list-preview-values').dispatchEvent(new CustomEvent('request-data', {
        bubbles: true,
        detail: resp.data
      }));
    } catch (error) {
      this.setLoading(false)

      if (error.response.status === 408) return this.setAlert(true, `${error.response.data.message}: Tempo de espera excedido! Por favor, tente novamente em alguns mintuos!`)
      if (error.response.status === 500) return this.setAlert(true, `${error.response.data.message}: Tivemos um erro internamente. Por favor, tente mais tarde!`)
    }

    this.setLoading(false)
  }

  connectedCallback() {
    this.render()
    this.addInputListener()
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .main-title {
          font-size: var(--font-size-lg);
          margin-bottom: 22px;
        }
        
        .wrapper {
          padding: 41px 56px 44px;
        }

        .boxs {
          position: relative;
        }
        
        @media only screen and (min-width: 600px) {
          .boxs {
            display: flex;
          }
        }
        
        @media only screen and (max-width: 390px) {
          .wrapper {
            padding: 20px;
          }
        }
      </style>
      <base-card>
        <div class="boxs">
          <loading-el></loading-el>
          <div class="wrapper">
            <h1 class="main-title">Simule sua Antecipação</h1>
            <base-input id="amount" type="text" mask="money" label="Informe o valor da venda"></base-input>
            <base-input id="installments" type="text" max="12" maxLength="2" label="Em quantas parcelas" helpMessage="Máximo de 12 parcelas"></base-input>
            <base-input id="mdr" type="number" min="0" max="100" maxLength="3" label="Informe o percentual de MDR"></base-input>
          </div>
          <list-preview-values></list-preview-values>
        </div>
      </base-card>
    `
  }
}
