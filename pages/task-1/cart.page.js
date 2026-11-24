export class CartPage {
  constructor(page) {
    this.page = page;
    this.emptyMessage = page.locator('#empty_cart').getByText('Cart is empty!', { exact: true });
  }

  productRow(name) {
    return this.page.locator('#cart_info_table tbody tr').filter({
      has: this.page.getByRole('link', { name, exact: true }),
    });
  }

  async removeProduct(name) {
    await this.productRow(name).locator('.cart_quantity_delete').click();
  }
}
