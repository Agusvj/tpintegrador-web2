import { LitElement, html, type PropertyDeclarations } from "lit";
import { customElement, property } from "lit/decorators.js";

import type { Categorie } from "../data/categories";
@customElement("cat-list")
export class Categories_List extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) categorias: Categorie[] = [];

  render() {
    return html`
      ${this.categorias.map((cat) => {
        return html`
          <button
            class="inline-block rounded-sm bg-indigo-600 px-8 py-3 mx-5 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
            href="http://localhost:5173/listado.html?cat=${cat.id}"
          >
            ${cat.title}
          </button>
          <product-list></product-list>
        `;
      })}
    `;
  }
}
