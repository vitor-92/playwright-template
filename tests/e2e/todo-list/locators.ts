import { Page, Locator } from '@playwright/test';

export type FilterName = 'All' | 'Active' | 'Completed';

export type TodoLocators = {
    todoInput: Locator;
    todoItems: Locator;
    filters: Record<FilterName, Locator>;
    getItemByText: (text: string) => Locator;
    toggleByText: (text: string) => Locator;
    destroyByText: (text: string) => Locator;
    editByText: (text: string) => Locator;
};

export function getTodoLocators(page: Page): TodoLocators {
    const getItemByText = (text: string) =>
        page.locator('.todo-list li').filter({ hasText: text });

    return {
        todoInput: page.locator('.new-todo'),
        todoItems: page.locator('.todo-list li'),

        filters: {
            All: page.getByRole('link', { name: 'All' }),
            Active: page.getByRole('link', { name: 'Active' }),
            Completed: page.getByRole('link', { name: 'Completed' }),
        },

        getItemByText,
        toggleByText: (text: string) => getItemByText(text).locator('.toggle'),
        destroyByText: (text: string) => getItemByText(text).locator('.destroy'),
        editByText: (text: string) => getItemByText(text).locator('.edit'),
    };
}
