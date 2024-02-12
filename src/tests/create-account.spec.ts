import test from "@playwright/test";
import { faker } from '@faker-js/faker';
import HomePage from "../components/pages/home/home.page";
import StartedPage from "../components/pages/starter/starter.page";
import HeaderModule from "../components/pages/home/modules/header.module";
import SignUpPage from "../components/pages/sign-up/sign-up.page";
import getEnvProperty, { EnvProp } from "../components/utils/env.utils";
import { getConfirmationEmailToken } from "../components/utils/google-email.utils";
import EmailConfirmationPage from "../components/pages/sign-up/email-confirmation.page";

const email = getEnvProperty(EnvProp.INNACTIVE_USER_ACCOUNT);
const fullName = faker.person.fullName();
const password = faker.internet.password();

test.describe('Account Creation Tests', () => {
    let homePage: HomePage;
    let headerModule: HeaderModule;
    let signUpPage: SignUpPage;
    let emailConfirmationModule: EmailConfirmationPage;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        await page.goto('/');

        homePage = new HomePage(page);
        headerModule = homePage.headerModule;
    });

    test('verify sign-up via [Free 14-day trial] button', async ({ page }) => {
        signUpPage = await headerModule.clickFree14DayTrial();

        emailConfirmationModule = await signUpPage.createNewAccount(email, fullName, password);
        await emailConfirmationModule.verifyPageIsVisible();
        await emailConfirmationModule.verifyNotificationText(email);

        const confirmationUrl = await getConfirmationEmailToken();
        await page.goto(confirmationUrl);

        const startedPage = new StartedPage(page);
        await startedPage.verifyPageIsOpened();
    });
});
