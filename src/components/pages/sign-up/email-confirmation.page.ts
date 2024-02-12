import { expect } from "@playwright/test";
import BaseComponent from "../base/base-component.page";

export default class EmailConfirmationPage extends BaseComponent {

    async verifyPageIsVisible() {
        await this.page.waitForSelector('.signup-title');
    }

    async verifyNotificationText(email: string) {
        const element = await this.page.$('.signup-subtitle');
        const text = await element.textContent();
        expect(text).toEqual(`You're in. An email has been sent to ${email}. Hit confirm and you'll be ready to start working.`);
    }
}