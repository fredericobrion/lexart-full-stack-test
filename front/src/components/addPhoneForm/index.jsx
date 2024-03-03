import { useState } from "react";
import AddQuantityPhoneForm from "../addQuantityPhoneForm";

function AddPhoneForm() {
  const [phoneData, setPhoneData] = useState([{}]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [deactivated, setDeactivated] = useState(true);

  console.log(phoneData);

  const handleDeleteData = (position) => {
    setPhoneData(phoneData.filter((_, index) => index !== position));
  }

  const filledData = phoneData.every((phone) => phone.color !== "" && phone.price > 0);
  const filledName = name !== "";
  const filledBrand = brand !== "";
  const filledModel = model !== "";

  // if (filledData && filledName && filledBrand && filledModel) {
  //   setDeactivated(false);
  // }

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Marca"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          placeholder="Modelo"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>
      <div>
        {phoneData.map((phone, index) => {
          return (
            <AddQuantityPhoneForm
              key={index}
              position={index}
              setPhoneData={setPhoneData}
              phoneData={phoneData}
              handleDeleteData={handleDeleteData}
              setDeactivated={setDeactivated}
            />
          );
        })}
      </div>
      <button disabled={deactivated}>Adicionar</button>
    </>
  );
}

export default AddPhoneForm;
