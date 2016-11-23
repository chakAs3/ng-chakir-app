import { NgChakirAppPage } from './app.po';

describe('ng-chakir-app App', function() {
  let page: NgChakirAppPage;

  beforeEach(() => {
    page = new NgChakirAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
