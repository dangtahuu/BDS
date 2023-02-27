import React from "react";
import { connect } from "react-redux";

import { UserActions } from '../../redux/actions';
import Container from '../../container';
import Card from '../../../../components/card';

import EditForm from './editForm';

import './styles.scss';

const Password = (props) => {

    return <Container>
        <Card >
            <Card.Header>Thay đổi mật khẩu</Card.Header>

            <Card.Body>
                <EditForm />
            </Card.Body>
        </ Card>

    </Container>
};

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
    changePassword: UserActions.changePassword
}

export default connect(mapStateToProps, mapDispatchToProps)(Password);