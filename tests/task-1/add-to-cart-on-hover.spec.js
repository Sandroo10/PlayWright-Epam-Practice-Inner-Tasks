import { test, expect } from '../../fixtures/task-1.fixture.js';

test('adds Blue Top to the cart from the product hover overlay', async ({ productsPage, cartPage }) => {
  await productsPage.goto();
  await productsPage.addToCartFromOverlay('Blue Top');
  await productsPage.openCartFromConfirmation();

  await expect(cartPage.productRow('Blue Top')).toBeVisible();
});
