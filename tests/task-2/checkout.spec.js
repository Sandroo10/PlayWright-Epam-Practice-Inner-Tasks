import { test, expect, defaultProduct } from '../../fixtures/task-2.fixture.js';

const customer = { firstName: 'Taylor', lastName: 'Parker', postalCode: '01234' };

test('checkout requires a first name', async ({ cartWithProduct, checkoutPage }) => {
  await cartWithProduct.checkoutButton.click();
  await checkoutPage.continueWithDetails({ ...customer, firstName: '' });

  await expect(checkoutPage.error).toContainText('First Name is required');
});

test('checkout overview lists the backpack', async ({ cartWithProduct, checkoutPage }) => {
  await cartWithProduct.checkoutButton.click();
  await checkoutPage.continueWithDetails(customer);

  await expect(checkoutPage.title).toHaveText('Checkout: Overview');
  await expect(checkoutPage.orderItems).toHaveText([defaultProduct]);
});

test('finishing checkout confirms the order', async ({ cartWithProduct, checkoutPage }) => {
  await cartWithProduct.checkoutButton.click();
  await checkoutPage.continueWithDetails(customer);
  await checkoutPage.finishButton.click();

  await expect(checkoutPage.confirmation).toBeVisible();
});
