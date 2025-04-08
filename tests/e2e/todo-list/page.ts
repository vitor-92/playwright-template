import { Page } from '@playwright/test';
import { FilterName, getTodoLocators, TodoLocators } from '../todo-list/locators';


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

    async toggleTodo(index: number) {
        await this.locators.toggleAt(index).click();
    }

    async toggleTodoByText(taskText: string) {
        const item = this.locators.todoItems.filter({ hasText: taskText }).first();
        await item.locator('.toggle').click();
    }


    async deleteTodo(index: number) {
        const item = this.locators.todoItems.nth(index);
        await item.hover();
        await this.locators.destroyAt(index).click();
    }

    async deleteTodoByText(taskText: string) {
        const item = this.locators.todoItems.filter({ hasText: taskText }).first();
        await item.hover();
        await item.locator('.destroy').click();
    }

    async editTodo(index: number, newText: string) {
        await this.locators.todoItems.nth(index).dblclick();
        const input = this.locators.editAt(index);
        await input.fill(newText);
        await input.press('Enter');
    }

    async editTodoByText(taskText: string, newText: string) {
        const item = this.locators.todoItems.filter({ hasText: taskText }).first();
        await item.dblclick();
        const input = item.locator('.edit');
        await input.fill(newText);
        await input.press('Enter');
    }

    async filterBy(filter: FilterName) {
        await this.locators.filters[filter].click();
    }
}
