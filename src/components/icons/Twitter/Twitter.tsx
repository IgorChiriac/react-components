import React from 'react';

export interface ITwitterProps {
  /**
   * @default 24px
   */
  size?: string;
}

const Twitter: React.FunctionComponent<ITwitterProps> = ({ size }) => (
  <svg
    role="img"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth={0}
    height={size}
    width={size}
    viewBox="0 0 24 24"
  >
    <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765a9.286 9.286 0 0 1-5.032-1.475 6.605 6.605 0 0 0 4.86-1.359 3.285 3.285 0 0 1-3.066-2.28 3.3 3.3 0 0 0 1.482-.056c-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411A3.289 3.289 0 0 1 5.612 6.6a9.32 9.32 0 0 0 6.766 3.43 3.286 3.286 0 0 1 5.594-2.993 6.583 6.583 0 0 0 2.086-.796 3.296 3.296 0 0 1-1.443 1.816A6.578 6.578 0 0 0 20.5 7.54a6.66 6.66 0 0 1-1.639 1.697z" />
  </svg>
);

Twitter.defaultProps = {
  size: '24px',
};

export default Twitter;
