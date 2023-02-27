import React from "react";
import { connect } from "react-redux";
import { Button, Form, Input } from "antd";

import { UserActions } from '../../redux/actions';

import './styles.scss';

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

const EditForm = (props) => {
    const { user, auth } = props;

    const _changePassword = async (values) => {
        console.log(auth.user._id);
        props.changePassword(auth.user._id, values);
    }
    
    return <React.Fragment>
                    
        <Form
            {...layout}
            name="basic"
            onFinish={ _changePassword}
        >
            <Form.Item
                name="oldPassword"
                label="Mật khẩu cũ"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu cũ!',
                },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="newPassword"
                label="Mật khẩu mới"
                rules={[
                {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu mới!',
                },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirmNewPass"
                label="Xác nhập mật khẩu mới"
                dependencies={['newPassword']}
                hasFeedback
                rules={[
                {
                    required: true,
                    message: 'Vui lòng xác nhận mật khẩu mới!',
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                    }

                    return Promise.reject(new Error('Mật khẩu mới không trùng khớp!'));
                    },
                }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={user.isLoading}>
                    Cập nhật
                </Button>
            </Form.Item>
        </Form>
    </React.Fragment>
            
};

const mapStateToProps = state => {
    const { user, auth } = state;
    return {user, auth};
}

const mapDispatchToProps = {
    changePassword: UserActions.changePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);