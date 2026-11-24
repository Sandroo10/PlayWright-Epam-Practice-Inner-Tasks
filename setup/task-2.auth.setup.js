import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/task-2/login.page.js';

import { sauceDemoURL, sessionFile } from './task-2.session.js';

test('capture the authenticated SauceDemo session', async ({ page, context }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/\/inventory\.html$/);

  // SauceDemo's route guard reads a cookie. Save its value through session storage.
  const sessionCookie = (await context.cookies(sauceDemoURL))
    .find(({ name }) => name === 'session-username');
  expect(sessionCookie?.value).toBeTruthy();

  const session = await page.evaluate(({ name, value }) => {
    sessionStorage.setItem(name, value);
    return Object.fromEntries(Object.entries(sessionStorage));
  }, sessionCookie);

  await mkdir(dirname(sessionFile), { recursive: true });
  await writeFile(sessionFile, JSON.stringify(session), 'utf8');
});
