import { test, expect } from '@playwright/test';

test('the products API returns Blue Top in the catalog', async ({ request }) => {
  const response = await request.get('https://automationexercise.com/api/productsList');

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.responseCode).toBe(200);
  expect(body.products).toEqual(expect.arrayContaining([
    expect.objectContaining({ name: 'Blue Top' }),
  ]));
});
