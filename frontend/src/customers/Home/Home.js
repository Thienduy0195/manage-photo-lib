import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BackTop } from "antd";
import SwiperSlider from "./SwiperSliderV2/SwiperSlider";
import LayoutCustomer from "../Layout/Layout";
import httpRequest from "@iso/config/httpRequest";
import { Spin } from "antd";

const contentDefault = {
  image1: [],
  title: "",
  image2: [],
};

export default function Home() {
  const history = useHistory();
  const [headerSection, setHeaderSection] = useState({
    autoSlider: [],
    textLeft: "",
    textRight: "",
  });
  const [fileListContent, setFileListContent] = useState([contentDefault]);
  const [fileListFooter, setFileListFooter] = useState([]);
  const [loading, setLoading] = useState(false);

  const initData = async () => {
    setLoading(true);
    const { data } = await httpRequest.getBasic("homes");
    const { headers, content, footer } = data;
    // Set header section
    const fileList = headers.sliders.map((item) => ({
      ...item,
      uid: item.id,
      name: headers.title,
      url: item.img,
    }));

    const headerSectionData = {
      autoSlider: fileList,
      textLeft: headers.title,
      textRight: headers.desc,
    };
    setHeaderSection(headerSectionData);
    // Set content
    const listContent = content.map((item) => ({
      ...item,
      uid: item.id,
      title: item.desc,
      image1: [
        {
          uid: `${item.id}1`,
          name: "image1.png",
          status: "done",
          url: item.img1,
        },
      ],
      image2: [
        {
          uid: `${item.id}2`,
          name: "image2.png",
          status: "done",
          url: item.img2,
        },
      ],
    }));
    setFileListContent(listContent);
    // Set footer
    const fileListFooter = footer.map((item) => ({
      uid: item.id,
      name: "image.png",
      status: "done",
      preview: item.img,
      url: item.img,
    }));
    setFileListFooter(fileListFooter);
    setLoading(false);
  };

  useEffect(() => {
    initData();
  }, []);

  return (
    <Spin spinning={loading}>
      <LayoutCustomer>
        {!loading && (
          <SwiperSlider
            headerSection={headerSection}
            listContent={fileListContent}
            gridSlider={fileListFooter}
          />
        )}
      </LayoutCustomer>
    </Spin>
  );
}
