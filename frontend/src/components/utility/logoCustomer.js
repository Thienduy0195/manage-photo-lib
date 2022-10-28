import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '@iso/config/site.config';
import logo from '@iso/assets/images/logo/logo.png';

export default () => {
  const styles = {
    display: 'flex',
    justifyContent: 'center'
  }
  return (
    <div className="isoLogoWrapper">
      <Link to="/">
        <div style={styles}>
          <div className='logo'>
            <img src={logo} alt='Graphicprose' width='60px' height='60px' />
          </div>
          <h3>
            {siteConfig.siteName}
          </h3>
        </div>
      </Link>
    </div>
  );
};
