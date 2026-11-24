import { test, expect } from '../../fixtures/task-1.fixture.js';

test('a mobile shopper can find and open Blue Top', async ({ productsPage, productDetailsPage }) => {
  await productsPage.goto();
  await expect(productsPage.allProductsHeading).toBeVisible();
  await productsPage.searchFor('Blue Top');
  await expect(productsPage.productInResults('Blue Top')).toBeVisible();
  await productsPage.openProduct('Blue Top');

  await expect(productDetailsPage.productName).toBeVisible();
  await expect(productDetailsPage.productName).toHaveText('Blue Top');
});
