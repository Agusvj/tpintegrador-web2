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

  // Handler referenciado correctamente
  private addToCartHandler = this.handleAddToCart.bind(this);

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
    this.productos = this.productos
      .map((p) => (p.id === item.id ? { ...p, quantity: p.quantity - 1 } : p))
      .filter((p) => p.quantity > 0);

    this.cantTotal = this.productos.reduce((acc, i) => acc + i.quantity, 0);

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
    localStorage.setItem("carrito", JSON.stringify([]));
    localStorage.setItem("cant_total", "0");
    window.dispatchEvent(
      new CustomEvent("cart-count-changed", { detail: { count: 0 } })
    );
  }
  calcValorTotal(): number {
    let valorTotal: number = 0;
    this.productos.forEach(
      (p) => (valorTotal = valorTotal + p.price * p.quantity)
    );
    return valorTotal;
  }
  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("add-to-cart", this.addToCartHandler);
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
    window.removeEventListener("add-to-cart", this.addToCartHandler);
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
            class="fixed w-screen max-w-full sm:max-w-sm shadow-2xl z-51 bg-gray-500 px-4 py-8 sm:px-6 lg:px-8 right-0 top-0 h-full transform transition-transform duration-300 ease-in-out max-h-screen"
            aria-modal="true"
            role="dialog"
            tabindex="-1"
          >
            <button
              @click=${this.closeCart}
              class="absolute end-4 top-4 text-white transition-all hover:scale-110 cursor-pointer"
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

            <p class="font-bold text-white">Lista de Productos:</p>
            <hr class="text-white mt-4" />
            <div
              class="mt-4 space-y-6 flex flex-col overflow-y-auto overflow-x-hidden max-h-8/12"
            >
              ${this.productos.map(
                (item) => html`
                  <li class="list-none flex flex-row text-white">
                    <img
                      src="${item.picture}"
                      class="h-12 flex align-middle shadow-2xs rounded-full"
                    />
                    <div class="self-center grid grid-cols-4 justify-between items-center w-full max-w-full">
                      <p class="text-sm col-span-2 mx-2">${item.name}</p>

                      <div>
                      <p class="font-bold text-sm col-span-1">X${
                        item.quantity
                      }</p>
                      
                      <p class="font-bold text-green-500 text-sm col-span-1">
                      $${item.price * item.quantity}
                      </p>
                      </div>

                      <div class="flex items-center gap-1 col-span-1">
                        <button
                          type="button"
                          @click=${() =>
                            this.removeItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              picture: item.picture,
                              quantity: item.quantity,
                            } as CartItem)}
                          class="size-10 leading-10 text-white transition hover:opacity-75"
                        >
                          &minus;
                        </button>

                        <button
                          type="button"
                          @click=${() =>
                            this.addItem({
                              id: item.id,
                              name: item.name,
                              price: item.price,
                              picture: item.picture,
                              quantity: item.quantity,
                            } as CartItem)}
                          class="size-10 leading-10 text-white transition hover:opacity-75"
                        >
                          &plus;
                        </button>
                      </div>            
                  </li>
                `
              )}
            </div>
            <hr class="text-white my-4" />
            <div class="mb-4">
              <span class="font-bold text-white"
                >Valor Total:<span class="text-green-500 font-bold">
                  $${this.calcValorTotal()}</span
                ></span
              >
            </div>
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
