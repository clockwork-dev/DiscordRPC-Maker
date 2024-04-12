/** @jsxImportSource @emotion/react */

import React, { useState } from 'react';
// import styles from './Header.module.css';
import { css } from '@emotion/react';
import { AiFillGithub } from "react-icons/ai";
import { IconContext } from "react-icons";
import { open } from '@tauri-apps/api/shell';
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openUrlGit = async () => {
    const url = "https://github.com/clockwork-dev/DiscordRPC-Maker";
    await open(url);
  };

  return (
    <div css={css`
      width: 100%;
      background-color: #242424;
      color: #fff;
      padding: 10px;
      z-index: 1000;
      display: flex;
      justify-content: center; 
      align-items: center;` }>
      
        <h1 css={css`
        font-size: 24px;
        margin: 10px 50px 20px 10px;
        text-align: center;
        border-bottom: 2px solid #646cff;
        border-radius: 5px;
        `}>Discord RPC Maker</h1>
        <IconContext.Provider value={{ color: "white", size: "24px"}}>
          <div>
            <AiFillGithub onClick={openUrlGit}/>
          </div>
        </IconContext.Provider>
    </div>
  );
}

export default Header;
