import { Page } from "@playwright/test";

export default abstract class BaseComponent {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async waitForDataOridinalTitleElementToBeVisible(dataOriginalTitle: string) {
        await this.page.waitForSelector(`[data-original-title="${dataOriginalTitle}"]`);
    }

    protected async clickOnDataOriginalTitleElement(title: string) {
        await this.page.click(`a[data-original-title="${title}"]`);
    }
}