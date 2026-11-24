import { readFile } from 'node:fs/promises';
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/task-2/login.page.js';
import { InventoryPage } from '../pages/task-2/inventory.page.js';
import { CartPage } from '../pages/task-2/cart.page.js';
import { CheckoutPage } from '../pages/task-2/checkout.page.js';
import { sauceDemoURL, sessionFile } from '../setup/task-2.session.js';

export const defaultProduct = 'Sauce Labs Backpack';

export const test = base.extend({
  authenticated: [true, { option: true }],

  context: async ({ context, authenticated }, use) => {
    if (authenticated) {
      const session = JSON.parse(await readFile(sessionFile, 'utf8'));
      await context.addInitScript(({ origin, session }) => {
        if (location.origin !== origin || sessionStorage.getItem('session-username')) {
          return;
        }

        for (const [name, value] of Object.entries(session)) {
          sessionStorage.setItem(name, value);
        }

        const username = sessionStorage.getItem('session-username');
        document.cookie = `session-username=${encodeURIComponent(username)}; Path=/; SameSite=Lax`;
      }, { origin: sauceDemoURL, session });
    }

    await use(context);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  cartWithProduct: async ({ inventoryPage, cartPage }, use) => {
    await inventoryPage.goto();
    await inventoryPage.addProduct(defaultProduct);
    await inventoryPage.openCart();
    await use(cartPage);
  },
});

export { expect } from '@playwright/test';
