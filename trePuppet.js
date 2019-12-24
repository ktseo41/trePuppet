const puppeteer = require('puppeteer');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const bot = new TelegramBot(process.env.botToken);
const interval = 30 * 1000;
const timerFlag = 'needStart';
const reloadMax = 100;

let counter = 0;
let timerId = timerFlag;

const start = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(process.env.ssEssay45Url);
  if (timerId === timerFlag)
    timerId = setInterval(() => scrap(page, browser), interval);
};

const scrap = async (page, browser) => {
  await page.content();

  const isFull = await page.$x('//button[text()="클럽 둘러보러 가기"]');

  if (!isFull) {
    bot.sendMessage(process.env.channelChatId, '빈 자리가 생겼어요!~');
    clearInterval(timerId);
  }

  if (isFull) {
    counter += 1;

    await page.reload();

    if (counter % reloadMax === 0) {
      clearInterval(timerId);
      bot.sendMessage(
        process.env.channelChatId,
        `${counter}회 실행 완료 재시작합니다.`
      );
      timerId = timerFlag;
      await browser.close();
      start();
    }

    return;
  }

  await browser.close();
};

start();
