import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/iframe');
});

test('enters and verifies text inside the editor iframe', async ({ page }) => {
  const editor = page.frameLocator('#mce_0_ifr').locator('#tinymce');
  const text = 'Playwright can type inside an iframe.';

  await expect(editor).toBeEditable();
  await editor.fill(text);

  await expect(editor).toHaveText(text);
});

test('focus moves from the iframe to an element in the main document', async ({ page }) => {
  const editor = page.frameLocator('#mce_0_ifr').locator('#tinymce');
  const iframe = page.locator('#mce_0_ifr');
  const heading = page.getByRole('heading', { name: /An iFrame containing/ });

  await editor.click();
  await expect(iframe).toBeFocused();

  // Page locators target the main document even after a frame interaction.
  await heading.click();

  await expect(heading).toBeVisible();
  await expect(iframe).not.toBeFocused();
});
