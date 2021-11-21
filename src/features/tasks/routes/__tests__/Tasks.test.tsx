import { Tasks } from '../Tasks';

import { taskGenerator } from '@/test/data-generators';
import { render, screen, userEvent, waitFor, within } from '@/test/test-utils';
import { formatDate } from '@/utils/format';

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  (console.error as jest.Mock).mockRestore();
});

test('should create, render and delete tasks', async () => {
  await render(<Tasks />);

  const newTask = taskGenerator();

  expect(await screen.findByText(/no entries/i)).toBeInTheDocument();

  userEvent.click(screen.getByRole('button', { name: /create task/i }));

  const drawer = screen.getByRole('dialog', {
    name: /create task/i,
  });

  const titleField = within(drawer).getByText(/title/i);
  const bodyField = within(drawer).getByText(/body/i);

  userEvent.type(titleField, newTask.title);
  userEvent.type(bodyField, newTask.description);

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  });

  userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  const row = screen.getByRole('row', {
    name: `${newTask.title} ${formatDate(newTask.createdAt)} View Delete Task`,
  });

  expect(
    within(row).getByRole('cell', {
      name: newTask.title,
    })
  ).toBeInTheDocument();

  userEvent.click(
    within(row).getByRole('button', {
      name: /delete task/i,
    })
  );

  const confirmationDialog = screen.getByRole('dialog', {
    name: /delete task/i,
  });

  const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
    name: /delete task/i,
  });

  userEvent.click(confirmationDeleteButton);

  await screen.findByText(/task deleted/i);

  expect(
    within(row).queryByRole('cell', {
      name: newTask.title,
    })
  ).not.toBeInTheDocument();
});
