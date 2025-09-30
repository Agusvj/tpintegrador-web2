import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Tags } from "../data/tags";
@customElement("tags-list")
export class Tags_List extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Array }) tags: Tags[] = [];

  render() {
    if (!this.tags) {
      return html`<p class="p-4 text-center mt-5">⏳ Cargando tags...</p>`;
    }

    return html`
    
      <section>
      <header>
            <h2
              class="text-xl text-center  py-8 font-bold text-gray-900 sm:text-3xl"
            >
              Buscá por Tags
            </h2>
          </header>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 grid grid-cols-2 gap-4  sm:grid-cols-4 justify-items-center ">
          
          ${this.tags.map((tag) => {
            return html`
         
              <a
                class=" w-40 rounded-sm bg-blue-800  py-2  text-sm  text-center font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
                href="http://localhost:5173/index.html?tag=${tag.id}"
              >
                ${tag.title}
              </a>
              
              
            
      
        `;
          })}
          
          <a class="text-center w-40 rounded-sm bg-blue-800   py-2  text-sm   font-medium text-white transition hover:scale-110 hover:shadow-xl focus:ring-3 focus:outline-hidden"
                href="http://localhost:5173/index.html"
              >
                Mostrar Todo
              </a>
        </div>
      </section>
     `;
  }
}
