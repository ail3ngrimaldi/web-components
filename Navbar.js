class Navbar extends HTMLElement {
    // Propiedad estática para definir los estilos CSS del componente
    static css = `
        :host {
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 60px;
            background-color: #fff;
            color: #333;
            padding: 0 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
  
          /* Estilos para el logo */
          #logo {
            margin: 10px;
            font-size: 1.2rem;
            font-weight: bold;
          }
  
          /* Estilos para el menú desplegable */
          #menu {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            background-color: #fff;
            padding: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            z-index: 1;
            visibility: hidden;
            opacity: 0;
            transition: all 0.2s ease-in-out;
            height: 200px;
            width: 100%;
          }
  
          :host([menu-visible]) #menu {
            visibility: visible;
            opacity: 1;
          }
  
          /* Estilos para el botón de búsqueda */
          #search {
            border: none;
            padding: 6px 10px;
            border-radius: 4px;
            margin-left: 10px;
            background-color: #eee;
          }
  
          #search:focus {
            outline: none;
          }
    `;
    constructor() {
        super();
        this.attachShadow({mode: "open"});

        const style = document.createElement("style");
        style.innerHTML = Navbar.css;
        this.classList.add("nav-bar");
        this.shadowRoot.innerHTML = `
                    <div id="logo">
                        <slot name="logo"></slot>
                    </div>
                    <div id="left">
                        <slot name="left"></slot>
                    </div>

                    <div id="center">
                        <slot name="center"></slot>
                    </div>

                    <div id="right">
                        <slot name="right"></slot>
                        <button id="search">Buscar</button>
                        <button id="menu-button">Menú</button>
                        <div id="menu">
                        <slot name="menu"></slot>
                        </div>
                    </div>
        `;
        this.shadowRoot.append(style)
        const menuButton = this.shadowRoot.querySelector('#menu-button');
        menuButton.addEventListener('click', () => {
          this.toggleAttribute('menu-visible');
        });

    }
}

//This uses the customElementRegistry object to register a custom element on the page
//Takes three arguments, the last one is optional:
//1. String, name to the element, eg.: main-form
//2. Class object, that defines de behavior of the element 
//3. Options object:  { extends: "p" } declaring the element from which this new customized element extends
// Registrar el componente como un elemento personalizado
customElements.define('navbar-virto', Navbar)

//Two types of custom elements: 

//1. Autonomous custom elements - don't inherit from standard HTML elements.
//2. Customized built-in elements - inherit from basic HTML elements.
