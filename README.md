# EPAM Playwright Practice Tasks

Four JavaScript assignments covering UI and API testing with Playwright Test.

## Task 1 — Automation Exercise

- Use Page Object Model and custom Playwright fixtures.
- Automate at least five desktop scenarios using click, fill, type, and hover. The scenarios cover product details, product search, adding Blue Top through the hover overlay, removing it from the cart, and invalid login.
- Run the desktop scenarios on Chromium and Firefox with four parallel workers.
- Add at least one mobile scenario. The Pixel 5 project searches for and opens Blue Top.
- Add at least one API test. The products-list test checks the response status and verifies that the catalog includes Blue Top.
- Use global setup for cookie-overlay and login preparation. The current setup supports login when both `TASK1_EMAIL` and `TASK1_PASSWORD` are set. Cookie-overlay handling is pending.
- Use the HTML reporter and retain screenshots, videos, and traces only for failures.

## Task 2 — SauceDemo framework

- Use varied locators and locator filtering.
- Provide custom Login, Inventory, Cart, and Checkout fixtures. Provide a cart fixture that starts with one product.
- Capture authenticated session data in a setup project and inject session storage into test contexts before navigation.
- Create at least three spec files with at least three tests each. Login covers valid, invalid, and locked-out users. Cart covers the preloaded item, removal, and continuing shopping. Checkout covers required fields, order overview, and order confirmation.
- Run the tests on Chromium, Firefox, and WebKit and support selecting each browser project individually.

## Task 3 — Iframe

On the [iframe demo](https://the-internet.herokuapp.com/iframe), write at least two tests.

1. Locate the editor inside the iframe, enter text, and verify it.
2. Interact with the editor, then interact with an element in the main document and verify that focus leaves the iframe.

## Task 4 — File upload and download

Write at least two tests.

1. On the [download page](https://the-internet.herokuapp.com/download), download a file and verify that it exists on the local filesystem.
2. On the [upload page](https://the-internet.herokuapp.com/upload), upload a file and verify the success message and uploaded filename.

## Run the tests

The tests require internet access to the demo sites.

```sh
npm ci
npx playwright install
npx playwright test
npx playwright show-report
```

Select a SauceDemo browser project by name.

```sh
npx playwright test --project=task2-chromium
npx playwright test --project=task2-firefox
npx playwright test --project=task2-webkit
```
