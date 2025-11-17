import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout


describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);

    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    if (server) {
      server.kill();
    }
  });

  test('should load the page', async () => {
    await page.goto(baseUrl, { waitUntil: 'networkidle2' });
    const title = await page.title();
    expect(title).toBe('Expected Page Title');
  });

  test('should validate credit card number', async () => {
    await page.type('#card-number', '4111111111111111');
    await page.click('#submit-button');
    const result = await page.$eval('.validation-result', (el) => el.textContent);
    expect(result).toBe('Valid');
  });
});
