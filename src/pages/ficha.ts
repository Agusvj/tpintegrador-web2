import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "../components/product-detail";

@customElement("ficha-page")
export class ProductPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  async connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);
    console.log(params);
  }

  render() {
    return html`
      <main class="flex flex-col items-center">
        <product-detail></product-detail>
      </main>
    `;
  }
}
