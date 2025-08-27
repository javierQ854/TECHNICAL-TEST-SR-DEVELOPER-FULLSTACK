// src/components/Button/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from './Button';

describe('Button Component', () => {

  it('renders the button with correct text', () => {
    render(<Button dato="Click me" tipo="button" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick function when clicked', () => {
    const handleClick = vi.fn();
    render(<Button dato="Click me" tipo="button" onclick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('has the correct type attribute', () => {
    render(<Button dato="Submit" tipo="submit" />);
    expect(screen.getByText('Submit')).toHaveAttribute('type', 'submit');
  });

});
