// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button';
import BackButton from './BackButton';
import useURLParamsSearch from '../hooks/useURLSearch';
import axios from 'axios';
import useCitiesContext from '../hooks/useCitiesContext';
import { customAlphabet } from 'nanoid';
import Spinner from './Spinner';
import Message from './Message';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();

  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [, setIsLoadingGeocode] = useState(false);
  const [errorGeocoding, setErrorGeocoding] = useState(null);

  const { addCity, isLoading } = useCitiesContext();

  const { lat, lng } = useURLParamsSearch();

  useEffect(() => {
    const getCityInfo = async ({ lat, lng }) => {
      try {
        if (!lat && !lng)
          throw new Error(
            'You did not chooose a city! Click somewhere on the map to select one.'
          );

        setCityName('');
        setNotes('');
        setErrorGeocoding('');
        setIsLoadingGeocode(true);

        const res = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        );
        const { data } = res;

        if (!data.countryCode)
          throw new Error(
            'That does not look like a city! Click somehwere else.'
          );

        setCountry(data.countryName);
        setCityName(data.city || data.locality || data.principalSubdivision);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setErrorGeocoding(err.message);
      } finally {
        setIsLoadingGeocode(false);
      }
    };

    getCityInfo({ lat, lng });
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nanoid = customAlphabet('1234567890', 8);
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes: notes.trim(),
      position: {
        lat: +lat,
        lng: +lng,
      },
      id: +nanoid(),
    };

    await addCity(newCity);
    navigate('/app/cities');
  };

  if (errorGeocoding) return <Message message={errorGeocoding} />;
  if (!cityName) return <Spinner />;

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          className="datePicker"
          value={dayjs(date)}
          onChange={(date) => setDate(date)}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button onClick={handleSubmit} type="primary">
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
