import { useCities } from "../contexts/CitiesContext";
import styles from "./CityList.module.css";
import Cityitem from "./Cityitem";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length) {
    return (
      <Message message="Add Your First city by clicking on a city on the map" />
    );
  }
  return (
    <ul className={styles.citylist}>
      {cities.map((city) => (
        <Cityitem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
