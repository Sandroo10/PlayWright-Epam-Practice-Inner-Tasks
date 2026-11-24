import { test, expect, defaultProduct } from '../../fixtures/task-2.fixture.js';

test('the cart starts with one backpack', async ({ cartWithProduct }) => {
  await expect(cartWithProduct.title).toHaveText('Your Cart');
  await expect(cartWithProduct.items).toHaveCount(1);
  await expect(cartWithProduct.productRow(defaultProduct)).toBeVisible();
});

test('removing the backpack empties the cart', async ({ cartWithProduct, inventoryPage }) => {
  await cartWithProduct.removeProduct(defaultProduct);

  await expect(cartWithProduct.items).toHaveCount(0);
  await expect(inventoryPage.cartBadge).toHaveCount(0);
});

test('continuing shopping preserves the cart item', async ({ cartWithProduct, inventoryPage }) => {
  await cartWithProduct.continueShopping.click();

  await expect(inventoryPage.title).toHaveText('Products');
  await expect(inventoryPage.cartBadge).toHaveText('1');
});
