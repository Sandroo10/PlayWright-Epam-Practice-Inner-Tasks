import { test, expect } from '../../fixtures/task-2.fixture.js';

test.use({ authenticated: false });

test('a standard user can sign in', async ({ loginPage, inventoryPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');

  await expect(inventoryPage.title).toHaveText('Products');
  await expect(inventoryPage.cartLink).toBeVisible();
});

test('a wrong password is rejected', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('standard_user', 'wrong-password');

  await expect(loginPage.error).toContainText('Username and password do not match');
});

test('a locked-out user is rejected', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('locked_out_user', 'secret_sauce');

  await expect(loginPage.error).toContainText('Sorry, this user has been locked out');
});
