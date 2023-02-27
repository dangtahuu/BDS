import React from "react";
import "./styles.scss";
import { Row, Col } from "antd";
import { PhoneOutlined, FacebookOutlined, MailOutlined } from "@ant-design/icons";

const Footer = () => {
    return (
        <Row type="flex" gutter={[20, 20]} className="app-footer">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <h1 style={{ color: "#1890ff", fontSize: "24px" }}>
                    <strong>Mua bán nhà đất</strong>
                </h1>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <h3>{"Mua - bán nhà đất"}</h3>
                <h3>{"Cho thuê - thuê nhà đất tiện lợi, nhanh chóng"}</h3>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12} className="right-footer">
                <div>
                    <h3>
                        <PhoneOutlined theme="filled" />
                        {" Liên hệ với chúng tôi"}: 012.345.6789
                    </h3>
                </div>
                <div>
                    <h3>
                        <a href="https://www.facebook.com">
                            <FacebookOutlined theme="filled" style={{ background: "white", color: "#4267B2" }} />
                            {" Theo dõi fanpage"}
                        </a>
                    </h3>
                </div>
                <div>
                    <h3>
                        <MailOutlined style={{ background: "white", color: "#c71610" }} /> Email: batdangsan@gmail.com
                    </h3>
                </div>
            </Col>
        </Row>
    );
};

export default Footer;
