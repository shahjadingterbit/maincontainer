const Map = ({ data, zip }) => {
  return (
    <iframe
      title="map"
      className="w-full h-full"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      id="gmap_canvas"
      src={`https://maps.google.com/maps?width=520&height=400&hl=en&q=${data.latitude}%20${data.longitude}+(Towing%20Minniapolis)&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
      // src={`https://maps.google.com/maps?width=520&height=400&hl=en&q=${
      //   data.city
      // }${
      //   zip ? `%20${zip}` : ""
      // }+(Towing%20Minniapolis)&t=&z=11&ie=UTF8&iwloc=B&output=embed`}
    ></iframe>
  );
};

export default Map;
