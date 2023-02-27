import React, { useState } from "react";
import { connect } from "react-redux";
import {
    GoogleMap,
    LoadScript,
    Marker,
} from '@react-google-maps/api';
import './styles.scss';

const Map = (props) => {
    const { location } = props;
    const containerStyle = {
        width: '100%',
        height: '600px'
    };
    const [initLocation] = useState(location || {
        lat: 21.017374,
        lng: 105.859521,
    });
    return <React.Fragment>
        <h3 className="title">Vị trí trên bản đồ</h3>

        <LoadScript
            googleMapsApiKey="AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={initLocation}
                    zoom={15}
            >
                {location && <Marker
                    position={location}
                />}
            </GoogleMap>

        </LoadScript>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);