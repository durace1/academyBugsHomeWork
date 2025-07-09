import { test, expect } from '@playwright/test';
import * as allure from "allure-js-commons";
import { App } from '../src/app.js';

const url = 'https://academybugs.com/find-bugs/';
let app;


test('Баг при увеличении количества товара в корзине', async ({ page }) => {
  await allure.tag("ConsumerCart");
  app = new App(page);
  await app.mainPage.open(url);
  await app.mainPage.goToAddProductToCart();
  await app.mainPage.goToCheckout();
  await app.consumerCart.goUpdateQuantity();
  await allure.step("Проверка отчета о проблеме на наличие бага количества", async () => {
  await expect(app.mainPage.popupPage).toContainText('In this bug, the product quantity cannot be increased past 2.');
});
});

test('Баг при общей стоимости больше 100', async ({ page }) => {
  await allure.tag("ConsumerCart");
  app = new App(page);
  await app.mainPage.open(url);
  await app.mainPage.goToAddProductToCart();
  await app.mainPage.goToCheckout();
  await app.consumerCart.goToProductPrice();
  await app.consumerCart.chooseCorrectResult();
  await app.consumerCart.goToIssueReport();
  await allure.step("Проверка отчета о баге с общим количеством", async () => {
  await expect(app.mainPage.popupPage).toContainText('In this bug, the grand total is $100 more than the sum of all products in the cart.');
});
});

test('Баг с фильтрацией по цене', async ({ page }) => {
  await allure.tag("ProductPage");
  app = new App(page);
  await app.mainPage.open(url);
  await app.productPage.goToProductCard();
  await app.productPage.goToFilterByPrice();
  await app.productPage.chooseCorrectResultFilterByPrice();
  await app.consumerCart.goToIssueReport();
  await allure.step("Проверка отчета о баге на филтрацию", async () => {
  await expect(app.mainPage.popupPage).toContainText('In this bug, the filter by price doesn\'t work in the product details or product list pages.');
});
});

test('Баг с описанием на странице товара', async ({ page }) => {
  await allure.tag("ProductPage");
  app = new App(page);
  await app.mainPage.open(url);
  await app.productPage.goToProductCard();
  await app.productPage.goToDescriptionBlock();
  await app.productPage.chooseCorrectResultDescription();
  await app.consumerCart.goToIssueReport();
  await allure.step("Проверка отчёта о проблеме на наличие бага в описании", async () => {
  await expect(app.mainPage.popupPage).toContainText('In this bug, the short description and description of the product are not in English.');
});
});

test('Баг с загрузкой в разделе горящие предложения', async ({ page }) => {
  await allure.tag("ProductPage");
  app = new App(page);
  await app.mainPage.open(url);
  await app.productPage.goToProductCard();
  await app.productPage.goToHotItemProduct();
  await allure.step("Verify loader visibility in Hot Item section", async () => {
  await expect(app.productPage.loader).toBeVisible();});
  await app.productPage.goToHotItemLoad();
  await app.productPage.chooseCorrectResultHotItem();
  await app.consumerCart.goToIssueReport();
  await allure.step("Проверка отчета о баге в горящем предложении", async () => {
  await expect(app.mainPage.popupPage).toContainText('In this bug, the product in the Hot Item section keeps loading.');
});
});