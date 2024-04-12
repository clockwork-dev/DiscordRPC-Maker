/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import MyButton from '../MyButton/MyButton';
import MyInput from '../ReUse/MyInput/MyInput';

function MainBody () {
 
const [isToggled, setIsToggled] = useState(false);
const labelStyle = css`
    align-self: center;
    font-size: 20px;
    text-align: center;
    border-bottom-color: #ccc;
    border-bottom: 2px solid #646cff;;
    border-radius: 5px;
    padding-bottom: 2px;
`;

const pStyle = css`
margin-bottom: 5px;
padding: 0;
`
const buttonToggle = () => {
    
}
const handleClick = () => {
    alert('Кнопка была нажата!');
    setIsToggled(!isToggled);
  };
return (
    <div css={css`
        display: flex;
        justify-content: space-between;;
        max-width: 500px;
        flex-direction: column;
        margin: auto;
        padding: 2px:
    `}>
        <label css={labelStyle}><p css={pStyle}>App id | <a href="https://discord.com/developers/applications" target="_blank">Discord Developer Portal</a></p><MyInput /> </label>
        <label css={labelStyle}><p css={pStyle}>State massage</p><MyInput /> </label>
        <label css={labelStyle}><p css={pStyle}>Details</p><MyInput /> </label>
        <label css={labelStyle}><p css={pStyle}>State massage</p><MyInput /> </label>

        <MyButton  onClick={handleClick}>{
            isToggled ? 'Stop' : 'Start' 
        }</MyButton>
    </div>
)
}
export default MainBody