import './button.css';

import React from 'react';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  backgroundColor?: string;
  /**
   * What background color to use
   */
  label: string;
  /**
   * How large should the button be?
   */
  onClick?: () => void;
  /**
   * Button contents
   */
  primary?: boolean;
  /**
   * Optional click handler
   */
  size?: 'small' | 'medium' | 'large';
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ backgroundColor, label, primary = false, size = 'medium', ...props }: ButtonProps): JSX.Element => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  return (
    <button type="button" className={['storybook-button', `storybook-button--${size}`, mode].join(' ')} style={{ backgroundColor }} {...props}>
      {label}
    </button>
  );
};
