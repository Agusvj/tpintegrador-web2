import "../components/product-list";
import { getProducts } from "../data/products";
import { customElement, state } from "lit/decorators.js";
import { LitElement, html } from "lit";
import "../components/header";
import "../components/app-footer";
import "../components/tag-list";
import { getTags } from "../data/tags";

@customElement("home-page")
export class HomePage extends LitElement {
  @state() products: Array<Object> = [];
  @state() tags: Array<Object> = [];
  @state() error: string | null = null;

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.products = await getProducts();
    this.tags = await getTags();
  }
  render() {
    if (this.error) {
      return html`<p class="p-4 text-red-500">${this.error}</p> `;
    }
    if (!this.products) {
      return html`<p class="p-4 ">Cargando productos...</p>`;
    }

    return html`
      <app-header></app-header>
      <div class=" flex  flex-wrap items-center justify-center class="bg-gray-200"">
      <tags-list .tags=${this.tags}></tags-list>
      </div>
      <product-list .products=${this.products}></product-list>
      <app-footer></app-footer>
    `;
  }
}
