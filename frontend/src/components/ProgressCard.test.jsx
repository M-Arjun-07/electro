import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProgressCard from './ProgressCard';
import { AppContext } from '../context/AppContext';
import React from 'react';

const mockContextValue = {
  progress: [1, 2],
  userProfile: { points: 150 }
};

describe('ProgressCard Component', () => {
  it('renders correctly with context values', () => {
    render(
      <AppContext.Provider value={mockContextValue}>
        <ProgressCard />
      </AppContext.Provider>
    );
    
    expect(screen.getByText('Journey Progress')).toBeDefined();
    expect(screen.getByText('40%')).toBeDefined(); // (2/5) * 100
    expect(screen.getByText('150')).toBeDefined();
    expect(screen.getByText('Citizen in Training')).toBeDefined();
  });
});
