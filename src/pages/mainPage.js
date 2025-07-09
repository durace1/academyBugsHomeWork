import * as allure from "allure-js-commons";
import { BasePage } from "./BasePage";

export class MainPage extends BasePage {
    constructor (page) {
        super (page);
        this.addToCartButton = this.page.locator('#ec_add_to_cart_5');
        this.checkoutButton = this.page.getByRole('link', { name: 'CHECKOUT NOW' });
        this.popupPage = this.page.locator('#popmake-4406');
    }
    async goToAddProductToCart() {
        await allure.step ("Добавить товар в корзину", async () => {
        await this.addToCartButton.click();
    });
    }
    async goToCheckout () {
        await allure.step ("Переход в корзину", async () => {
        await this.checkoutButton.click();
        await this.page.waitForLoadState('networkidle');
    });
    }
}