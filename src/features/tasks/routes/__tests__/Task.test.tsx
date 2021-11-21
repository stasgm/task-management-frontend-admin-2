import { useParams as useMockParams } from 'react-router-dom';

import { Task } from '../Task';

import {
  render,
  screen,
  userEvent,
  waitFor,
  createTask,
  createUser,
  within,
} from '@/test/test-utils';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // keep the rest of the exports intact
  useParams: jest.fn(),
}));

const renderTask = async () => {
  const fakeUser = await createUser();
  const fakeTask = await createTask({ teamId: fakeUser.teamId });

  (useMockParams as jest.Mock).mockImplementation(() => ({
    taskId: fakeTask.id,
  }));

  const utils = await render(<Task />, {
    user: fakeUser,
  });

  await screen.findByText(fakeTask.title);

  return {
    ...utils,
    fakeUser,
    fakeTask,
  };
};

test('should render task', async () => {
  const { fakeTask } = await renderTask();
  expect(screen.getByText(fakeTask.description)).toBeInTheDocument();
});

test('should update task', async () => {
  const { fakeTask } = await renderTask();

  const titleUpdate = '-Updated';
  const descriptionUpdate = '-Updated';

  userEvent.click(screen.getByRole('button', { name: /update task/i }));

  const drawer = screen.getByRole('dialog', {
    name: /update task/i,
  });

  const titleField = within(drawer).getByText(/title/i);
  const descriptionField = within(drawer).getByText(/description/i);

  userEvent.type(titleField, titleUpdate);
  userEvent.type(descriptionField, descriptionUpdate);

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  });

  userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  const newTitle = `${fakeTask.title}${titleUpdate}`;
  const newBody = `${fakeTask.description}${descriptionUpdate}`;

  expect(screen.getByText(newTitle)).toBeInTheDocument();
  expect(screen.getByText(newBody)).toBeInTheDocument();
});

test('should create and delete a comment on the task', async () => {
  await renderTask();

  const comment = 'Hello World';

  userEvent.click(screen.getByRole('button', { name: /create comment/i }));

  const drawer = screen.getByRole('dialog', {
    name: /create comment/i,
  });

  const descriptionField = within(drawer).getByText(/description/i);

  userEvent.type(descriptionField, comment);

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i,
  });

  userEvent.click(submitButton);

  await waitFor(() => expect(drawer).not.toBeInTheDocument());

  const commentsList = screen.getByRole('list', {
    name: 'comments',
  });

  const commentElements = within(commentsList).getAllByRole('listitem');

  const commentElement = commentElements[0];

  expect(commentElement).toBeInTheDocument();

  const deleteCommentButton = within(commentElement).getByRole('button', {
    name: /delete comment/i,
    exact: false,
  });

  userEvent.click(deleteCommentButton);

  const confirmationDialog = screen.getByRole('dialog', {
    name: /delete comment/i,
  });

  const confirmationDeleteButton = within(confirmationDialog).getByRole('button', {
    name: /delete/i,
  });

  userEvent.click(confirmationDeleteButton);

  await screen.findByText(/comment deleted/i);

  expect(within(commentsList).queryByText(comment)).not.toBeInTheDocument();
});
