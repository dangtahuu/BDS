import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import { UserActions } from '../../redux/actions';
import Loading from '../../../../components/loading';
import Container from '../../container';
import Card from '../../../../components/card';

import EditForm from './editForm';

import './styles.scss';

const Profile = (props) => {
    const { auth, user } = props;
    const { userDetail = {} } = user;

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
            props.getDetailUser(auth.user._id)
        }
    },[])

    return <Container>
        {user.isLoading && <Loading />}
            <Card >
                <Card.Header>Thông tin cá nhân</Card.Header>
                    
                <Card.Body>
                    {userDetail._id && <EditForm />}
                </Card.Body>
            </ Card>
        
    </Container>
};

const mapStateToProps = state => {
    const { user, auth } = state;
    return {user, auth};
}

const mapDispatchToProps = {
    getDetailUser: UserActions.getDetailUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);