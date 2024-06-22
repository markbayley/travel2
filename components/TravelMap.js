import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useEffect, useCallback } from "react";
import MapGL, { Marker } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";
import axios from "axios";


const MAPBOX_TOKEN="pk.eyJ1IjoiaW5ibG9jayIsImEiOiJjbHg4b3VoM3cxNDA4Mm1wem1wbDhlYmppIn0.YWSASiW3GzEdOTA8lXoEFw"

const TravelMap = ({
//   selectedAddress,
//   setSelectedAddress,
   filteredResults,
//   selectedCity,
//   setViewport,
//   viewport,
  selectedCountryDetail,
  selectedCountry,
  setSelectedCountry,
  showDetail,
  searchedCountries,
  photos
}) => {
   const mapRef = useRef();


  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };
    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: 10,
    longitude: -30,
    zoom: 10,
  });

  console.log("viewport", viewport)

  // Function to update the viewport based on the search location
  useEffect(() => {
    if (selectedCountry) {
      const fetchCoordinates = async () => {
        try {
          const response = await axios.get(
            "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
              encodeURIComponent(selectedCountry) +
              ".json",
            {
              params: {
                access_token: MAPBOX_TOKEN,
              },
            }
          );
          const center = response.data.features[0].center;
          setViewport({
            ...viewport,
            latitude: center[1],
            longitude: center[0],
            zoom: 7,
          });
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      };
      fetchCoordinates();
    }
  }, [selectedCountry]);

  // console.log("filteredResultsTM", filteredResults[0].latlng[0])

  return (
    <div className="sticky top-20 flex-grow h-[80vh] z-10 ">
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxAccessToken={MAPBOX_TOKEN}
        mapStyle="mapbox://styles/inblock/clxn0epe700gd01poar3c1bmc"
        className="bg-gray-300"
      >
         {photos.map((result, i) => ( 
          <div
           key={i}
            onClick={() => {
             
              //setSelectedCountry(result.name);
              // setViewport({
              //   longitude: selectedCountryDetail.latlng[0],
              //   latitude: selectedCountryDetail.latlng[1],
              //   zoom: 14,
              //   transitionDuration: 500,
              // });
            }}
          > 
            <Marker
              longitude={result.location?.position?.longitude || selectedCountryDetail.latlng[0]}
              latitude={result.location?.position?.latitude || selectedCountryDetail.latlng[1]}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <div className="z-50 relative w-16 h-16 ">
                <div className="absolute w-12 flex justify-center items-center text-auto bg-red-400 rounded ml-6 -mt-2 text-white font-semibold">
                  {/* {"$" + selectedCountryDetail.gini} */}
                </div>
                <Image
                  alt="image-marker"
                  src={result?.urls?.small}
                  fill
                  style={{objectFit:"cover"}}
                  className={
                    "z-50 rounded-full border-2 border-white hover:border-white-400 shadow-xl cursor-pointer text-2xl hover:scale-105 transform duration-100 ease-out  active:scale-90 tranition"
                  }
                />
              </div>
            </Marker>
          </div> 
        ))} 

        {/* <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-right"
        /> */}
      </MapGL>
    </div>
  );
};

export default TravelMap;