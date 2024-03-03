import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { verifyTokenExpiration } from "../../utils/jwt";

const PHONE_INIT = {
  name: "",
  brand: "",
  model: "",
  price: 0,
  color: "",
};

function UpdateAndDeletePhone() {
  const navigateTo = useNavigate();

  const { id } = useParams();

  const [expiredSession, setExpiredSession] = useState(false);
  const [phone, setPhone] = useState(PHONE_INIT);
  const [phoneToBeUpdated, setPhoneToBeUpdated] = useState(PHONE_INIT);
  const [error, setError] = useState("");
  const [displayForm, setDisplayForm] = useState(false);
  const [sucess, setSucess] = useState(false);

  useEffect(() => {
    const fetchPhone = async () => {
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

        const response = await axios.get(`http://localhost:3001/phone/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPhone(response.data);

        const phoneWithoutId = {
          name: response.data.name,
          brand: response.data.brand,
          model: response.data.model,
          price: response.data.price,
          color: response.data.color,
        };

        setPhoneToBeUpdated(phoneWithoutId);
      } catch (e) {
        console.log(e.response.data.message);
        setError(e.response.data.message);
      }
    };

    fetchPhone();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      await axios.put(`http://localhost:3001/phone/${id}`, phoneToBeUpdated, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDisplayForm(false);
      setSucess(true);
    } catch (e) {
      setError(e.response.data.message);
    }
  };

  const handleDelete = async () => {
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

      await axios.delete(`http://localhost:3001/phone/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigateTo("/phones");
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
      <h1>UpdatePhone</h1>
      <div>
        <h2>{phone.name}</h2>
        <p>{phone.brand}</p>
        <p>{phone.model}</p>
        <p>{phone.price}</p>
        <p>{phone.color}</p>
      </div>
      <button
        onClick={() => {
          setDisplayForm(!displayForm);
          setSucess(false);
        }}
      >
        Atualizar Celular
      </button>
      <button onClick={() => handleDelete()}>Deletar Celular</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {sucess && (
        <p style={{ color: "green" }}>Telefone atualizado com sucesso!</p>
      )}
      {displayForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={phoneToBeUpdated.name}
            onChange={(e) =>
              setPhoneToBeUpdated({ ...phoneToBeUpdated, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Marca"
            value={phoneToBeUpdated.brand}
            onChange={(e) =>
              setPhoneToBeUpdated({
                ...phoneToBeUpdated,
                brand: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Modelo"
            value={phoneToBeUpdated.model}
            onChange={(e) =>
              setPhoneToBeUpdated({
                ...phoneToBeUpdated,
                model: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Preço"
            value={phoneToBeUpdated.price}
            onChange={(e) =>
              setPhoneToBeUpdated({
                ...phoneToBeUpdated,
                price: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Cor"
            value={phoneToBeUpdated.color}
            onChange={(e) =>
              setPhoneToBeUpdated({
                ...phoneToBeUpdated,
                color: e.target.value,
              })
            }
          />
          <button type="submit">Atualizar</button>
        </form>
      )}
    </div>
  );
}

export default UpdateAndDeletePhone;
