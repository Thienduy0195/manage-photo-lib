import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import notification from "@iso/components/Notification";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import Scrollbars from "@iso/components/utility/customScrollBar";
import { Button } from "antd";
import postActions from "@iso/redux/posts/actions";
import CardWrapper, { Box, StatusTag } from "./Post.styles";
import TableWrapper from "../Tables/AntTables/AntTables.styles";
import moment from "moment";
import { Typography, Popconfirm } from "antd";
const { initData, deletePostRequest } = postActions;
const { Paragraph } = Typography;

export default function Posts() {
  const [selected, setSelected] = React.useState([]);

  const { initialPosts, posts, loading, isLoadPage } = useSelector(
    (state) => state.Posts
  );
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const text = "Are you sure to delete this post?";

  React.useEffect(() => {
    if (!initialPosts || isLoadPage) {
      dispatch(initData());
    }
  }, [dispatch, initialPosts, isLoadPage]);

  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      rowKey: "title",
      width: "20%",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      rowKey: "image",
      render: (text) => <img src={text} width="100" height="100" />,
    },
    {
      title: "CreateAt",
      dataIndex: "created_at",
      rowKey: "created_at",
      width: "10%",
      render: (created_at) => (
        <span>
          {created_at
            ? moment(created_at).format("MM-DD-YYYY")
            : moment().format("MM-DD-YYYY")}
        </span>
      ),
    },
    {
      title: "",
      dataIndex: "view",
      rowKey: "view",
      width: "10%",
      render: (view, post) => (
        <div className="isoInvoiceBtnView">
          <Link to={`${match.path}/${post.id}`}>
            <Button color="primary" className="invoiceViewBtn">
              View
            </Button>
          </Link>
          <Popconfirm
            placement="top"
            title={text}
            onConfirm={() => {
              dispatch(deletePostRequest(post.id));
              notification("success", `Successfully deleted ${post.id}`);
              setSelected([]);
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button className="invoiceDltBtn">
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
        <IntlMessages id="sidebar.postManagement" />
      </PageHeader>
      <Box>
        <div className="isoInvoiceTableBtn">
          <Link to={`${match.path}/create`}>
            <Button type="primary" className="mateAddInvoiceBtn">
              Add Post
            </Button>
          </Link>
        </div>

        <CardWrapper title="Posts">
          <div className="isoInvoiceTable">
            <Scrollbars style={{ width: "100%", height: "calc(100vh - 70px)" }}>
              <TableWrapper
                key="id"
                loading={loading}
                // rowSelection={rowSelection}
                dataSource={posts}
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
