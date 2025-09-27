import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
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
  @state() isOpen = false;
  @state() cantTotal = 0;
  @state() productos: CartItem[] = [];

  private toggleSideBar() {
    this.isOpen = !this.isOpen;
  }
  private addItem(item: CartItem) {
    // Ver si ya existe el producto

    const existing = this.productos.find((i) => i.id === item.id);
    if (existing) {
      // Incrementar cantidad
      this.productos = this.productos.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      this.cantTotal = this.cantTotal + 1;
    } else {
      // Agregar nuevo
      this.productos = [...this.productos, { ...item, quantity: 1 }];
      this.cantTotal = this.cantTotal + 1;
    }
  }
  handleAddToCart(e: Event) {
    const detail = (e as CustomEvent).detail;

    this.addItem({ ...detail });
  }
  /* private boundHandleAddToCart = this.handleAddToCart.bind(this); */
  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("add-to-cart", this.handleAddToCart.bind(this));
  }
  disconnectedCallback() {
    // Remove the listener when the component is removed from the DOM
    window.removeEventListener("add-to-cart", this.handleAddToCart.bind(this));
    super.disconnectedCallback();
  }
  render() {
    return html`
      <div
        class="z-51 justify-end fixed m-6 hover:scale-110 hover:-rotate-4  transition duration-200  "
      >
        <button @click=${this.toggleSideBar} class=" cursor-pointer  block">
          <img
            src="src/svg/cart.svg"
            class="h-12 shadow-lg bg-blue-500 hover:shadow-blue-600/50 p-1 rounded-xl"
          />
          <span
            class="absolute bottom-0 right-0 font-bold inline-block w-5 h-5   text-white  bg-red-600 rounded-full "
          >
            ${this.cantTotal}
          </span>
        </button>
      </div>
      <div
        class=" fixed w-screen max-w-sm shadow-2xl  z-51 bg-gray-200 px-4 py-8 sm:px-6 lg:px-8 transform transition-transform duration-300 ease-in-out ${this
          .isOpen
          ? "translate-x-0"
          : "translate-x-[100%]"}"
        aria-modal="true"
        role="dialog"
        tabindex="-1"
      >
        <button
          @click=${this.toggleSideBar}
          class="absolute end-4 top-4 text-gray-600 transition-all hover:scale-110  cursor-pointer"
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

        <div class="mt-4 space-y-6 flex flex-col ">
          ${this.productos.map(
            (item) => html`
              <li class="list-none   flex flex-row ">
                <img
                  src="${item.picture}"
                  class="h-15 flex align-middle shadow-2xs rounded-full"
                />
                <div class="self-center  flex flex-row">
                  <p class="px-2">${item.name}</p>

                  <p class="px-2 font-bold ">X${item.quantity}</p>

                  <p class="font-bold text-green-500">
                    $${item.price * item.quantity}
                  </p>
                </div>
              </li>
            `
          )}

          <div class="space-y-4 text-center">
            <a
              href="#"
              class="block rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
            >
              Checkout
            </a>
          </div>
        </div>
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
