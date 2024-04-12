/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import MyButton from '../MyButton/MyButton';
import MyInput from '../ReUse/MyInput/MyInput';
import { invoke } from '@tauri-apps/api'
function MainBody () {
 
const [isToggled, setIsToggled] = useState(false);

const [variable1, setVariable1] = useState('');
const [variable2, setVariable2] = useState('');
const [variable3, setVariable3] = useState('');
const [variable4, setVariable4] = useState('');
  
const handleVariable1Change = (event) => {
  setVariable1(event.target.value);
};
  
const handleVariable2Change = (event) => {
  setVariable2(event.target.value);
};
  
const handleVariable3Change = (event) => {
  setVariable3(event.target.value);
};
  
const handleVariable4Change = (event) => {
  setVariable4(event.target.value);
};
  
const sendDataToBackend = async () => {
    setIsToggled(!isToggled);
    if (!isToggled) {
    try {
    const response = await invoke('recive_input_data', {
        data: {
        variable1,
        variable2,
        variable3,
        variable4,
    }});
  
        console.log('Response:', response);
      } catch (error) {
        console.error('Error with sendData:', error);
      }
    } else {
        try {
            const stop = await invoke('stop_rpc')
            console.log('Response(stop):', stop)
        } catch (error) {
            console.error('Stop error:', error)
        }
    }
} 
  


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
`;
const buttonToggle = () => {
    
}

return (
    <div css={css`
        display: flex;
        justify-content: space-between;
        max-width: 500px;
        flex-direction: column;
        margin: auto;
        padding: 2px:
    `}>
        <label css={labelStyle}><p css={pStyle}>App id | <a href="https://discord.com/developers/applications" target="_blank">Discord Developer Portal</a></p><MyInput 
            onChange={handleVariable1Change}
            placeholder="Variable 1"
            /> </label>
        <label css={labelStyle}><p css={pStyle}>State massage</p><MyInput 
            onChange={handleVariable2Change}
            placeholder="Variable 2"
            /> </label>
        <label css={labelStyle}><p css={pStyle}>Details</p><MyInput 
            onChange={handleVariable3Change}
            placeholder="Variable 3"
        /> </label>
        <label css={labelStyle}><p css={pStyle}>State massage</p><MyInput 
            onChange={handleVariable4Change}
            placeholder="Variable 4"
            /> </label>

        <MyButton  onClick={sendDataToBackend}>{
            isToggled ? 'Stop' : 'Start' 
        }</MyButton>
    </div>
)
}
export default MainBody