import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Product_List } from "./product-list";
import type { Categorie } from "../data/categories";
@customElement("cat-list")
export class Categories_List extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) categorias: Categorie[] = [];

  render() {
    return html`
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2
              class="text-xl text-center py-8 font-bold text-gray-900 sm:text-3xl"
            >
              Buscá por categorias
            </h2>
          </header>
          ${this.categorias.map((cat) => {
            return html`
            
         
              <a
                class="inline-block rounded-sm bg-indigo-600 px-8 py-3 mx-5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
                href="http://localhost:5173/listado.html?cat=${cat.id}"
              >
                ${cat.title}
              
            </div>
          </section>
        `;
          })}
        </div>
      </section>
    `;
  }
}
