import { browser, by, element, logging } from 'protractor';
import { AppPage } from './app.po';
import { fillMaterialFieldById } from './utils';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a logo with name GIT-BASE', async () => {
    await page.navigateTo();
    expect(await page.getLogoText()).toEqual('GIT-BASE');
  });

  it('should have a logo with src assets/logo.png', async () => {
    await page.navigateTo();
    expect((await page.getLogoSrc()).includes('assets/logo.png')).toBeTruthy();
  });

  it('should have a list of items on load', async () => {
    await page.navigateTo();
    expect((await page.isRepoListPresent())).toBeTruthy();
  });

  it('should have a list of items on load', async () => {
    await page.navigateTo();
    expect((await page.isRepoItemComponentPresent())).toBeTruthy();
  });


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
