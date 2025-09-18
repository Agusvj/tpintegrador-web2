import { LitElement, html, css } from "lit";

class Carrito extends LitElement {
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
      <div class=" fixed z-10">
        <img
          src="src/svg/cart.svg"
          class="h-10 shadow-lg bg-blue-500 p-1 rounded-xl"
        />
      </div>
    `;
  }

  renderError() {
    return html`
      <div class="text-red-600 font-semibold sticky justify-end">
        Error al cargar el carrito
      </div>
    `;
  }
}

customElements.define("carrito-comp", Carrito);
