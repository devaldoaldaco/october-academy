const template = document.createElement("template");
template.innerHTML = `
    <section>
        <img src="https://via.placeholder.com/150" />
        <h2>Descripcion</h2>
        <p>500</p>
    </section>
`

export class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.img = "";
    this.price = 0;
    this.descripcion = "";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
