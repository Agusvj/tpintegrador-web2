import { LitElement, html, css, type PropertyDeclarations } from "lit";
import { getProducts } from "../data/products.ts";
class Product_List extends LitElement {
  static styles = css`
    @import "../style.css";
  `;

  constructor() {
    super();
  }
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
    
    
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 class="text-xl text-center font-bold text-gray-900 sm:text-3xl">
              Productos
            </h2>
          </header>

              <div >
                <p class="block text-xs md:text-2xl font-medium text-gray-700">Filtros</p>

                <div class="space-y-2  gap-6  flex mt-5 flex-wrap justify-center md:justify-start md:flex-row ">
                  <details
                    class="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden w-48"
                  >
                    <summary
                      class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                    >
                      <span class="text-sm font-medium"> Categoría </span>

                      <span class="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div class="border-t border-gray-200 bg-white">
                      <header class="flex items-center justify-between p-4">
                        

                        <button
                          type="button"
                          class="text-sm text-gray-900 underline underline-offset-4"
                        >
                          Reset
                        </button>
                      </header>

                      <ul class="space-y-1 border-t border-gray-200 p-4">
                        <li>
                          <label
                            for="FilterFor???"
                            class="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterInStock"
                              class="size-5 rounded-sm border-gray-300 shadow-sm"
                            />

                            <span class="text-sm font-medium text-gray-700">
                              Carnes
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            for="FilterPreOrder"
                            class="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterPreOrder"
                              class="size-5 rounded-sm border-gray-300 shadow-sm"
                            />

                            <span class="text-sm font-medium text-gray-700">
                              Verduleria
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            for="FilterOutOfStock"
                            class="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterOutOfStock"
                              class="size-5 rounded-sm border-gray-300 shadow-sm"
                            />

                            <span class="text-sm font-medium text-gray-700">
                              Lácteos
                            </span>
                          </label>
                        </li>
                      </ul>
                    </div>
                  </details>

                  <details
                    class="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden w-48"
                  >
                    <summary
                      class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition"
                    >
                      <span class="text-sm font-medium"> Precio </span>

                      <span class="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div class="border-t border-gray-200 bg-white">
                      <header class="flex items-center justify-between p-4">
                        
                        <button
                          type="button"
                          class="text-sm text-gray-900 underline underline-offset-4"
                        >
                          Reset
                        </button>
                      </header>

                      <div class="border-t border-gray-200 p-4">
                        <div class="flex justify-between gap-4">
                          <label
                            for="FilterPriceFrom"
                            class="flex items-center gap-2"
                          >
                            <span class="text-sm text-gray-600">$</span>

                            <input
                              type="number"
                              id="FilterPriceFrom"
                              placeholder="Desde"
                              class="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                            />
                          </label>

                          <label
                            for="FilterPriceTo"
                            class="flex items-center gap-2"
                          >
                            <span class="text-sm text-gray-600">$</span>

                            <input
                              type="number"
                              id="FilterPriceTo"
                              placeholder="Hasta"
                              class="w-full rounded-md border-gray-200 shadow-xs sm:text-sm"
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </details>

                  <details
                    class="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden w-48 mb-2 "
                  >
                    <summary
                      class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition "
                    >
                      <span class="text-sm font-medium"> Tags </span>

                      <span class="transition group-open:-rotate-180">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                          />
                        </svg>
                      </span>
                    </summary>

                    <div class="border-t border-gray-200 bg-white">
                      <header class="flex items-center justify-between p-4">

                        <button
                          type="button"
                          class="text-sm text-gray-900 underline underline-offset-4"
                        >
                          Reset
                        </button>
                      </header>

                      <ul class="space-y-1 border-t border-gray-200 p-4 flex flex-col ">
                        <li>
                          <label
                            for="FilterRed"
                            class="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterRed"
                              class="size-5 rounded-sm border-gray-300 shadow-sm"
                            />

                            <span class="text-sm font-medium text-gray-700">
                              Promoción
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            for="FilterBlue"
                            class="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterBlue"
                              class="size-5 rounded-sm border-gray-300 shadow-sm"
                            />

                            <span class="text-sm font-medium text-gray-700">
                              Producto Local
                            </span>
                          </label>
                        </li>

                        <li>
                          <label
                            for="FilterGreen"
                            class="inline-flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id="FilterGreen"
                              class="size-5 rounded-sm border-gray-300 shadow-sm"
                            />

                            <span class="text-sm font-medium text-gray-700">
                              Orgánico
                            </span>
                          </label>
                        </li>

                        
                      </ul>
                    </div>
                  </details>
                </div>
              </div>
            </div>
            
             
                <div class="lg:col-span-3">
                  <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <li>
                      <a href="#" class="group block overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                          alt=""
                          class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                        />

                        <div class="relative bg-white pt-3">
                          <h3
                            class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                          >
                            Basic Tee
                          </h3>

                          <p class="mt-2">
                            <span class="sr-only" > Regular Price </span>

                            <span class="tracking-wider text-gray-900">
                              £24.00 GBP
                            </span>
                          </p>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  }
}
customElements.define("product-list", Product_List);
