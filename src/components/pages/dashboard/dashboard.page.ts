import BaseComponent from "../base/base-component.page";
import PaymentModule from "./module/payment/payment.module";
import ProjectsModule from "./module/projects/projects.module";

export default class DashboardPage extends BaseComponent {
    private dashboardLabelOriginalTitle = 'Dashboard';

    async waitForPageToLoad() {
        await this.waitForDataOridinalTitleElementToBeVisible(this.dashboardLabelOriginalTitle);
    }

    async clickProjectsManagementSidebarOption(): Promise<ProjectsModule> {
        await this.clickOnDataOriginalTitleElement('Project management');
        return new ProjectsModule(this.page);
    }

    async clickFinancialsSidebarOptions(): Promise<PaymentModule> {
        await this.clickOnDataOriginalTitleElement('Financials');
        return new PaymentModule(this.page);
    }
}