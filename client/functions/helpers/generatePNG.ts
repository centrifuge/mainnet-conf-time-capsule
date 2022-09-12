import chromium from 'chrome-aws-lambda';
import { config } from 'dotenv';

config();

const generatePNG = async (pngFilePath: string, svg: string) => {
  const { CHROMIUM_PATH } = process.env;

  const browser = await chromium.puppeteer.launch({
    args: await chromium.args,
    executablePath: CHROMIUM_PATH || (await chromium.executablePath),
    headless: true,
    ignoreHTTPSErrors: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 900 });
  await page.setContent(`<body style="margin:0px;">${svg}</body>`);

  await page.screenshot({ path: pngFilePath });

  await browser.close();
};

export { generatePNG };
