import { Angular2CliTestPage } from './app.po';

describe('angular2-sozluk App', () => {
  let page: Angular2CliTestPage;

  beforeEach(() => {
    page = new Angular2CliTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
