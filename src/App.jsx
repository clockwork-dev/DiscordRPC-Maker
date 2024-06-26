/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { invoke } from '@tauri-apps/api'
import Header from './components/Header/Header'
import MainBody from './components/MainBody/MainBody'


function App() {
  return(<div css={css`font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 450;
  `}>
    <Header />
    <MainBody />
  </div>
    
  )
}

export default App
