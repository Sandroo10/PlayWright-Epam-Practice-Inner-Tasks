export class CheckoutPage {
  constructor(page) {
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.finishButton = page.getByRole('button', { name: 'Finish', exact: true });
    this.error = page.getByTestId('error');
    this.title = page.getByTestId('title');
    this.orderItems = page.getByTestId('inventory-item-name');
    this.confirmation = page.getByText('Thank you for your order!', { exact: true });
  }

  async continueWithDetails({ firstName, lastName, postalCode }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }
}
