class VirtoInput extends HTMLElement {
    static css = `
        :host {
            display: block;
            width: 250px;
        }

        input {

            width: 100%;
            height: 100%;
            padding: 10px 0px;
            font-size: 20px;
            background-color: #f6f6f6;
            border: none;
            border-radius: 5px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease-in-out;
            outline: none;
        }

        input:focus {
            background-color: #ffffff;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
        }
    `;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._valor = '';

        const style = document.createElement("style");
        style.innerHTML = VirtoInput.css;
        this.shadowRoot.append(style);
    }
    
    connectedCallback() {
        const input = document.createElement('input');
        input.type = 'text';
        input.addEventListener('change', (event) => {
          this.valor = event.target.value;
        });
        this.shadowRoot.appendChild(input);
      }
    
      get valor() {
        if (isNaN(valor)) {
            alert('Must insert a number')
        }
        return this._valor;
      }
    
      set valor(valor) {
        this._valor = valor;
        this.dispatchEvent(new CustomEvent('valorCambiado', { detail: valor }));
      }

}

customElements.define('virto-input', VirtoInput);