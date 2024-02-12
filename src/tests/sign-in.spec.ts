import { test } from '@playwright/test';
import HeaderModule from '../components/pages/home/modules/header.module';
import HomePage from '../components/pages/home/home.page';
import LoginPage from '../components/pages/login/login.page';
import getEnvProperty, { EnvProp } from '../components/utils/env.utils';
import DashboardPage from '../components/pages/dashboard/dashboard.page';

const signInEmail = getEnvProperty(EnvProp.ACTIVE_USER_EMAIL);
const password = getEnvProperty(EnvProp.DEFAULT_PASS);

test.describe('Sign In Tests', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let headerModule: HeaderModule;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        homePage = new HomePage(page);
        headerModule = homePage.headerModule;
    });

    test('verify user can Sign In via Marketing page', async ({ page }) => {
        loginPage = await headerModule.clickSignInButton();
        dashboardPage = await loginPage.loginAsUser(signInEmail, password);

        await dashboardPage.waitForPageToLoad();
    });
});
