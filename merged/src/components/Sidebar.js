import styles from "./Home.module.css";
import React,{useState, useEffect} from 'react'
import {Avatar, IconButton} from '@mui/material'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat'


function Sidebar(props) {
    return (
        <>
              <div className={styles.sidebar}>
                  <div className={styles.sidebar_header}>
                      <div className={styles.sidebar_headerLeft}>
                      <Avatar  src={`https://avatars.dicebear.com/api/human/${props.imageDP}.svg`} />
                      <h2>{props.user}</h2>
                      </div>
                      <div className={styles.sidebar_headerRight}>
                          <IconButton>
                              <DonutLargeIcon/>
                          </IconButton>
  
                          <IconButton>
                              <ChatIcon/>
                          </IconButton>
  
                          <IconButton>
                              <MoreVertIcon/>
                          </IconButton>
                      </div>
                  </div>
  
                  <div className={styles.sidebar_search}>
                      <div className={styles.sidebar_searchContainer}>
                          <SearchIcon/>
                          <input type='text' placeholder='Search a new chat'></input>
                      </div>
                  </div>
  
                  <div className={styles.sidebar_chats}>  
                      <SidebarChat topic='Raju'/> 
                      <SidebarChat topic='Roshan'/> 
                      <SidebarChat topic='Abhinash'/> 
                  </div>
              </div>
        </>
    );
  }
  
  export default Sidebar;