import * as allure from "allure-js-commons";
import { basePage } from "./basePage";


export class consumerCart extends basePage {
    constructor (page) {
        super (page);
        this.productPrice = this.page.getByText('$152.99');
        this.plusQuantityButton = this.page.getByRole('button', { name: '+' });
        this.updateButton = this.page.getByText('UPDATE');
        this.typeBugCheck = this.page.getByLabel('Functional', { exact: true });
        this.correctResultCheck = this.page.getByLabel('The grand total is equal to');
        this.submitButton = this.page.getByRole('button', { name: 'Submit' });
        this.viewReportButton = this.page.getByRole('button', { name: 'View Issue Report' });    
    }
    async goToProductPrice () {
        await allure.step ("Просмотр стоимости товара", async () => {
        await this.productPrice.click();
    });
    }
    async chooseCorrectResult () {
        await allure.step ("Выбрать тип и ожидаемый результат на странице корзины", async () => {
        await this.typeBugCheck.check();
        await this.correctResultCheck.check();
        await this.submitButton.click();
    });
    }
    async goToIssueReport () {
        await allure.step ("Открыть отчет об ошибке", async () => {
        await this.viewReportButton.click();
    });
    }
    async goUpdateQuantity () {
        await allure.step ("Обновить количество товара в корзине", async () => {
        await this.plusQuantityButton.dblclick();
        await this.updateButton.click();
    });
    }
}