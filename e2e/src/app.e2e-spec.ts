import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the expero shipping planner message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Expero Shipping Planner');
  });
});
