import BaseComponent from "../../../base/base-component.page";

export default class AddProjectModule extends BaseComponent {
    async fillProjectName(name: string) {
        this.page.fill('#name > textarea', name);
    }

    async clickSaveButton() {
        await this.page.click('text=Save');
    }

    async createNewProject(name: string) {
        await this.fillProjectName(name);
        await this.clickSaveButton();
    }
}