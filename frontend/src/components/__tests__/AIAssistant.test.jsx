import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AIAssistant from '../AIAssistant';
import { AppContext } from '../../context/AppContext';
import api from '../../services/api';
import React from 'react';

// Mock the API
vi.mock('../../services/api', () => ({
  default: {
    post: vi.fn(),
  },
}));

const mockContextValue = {
  userProfile: { state: 'Karnataka' },
  username: 'testuser',
};

describe('AIAssistant Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the toggle button initially', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <AIAssistant />
      </AppContext.Provider>
    );
    expect(screen.getByLabelText('Open AI Assistant')).toBeDefined();
  });

  it('opens the chat window when clicked', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <AIAssistant />
      </AppContext.Provider>
    );
    fireEvent.click(screen.getByLabelText('Open AI Assistant'));
    expect(screen.getByPlaceholderText('Ask anything...')).toBeDefined();
  });

  it('sends a message and handles API response', async () => {
    api.post.mockResolvedValue({ data: { reply: 'I am here to help!' } });

    render(
      <AppContext.Provider value={mockContextValue}>
        <AIAssistant />
      </AppContext.Provider>
    );

    // Open chat
    fireEvent.click(screen.getByLabelText('Open AI Assistant'));

    // Type message
    const input = screen.getByPlaceholderText('Ask anything...');
    fireEvent.change(input, { target: { value: 'How to vote?' } });

    // Send message
    fireEvent.click(screen.getByLabelText('Send message'));

    // Check if loading state appears
    expect(screen.getByText('Thinking...')).toBeDefined();

    // Wait for response
    await waitFor(() => {
      expect(screen.getByText('I am here to help!')).toBeDefined();
    });

    expect(api.post).toHaveBeenCalledWith('/chat', {
      message: 'How to vote?',
      state: 'Karnataka',
      session_id: 'testuser',
    });
  });
});
