/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

function MyButton(props) {
  const { onClick, children, className } = props;
  const buttonStyles = css`
    margin: 10px auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #646cff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out;
    min-width: 100px;

    &:hover {
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
    `;
  return (
    <button
      className={className}
      onClick={onClick}
      css={buttonStyles}
    >
      {children}
    </button>
  );
}

export default MyButton;