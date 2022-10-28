import React, { useState } from "react";
import { Row, Col, Typography, InputNumber } from "antd";
import LayoutCustomer from "../Layout/Layout";
import aboutImage from "@iso/assets/images/about/aboutImage.jpeg";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

import "./style.css";

const { Text, Title } = Typography;

const ButtonWrapper = ({ currency, amount }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  React.useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency
      },
    });
  }, [currency, amount]);

  return (
    <PayPalButtons
      fundingSource="paypal"
      style={{ layout: "vertical", label: "donate" }}
      disabled={false}
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                  breakdown: {
                    item_total: {
                      currency_code: "USD",
                      value: amount,
                    },
                  },
                },
                items: [
                  {
                    name: "donation",
                    quantity: "1",
                    unit_amount: {
                      currency_code: "USD",
                      value: amount,
                    },
                    category: "DONATION",
                  },
                ],
              },
            ],
          })
          .then((orderId) => {
            // Your code here after create the donation
            return orderId;
          });
      }}
    />
  );
};

export default function Galleries() {
  const [amount, setAmount] = useState(1);
  return (
    <LayoutCustomer>
      <header className="isoControlBar" style={{ paddingTop: "10px" }}>
        <img className="imgDonateSize" src={aboutImage} />
      </header>
      <header className="isoControlBar" style={{ paddingTop: "10px" }}>
        <Title level={2}>
          <Text strong>Graphic Prose depends on you</Text>
        </Title>
      </header>
      <header className="isoControlBar" style={{ paddingTop: "10px" }}>
        <div className="desc-text">
          <Text>Like most artists, I’m uncomfortable with fundraising. But I've learned pretty quickly that every step of this process is expensive. A high-quality camera and lenses needed to take professional photos are prohibitively expensive. Building and maintaining a website is also a large financial drain, especially with a developer involved. In addition, creating compelling content takes time. Learning the craft of photography, actually practicing in the field, processing digital files, writing, editing, and website updates consume many hours. I could not sustain my output without borrowing just a little time from my day job, and I’m not ashamed to admit that I cannot afford to do that without assistance.</Text>
        </div>
      </header>
      <header className="isoControlBar" style={{ paddingTop: "10px" }}>
        <div className="desc-text">
          <Text>So I'm asking for your help. I will continue to post photos on social media for everyone to enjoy. The musings and stories behind the images will migrate entirely to the Graphic Prose website. There will be no paywall or cost to access content. If you enjoy the material and like me don't have surplus funds to spend on art, no problem. You will always be welcome.</Text>
        </div>
      </header>
      <header className="isoControlBar" style={{ paddingTop: "10px" }}>
        <div className="desc-text">
          <Text>
          On the other hand, to get this site up and running and help it grow, many bills must be paid. So if you find value in these photos and stories--if they make you smile or think or feel a little closer to Vietnam--and your finances allow, I ask you to consider making a donation to Graphic Prose: large or small or in-between, one-time or recurring. Whatever feels right to you and your pocket. Your generosity will not be forgotten. As a very small token of gratitude, you will find your name--unless you prefer to remain anonymous--on the Graphic Prose virtual wall of supporters. Anyone who donates $25 or more will also receive a high-resolution digital photo of your choice from this website or <a href="https://www.instagram.com/benquick_vn/" target="_blank">my Instagram feed</a> along with instructions on having your photo professionally printed on museum-quality paper that will last a lifetime. For the photo, please send an email to <a href="mailto:bnquick74@gmail.com">bnquick74@gmail.com</a> with the subject line “Graphic Prose,” containing the date and a short description of the Instagram or website post. Your photo will arrive within seven days (usually much fewer).
          </Text>
        </div>
      </header>
      <header className="isoControlBar" style={{ paddingTop: "10px" }}>
        <div className="desc-text">
          <Text>
          You should know that a donation to Graphic Prose is also a donation to the Da Nang chapter of the <a href="http://www.vavadanang.org.vn/index.php/en/dava-introduction" target="_blank">Vietnam Association of Victims of Agent Orange/Dioxin</a>, locally known as DAVA, an organization to which I have pledged 5% of all funds collected. Many of you already know this, but for those who don't, I am visibly disabled. My father served as an infantry soldier in southern Vietnam and Cambodia, and my birth defects were caused by his exposure to <a href="https://www.aspeninstitute.org/programs/agent-orange-in-vietnam-program/what-is-agent-orange/" target="_blank">Agent Orange</a> during his tour of duty. In fact, many Vietnam Veterans and their children have had similar experiences. I wrote my own story a few years back, and if you take the time to read it <a href="https://orionmagazine.org/article/agent-orange-a-chapter-from-history-that-just-wont-end/" target="_blank">here in Orion Magazine</a>, you will understand why l support DAVA. You will also know that the problems in Vietnam caused by Agent Orange continue to this day. Hence the need for groups like DAVA and people like the American Veterans currently living in Da Nang--oh yes, there are many--who are some of DAVA's biggest champions, giving their time and resources to heal the wounds of war in myriad ways. If you help sustain Graphic Prose, you'll get to know a few of them very well.
          </Text>
        </div>
      </header>
      <header className="isoControlBar" style={{ paddingTop: "10px" }}>
        <div style={{ maxWidth: "750px", minHeight: "200px" }}>
          <InputNumber
            value={amount}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={(value) => setAmount(value)}
          />
          <hr />
          <PayPalScriptProvider
            options={{
              "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
              components: "buttons",
              currency: "USD",
            }}
          >
            <ButtonWrapper currency={"USD"} amount={amount} />
          </PayPalScriptProvider>
        </div>
      </header>
    </LayoutCustomer>
  );
}
