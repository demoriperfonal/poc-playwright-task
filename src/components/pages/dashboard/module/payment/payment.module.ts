import BaseComponent from "../../../base/base-component.page";
import SendPaymentConfirmationModule from "./send-payment-confirmation.module";

export default class PaymentModule extends BaseComponent {

    public get paymentConfirmationModule() {
        return new SendPaymentConfirmationModule(this.page);
    }

    async clickOneTimeAmount() {
        await this.page.click('text=One-time amount');
    }

    async fillMembers(members: string[]) {
        const searchSelector = 'input[type="search"]';

        for(const member of members) {
            await this.page.fill(searchSelector, member);
            await this.page.press(searchSelector, 'Enter');
        }
    }

    async fillAmount(amount: string) {
        await this.page.fill('#team_payment_total_amount', amount);
    }

    async fillNote(note: string) {
        await this.page.fill('#team_payment_note', note);
    }

    async clickCreatePaymentButton() {
        await this.page.click('text=Create payment');
    }

    async sendOneTimePayment(members: string[], amount: string, note: string): Promise<SendPaymentConfirmationModule> {
        await this.fillMembers(members);
        await this.fillAmount(amount);
        await this.fillNote(note);
        await this.clickCreatePaymentButton();
        return new SendPaymentConfirmationModule(this.page);
    }
}