import {render, screen, fireEvent} from '@testing-library/react';
import TodoList from '../../components/features/TodoList';
import userEvent from '@testing-library/user-event';

describe('TodoList CRUD Operations', () => {
    test('Create Todo Item', async () => {
    const user = userEvent.setup();
    render(<TodoList />);

    // 1. Find the input and the add button
    const input = screen.getByPlaceholderText(/enter your task/i);
    const addButton = screen.getByRole('button', { name: /\+/i });

    // 2. Simulate User typing and clicking
    await user.type(input, 'New Testing Task');
    await user.click(addButton);

    // 3. Assert (Check if it worked)
    expect(screen.getByText('New Testing Task')).toBeInTheDocument();
    expect(input).toHaveValue(''); // Check if input cleared
  });

  
  test('Delete Todo Item', async () => {
    const user = userEvent.setup();
    render(<TodoList />); 
    // Add a todo first
    const input = screen.getByPlaceholderText(/enter your task/i);
    const addButton = screen.getByRole('button', { name: /\+/i });
    await user.type(input, 'Task to be deleted');
    await user.click(addButton);
});