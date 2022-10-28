import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import useWindowSize from '@iso/lib/hooks/useWindowSize';
import appActions from '@iso/redux/app/actions';
import siteConfig from '@iso/config/site.config';
import Topbar from '../Topbar/Topbar';
import { LayoutContainer, LayoutGlobalStyles } from './Layout.styles';
import logoFooter from '@iso/assets/images/logo/logo-footer.png';

const { Content, Footer } = Layout;
const { toggleAll } = appActions;
const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '65px 0 0 0',
    flexShrink: '0',
    background: '#ffffff',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
};

export default function LayoutCustomer(props) {
  const dispatch = useDispatch();
  const appHeight = useSelector((state) => state.App.height);
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [width, height, dispatch]);
  return (
    <LayoutContainer id='LayoutCustomer'>
      <LayoutGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Content
              className="isomorphicContent" style={styles.content}
            >
              {props.children}
            </Content>
            <Footer style={styles.footer}>
              <div>
              <img src={logoFooter} alt='Graphicprose' width='100' height='70' />
              </div>
              {siteConfig.footerText}
              </Footer>
          </Layout>
        </Layout>
      </Layout>
    </LayoutContainer>
  );
}
