import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ViewBotsPanel from './ViewBotsPanel';

test('renders expected elements default unexpanded', () => {
  const testBotName = "test-bot-01";
  const payload = {
    "name": testBotName,
    "auth" : {
        "client_id": "",
        "client_secret" : "",
        "user_agent" : "",
        "username": ""
    },
    "status" : {
        "online": false,
        "valid": false
    },
    "config" : {
        "valid": true,
        "subreddits" : ["test"],
        "comments_enabled": true,
        "livestream_enabled": false,
        "comment_calling_syntax" : "!",
        "services": []
    }
  }
  const { container } = render(<ViewBotsPanel payload={payload} />);
  const botHeaderPanel = screen.getByText(testBotName);
  expect(botHeaderPanel).toBeVisible();

  // Quick-action menu is visible when unexpanded
  expect(screen.getByRole('button', {name: 'start-bot'})).toBeVisible();
  expect(screen.getByRole('button', {name: 'pause-bot'})).toBeVisible();
  expect(screen.getByRole('button', {name: 'delete-bot'})).toBeVisible();

  // Bottom row buttons are not visible when unexpanded
  expect(screen.getByRole('button', {name: 'Start'})).not.toBeVisible();
  expect(screen.getByRole('button', {name: 'Disable'})).not.toBeVisible();
  expect(screen.getByRole('button', {name: 'Delete'})).not.toBeVisible();
});

test('renders expected elements expanded', () => {
  const testBotName = "test-bot-01";
  const payload = {
    "name": testBotName,
    "auth" : {
        "client_id": "",
        "client_secret" : "",
        "user_agent" : "",
        "username": ""
    },
    "status" : {
        "online": false,
        "valid": false
    },
    "config" : {
        "valid": true,
        "subreddits" : ["test"],
        "comments_enabled": true,
        "livestream_enabled": false,
        "comment_calling_syntax" : "!",
        "services": []
    }
  }
  const { container } = render(<ViewBotsPanel payload={payload} />);
  const botHeaderPanel = screen.getByText(testBotName);
  expect(botHeaderPanel).toBeVisible();

  fireEvent.click(botHeaderPanel);

  // Quick-action menu is visible when unexpanded
  expect(screen.getByRole('button', {name: 'start-bot'})).toBeVisible();
  expect(screen.getByRole('button', {name: 'pause-bot'})).toBeVisible();
  expect(screen.getByRole('button', {name: 'delete-bot'})).toBeVisible();

  // Bottom row buttons are not visible when unexpanded
  expect(screen.getByRole('button', {name: 'Start'})).toBeVisible();
  expect(screen.getByRole('button', {name: 'Disable'})).toBeVisible();
  expect(screen.getByRole('button', {name: 'Delete'})).toBeVisible();
});
