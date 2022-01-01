import {isStrongPassword} from 'validator'

/**
 * Define template.
 */
const template = document.createElement('template')
template.innerHTML = `
  <style>
    #wrapper {
      width: 310px;
      padding: 5px;
      display: flex;
      align-items: center;
      border: 1px solid black;
      border-radius: 2px;
      flex-wrap: wrap;
    }
    input[type="text"] {
      height: 20px;
    }
    p {
      display: inline-block;
    }
    input[type="range"] {
      overflow: hidden;
      width: 100%;
      -webkit-appearance: none;
      border: 1px solid black;
    }
    input[type='range']::-webkit-slider-runnable-track {
      height: 10px;
      width: 100%;
      -webkit-appearance: none;
      
    }
    input[type='range']::-webkit-slider-thumb {
      width: 2px;
      -webkit-appearance: none;
      height: 10px;
      cursor: ew-resize;
      background: gray;
      box-shadow: -300px 0 0 300px lightgray;
    }
    .item {
      width: 100%;
    }
    #left {
      float: left;
    }
    #right {
      float: right;
    }
  </style>

  <div id="wrapper">
    <div class="item">
      <p>Password:</p>
      <input type="text" id="pw">
      <p>→</p>
      <p id="result">0</p></div>
    <div class="item">
      <input type="range" value=0 disabled>
      <span id="left">0</span>
      <span id="right">100</span>
    </div>
  </div> 
 `

/**
  * Define custom element.
  */
customElements.define('password-evaluator',
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

      this.password = this.shadowRoot.querySelector('#pw')
      this.evaluateButton = this.shadowRoot.querySelector('#evaluate')
      this.result = this.shadowRoot.querySelector('#result')
      this.quality = this.shadowRoot.querySelector('input[type="range"]')
    }

    /**
      * Called after the element is inserted into the DOM.
      */
    connectedCallback() {
      this.password.addEventListener('keyup', () => {
        this.evaluateEmail()
      })
    }

    evaluateEmail() {
      const password = this.password.value
      const result = isStrongPassword(password, { returnScore: true })

      this.result.textContent = result

      if(result > 100) {
        this.quality.value = 100
      } else if (result < 100 && result >= 0) {
        this.quality.value = result
      }
    }
  },
)
