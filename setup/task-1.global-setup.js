import { mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { chromium, expect } from '@playwright/test';
import { LoginPage } from '../pages/task-1/login.page.js';

const { TASK1_EMAIL, TASK1_PASSWORD } = process.env;

export const task1StorageState = TASK1_EMAIL && TASK1_PASSWORD
  ? 'playwright/.auth/task-1.json'
  : undefined;

export default async function globalSetup() {
  if (Boolean(TASK1_EMAIL) !== Boolean(TASK1_PASSWORD)) {
    throw new Error('Set both TASK1_EMAIL and TASK1_PASSWORD to enable Task 1 login setup.');
  }

  if (!task1StorageState) {
    return;
  }

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext();
    const loginPage = new LoginPage(await context.newPage());
    await loginPage.goto();
    await loginPage.login(TASK1_EMAIL, TASK1_PASSWORD);
    await expect(loginPage.logoutLink).toBeVisible();

    await mkdir(dirname(task1StorageState), { recursive: true });
    await context.storageState({ path: task1StorageState });
  } finally {
    await browser.close();
  }
}
