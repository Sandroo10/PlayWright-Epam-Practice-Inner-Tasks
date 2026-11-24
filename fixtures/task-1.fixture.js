import { test as base } from '@playwright/test';
import { ProductsPage } from '../pages/task-1/products.page.js';
import { ProductDetailsPage } from '../pages/task-1/product-details.page.js';
import { CartPage } from '../pages/task-1/cart.page.js';
import { LoginPage } from '../pages/task-1/login.page.js';

export const test = base.extend({
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from '@playwright/test';
