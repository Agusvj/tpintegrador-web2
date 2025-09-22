import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("product-detail")
export class ProductDetail extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div href="#" class="group relative block overflow-hidden max-w-xl">
        <img
          src="https://images.unsplash.com/photo-1599481238640-4c1288750d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2664&q=80"
          alt=""
          class="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div class="relative border border-gray-100 bg-white p-6">
          <span
            class="bg-yellow-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap"
          >
            New
          </span>

          <h3 class="mt-4 text-lg font-medium text-gray-900">Robot Toy</h3>

          <p class="mt-1.5 text-sm text-gray-700">
            Este sra un texto de descripcion que vendra por un param
          </p>

          <p class="mt-1.5 text-sm text-gray-900">$14.99</p>

          <form class="mt-4">
            <button
              class="block w-full rounded-sm bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
            >
              Add to Cart
            </button>
          </form>
        </div>
      </div>
    `;
  }
}
