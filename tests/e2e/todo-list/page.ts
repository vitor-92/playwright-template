import { Page } from '@playwright/test';
import { getTodoLocators, TodoLocators, FilterName } from '../todo-list/locators';

export class PageTodo {
    readonly page: Page;
    readonly locators: TodoLocators;

    constructor(page: Page) {
        this.page = page;
        this.locators = getTodoLocators(page);
    }

    async goto() {
        await this.page.goto('https://demo.playwright.dev/todomvc/#/');
    }

    async addTodo(task: string) {
        await this.locators.todoInput.fill(task);
        await this.locators.todoInput.press('Enter');
    }

    async getTodosText(): Promise<string[]> {
        return await this.locators.todoItems.allTextContents();
    }

    async toggleTodoByText(taskText: string) {
        await this.locators.toggleByText(taskText).click();
    }

    async deleteTodoByText(taskText: string) {
        const item = this.locators.getItemByText(taskText);
        await item.hover();
        await this.locators.destroyByText(taskText).click();
    }

    async editTodoByText(taskText: string, newText: string) {
        const item = this.locators.getItemByText(taskText);
        await item.dblclick();
        const input = this.locators.editByText(taskText);
        await input.fill(newText);
        await input.press('Enter');
    }

    async filterBy(filter: FilterName) {
        await this.locators.filters[filter].click();
    }
}
