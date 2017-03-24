import { MeanTutorialPage } from './app.po';

describe('mean-tutorial App', () => {
  let page: MeanTutorialPage;

  beforeEach(() => {
    page = new MeanTutorialPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
