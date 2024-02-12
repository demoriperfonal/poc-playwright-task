import { expect } from "@playwright/test";
import BaseComponent from "../base/base-component.page";

export default class StartedPage extends BaseComponent {
    async verifyPageIsOpened() {
        const titleViisble = await this.page.isVisible('.wizard-title');
        expect(titleViisble).toBe(true)
    }
}