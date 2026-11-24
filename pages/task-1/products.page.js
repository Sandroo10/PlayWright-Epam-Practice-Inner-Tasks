export class ProductsPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.searchResultsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.allProductsHeading = page.getByRole('heading', { name: 'All Products', exact: true });
    this.viewCartLink = page.locator('#cartModal').getByRole('link', { name: 'View Cart', exact: true });
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/products');
  }

  async searchFor(text) {
    await this.searchInput.fill(text);
    await this.searchButton.click();
  }

  productInResults(name) {
    return this.productCard(name).locator('.productinfo').getByText(name, { exact: true });
  }

  productCard(name) {
    return this.page.locator('.features_items .product-image-wrapper').filter({
      has: this.page.locator('.productinfo').getByText(name, { exact: true }),
    });
  }

  async openProduct(name) {
    await this.productCard(name).getByRole('link', { name: 'View Product', exact: true }).click();
  }

  async addToCartFromOverlay(name) {
    const card = this.productCard(name);
    await card.locator('.single-products').hover();
    await card.locator('.product-overlay').getByText('Add to cart', { exact: true }).click();
  }

  async openCartFromConfirmation() {
    await this.viewCartLink.click();
  }
}
