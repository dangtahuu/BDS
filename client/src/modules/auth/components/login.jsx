import React from "react";
import { connect } from "react-redux";
import { AuthActions } from '../redux/actions';
import { Button, Modal, Form, Input } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Login = (props) => {

    const { visibleLogin, setState, auth } = props;
    const [form] = Form.useForm()
    const navigate = useNavigate()
    const submitLogin = async (values) => {
        // Call api
        navigate('/')
        await props.login(values);
    };

    useEffect(() => {
        if (auth.isAuth === true) {

            form.resetFields()
        }
    }, [auth.isAuth])
    return <Modal
        title="Đăng nhập"
        visible={visibleLogin}
        footer={null}
        onCancel={() => setState({ visibleLogin: false })

        }
    >
        <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={submitLogin}
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập email!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={auth.isLoading}
                >
                    Đăng nhập
                </Button>
            </Form.Item>
        </Form>
    </Modal>
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    login: AuthActions.login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
