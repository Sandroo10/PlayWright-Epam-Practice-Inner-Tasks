import { test, expect } from '../../fixtures/task-1.fixture.js';
import { task1StorageState } from '../../setup/task-1.global-setup.js';

test.use({ storageState: task1StorageState });

test('shows product details for Blue Top', async ({ productsPage, productDetailsPage }) => {
  await productsPage.goto();
  await productsPage.openProduct('Blue Top');

  await expect(productDetailsPage.productName).toBeVisible();
  await expect(productDetailsPage.productName).toHaveText('Blue Top');
  if (task1StorageState) {
    await expect(productDetailsPage.logoutLink).toBeVisible();
  }
});
