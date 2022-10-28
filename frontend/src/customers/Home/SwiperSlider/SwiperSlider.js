import React from "react";
import { Typography } from "antd";
import ContentHolder from "@iso/components/utility/contentHolder";
import Row from "@iso/ui/Antd/Grid/Row";
import Col from "@iso/ui/Antd/Grid/Col";
import slide1 from '@iso/assets/images/slider/14.png';
import slide2 from '@iso/assets/images/slider/15.png';
import {
  SwiperBasic,
  SwiperMultiple,
  SwiperAutoPlay,
} from "@iso/ui/SwiperSlider";
import basicStyle from "@iso/assets/styles/constants";
import PageWrapper from "./SwiperSlider.styles";

// data
import {
  basicSlider,
  bulletSlider,
  gridSlider,
  autoSlider,
} from "./slider.data";

const { Text, Title } = Typography;

const MatchMaking = () => {
  const { rowStyle, gutter, backgroundImage } = basicStyle;
  return (
    <PageWrapper>
      <Row
        gutter={gutter}
        justify="start"
        style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
      >
        <Col md={24} sm={24} xs={24} style={{ padding: 0 }}>
          <SwiperAutoPlay>
            {autoSlider.map((item) => (
              <img
                key={`auto-slider--key${item.id}`}
                src={item.thumb_url}
                alt={item.title}
              />
            ))}
          </SwiperAutoPlay>
        </Col>
      </Row>

      <Row
        gutter={gutter}
        justify="start"
        style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
      >
        <Col md={8} sm={24} xs={24} style={{ paddingRight: '20px' }}>
          <Row style={rowStyle} gutter={gutter} justify="end">
            <Col>
              <Title level={2}>
                <Text mark strong type="warning">
                  BEN QUICK OFFICIAL
                </Text>
              </Title>
            </Col>
          </Row>
        </Col>
        <Col md={10} sm={24} xs={24} style={{ padding: 0 }}>
          <Title level={4}>
            <Text strong>
              Ben Quick work merges Fine Art and Documentary styles. His Vietnam travel photography depicts ethnic culture, landscapes, and portraits with emotions.
            </Text>
          </Title>
        </Col>
      </Row>

      <Row
        gutter={gutter}
        justify="start"
        style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
      >
        <Col md={24} sm={24} xs={24} style={{ padding: 0 }}>
          <SwiperBasic>
            <img
              key={`auto-slider--key${basicSlider[0].id}`}
              src={basicSlider[0].thumb_url}
              alt={basicSlider[0].title}
            />
          </SwiperBasic>
        </Col>
      </Row>


      <Row
        gutter={gutter}
        justify="center"
        align="middle"
        style={{ margin: 0, paddingBottom: "30px", minHeight: '600px', ...backgroundImage(slide1) }}
      >
        <Col>
          <Title level={2}>
            <Text mark strong type="warning">
              Ben Quick work merges Fine Art and Documentary styles
            </Text>
          </Title>
        </Col>
      </Row>

      <Row
        gutter={gutter}
        justify="start"
        style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
      >
        <Col md={24} sm={24} xs={24} style={{ padding: 0 }}>
          <SwiperBasic>
            <img
              key={`auto-slider--key${basicSlider[2].id}`}
              src={basicSlider[2].thumb_url}
              alt={basicSlider[2].title}
            />
          </SwiperBasic>
        </Col>
      </Row>

      <Row
        gutter={gutter}
        justify="center"
        align="middle"
        style={{ margin: 0, paddingBottom: "30px", minHeight: '600px', ...backgroundImage(slide2) }}
      >
        <Col>
          <Title level={2}>
            <Text mark strong type="warning">
              Ben Quick work merges Fine Art and Documentary styles
            </Text>
          </Title>
        </Col>
      </Row>

      <Row
        gutter={gutter}
        justify="start"
        style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
      >
        <Col md={24} sm={24} xs={24} style={{ padding: 0 }}>
          <SwiperBasic>
            <img
              key={`auto-slider--key${bulletSlider[1].id}`}
              src={bulletSlider[1].thumb_url}
              alt={bulletSlider[1].title}
            />
          </SwiperBasic>
        </Col>
      </Row>

      <Row
        gutter={gutter}
        justify="start"
        style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
      >
        <Col md={24} sm={24} xs={24} style={{ padding: 0 }}>
          <ContentHolder>
            <SwiperMultiple autoplay={true}>
              {gridSlider.map(item => (
                <img
                  key={`grid-slider--key${item.id}`}
                  src={item.thumb_url}
                  alt={item.title}
                />
              ))}
            </SwiperMultiple>
          </ContentHolder>
        </Col>
      </Row>
    </PageWrapper>
  );
};

export default MatchMaking;
