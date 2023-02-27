// import React, { useState } from 'react';
// import {
//   GoogleMap,
//   withScriptjs,
//   withGoogleMap,
//   Marker,
// } from 'react-google-maps';

// const Map = (props) => {
//   const { location } = props;
//   const [initLocation] = useState(location || {
//     lat: 21.017374,
//     lng: 105.859521,
//   });

//   return (
//     <GoogleMap
//       defaultZoom={15}
//       defaultCenter={initLocation} // Hiển thị ra vùng trung tâm ban đầu
//     >
//       {location && <Marker
//         position={location}
//       />}
//     </GoogleMap>
//   );
// };

// const WrappedMap = withScriptjs(withGoogleMap(Map));
// export default WrappedMap;
