import "../components/product-list";
import { getProducts } from "../data/products";
import { customElement, state } from "lit/decorators.js";
import { LitElement, html } from "lit";

@customElement("home-page")
export class HomePage extends LitElement {
  @state() products: Array<Object> = [];
  @state() error: string | null = null;

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.products = await getProducts();
    console.log("holaaaaaaaaaa");
    console.log(this.products);
  }
  render() {
    if (this.error) {
      return html`<p class="p-4 text-red-500">${this.error}</p> `;
    }
    if (!this.products) {
      return html`<p class="p-4 ">Cargando productos...</p>`;
    }

    return html` <product-list .products=${this.products}></product-list> `;
  }
}
