import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import TopbarAddtoCart from './TopbarAddToCart';

import TopbarWrapper from './Topbar.styles';
import LogoName from '@iso/components/utility/logoCustomer';
const { Header } = Layout;

export default function Topbar() {
  const history = useHistory()
  const [selectedItem, setSelectedItem] = useState('');
  const [currentMenu, setCurrentMenu] = useState('home');
  const { collapsed, openDrawer } = useSelector(state => state.App);
  const isCollapsed = collapsed && !openDrawer;
  const styling = {
    background: '#ffffff',
    position: 'fixed',
    width: '100%',
    height: 'auto',
  };

  const items = [
    {
      label: 'Home',
      key: 'home',
      pathname: '/'
    },
    {
      label: 'Posts',
      key: 'post',
      pathname: '/post'
    },
    {
      label: 'Galleries',
      key: 'galleries',
      pathname: '/galleries'
    },
    {
      label: 'About Graphic Prose',
      key: 'about',
      pathname: '/about'
    },
    // {
    //   label: 'Contact',
    //   key: 'contacts',
    //   pathname: '/contacts'
    // },
    {
      label: 'Donate',
      key: 'donate',
      pathname: '/donate'
    },
  ];

  useEffect(() => {
    const activeMenu = items.find(item => history.location.pathname.includes(item.key))
    if (activeMenu && activeMenu.key) {
      setCurrentMenu(activeMenu.key)
    }
  }, [items, history])

  const onClick = (e) => {
    history.push(`/${e.key === 'home' ? '' : e.key}`)
  };

  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className='isoLeft'>
          <LogoName collapsed={false} />
        </div>

        <div className='isoCenter'>
          <Menu onClick={onClick} selectedKeys={[currentMenu]} mode="horizontal" items={items} className='menu' />
        </div>

        <ul className="isoRight">
          <li onClick={() => setSelectedItem('addToCart')} className={selectedItem ? 'isoCart active' : 'isoCart'}>
            <TopbarAddtoCart />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  );
}
