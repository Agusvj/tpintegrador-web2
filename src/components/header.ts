import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { getCategories } from "../data/categories";
import "../components/cart.ts";

@customElement("app-header")
export class Appheader extends LitElement {
  @state() private showCategories = false;
  @state() private showMobileMenu = false;
  @state() categories: any = null;
  @state() private cartOpen = false;
  @state() private cartCount = 0;

  createRenderRoot() {
    return this;
  }
  async connectedCallback() {
    super.connectedCallback();
    this.categories = await getCategories();
    document.addEventListener("click", this.handleClickOutside);

    const cantidad = localStorage.getItem("cant_total");
    this.cartCount = cantidad ? parseInt(cantidad) : 0;

    window.addEventListener(
      "cart-count-changed",
      this.handleCartCountChanged as EventListener
    );
    window.addEventListener(
      "cart-close",
      this.handleCartClose as EventListener
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener(
      "cart-count-changed",
      this.handleCartCountChanged as EventListener
    );
    window.removeEventListener(
      "cart-close",
      this.handleCartClose as EventListener
    );
  }

  private handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!this.contains(target)) {
      this.showCategories = false;
    }
  };

  private openCart = () => {
    this.cartOpen = true;
    window.dispatchEvent(new CustomEvent("cart-open"));
  };

  private handleCartCountChanged = (e: CustomEvent) => {
    this.cartCount = e.detail.count;
  };

  private handleCartClose = () => {
    this.cartOpen = false;
  };

  render() {
    return html`
      <header
        class="bg-gradient-to-t from-blue-800 via-blue-700 to-blue-50 sticky top-0 z-50"
      >
        <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-20 items-center justify-between">
            <!-- Logo -->
            <div
              class="flex-1 md:flex md:items-center md:gap-12 max-h-20 items-center"
            >
              <a href="/">
                <span class="sr-only">Home</span>
                <img src="./src/svg/logo.png" class="max-h-20 max-w-48" />
              </a>
            </div>

            <!-- Menú + Carrito -->
            <div class="flex items-center gap-4">
              <!-- Categorías (desktop) -->
              <div class="hidden md:relative md:block">
                <button
                  type="button"
                  class="overflow-hidden px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 hover:text-gray-700 focus:relative divide-gray-300 rounded border border-gray-300 bg-white shadow-sm"
                  @click=${() => (this.showCategories = !this.showCategories)}
                >
                  <span class="sr-only">Toggle dashboard menu</span>
                  Categorias
                </button>

                ${this.showCategories
                  ? html`
                      <div
                        class="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                        role="menu"
                      >
                        <div class="p-2">
                          ${this.categories?.map(
                            (cat: any) => html`
                              <a
                                href="http://localhost:5173/listado.html?cat=${cat.id}"
                                class="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                                role="menuitem"
                              >
                                ${cat.title}
                              </a>
                            `
                          )}
                        </div>
                      </div>
                    `
                  : null}
              </div>

              <!-- Botón hamburguesa (mobile) -->
              <div class="block md:hidden">
                <button
                  class="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  @click=${() => (this.showMobileMenu = !this.showMobileMenu)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>

              <!-- Carrito Button (triggers modal) -->
              <button class="relative cursor-pointer" @click=${this.openCart}>
                <img
                  src="src/svg/carro.png"
                  alt="Cart"
                  class="w-8  cursor-pointer"
                />
                <span
                  class="text-center absolute bottom-0 right-0 z-10 bg-red-600/90 rounded-full h-5 w-5 text-white text-xs flex items-center justify-center"
                >
                  ${this.cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Menú mobile desplegable -->
        ${this.showMobileMenu
          ? html`
              <div
                class="absolute left-0 right-0 top-16 z-20 bg-white border-t border-gray-200 shadow-md"
              >
                <nav class="flex flex-col p-4 space-y-2">
                  ${this.categories?.map(
                    (cat: any) => html`
                      <a
                        href="#"
                        class="block rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        ${cat.title}
                      </a>
                    `
                  )}
                </nav>
              </div>
            `
          : null}
      </header>

      <!-- Carrito Modal (outside header for modal effect) -->
      <carrito-comp .open=${this.cartOpen}></carrito-comp>
    `;
  }
}
//${() => (this.showMenu = !this.showMenu)}
