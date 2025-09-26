import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import type { Product } from "../data/products";
//los decoradores son opcionales, como @customElements

export class ProductCard extends LitElement {
  @property({ type: String }) title = "";
  @property({ type: String }) picture = "";
  @property({ type: String }) description = "";
  @property({ type: Number }) price = 0;
  @property({ type: Number }) productId = 0;

  static styles = css`
    @import "./style.css";
  `;

  constructor() {
    super();
  }

  // Evita Shadow DOM para que los estilos globales apliquen
  createRenderRoot(): this {
    return this;
  }

  render() {
    return html`
      <li>
        <a href="#" class="group block overflow-hidden">
          <img
            src="${this.picture}"
            alt="${this.title}"
            class="h-[350px] w-full object-contain transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />

          <div class="relative bg-white pt-3">
            <h3
              class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
            >
              ${this.title}
            </h3>

            <div class="mt-2 flex flex-col gap-6  items-start">
              <span class="sr-only"> Regular Price </span>
              <span class="tracking-wider text-gray-900"> ${this.price} </span>
            </div>
            <div class="mt-2 flex flex-col gap-6  items-start h-15">
              <p class="flex-grow  ">${this.description}</p>
            </div>
          </div>
        </a>
        <div class="mt-2 flex flex-row gap-4  m-3 items-center">
          <a
            class="flex-1 text-grow "
            href="http://localhost:5173/ficha.html?category-id=${this
              .productId}"
            >Ver mas</a
          >

          <a
            class=" inline-flex items-center  rounded-full border border-indigo-600 p-3  text-indigo-600 hover:bg-indigo-300 hover:text-white focus:ring-3 focus:outline-hidden"
            href="#"
          >
            <span class="sr-only"> Download </span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
              class="w-8 h-8"
            >
              <g>
                <g
                  fill-rule="evenodd"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="4.1"
                >
                  <g fill="#002cba">
                    <path
                      d="M3 2.014a1 1 0 0 0 0 2h1.18l2.644 13.244A3.018 3.018 0 0 0 5 20.014c0 1.644 1.355 3 3 3h17a1 1 0 0 0 0-2H8c-.571 0-1-.429-1-1a.97.97 0 0 1 .924-.993.95.95 0 0 0 .078.018l18-.025a1 1 0 0 0 .986-.846l1.73-11a1 1 0 0 0-.988-1.154H6.62l-.64-3.198A1 1 0 0 0 5 2.014zm4.018 6H26.56l-1.416 9c-5.443.005-10.885 0-16.33 0zM9 24.014c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.564 0 1 .436 1 1s-.436 1-1 1-1-.436-1-1 .436-1 1-1zM23 24.014c-1.645 0-3 1.355-3 3s1.355 3 3 3 3-1.355 3-3-1.355-3-3-3zm0 2c.564 0 1 .436 1 1s-.436 1-1 1-1-.436-1-1 .436-1 1-1z"
                      fill="#002cba"
                      opacity="1"
                      data-original="#002cba"
                    ></path>
                  </g>
                  <path
                    fill="#00c89f"
                    d="M11 10.014a1 1 0 0 0-1 1 1 1 0 0 0 1 1h12a1 1 0 0 0 1-1 1 1 0 0 0-1-1zM13 13.014a1 1 0 0 0-1 1 1 1 0 0 0 1 1h8a1 1 0 0 0 1-1 1 1 0 0 0-1-1z"
                    opacity="1"
                    data-original="#00c89f"
                  ></path>
                </g>
              </g>
            </svg>
          </a>
        </div>
      </li>
    `;
  }
}
customElements.define("product-card", ProductCard);
