export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.cartLink = page.locator('a.shopping_cart_link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
  }

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addProduct(name) {
    const product = this.page.locator('.inventory_item').filter({
      has: this.page.getByText(name, { exact: true }),
    });
    await product.getByRole('button', { name: 'Add to cart', exact: true }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
