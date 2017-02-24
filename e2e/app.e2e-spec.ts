import { SlackChatbotPage } from './app.po';

describe('slack-chatbot App', function() {
  let page: SlackChatbotPage;

  beforeEach(() => {
    page = new SlackChatbotPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
