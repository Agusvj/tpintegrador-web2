import "../components/product-list";
import { getCategorieByID, getCategories } from "../data/categories.ts";
import { customElement, property, state } from "lit/decorators.js";
import { LitElement, html } from "lit";
import { Categories_List } from "../components/categories-list.ts";
import { Product_List } from "../components/product-list";
import "../components/header.ts";
import "../components/app-footer.ts";
import "../components/product-list.ts";
import { getProducts } from "../data/products.ts";

@customElement("list-page")
export class Listado extends LitElement {
  @state() categories: Array<Object> = [];
  @state() error: string | null = null;
  @state() products: Array<Object> = [];

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.categories = await getCategories();
    this.products = await getProducts();
  }
  render() {
    const page = window.location.pathname;
    console.log(page);
    if (this.error) {
      return html`<p class="p-4 text-red-500">${this.error}</p> `;
    }
    if (!this.categories) {
      return html`<p class="p-4 ">Cargando categorías...</p>`;
    }

    return html`
    <app-header></app-header>
      <div class=" flex  flex-wrap items-center justify-center class="bg-gray-200"">
        <cat-list .categorias=${this.categories}></cat-list>
      </div>
      <product-list .products=${this.products}></product-list>
      <app-footer></app-footer>
    `;
  }
}
