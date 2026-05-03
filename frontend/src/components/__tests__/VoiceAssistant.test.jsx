import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import VoiceAssistant from '../VoiceAssistant';
import React from 'react';

// Mock SpeechRecognition
const mockStart = vi.fn();
const mockStop = vi.fn();

class MockSpeechRecognition {
  start = mockStart;
  stop = mockStop;
  onstart = null;
  onend = null;
  onresult = null;
}

window.SpeechRecognition = MockSpeechRecognition;
window.webkitSpeechRecognition = MockSpeechRecognition;

describe('VoiceAssistant Component', () => {
  const mockOnVoiceInput = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<VoiceAssistant onVoiceInput={mockOnVoiceInput} />);
    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByTitle('Click to speak')).toBeDefined();
  });

  it('toggles listening state and calls recognition.start', () => {
    render(<VoiceAssistant onVoiceInput={mockOnVoiceInput} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    expect(mockStart).toHaveBeenCalled();
  });

  it('has correct ARIA labels', () => {
    render(<VoiceAssistant onVoiceInput={mockOnVoiceInput} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Start voice assistant');
  });
});
