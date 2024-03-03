import PropTypes from 'prop-types';

function PhoneCard({ name, model, brand, price, color }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>{name}</h3>
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
    </div>
  )
}

PhoneCard.propTypes = {
  name: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default PhoneCard;
