import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './Map.module.css';

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  return (
    <div onClick={() => navigate('form')} className={styles.mapContainer}>
      <h1>Map</h1>
      <h2>
        Position: {lat}, {lng}
      </h2>
    </div>
  );
}

export default Map;
