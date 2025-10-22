export class ProductCard extends HTMLElement {
    constructor() {
        super();
        this.img = '';
        this.description = '';
        this.price = 0;
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        console.log('se ejecuto connectedCallback');
        this.render();
    }

    disconnectedCallback() {
        console.log('se ejecuto disconnectedCallback');
    }

    static observedAttributes = ['img', 'description', 'price'];

    attributeChangedCallback(attr, oldValueAttr, valueAttr) {
        if(attr === 'price') {
            console.log(attr, valueAttr);
            this.price = valueAttr;

        }
        
        if(attr === 'description') {
            console.log(attr, valueAttr);
            this.description = valueAttr;

        }

        if(attr === 'img') {
            console.log(attr, valueAttr);
            this.img = valueAttr;

        }
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
            :host {
                background-color: grey;
            }
            section {
                height: fit-content;
                border: 1px solid black;
                display: inline-block;
                box-sizing: content-box;
                padding: 1rem;
                img {
                    width: 100px;
                    margin: 0 auto;
                }

                p {
                    width: 200px;
                }
            }
        </style>
        <section>
            <img src="${this.img}">
            <p>${this.description}</p>
            <span>${this.price}</span>
        </section>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

}