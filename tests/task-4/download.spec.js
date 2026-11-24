import { rm, stat } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

test('downloads a text file and verifies it exists locally', async ({ page }, testInfo) => {
  await page.goto('https://the-internet.herokuapp.com/download');
  const link = page.getByRole('link', { name: 'sample.txt', exact: true });
  const outputPath = testInfo.outputPath('downloaded-sample.txt');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    link.click(),
  ]);

  try {
    expect(download.suggestedFilename()).toBe('sample.txt');
    await download.saveAs(outputPath);
    const file = await stat(outputPath);
    expect(file.isFile()).toBe(true);
    expect(file.size).toBeGreaterThan(0);
  } finally {
    await rm(outputPath, { force: true });
  }
});
