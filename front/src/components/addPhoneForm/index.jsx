import { useState } from "react";

function AddPhoneForm() {
  const [phoneQuantity, setPhoneQuantity] = useState(1);

  return (
    <>
      <div>
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="Marca" />
        <input type="text" placeholder="Modelo" />
      </div>
      <div>

      </div>
      <button>Adicionar</button>
    </>
  );
}

export default AddPhoneForm;
