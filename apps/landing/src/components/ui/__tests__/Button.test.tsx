import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button'; // Ajustez le chemin si nécessaire

describe('LandingPage Button Component', () => {
  it('renders a primary button with children', () => {
    render(<Button variant="primary">Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-blue-600 text-white');
  });

  it('renders a secondary button', () => {
    render(<Button variant="secondary">Submit</Button>);
    const buttonElement = screen.getByText(/submit/i);
    expect(buttonElement).toHaveClass('bg-gray-600');
  });

  it('renders an outline button', () => {
    render(<Button variant="outline">Cancel</Button>);
    const buttonElement = screen.getByText(/cancel/i);
    expect(buttonElement).toHaveClass('border-blue-600 text-blue-600');
  });

  it('applies size classes correctly', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByText(/large button/i);
    expect(buttonElement).toHaveClass('px-6 py-3 text-lg');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const buttonElement = screen.getByText(/clickable/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByText(/disabled button/i);
    expect(buttonElement).toBeDisabled();
  });

  it('applies additional className', () => {
    render(<Button className="my-custom-class">Custom Class</Button>);
    const buttonElement = screen.getByText(/custom class/i);
    expect(buttonElement).toHaveClass('my-custom-class');
  });
});
