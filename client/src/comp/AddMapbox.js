import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import StoreId from './StoreId';
import { useLocation } from 'react-router-dom';

const AddMapbox = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  // const companyName = params.get('companyName');
  const companyName = params.get('companyName') || 'lexicon';
  const [mapboxApiToken, setMapboxApiToken] = useState('');
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [data, setData] = useState(null);
  const [id, setId] = useState(1);

  useEffect(() => {
    fetch('http://localhost:3001/mapApi')
      .then((res) => res.json())
      .then((data) => {
        // console.log('accessTokenMap received:', data);
        if (data.mapboxApiToken) {
          mapboxgl.accessToken = data.mapboxApiToken;
          setMapboxApiToken(data.mapboxApiToken);
        } else {
          console.error('Mapbox API token not found in response.');
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (companyName) {
      fetch(`http://localhost:3001/api?companyName=${companyName}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setCurrentLocation([data[0]?.coordinates[1], data[0]?.coordinates[0]]);

          // console.log('data received:', data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [companyName]);

  useEffect(() => {
    if (!map.current && mapboxApiToken && data) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: currentLocation,
        zoom: 7,
      });

      new mapboxgl.Marker({ color: 'red' }).setLngLat(currentLocation).addTo(map.current);

      data.forEach((store) => {
        // console.log('Coordinates:', currentLocation);
        const marker = new mapboxgl.Marker({ color: 'blue' })
          .setLngLat(store.coordinates.reverse())
          .addTo(map.current);

        // Add click event listener to each marker
        marker.getElement().addEventListener('click', () => {
          //  console.log(store.storeId);
          setId(store.storeId);
        });

        // Popup content for each marker
        const popupContent = `
        <div >
          <p>Name: ${store.name}</p>
          <p>Address: ${store.address.street}, ${store.address.city}</p>
        </div>
      `;

        const popup = new mapboxgl.Popup({
          closeOnClick: false,
        }).setHTML(popupContent);
        marker.setPopup(popup);
      });
    }
  }, [mapboxApiToken, data, currentLocation]);

  if (!mapboxApiToken) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flexbox">
      <div className="info">
        <StoreId storeId={id} companyName={companyName} />
      </div>
      <div className="map">
        <div ref={mapContainer} className="map-container" />
      </div>
    </div>
  );
};

export default AddMapbox;
