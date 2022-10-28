import React from "react";
import moment from "moment";
import { Typography, Button, Row, Col } from "antd";
import { SingleCardWrapper } from "./Shuffle.styles";
import { useHistory } from "react-router-dom";

const { Text, Title, Paragraph } = Typography;

export default function (props) {
  const history = useHistory();
  const listClass = `isoSingleCard card ${props.view}`;
  const style = { zIndex: 100 - props.index };

  return (
    <SingleCardWrapper id={props.id} className={listClass} style={style}>
      <div className="isoCardImage">
        <img alt="#" src={props.image} />
      </div>
      <div className="isoCardContent">
        <Title level={3} ellipsis={{ rows: 2 }}>
          <Text strong>{props.title}</Text>
        </Title>
        {/* <Paragraph ellipsis={{ rows: 4 }}>{props.desc}</Paragraph> */}
      </div>
      <div className="isoCardFooter">
        <Row justify="space-between">
          <Col>
            <span className="isoCardDate">
              {props.updated_at
                ? moment(props.updated_at).format("MMM Do, YYYY")
                : moment().format("MMM Do, YYYY")}
            </span>
          </Col>
          <Col>
            <Button
              type="link"
              onClick={() => history.push(`/post/${props.id}`)}
            >
              Read More »
            </Button>
          </Col>
        </Row>
      </div>
    </SingleCardWrapper>
  );
}
