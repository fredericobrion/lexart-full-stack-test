import { useState } from "react";

import PropTypes from "prop-types";

function AddQuantityPhoneForm({
  position,
  setPhoneData,
  phoneData,
  handleDeleteData,
  setDeactivated,
}) {
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(0);

  const handleChange = (e) => {
    const updatedPhoneData = [...phoneData];
    if (e.target.name === "color") {
      setColor(e.target.value);
      updatedPhoneData[position].color = e.target.value;
      setPhoneData(updatedPhoneData);
    } else {
      setPrice(e.target.value);
      updatedPhoneData[position].price = e.target.value;
      setPhoneData(updatedPhoneData);
    }
  };
  
  console.log("price", price);
  return (
    <div>
      <input
        type="text"
        placeholder="Cor"
        value={color}
        name="color"
        onChange={(e) => handleChange(e)}
      />
      <input
        type="number"
        name="price"
        value={price}
        placeholder="Preço"
        onChange={(e) => handleChange(e)}
      />
      <button onClick={() => setPhoneData([...phoneData, {}])}>
        Adicionar
      </button>
      <button onClick={() => handleDeleteData(position)}>Remover</button>
    </div>
  );
}

AddQuantityPhoneForm.propTypes = {
  position: PropTypes.number.isRequired,
  setPhoneData: PropTypes.func.isRequired,
  phoneData: PropTypes.array.isRequired,
  handleDeleteData: PropTypes.func.isRequired,
  setDeactivated: PropTypes.func.isRequired,
};

export default AddQuantityPhoneForm;
