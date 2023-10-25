import styles from './CountryList.module.css';
import Spinner from './Spinner';
import Message from './Message';
import CountryItem from './CountryItem';
import useCitiesContext from '../hooks/useCitiesContext';

function CountryList() {
  const { cities, isLoading } = useCitiesContext();

  if (isLoading) return <Spinner />;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    }

    return arr;
  }, []);

  if (!countries.length)
    return <Message message="Add your first country by clicking on the map!" />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem key={country + i} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
