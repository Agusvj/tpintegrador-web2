import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
//los decoradores son opcionales, como @customElements

export class ProductCard extends LitElement {
  @property({ type: String }) title = "";
  @property({ type: String }) picture = "";
  @property({ type: String }) description = "";
  @property({ type: Number }) price = 0;

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
            class="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          />

          <div class="relative bg-white pt-3">
            <h3
              class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
            >
              ${this.title}
            </h3>

            <p class="mt-2">
              <span class="sr-only"> Regular Price </span>
              <span class="tracking-wider text-gray-900">
                ${this.price}
                <p>${this.description}</p>
              </span>
            </p>
          </div>
        </a>
      </li>
    `;
  }
}
customElements.define("product-card", ProductCard);
