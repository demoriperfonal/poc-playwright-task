import BaseComponent from "../base/base-component.page";
import DashboardPage from "../dashboard/dashboard.page";

export default class LoginPage extends BaseComponent {

    async fillEmail(email: string) {
        await this.page.fill('#user_email', email);
    }

    async fillPassword(password: string) {
        await this.page.fill('#user_password', password);
    }

    async clickLoginButton() {
        await this.page.click('button[type="submit"]');
    }

    async loginAsUser(email: string, password: string): Promise<DashboardPage> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLoginButton();
        return new DashboardPage(this.page);
    }
}