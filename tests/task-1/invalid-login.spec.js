import { test, expect } from '../../fixtures/task-1.fixture.js';

test('shows an error for invalid login credentials', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('missing-account@example.invalid', 'invalid-password');

  await expect(loginPage.invalidCredentials).toBeVisible();
});
