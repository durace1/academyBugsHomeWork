import * as allure from "allure-js-commons";
export class basePage {
    constructor (page)
    {
        this.page = page;
    }
    async open (url)
    {
        await allure.step ("Переход в сервис", async () => {
        await this.page.goto(url);
    });
    }
}