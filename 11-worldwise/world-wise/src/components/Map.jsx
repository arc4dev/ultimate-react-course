import { useNavigate } from 'react-router-dom';
import styles from './Map.module.css';
import {
  Marker,
  Popup,
  TileLayer,
  MapContainer,
  useMap,
  useMapEvent,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import useCitiesContext from '../hooks/useCitiesContext';
import useGeolocation from '../hooks/useGeolocation';
import Button from './Button';
import useURLParamsSearch from '../hooks/useURLSearch';

function Map() {
  const { cities } = useCitiesContext();
  const [position, setPosition] = useState([51.505, -0.09]);
  const {
    position: geolocationPosition,
    getPosition,
    isLoading: isLoadingGeolocation,
  } = useGeolocation();
  const { lat, lng } = useURLParamsSearch();

  useEffect(() => {
    if (lat && lng) setPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button onClick={getPosition} type="position">
          {isLoadingGeolocation ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      <MapContainer
        className={styles.map}
        center={position}
        zoom={7}
        scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangePosition position={position} setPosition={setPosition} />
        <HandleClick />
      </MapContainer>
    </div>
  );
}

function ChangePosition({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function HandleClick() {
  const navigate = useNavigate();

  useMapEvent('click', (e) => {
    navigate(`/app/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`, {
      replace: true,
    });
  });
  return null;
}

export default Map;
