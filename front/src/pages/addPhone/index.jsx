import { useState } from "react";
import AddPhoneForm from "../../components/addPhoneForm";
import { verifyTokenExpiration } from "../../utils/jwt";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const INIT_PHONE = {
  name: "",
  brand: "",
  model: "",
  price: 0,
  color: "",
};

function AddPhones() {
  const navigateTo = useNavigate();

  const [phones, setPhones] = useState([INIT_PHONE]);
  const [expiredSession, setExpiredSession] = useState(false);
  const [error, setError] = useState("");


  const handleAddOneMorePhone = () => setPhones([...phones, INIT_PHONE]);

  const formatPhoneList = () => {
    const formattedPhoneList = phones.reduce((acc, curr) => {
      const existingItemIndex = acc.findIndex(item => 
        item.name === curr.name && item.brand === curr.brand && item.model === curr.model
      );
  
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].data.push({ price: curr.price, color: curr.color });
      } else {
        acc.push({
          name: curr.name,
          brand: curr.brand,
          model: curr.model,
          data: [{ price: curr.price, color: curr.color }]
        });
      }
  
      return acc;
    }, []);

    return formattedPhoneList;
  };

  const handleCreatePhones = async () => {
    const formattedPhoneList = formatPhoneList();

    try {
      if (
        !localStorage.getItem("token") ||
        verifyTokenExpiration(localStorage.getItem("token"))
      ) {
        setExpiredSession(true);
        setTimeout(() => {
          setExpiredSession(false);
          navigateTo("/");
        }, 2500);
        return;
      }

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3001/phone", formattedPhoneList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Celulares criados com sucesso");
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  if (expiredSession) {
    return <h1>Sessão expirada. Por favor, faça login novamente.</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>AddPhones</h1>
      {phones.map((phone, index) => {
        return (
          <AddPhoneForm
            phones={phones}
            setPhones={setPhones}
            position={index}
            key={index}
            phoneValues={phones[phones.length - 1]}
          />
        );
      })}
      <button onClick={() => handleAddOneMorePhone()}>
        Adicionar outro celular
      </button>
      <button onClick={() => handleCreatePhones()}>Criar celulares</button>
    </div>
  );
}

export default AddPhones;
