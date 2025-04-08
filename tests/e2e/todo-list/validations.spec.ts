import { test, expect } from '@playwright/test';
import { PageTodo } from './page';

test.describe('Playwright Demo', () => {
    let todoPage: PageTodo;

    test.beforeEach(async ({ page }) => {
        todoPage = new PageTodo(page);
        await todoPage.goto();
    });

    test('should add a new task', async () => {
        await todoPage.addTodo('Playwright Demo');
        const todos = await todoPage.getTodosText();
        expect(todos).toContain('Playwright Demo');
    });

    test('should mark a task as completed', async () => {
        await todoPage.addTodo('Task 1');
        await todoPage.toggleTodo(0);
        const todo = todoPage.locators.todoItems.nth(0);
        await expect(todo).toHaveClass('completed');
    });

    test('should edit an existing task', async () => {
        await todoPage.addTodo('Old task');
        // await todoPage.editTodo(0, 'Updated task');
        await todoPage.editTodoByText('Old task', 'Updated task')
        const todos = await todoPage.getTodosText();
        expect(todos).toContain('Updated task');
    });

    test('should delete a task', async () => {
        await todoPage.addTodo('Task to delete');
        // await todoPage.deleteTodo(0);
        await todoPage.deleteTodoByText('Task to delete');
        const todos = await todoPage.getTodosText();
        expect(todos).not.toContain('Task to delete');
    });

    test('should filter active tasks', async () => {
        await todoPage.addTodo('Active task');
        await todoPage.addTodo('Completed task');
        await todoPage.toggleTodo(1);

        await todoPage.filterBy('Active');
        const todos = await todoPage.getTodosText();
        expect(todos).toContain('Active task');
        expect(todos).not.toContain('Completed task');
    });

    test('should filter completed tasks', async () => {
        await todoPage.addTodo('Active task');
        await todoPage.addTodo('Completed task');
        await todoPage.toggleTodo(1);

        await todoPage.filterBy('Completed');
        const todos = await todoPage.getTodosText();
        expect(todos).toContain('Completed task');
        expect(todos).not.toContain('Active task');
    });
});
