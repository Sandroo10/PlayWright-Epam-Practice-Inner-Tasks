export class ProductDetailsPage {
  constructor(page) {
    this.productName = page.locator('.product-information h2');
    this.addToCartButton = page.locator('.product-information').getByRole('button', { name: 'Add to cart', exact: true });
    this.viewCartLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart', exact: true });
    this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true });
  }

  async addProductAndOpenCart() {
    await this.addToCartButton.click();
    await this.viewCartLink.click();
  }
}
