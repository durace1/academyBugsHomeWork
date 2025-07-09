import { MainPage,ProductPage,consumerCart } from "./pages/index";

export class App {
    constructor(page) {
        this.page = page;
        this.mainPage = new MainPage (page);
        this.productPage = new ProductPage(page);
        this.consumerCart = new consumerCart(page);
}
};