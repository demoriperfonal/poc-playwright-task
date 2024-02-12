import { expect } from "@playwright/test";
import BaseComponent from "../../../base/base-component.page";
import { formatCurrency } from "../../../../utils/common.utils";

export default class SendPaymentConfirmationModule extends BaseComponent {
    private titleSelector = 'div:has-text("Payment")';

    async waitForModule() {
        await this.page.waitForSelector(this.titleSelector);
    }

    async verifyPaymentConfirmationModuleVisible() {
        const isPaymentVisible = await this.page.isVisible(this.titleSelector);
        expect(isPaymentVisible).toBe(true);
    }

    async verifyPaymentDetails(members: string[], amount: string) {
        for(const member of members) {
            const isPaymentVisible = await this.page.isVisible(`[data-original-title="${member}"]`);
            expect(isPaymentVisible).toBe(true);
        }

        const element = await this.page.$('.col-xs-8');
        if (element) {
            const textContent = await element.textContent();
            expect(textContent).toEqual(formatCurrency(amount));
        }
    }

    async clickCancelButton() {
        await this.page.click('text=Cancel');
    }
}