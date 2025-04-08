import { Page, Locator } from '@playwright/test';

export type FilterName = 'All' | 'Active' | 'Completed';

export type TodoLocators = {
    todoInput: Locator;
    todoItems: Locator;
    filters: Record<FilterName, Locator>;
    toggleAt: (index: number) => Locator;
    destroyAt: (index: number) => Locator;
    editAt: (index: number) => Locator;
};

export function getTodoLocators(page: Page): TodoLocators {
    const filterNames: FilterName[] = ['All', 'Active', 'Completed'];

    const filters: Record<FilterName, Locator> = Object.fromEntries(
        filterNames.map((name) => [name, page.getByRole('link', { name })])
    ) as Record<FilterName, Locator>;

    return {
        todoInput: page.locator('.new-todo'),
        todoItems: page.locator('.todo-list li'),
        filters,
        toggleAt: (index) => page.locator('.todo-list li').nth(index).locator('.toggle'),
        destroyAt: (index) => page.locator('.todo-list li').nth(index).locator('.destroy'),
        editAt: (index) => page.locator('.todo-list li').nth(index).locator('.edit'),
    };
}
