// Automated login test: signs in as Mark Nguyen and screenshots the result
import puppeteer from 'puppeteer';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const dir = './dev/screenshots';
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const cacheBase = 'C:/Users/Tai/.cache/puppeteer/chrome';
const builds = readdirSync(cacheBase);
const executablePath = join(cacheBase, builds[0], 'chrome-win64', 'chrome.exe');

const browser = await puppeteer.launch({
  headless: true,
  executablePath,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

// 1. Go to login page
await page.goto('http://localhost:3000/login.html', { waitUntil: 'networkidle2' });

// 2. Fill in credentials
await page.type('#email', 'mark.nguyen@zircnova.com');
await page.type('#password', 'Zircnova2026!');

// 3. Screenshot login page before submit
const n1 = readdirSync(dir).filter(f => f.startsWith('screenshot-')).length + 1;
await page.screenshot({ path: join(dir, `screenshot-${n1}-login-filled.png`), fullPage: true });
console.log(`Saved: screenshot-${n1}-login-filled.png`);

// 4. Submit the form
await page.click('#submit-btn');

// 5. Wait for redirect to index.html
await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 }).catch(() => {});
await new Promise(r => setTimeout(r, 2000)); // let auth.js update the header

// 6. Screenshot the home page — should show "Sign Out"
const n2 = readdirSync(dir).filter(f => f.startsWith('screenshot-')).length + 1;
await page.screenshot({ path: join(dir, `screenshot-${n2}-logged-in-home.png`), fullPage: false });
console.log(`Saved: screenshot-${n2}-logged-in-home.png`);
console.log(`Current URL: ${page.url()}`);

// 7. Check header label
const accountLabel = await page.$eval('#account-btn .account-label', el => el.textContent).catch(() => 'not found');
console.log(`Account button label: "${accountLabel}"`);

await browser.close();
