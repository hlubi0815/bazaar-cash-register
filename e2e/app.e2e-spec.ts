import {BazaarCashRegisterPage} from './app.po';

describe('bazaar-cash-register App', () => {
  let page: BazaarCashRegisterPage;

  beforeEach(() => {
    page = new BazaarCashRegisterPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
