import { test, expect } from '../../fixtures/task-1.fixture.js';

test('shows Blue Top in the product search results', async ({ productsPage }) => {
  await productsPage.goto();
  await productsPage.searchFor('Blue Top');

  await expect(productsPage.searchResultsHeading).toBeVisible();
  await expect(productsPage.productInResults('Blue Top')).toBeVisible();
});
