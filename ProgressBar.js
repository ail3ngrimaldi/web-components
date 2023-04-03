class ProgressBar extends HTMLElement {
    static css = `
        :host {
            display: block;
            width: 250px;
            height: 40px;
            background: #eeeeee;
            border-radius: 4px;
            overflow: hidden;
        }

        .fill {
            width: 0%;
            height: 100%;
            background: #00DF98;
            transition: width 0.25s;
        }
    `;

    static get observedAttributes() {
        // qué elementos serán observados en caso de que cambien, se pasa una lista
        // cuando el elemento percent cambie, queremos que fill cambie.
        return ["percent"];
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});

        const style = document.createElement("style");
        const fill = document.createElement("div");

        style.innerHTML = ProgressBar.css;
        fill.classList.add("fill");
        fill.setAttribute("id", "fill");
        this.shadowRoot.append(style, fill) // Nos deja agregar muchas cosas de una sola vez.
    }

    get percent() {
        // this, se refiere al elemento que estamos creando
        const value = this.getAttribute("percent");

        if(isNaN(value)) {
            return 0;
        } 

        if (value < 0) {
            return 0;
        }

        if (value > 100) {
            return 100;
        }

        return Number(value);
    }

    set percent (value) {
        this.setAttribute("percent", value);
    }

    connectedCallback () {
        const virtoInput = document.querySelector('#virto-input');
        if (virtoInput) {
            virtoInput.addEventListener('valorCambiado', (event) => {
            const percent = Number(event.detail);
            this.percent = percent;
            this.setAttribute('percent', percent);
            });
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === "percent") {
            this.shadowRoot.querySelector(".fill").style.width = `${newValue}%`
        }
    }
}

customElements.define('progress-bar', ProgressBar)