import { test, expect } from '../../fixtures/task-1.fixture.js';

test('removing the only product leaves an empty cart', async ({ productsPage, productDetailsPage, cartPage }) => {
  await productsPage.goto();
  await productsPage.openProduct('Blue Top');
  await productDetailsPage.addProductAndOpenCart();
  await expect(cartPage.productRow('Blue Top')).toBeVisible();

  await cartPage.removeProduct('Blue Top');

  await expect(cartPage.productRow('Blue Top')).toHaveCount(0);
  await expect(cartPage.emptyMessage).toBeVisible();
});
