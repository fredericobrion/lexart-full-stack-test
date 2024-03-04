import PropTypes from "prop-types";
import styles from "./phoneCard.module.css";
import { Link } from "react-router-dom";

function PhoneCard({ name, model, brand, price, color, id }) {
  return (
    <Link to={`/phones/${id}`} className={styles.linkContainer}>
      <div className={styles.cardContainer}>
        <h2>{name}</h2>
        <p>
          <strong>Brand:</strong> {brand}
        </p>
        <p>
          <strong>Model:</strong> {model}
        </p>
        <p>
          <strong>Price:</strong> {price}
        </p>
        <p>
          <strong>Color:</strong> {color}
        </p>
        <p>
          <strong>ID:</strong> {id}
        </p>
      </div>
    </Link>
  );
}

PhoneCard.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default PhoneCard;
