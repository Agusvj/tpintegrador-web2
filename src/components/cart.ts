import { LitElement, html } from "lit";
import { customElement, state, property } from "lit/decorators.js";
type CartItem = {
  id: number;
  name: string;
  price: number;
  picture: string;
  quantity: number;
};

@customElement("carrito-comp")
export class Carrito extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: Boolean }) open = false; // Recibe el estado desde el header
  @state() isOpen = false;
  @state() cantTotal = 0;
  @state() productos: CartItem[] = [];

  private addItem(item: CartItem) {
    const existing = this.productos.find((i) => i.id === item.id);
    if (existing) {
      this.productos = this.productos.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      this.cantTotal = this.cantTotal + 1;
    } else {
      this.productos = [...this.productos, { ...item, quantity: 1 }];
      this.cantTotal = this.cantTotal + 1;
    }
    localStorage.setItem("carrito", JSON.stringify(this.productos));
    localStorage.setItem("cant_total", this.cantTotal.toString());
    window.dispatchEvent(
      new CustomEvent("cart-count-changed", {
        detail: { count: this.cantTotal },
      })
    );
  }

  private removeItem(item: CartItem) {
    const index = this.productos.findIndex((p) => p.id === item.id);
    const product = this.productos[index];

    if (product.quantity > 1) {
      this.productos[index] = {
        ...product,
        quantity: product.quantity - 1,
      };
    } else {
      this.productos.splice(index, 1);
    }

    this.cantTotal = this.cantTotal - 1;
    localStorage.setItem("carrito", JSON.stringify(this.productos));
    localStorage.setItem("cant_total", this.cantTotal.toString());
    window.dispatchEvent(
      new CustomEvent("cart-count-changed", {
        detail: { count: this.cantTotal },
      })
    );
  }

  handleAddToCart(e: Event) {
    const detail = (e as CustomEvent).detail;
    this.addItem({ ...detail });
  }

  vaciarCarrito() {
    this.productos = [];
    this.cantTotal = 0;
    localStorage.setItem("carrito", "");
    localStorage.setItem("cant_total", "");
    window.dispatchEvent(
      new CustomEvent("cart-count-changed", { detail: { count: 0 } })
    );
  }

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("add-to-cart", this.handleAddToCart.bind(this));
    window.addEventListener("cart-open", this.handleCartOpen);
    this.productos = JSON.parse(
      localStorage.getItem("carrito") || "[]"
    ) as CartItem[];
    const cantidad = localStorage.getItem("cant_total");
    this.cantTotal = cantidad ? parseInt(cantidad) : 0;
    window.dispatchEvent(
      new CustomEvent("cart-count-changed", {
        detail: { count: this.cantTotal },
      })
    );
  }

  disconnectedCallback() {
    window.removeEventListener("add-to-cart", this.handleAddToCart.bind(this));
    window.removeEventListener("cart-open", this.handleCartOpen);
    super.disconnectedCallback();
  }

  private handleCartOpen = () => {
    this.isOpen = true;
  };

  private closeCart = () => {
    this.isOpen = false;
    window.dispatchEvent(new CustomEvent("cart-close"));
  };

  updated(changedProps: Map<string, any>) {
    if (changedProps.has("open")) {
      this.isOpen = this.open;
    }
  }

  render() {
    return this.isOpen
      ? html`
          <div
            class="fixed w-screen max-w-sm shadow-2xl z-51 bg-gray-200 px-4 py-8 sm:px-6 lg:px-8 right-0 top-0 h-full transform transition-transform duration-300 ease-in-out"
            aria-modal="true"
            role="dialog"
            tabindex="-1"
          >
            <button
              @click=${this.closeCart}
              class="absolute end-4 top-4 text-gray-600 transition-all hover:scale-110 cursor-pointer"
            >
              <span class="sr-only">Close cart</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div class="mt-4 space-y-6 flex flex-col">
              ${this.productos.map(
                (item) => html`
                  <li class="list-none flex flex-row">
                    <img
                      src="${item.picture}"
                      class="h-15 flex align-middle shadow-2xs rounded-full"
                    />
                    <div class="self-center flex flex-row">
                      <p class="px-2">${item.name}</p>
                      <p class="px-2 font-bold">X${item.quantity}</p>
                      <p class="font-bold text-green-500">
                        $${item.price * item.quantity}
                      </p>
                      <div class="flex px-4 gap-2">
                        <button
                          @click=${() =>
                            this.addItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              picture: item.picture,
                              quantity: item.quantity,
                            } as CartItem)}
                          class="font-bold inline-flex items-center justify-center bg-blue-500 rounded-full h-5 w-5 text-center cursor-pointer transition-all hover:scale-110"
                        >
                          +
                        </button>
                        <button
                          @click=${() =>
                            this.removeItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              picture: item.picture,
                              quantity: item.quantity,
                            } as CartItem)}
                          class="font-bold inline-flex items-center justify-center bg-blue-500 rounded-full h-5 w-5 text-center cursor-pointer transition-all hover:scale-110"
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </li>
                `
              )}

              <div class="space-y-4 text-center">
                <button
                  href="#"
                  class="inline rounded-sm bg-green-500 px-5 py-3 text-sm text-gray-100 transition hover:bg-green-600 cursor-pointer"
                >
                  Finalizar Compra
                </button>
                <button
                  @click=${this.vaciarCarrito}
                  href="#"
                  class="inline rounded-sm bg-red-500 px-5 py-3 text-sm text-gray-100 transition hover:bg-red-600 cursor-pointer"
                >
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        `
      : null;
  }

  renderError() {
    return html`
      <div class="text-red-600 font-semibold sticky justify-end">
        Error al cargar el carrito
      </div>
    `;
  }
}
