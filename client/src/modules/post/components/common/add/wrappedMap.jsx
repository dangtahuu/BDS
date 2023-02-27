import React, { useState } from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';

const Map = (props) => {
  const { onChangeLocation, location } = props;
  const [initLocation] = useState(location || {
    lat: 21.017374,
    lng: 105.859521,
  });

  const [point, setPoint] = useState(null);

  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={initLocation} // Hiển thị ra vùng trung tâm ban đầu
      onClick={(e) => onChangeLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      })}
    >
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
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));
export default WrappedMap;
