import test from "@playwright/test";
import { faker } from '@faker-js/faker';
import DashboardPage from "../components/pages/dashboard/dashboard.page";
import HomePage from "../components/pages/home/home.page";
import HeaderModule from "../components/pages/home/modules/header.module";
import LoginPage from "../components/pages/login/login.page";
import getEnvProperty, { EnvProp } from "../components/utils/env.utils";
import ProjectsModule from "../components/pages/dashboard/module/projects/projects.module";
import PaymentModule from "../components/pages/dashboard/module/payment/payment.module";
import SendPaymentConfirmationModule from "../components/pages/dashboard/module/payment/send-payment-confirmation.module";

const signInEmail = getEnvProperty(EnvProp.ACTIVE_USER_EMAIL);
const password = getEnvProperty(EnvProp.DEFAULT_PASS);
const assignedDefaultMember = getEnvProperty(EnvProp.ASSIGNED_DEFAULT_MEMBER);

const newProject = faker.company.name();
const note = faker.lorem.lines(1);

test.describe('Dashboard Page Tests', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let headerModule: HeaderModule;
    let projectsModule: ProjectsModule;
    let paymentModule: PaymentModule;
    let paymentConfirmationModule: SendPaymentConfirmationModule;

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage();
        await page.goto('/');

        homePage = new HomePage(page);
        headerModule = homePage.headerModule;
        loginPage = await headerModule.clickSignInButton();
        dashboardPage = await loginPage.loginAsUser(signInEmail, password);
        await dashboardPage.waitForPageToLoad();
    });

    test('verify new Project can be created', async ({ page }) => {
        projectsModule = await dashboardPage.clickProjectsManagementSidebarOption();
        await projectsModule.waitForModuleToBeVisible();

        await projectsModule.createNewProject(newProject);
        await projectsModule.verifyProjectFoundInTable(newProject);
    });

    test('verify one-time payment can be created', async ({ page }) => {
        const paymentAmount = '100';

        paymentModule = await dashboardPage.clickFinancialsSidebarOptions();
        await paymentModule.clickOneTimeAmount();

        paymentConfirmationModule = await paymentModule.sendOneTimePayment(
            [assignedDefaultMember],
            paymentAmount,
            note
        );
        await paymentConfirmationModule.waitForModule();
        await paymentConfirmationModule.verifyPaymentConfirmationModuleVisible();
        await paymentConfirmationModule.verifyPaymentDetails([assignedDefaultMember], paymentAmount);
        await paymentConfirmationModule.clickCancelButton();
    });
});
