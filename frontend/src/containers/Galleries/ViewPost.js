import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@iso/components/utility/box';
import { Button } from 'antd';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import InvoicePageWrapper from './SinglePost.styles';
import Post from './Post';

export default function (props) {
  const { currentPost, toggleView, redirectPath } = props;
  console.log(props, 'props');

  return (
    <LayoutWrapper>
      <Box style={{ padding: 20 }}>
        <InvoicePageWrapper className="InvoicePageWrapper">
          <div className="PageHeader viewMode">
            <Link to={redirectPath}>
              <Button className="isoGoInvoBtn">
                <span>Go To Posts</span>
              </Button>
            </Link>
            <Button color="secondary" onClick={() => toggleView(true)}>
              <span>Edit Post</span>
            </Button>
          </div>
          <Post currentPost={currentPost} ref={(post) => post} />
          <div className="ButtonWrapper">
            <Button type="primary" className="mateInvoPrint">
              <span>Send Post</span>
            </Button>
          </div>
        </InvoicePageWrapper>
      </Box>
    </LayoutWrapper>
  );
}
