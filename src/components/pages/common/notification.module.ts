import { expect } from "@playwright/test";
import BaseComponent from "../base/base-component.page"

export default class NotificationModule extends BaseComponent {
    private messageSelector = '.jGrowl-message'; 


    async verifyNotificationText(text: string) {
        await this.page.waitForSelector(this.messageSelector);

        const textElem = await this.page.$(this.messageSelector);
        const textContent = await textElem.textContent();
        expect(textContent).toEqual(text);
    }
}