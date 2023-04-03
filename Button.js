class ButtonVirto extends HTMLElement {

    static css = `
  
   .btn {
            color: #fff;
            padding: .5rem 1rem;
            border: none;
            border-radius: .25rem;
            cursor: pointer;
            margin: 1rem;
          }

    .btn-light {
        background-color: var(--color-bg-alt);
        color: var(--color-text);
        border: 1px solid var(--color-text);
    }

    .btn-dark {
        background-color: var(--color-text);
        color: var(--color-bg-alt);
        border: 1px solid var(--color-bg-alt);
    }
   
`;

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      const style = document.createElement("style");
      const btn = document.createElement("button");

      style.innerHTML = ButtonVirto.css;
      btn.classList.add("btn");
      btn.innerText = this.getAttribute("label") || "Button";
      this.shadowRoot.append(style, btn)

      const theme = this.getAttribute("theme");
      if (theme === "light") {
        btn.classList.add("btn-light");
      } else if (theme === "dark") {
        btn.classList.add("btn-dark");
      }     
    }

    connectedCallback() {
        this.addEventListener('click', function () {
            alert('auch')
        })
    }
  }
  
  customElements.define('button-virto', ButtonVirto);