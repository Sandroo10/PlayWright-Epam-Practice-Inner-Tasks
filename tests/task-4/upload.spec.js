import { randomUUID } from 'node:crypto';
import { test, expect } from '@playwright/test';

test('uploads a text file and displays its filename', async ({ page }) => {
  const filename = `playwright-upload-${randomUUID()}.txt`;
  await page.goto('https://the-internet.herokuapp.com/upload');

  await page.setInputFiles('#file-upload', {
    name: filename,
    mimeType: 'text/plain',
    buffer: Buffer.from('EPAM Playwright file upload practice.'),
  });
  await page.getByRole('button', { name: 'Upload', exact: true }).click();

  await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible();
  await expect(page.locator('#uploaded-files')).toHaveText(filename);
});
