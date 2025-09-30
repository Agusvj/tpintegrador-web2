import { LitElement, html, type PropertyDeclarations } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import "./product-card";
import type { Product } from "../data/products";
@customElement("product-list")
export class Product_List extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) products: Product[] = [];
  @state() cat_id = "";

  render() {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat") ?? "";
    this.cat_id = categoria;
    if (this.cat_id == "") {
      return html`
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 bg-gray-100">
          <header>
            <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
              Productos
            </h2>
          </header>
          <ul class="mt-8 grid gap-4 sm:grid-cols-3 p lg:grid-cols-4 ">
          
          ${this.products.map((producto: Product) => {
            return html`
                <product-card
                  .title="${producto.title}"
                  .picture="http://161.35.104.211:8000${producto.pictures[0]}"
                  .price="${producto.price * 1000}"
                  .description="${producto.description}"
                  .productId=${producto.id}
                ></product-card>
              </ul>
            </div>
          </section>
        `;
          })}
        </div>
      </section>
    `;
    } else {
      const filteredProducts = this.products.filter((prod) => {
        return this.cat_id == prod.category_id;
      });

      return html`
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
              Productos
            </h2>
          </header>
          <ul class="mt-8 grid gap-4 sm:grid-cols-2 p lg:grid-cols-6 ">
          
          ${filteredProducts.map((producto: Product) => {
            return html`
                <product-card
                  .title="${producto.title}"
                  .picture="http://161.35.104.211:8000${producto.pictures[0]}"
                  .price="${producto.price * 1000}"
                  .description="${producto.description}"
                  .productId=${producto.id}
                ></product-card>
              </ul>
            </div>
          </section>
        `;
          })}
        </div>
      </section>
    `;
    }
  }
}
