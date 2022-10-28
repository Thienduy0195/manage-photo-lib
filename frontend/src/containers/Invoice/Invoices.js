import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import notification from "@iso/components/Notification";
import HelperText from "@iso/components/utility/helper-text";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import IntlMessages from "@iso/components/utility/intlMessages";
import Scrollbars from "@iso/components/utility/customScrollBar";
import { Select, Button, Modal, Descriptions, Row, Col, Table } from "antd";
import invoiceActions from "@iso/redux/invoice/actions";
import CardWrapper, { Box, StatusTag } from "./Invoice.styles";
import TableWrapper from "../Tables/AntTables/AntTables.styles";
import httpRequest from "@iso/config/httpRequest";

const { initData, deleteInvoice } = invoiceActions;

const options = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "Processing",
    value: "processing",
  },
  {
    label: "Complete",
    value: "complete",
  },
];
export default function Invoices() {
  const [selected, setSelected] = React.useState([]);
  const [galleries, setGalleries] = React.useState([]);
  const { initialInvoices, invoices } = useSelector((state) => state.Invoices);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const getGalleries = async () => {
    const response = await httpRequest.get("galleries");
    setGalleries(response.data);
  };

  React.useEffect(() => {
    getGalleries();
  }, []);

  React.useEffect(() => {
    if (!initialInvoices) {
      dispatch(initData());
    }
  }, [dispatch, initialInvoices]);

  const columns = [
    {
      title: "Number",
      dataIndex: "orderID",
      rowKey: "orderID",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      rowKey: "firstName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      rowKey: "lastName",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Address",
      dataIndex: "address",
      rowKey: "address",
      render: (text, invoice) => (
        <span>
          {invoice.country} - {invoice.city} - {text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      rowKey: "status",
      render: (text, orderStatus) => {
        let className;
        if (text === "processing") {
          className = "shipped";
        } else if (text === "complete") {
          className = "delivered";
        } else if (text === "new") {
          className = "pending";
        }
        return <StatusTag className={className}>{text}</StatusTag>;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      rowKey: "id",
      render: (text, invoice) => (
        <div className="isoInvoiceBtnView">
          <Button
            color="primary"
            className="invoiceViewBtn"
            style={{ marginRight: "10px" }}
            onClick={() => info(invoice)}
          >
            View Order
          </Button>
          <Select
            options={options}
            value={invoice.status}
            // onChange={handleChange}
          />
        </div>
      ),
    },
  ];
  const getnewInvoiceId = () => new Date().getTime();
  // const { match, invoices, deleteInvoice } = this.props;
  const rowSelection = {
    hideDefaultSelections: true,
    selectedRowKeys: selected,
    onChange: (selected) => setSelected(selected),
    selections: [
      {
        key: "all-data",
        text: "Select All Invoices",
        onSelect: () => setSelected(invoices.map((invoice) => invoice.key)),
      },
      {
        key: "no-data",
        text: "Unselect all",
        onSelect: () => setSelected([]),
      },
      {
        key: "delete-selected",
        text: "Delete selected",
        onSelect: (changableRowKeys) => {
          if (selected.length > 0) {
            dispatch(deleteInvoice(selected));
            setSelected([]);
            notification("error", `${selected.length} invoices deleted`);
          }
        },
      },
    ],
    onSelection: (selected) => setSelected(selected),
  };

  const columnDetails = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record, index) => (
        <img src={text} width="200px" height="200px" />
      ),
    },
    {
      title: "Gallery Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  const info = (list) => {
    const data = list.order_products.map((item) => {
      const gallery = galleries.find(
        (galleryItem) => galleryItem.id === item.gallery_id
      );
      return {
        ...gallery,
        ...item,
      };
    });
    Modal.info({
      content: (
        <Row>
          <Col span={24}>
            <Descriptions title="Order Info">
              <Descriptions.Item label="Full Name">
                {list.firstName} {list.lastName}
              </Descriptions.Item>
              <Descriptions.Item label="Telephone">
                {list.mobile}
              </Descriptions.Item>
              <Descriptions.Item label="Live">
                {list.country} - {list.city}
              </Descriptions.Item>
              <Descriptions.Item label="Remark">
                {list.optional}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {list.address}
              </Descriptions.Item>
              <Descriptions.Item label="Total Price">
                {list.amount} $
              </Descriptions.Item>
            </Descriptions>
          </Col>
          <Col span={24}>
            <Table columns={columnDetails} dataSource={data} />
          </Col>
        </Row>
      ),
      onOk() {},
      width: 1000,
    });
  };

  return (
    <LayoutWrapper>
      <PageHeader>
        <IntlMessages id="sidebar.invoice" />
      </PageHeader>
      <Box>
        <CardWrapper title="Invoices">
          {invoices.length === 0 ? (
            <HelperText text="No Invoices" />
          ) : (
            <div className="isoInvoiceTable">
              <Scrollbars
                style={{ width: "100%", height: "calc(100vh - 70px)" }}
              >
                <TableWrapper
                  rowSelection={rowSelection}
                  dataSource={invoices}
                  columns={columns}
                  pagination={false}
                  className="invoiceListTable"
                />
              </Scrollbars>
            </div>
          )}
        </CardWrapper>
      </Box>
    </LayoutWrapper>
  );
}
