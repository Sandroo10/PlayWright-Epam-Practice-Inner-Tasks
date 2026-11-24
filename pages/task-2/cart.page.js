export class CartPage {
  constructor(page) {
    this.title = page.getByTestId('title');
    this.items = page.locator('.cart_item');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout', exact: true });
    this.continueShopping = page.locator('xpath=//button[@id="continue-shopping"]');
  }

  productRow(name) {
    return this.items.filter({ hasText: name });
  }

  async removeProduct(name) {
    await this.productRow(name).getByRole('button', { name: 'Remove', exact: true }).click();
  }
}
