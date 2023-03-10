import React from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { Icon } from '../icons/Icons';
import DownloadApp from './SideBar/DownloadApp';
import Menu from './SideBar/Menu';
import Playlist from './SideBar/Playlist';
import CreatePlaylist from './SideBar/CreatePlaylist';
import SidebarCover from './SideBar/SidebarCover';


function SideBar() {

  const sidebar = useSelector((state) => state.player.sidebar);

  return (
    <aside className='w-60 pt-6 flex flex-shrink-0 flex-col bg-black'>
      <Link to={'/'}>
        <img src={logo} alt="spotify_logo" className="h-10 ml-5" />
      </Link>

      <Menu />

      <CreatePlaylist />

      {/* <Playlist /> */}

      <DownloadApp />

      {sidebar && <SidebarCover />}
    </aside>
  )
}

export default SideBar