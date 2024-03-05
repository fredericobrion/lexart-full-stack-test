import { useState } from "react";
import AddPhoneForm from "../../components/addPhoneForm";
import { verifyTokenExpiration } from "../../utils/jwt";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./addPhones.module.css";
import { HOST } from "../../utils/variables";
import { arraySchema } from "../../utils/validations/phoneSchema";

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
  const [created, setCreated] = useState(false);

  const handleAddOneMorePhone = () => setPhones([...phones, INIT_PHONE]);

  const formatPhoneList = () => {
    const formattedPhoneList = phones.reduce((acc, curr) => {
      const existingItemIndex = acc.findIndex(
        (item) =>
          item.name === curr.name &&
          item.brand === curr.brand &&
          item.model === curr.model
      );

      if (existingItemIndex !== -1) {
        acc[existingItemIndex].data.push({
          price: curr.price,
          color: curr.color,
        });
      } else {
        acc.push({
          name: curr.name,
          brand: curr.brand,
          model: curr.model,
          data: [{ price: curr.price, color: curr.color }],
        });
      }

      return acc;
    }, []);

    return formattedPhoneList;
  };

  const handleCreatePhones = async () => {
    const formattedPhoneList = formatPhoneList();

    console.log(formattedPhoneList);

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

      const { error } = arraySchema.validate(formattedPhoneList);

      if (error) {
        throw new Error(error.message);
      }

      const token = localStorage.getItem("token");

      await axios.post(`${HOST}/phone`, formattedPhoneList, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCreated(true);

      setTimeout(() => {
        setCreated(false);
        navigateTo("/phones");
      }, 2500);

    } catch (e) {
      setError(e.message || e.response.data.message || "Erro inesperado");
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  if (expiredSession) {
    return <h1>Sessão expirada. Por favor, faça login novamente.</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  if (created) {
    return <h1>{phones.length > 1 ? "Celulares criados com sucesso!" : "Celular criado com sucesso"}</h1>;
  }

  return (
    <div className={styles.container}>
      <h2>Adicione celulares</h2>
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
      <button className={styles.addButton} onClick={() => handleAddOneMorePhone()}>
        Adicionar outro celular
      </button>
      <button disabled={phones.length === 0} className={styles.createButton} onClick={() => handleCreatePhones()}>
        {phones.length > 1 ? "Criar celulares" : "Criar celular"}
      </button>
    </div>
  );
}

export default AddPhones;
