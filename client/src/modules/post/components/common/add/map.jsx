import React, { useState } from "react";
import { connect } from "react-redux";
// import WrappedMap from './wrappedMap';
import { Form } from 'antd';
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete, Polygon } from '@react-google-maps/api';
import './styles.scss';

const Map = (props) => {
    const { onChangeLocation, location } = props;
    const containerStyle = {
        width: '100%',
        height: '600px'
    };

    const [initLocation] = useState(location || {
        lat: 21.017374,
        lng: 105.859521,
    });
    const [point, setPoint] = useState(null);
    const [autocomplete, setAutocomplete] = useState(null)
    const onLoad = polygon => {
        console.log("polygon: ", polygon);
    }

    const onPlaceChanged = () => {

    }

    const paths = [
        { lat: 25.774, lng: -80.19 },
        { lat: 18.466, lng: -66.118 },
        { lat: 32.321, lng: -64.757 },
        { lat: 25.774, lng: -80.19 },
        { lat: 65.7734, lng: -85.19 },
        { lat: 62.7734, lng: -90.19 },
        { lat: 61.7734, lng: -89.19 }
,
    ]

    const options = {
        fillColor: "transparent",
        fillOpacity: 1,
        strokeColor: "red",
        strokeOpacity: 1,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        geodesic: false,
        zIndex: 1
    }
    return <React.Fragment>
        <div className="post-add-item-header-map post-add-item-header">
            <span>Bản đồ</span>
        </div>
        <p style={{ color: "#d33320", marginBottom: "1.5rem" }}>Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn,
            hãy chọn vị trí rao bán của bạn trên bản đồ</p>

        <Form.Item
            name="location"
            label="Tọa độ bản đồ"
        >
            <LoadScript
                googleMapsApiKey="AIzaSyA15qz81pHiNfVEV3eeniSNhAu64SsJKgU"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={initLocation}
                    zoom={12}
                    onClick={(e) => onChangeLocation({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng()
                    })}
                >
                    { /* Child components, such as markers, info windows, etc. */}
                    {location && <Marker
                        position={location}
                        onClick={() => setPoint(location)}
                    />}
                    {point && <InfoWindow
                        position={point}
                        onCloseClick={() => setPoint(null)}
                    ><div>
                            <h3>Tọa độ </h3>
                            <div style={{ display: "flex" }}>
                                <b>Kinh độ: </b>
                                <p> {point.lng}</p>
                            </div>

                            <div style={{ display: "flex" }}>
                                <b>Vĩ độ: </b>
                                <p> {point.lat}</p>
                            </div>
                        </div>
                    </InfoWindow>}
                    <Polygon
                        onLoad={onLoad}
                        paths={paths}
                        options={options}
                    />
                </GoogleMap>
            </LoadScript>

        </Form.Item>
    </React.Fragment>
}

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = {
}


export default connect(mapStateToProps, mapDispatchToProps)(Map);