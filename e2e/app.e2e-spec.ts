import { ChessMcBestPage } from './app.po';

describe('chess-mc-best App', () => {
  let page: ChessMcBestPage;

  beforeEach(() => {
    page = new ChessMcBestPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
