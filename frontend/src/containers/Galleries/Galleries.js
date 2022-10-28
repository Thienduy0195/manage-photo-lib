import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import notification from '@iso/components/Notification';
import LayoutWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import IntlMessages from '@iso/components/utility/intlMessages';
import Scrollbars from '@iso/components/utility/customScrollBar';
import { Button, Popconfirm } from 'antd';
import galleryActions from '@iso/redux/galleries/actions';
import CardWrapper, { Box } from './Post.styles';
import TableWrapper from '../Tables/AntTables/AntTables.styles';
import moment from 'moment';
import { Typography } from 'antd'
const { initData, deleteGalleryRequest } = galleryActions;
const { Paragraph } = Typography;
const text = 'Are you sure to delete this gallery?';

export default function Galleries() {
  const [selected, setSelected] = React.useState([]);
  const { initialGalleries, galleries, loading, isLoadPage } = useSelector((state) => state.Galleries);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  React.useEffect(() => {
    if (!initialGalleries || isLoadPage) {
      dispatch(initData());
    }
  }, [dispatch, initialGalleries, isLoadPage]);

  const columns = [
    {
      title: '',
      dataIndex: 'image',
      rowKey: 'image',
      width: '10%',
      render: (src) => (
        <div width="200px" height="200px">
          <img src={src} style={{ width: '100%', height: '100%' }} />
        </div>)
    },
    {
      title: 'Title',
      dataIndex: 'title',
      rowKey: 'title',
      width: '20%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      rowKey: 'price',
      width: '10%',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      rowKey: 'description',
      render: (text) => <div style={{ width: '200px' }}>
        <Paragraph ellipsis>
          {text}
        </Paragraph>
      </div>,
    },
    {
      title: 'CreatedAt',
      dataIndex: 'time',
      rowKey: 'time',
      width: '10%',
      render: (time) => <span>{moment(time).format('MM-DD-YYYY')}</span>,
    },
    {
      title: '',
      dataIndex: 'view',
      rowKey: 'view',
      width: '10%',
      render: (view, gallery) => (
        <div className="isoInvoiceBtnView">
          <Link to={`${match.path}/${gallery.id}`}>
            <Button color="primary" className="invoiceViewBtn">
              View
            </Button>
          </Link>
          <Popconfirm placement="top" title={text} onConfirm={() => {
            dispatch(deleteGalleryRequest(gallery.id));
            notification('success', `Successfully deleted ${gallery.id}`);
            setSelected([]);
          }} okText="Yes" cancelText="No">
            <Button
              className="invoiceDltBtn"
            >
              <i className="ion-android-delete" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.galleryManagement" />
      </PageHeader>
      <Box>
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/create`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              Add Gallery
            </Button>
          </Link>
        </div>

        <CardWrapper title="Galleries">
          <div className="isoInvoiceTable">
            <Scrollbars
              style={{ width: '100%', height: 'calc(100vh - 70px)' }}
            >
              <TableWrapper
                // rowSelection={rowSelection}
                loading={loading}
                dataSource={galleries}
                columns={columns}
                pagination={false}
                className="invoiceListTable"
              />
            </Scrollbars>
          </div>
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
}
