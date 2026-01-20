import { test, expect } from '@playwright/test';

// Make sure your dev server is running (usually http://localhost:3000)
const APP_URL = 'http://localhost:3000';

test.describe('TodoList CRUD Operations', () => {
  
  test('should add a new todo to the list', async ({ page }) => {
    await page.goto(APP_URL);

    // 1. Find the input and type
    const input = page.getByPlaceholder(/enter your task/i);
    await input.fill('New Testing Task');

    // 2. Click the add button (using the + text)
    await page.getByRole('button', { name: /\+/i }).click();

    // 3. Assert the item appears in the list
    const todoItem = page.getByText('New Testing Task');
    await expect(todoItem).toBeVisible();
    
    // 4. Assert input is cleared
    await expect(input).toHaveValue('');
  });
});