import React, { useState } from "react";
import { Typography } from "antd";
import ContentHolder from "@iso/components/utility/contentHolder";
import LayoutWrapper from "@iso/components/utility/layoutWrapper.js";
import Row from "@iso/ui/Antd/Grid/Row";
import Col from "@iso/ui/Antd/Grid/Col";

import {
  SwiperBasic,
  SwiperMultiple,
  SwiperAutoPlay,
} from "@iso/ui/SwiperSlider";
import basicStyle from "@iso/assets/styles/constants";
import PageWrapper from "./SwiperSlider.styles";

const { Text, Title } = Typography;

const MatchMaking = ({ headerSection, listContent, gridSlider }) => {
  const { autoSlider, textRight, textLeft } = headerSection;
  const { rowStyle, gutter, backgroundImage } = basicStyle;

  const Slider = () => (
    <Row
      gutter={gutter}
      justify="start"
      style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
    >
      <Col md={24} sm={24} xs={24} style={{ padding: 0 }}>
        <ContentHolder>
          <SwiperAutoPlay>
            {autoSlider.map((item) => (
              <img
                key={`auto-slider--key${item.uid}`}
                src={item.url}
                alt={item.name}
              />
            ))}
          </SwiperAutoPlay>
        </ContentHolder>
      </Col>
    </Row>
  );

  const SliderFooter = () => (
    <Row
      gutter={gutter}
      justify="start"
      style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
    >
      <Col md={24} sm={24} xs={24} style={{ padding: 0 }}>
        <ContentHolder>
          <SwiperMultiple autoplay={true}>
            {gridSlider.map((item) => (
              <img
                key={`grid-slider--key${item.uid}`}
                src={item.url}
                alt={item.name}
              />
            ))}
          </SwiperMultiple>
        </ContentHolder>
      </Col>
    </Row>
  );

  return (
    <PageWrapper>
      <LayoutWrapper>
        {autoSlider.length > 0 ? (
          <Slider />
        ) : (
          <Row style={{ backgroundColor: "#dee4ea", minHeight: "300px" }}>
            HEADER SECTION
            <Col span={24}>LIST SLIDER</Col>
          </Row>
        )}

        {textRight || textLeft ? (
          <Row
            gutter={gutter}
            justify="start"
            style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
          >
            <Col md={8} sm={24} xs={24} style={{ paddingRight: "20px" }}>
              <Row style={rowStyle} gutter={gutter} justify="end">
                <Col>
                  <Title level={2}>
                    <Text strong>{textLeft}</Text>
                  </Title>
                </Col>
              </Row>
            </Col>
            <Col md={10} sm={24} xs={24} style={{ padding: 0 }}>
              <Title level={4}>
                <Text strong>{textRight}</Text>
              </Title>
            </Col>
          </Row>
        ) : (
          <Row style={{ backgroundColor: "#dee4ea", minHeight: "300px" }}>
            INTRODUCTION SECTION
            <Col span={12}>TEXT LEFT</Col>
            <Col span={12}>TEXT RIGHT</Col>
          </Row>
        )}

        {listContent[0].image1.length > 0 ||
        listContent[0].image2.length > 0 ? (
          listContent.map((contentItem, index) => (
            <div key={index}>
              <Row
                gutter={gutter}
                justify="start"
                style={{ margin: 0, paddingBottom: "30px", ...rowStyle }}
              >
                <Col md={24} sm={24} xs={24} style={{ padding: 0 }}>
                  {contentItem.image1[0] && (
                    <SwiperBasic>
                      <img
                        key={`auto-slider--key${contentItem.image1[0].uid}`}
                        src={contentItem.image1[0].url}
                        alt={contentItem.image1[0].name}
                      />
                    </SwiperBasic>
                  )}
                </Col>
              </Row>

              {contentItem.image2[0] && (
                <Row
                  gutter={gutter}
                  justify="center"
                  align="middle"
                  style={{
                    margin: 0,
                    paddingBottom: "30px",
                    minHeight: "600px",
                    ...backgroundImage(contentItem.image2[0].url),
                  }}
                >
                  <Col>
                    <Title level={2}>
                      <Text strong style={{ color: 'white' }}>{contentItem.title}</Text>
                    </Title>
                  </Col>
                </Row>
              )}
            </div>
          ))
        ) : (
          <Row style={{ backgroundColor: "#dee4ea", minHeight: "300px" }}>
            CONTENT SECTION
            <Col span={24}>Image 1</Col>
            <Col span={24}>Image 2</Col>
          </Row>
        )}

        {gridSlider.length > 0 ? (
          <SliderFooter />
        ) : (
          <Row style={{ backgroundColor: "#dee4ea", minHeight: "300px" }}>
            FOOTER SECTION
            <Col span={24}>Slider Footer</Col>
          </Row>
        )}
      </LayoutWrapper>
    </PageWrapper>
  );
};

export default MatchMaking;
