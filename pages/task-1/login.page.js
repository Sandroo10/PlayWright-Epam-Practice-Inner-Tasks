export class LoginPage {
  constructor(page) {
    this.page = page;
    const form = page.locator('.login-form');
    this.emailInput = form.getByPlaceholder('Email Address');
    this.passwordInput = form.getByPlaceholder('Password');
    this.loginButton = form.getByRole('button', { name: 'Login', exact: true });
    this.invalidCredentials = form.getByText('Your email or password is incorrect!', { exact: true });
    this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true });
  }

  async goto() {
    await this.page.goto('https://automationexercise.com/login');
  }

  async login(email, password) {
    await this.emailInput.type(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
