import {isEmail} from 'validator'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    #wrapper {
      margin: 5px;
      padding: 5px;
      display: inline-flex;
      border: 1px solid black;
      border-radius: 2px;
      align-items: center;
    }
    input {
      height: 20px;
    }
    p {
      display: inline-block;
    }  
  </style>

  <div id="wrapper">
    <p>Email:</p>
    <input type="text" id="usn">
    <p>→</p>
    <p id="result">❌</p>
  </div>
 `

/**
  * Define custom element.
  */
customElements.define('email-evaluator',
  class extends HTMLElement {
    /**
      * Creates an instance of the current type.
      */
    constructor() {
      super()

      // Attach a shadow DOM tree to this element and
      // append the template to the shadow root.
      this.attachShadow({mode: 'open'})
        .appendChild(template.content.cloneNode(true))

      this.email = this.shadowRoot.querySelector('#usn')
      this.evaluateButton = this.shadowRoot.querySelector('#evaluate')
      this.result = this.shadowRoot.querySelector('#result')
    }

    /**
      * Called after the element is inserted into the DOM.
      */
    connectedCallback() {
      this.email.addEventListener('keyup', () => {
        this.evaluateEmail()
      })
    }

    evaluateEmail() {
      const email = this.email.value
      const result = isEmail(email)

      if (result) {
        console.log('✅')
        this.result.textContent = '✅'
      } else {
        console.log('❌')
        this.result.textContent = '❌'
      }
    }
  },
)
