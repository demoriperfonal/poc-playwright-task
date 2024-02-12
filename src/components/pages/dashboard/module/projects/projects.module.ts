import { Page, expect } from "@playwright/test";
import BaseComponent from "../../../base/base-component.page";
import NotificationModule from "../../../common/notification.module";
import AddProjectModule from "./add-project.module";

export default class ProjectsModule extends BaseComponent {
    private addProjectButtonDataTitle = 'Add new project to the organization';

    private notifications: NotificationModule;
    private addProjectModule: AddProjectModule;

    constructor(page: Page) {
        super(page);

        this.notifications = new NotificationModule(this.page);
        this.addProjectModule = new AddProjectModule(this.page);
    }

    async clickAddProjectButton() {
        await this.page.click('text=Add project');
    }

    async waitForModuleToBeVisible() {
        await this.waitForDataOridinalTitleElementToBeVisible(this.addProjectButtonDataTitle);
    }

    async createNewProject(name: string) {
        await this.clickAddProjectButton();
        await this.addProjectModule.createNewProject(name);
        await this.notifications.verifyNotificationText('Project created');
    }

    async searchProject(name: string) {
        await this.page.fill('input[type="search"]', name);
        await this.page.waitForSelector('.table');
    }

    async verifyProjectFoundInTable(name: string, expectedCount = 1) {
        await this.searchProject(name);

        const elements = await this.page.$$('.table a.d-flex');

        let count = 0;

        for (const element of elements) {
            const textContent = await element.textContent();
            if (textContent.includes(name)) {
                count++;
            }
        }
        expect(count).toEqual(expectedCount);
    }
}