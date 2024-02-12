import BaseComponent from "../base/base-component.page";
import EmailConfirmationPage from "./email-confirmation.page";

export default class SignUpPage extends BaseComponent {
    async createNewAccount(name: string, email: string, passwd: string): Promise<EmailConfirmationPage> {
        await this.page.fill('#hubstaff_user_name', name);
        await this.page.fill('#hubstaff_email', email);
        await this.page.fill('#hubstaff_password', passwd);
        await this.page.click('.hsds-form__checkbox-icon');
        await this.page.click('text=Create my account');
        return new EmailConfirmationPage(this.page);
    }
}