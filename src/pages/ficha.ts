import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "../components/product-detail";
import { getProductByID } from "../data/products";
import "../components/app-footer";
import "../components/header";

@customElement("ficha-page")
export class ProductPage extends LitElement {
  @state() product: any = null;
  @state() error: string | null = null;

  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);

    let productId = params.get("product-id");

    this.product = await getProductByID(Number(productId));
  }

  render() {
    if (this.error) {
      return html`<p class="p-4 text-red-500 text-center mt-5">
        ${this.error}
      </p>`;
    }

    if (!this.product) {
      return html`<p class="p-4 text-center mt-5">⏳ Cargando producto...</p>`;
    }

    return html`
      <app-header></app-header>
      <main class="flex flex-col items-center">
        <product-detail
          .productId=${this.product.id}
          .title=${this.product.title}
          .description=${this.product.description}
          .price=${this.product.price}
          .pictures=${this.product.pictures}
          .tags=${this.product.tags}
          .category=${this.product.category}
        ></product-detail>
        <app-footer></app-footer>
      </main>
    `;
  }
}
