import { Page } from "@playwright/test";
import HeaderModule from "./modules/header.module";
import BaseComponent from "../base/base-component.page";

export default class HomePage extends BaseComponent {

    public get headerModule(): HeaderModule {
        return new HeaderModule(this.page);
    }
}