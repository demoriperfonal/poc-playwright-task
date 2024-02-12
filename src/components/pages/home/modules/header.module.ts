import { Page } from "@playwright/test";
import BaseComponent from "../../base/base-component.page";
import LoginPage from "../../login/login.page";
import SignUpPage from "../../sign-up/sign-up.page";

export default class HeaderModule extends BaseComponent {
    async clickSignInButton(): Promise<LoginPage> {
        await this.page.click('[data-name="Sign in"]');
        return new LoginPage(this.page);
    }

    async clickFree14DayTrial(): Promise<SignUpPage> {
        await this.page.click('[data-name="Free 14-day trial"]');
        return new SignUpPage(this.page);
    }
}