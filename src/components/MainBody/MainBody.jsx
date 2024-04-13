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
const [variable5, setVariable5] = useState('');
  
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
const handleVariable5Change = (event) => {
    setVariable5(event.target.value);
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
        variable5,
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

return (
    <div css={css`
        display: flex;
        justify-content: space-between;
        max-width: 500px;
        max-height: 500px;
        flex-direction: column;
        margin: auto;
        padding: 2px:
    `}>
        <label css={labelStyle}><p css={pStyle}>App id | <a href="https://discord.com/developers/applications" target="_blank">Discord Developer Portal</a></p><MyInput 
            onChange={handleVariable1Change}
            placeholder="default: 425407036495495169"
            /> </label>
        <label css={labelStyle}><p css={pStyle}>State massage</p><MyInput 
            onChange={handleVariable2Change}
            placeholder=""
            /> </label>
        <label css={labelStyle}><p css={pStyle}>Details</p><MyInput 
            onChange={handleVariable3Change}
            placeholder=""
        /> </label>
        <label css={css`
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                font-size: 20px;
                text-align: center;
                padding-bottom: 2px;
            `}>
            <p css={pStyle}>Timestamps | Unix format</p>
            <MyInput 
                onChange={handleVariable4Change}
                placeholder="Start"
            />
            <div css={css`margin-top: 5px;
                border-bottom-color: #ccc;
                border-bottom: 2px solid #646cff;;
                border-radius: 5px;
                padding-bottom: 2px;
            `}>
                <MyInput 
                    onChange={handleVariable5Change}
                    placeholder="End"
                />
            </div>
        </label>

        <MyButton  onClick={sendDataToBackend}>{
            isToggled ? 'Stop' : 'Start' 
        }</MyButton>
    </div>
)
}
export default MainBody