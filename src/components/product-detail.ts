import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("product-detail")
export class ProductDetail extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) title = "";
  @property({ type: String }) description = "";
  @property({ type: Number }) price = 0;
  @property({ type: Array }) pictures: string[] = [];
  @property({ type: Array }) tags: Array<{ title: string }> = [];
  @property({ type: Object }) category: any = null;
  @property({ type: Number }) productId = 0;
  private addToCart() {
    this.dispatchEvent(
      new CustomEvent("add-to-cart", {
        detail: {
          id: this.productId,
          name: this.title,
          price: this.price * 1000,
          picture: this.pictures,
        },
        bubbles: true, // <-- importante para que suba en el DOM
        composed: true,
      })
    );
  }

  render() {
    return html`
      <div class="bg-white">
        <div class="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div class="flex items-center">
                  <a
                    href="http://localhost:5173/listado.html?category-id=${this
                      .category.id}"
                    class="mr-2 text-sm font-medium text-gray-900"
                    >${this.category.title}</a
                  >
                  <svg
                    viewBox="0 0 16 20"
                    width="16"
                    height="20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="h-5 w-4 text-gray-300"
                  >
                    <path
                      d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"
                    />
                  </svg>
                </div>
              </li>
              <li>
                <div class="flex items-center">
                  <a href="#" class="mr-2 text-sm font-medium text-gray-900"
                    >${this.title}</a
                  >
                  <svg
                    viewBox="0 0 16 20"
                    width="16"
                    height="20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="h-5 w-4 text-gray-300"
                  >
                    <path
                      d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z"
                    />
                  </svg>
                </div>
              </li>
            </ol>
          </nav>

          <!-- Image gallery -->
          <div
            class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-8 lg:px-8"
          >
            ${[0, 1, 2, 3].map((i) => {
              const src = this.pictures.length
                ? this.pictures[i % this.pictures.length]
                : "";

              let classes = "rounded-lg object-cover";

              switch (i) {
                case 0:
                  classes +=
                    this.pictures.length === 1
                      ? " row-span-2 aspect-3/4 size-full"
                      : " row-span-2 aspect-3/4 size-full max-lg:hidden";
                  break;
                case 1:
                  classes += " col-start-2 aspect-3/2 size-full max-lg:hidden";
                  break;
                case 2:
                  classes +=
                    " col-start-2 row-start-2 aspect-3/2 size-full max-lg:hidden";
                  break;
                case 3:
                  classes +=
                    " row-span-2 aspect-4/5 size-full sm:rounded-lg lg:aspect-3/4 max-lg:hidden";
                  break;
              }

              return html`
                <img
                  src="http://161.35.104.211:8000${src}"
                  alt="Producto ${i + 1}"
                  class="${classes}"
                />
              `;
            })}
          </div>

          <!-- Product info -->
          <div
            class="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24"
          >
            <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1
                class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
              >
                ${this.title}
              </h1>
            </div>

            <!-- Options -->
            <div class="mt-4 lg:row-span-3 lg:mt-0">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl tracking-tight text-gray-900">
                $${this.price * 1000}
              </p>

              <div>
                <h3 class="text-sm font-medium text-gray-900 mb-3">
                  Etiquetas
                </h3>

                ${this.tags.map(
                  (tag) => html`
                    <span
                      class="bg-yellow-400 px-3 py-1.5 text-xs font-medium whitespace-nowrap mr-1"
                    >
                      ${tag.title}
                    </span>
                  `
                )}
              </div>

              <button
                @click=${this.addToCart}
                class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                Agregar al Carrito
              </button>
            </div>

            <div
              class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16"
            >
              <!-- Description and details -->
              <div>
                <h3 class="sr-only">Description</h3>

                <div class="space-y-6">
                  <p class="text-base text-gray-900">${this.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
