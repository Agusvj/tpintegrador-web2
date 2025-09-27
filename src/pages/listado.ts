import "../components/product-list";
import { getCategorieByID, getCategories } from "../data/categories.ts";
import { getProducts } from "../data/products.ts";
import { customElement, property, state } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { Categories_List } from "../components/categories-list.ts";

@customElement("list-page")
export class Listado extends LitElement {
  @state() categories: Array<Object> = [];
  @state() products: Array<Object> = [];
  @state() error: string | null = null;

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.categories = await getCategories();
    this.products = await getProducts();
  }
  render() {
    if (this.error) {
      return html`<p class="p-4 text-red-500">${this.error}</p> `;
    }
    if (this.categories.length === 0) {
      return html`<p class="p-4 ">Cargando categorías...</p>`;
    }

    return html`
      <div class=" flex  flex-wrap items-center justify-center ">
        <cat-list .categorias=${this.categories}></cat-list>
        <product-list .products=${this.products}> </product-list>
      </div>
    `;
  }
}
