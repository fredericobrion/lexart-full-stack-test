import { useState, useEffect } from "react";
import axios from "axios";
import PhoneCard from "../../components/phoneCard";
import filterPhones from "../../utils/filterPhones";
import { useNavigate } from "react-router-dom";
import { verifyTokenExpiration } from "../../utils/jwt";

function PhoneList() {
  const navigateTo = useNavigate();

  const [phones, setPhones] = useState([]);
  const [error, setError] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filter, setFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [expiredSession, setExpiredSession] = useState(false);

  useEffect(() => {
    const fetchPhones = async () => {
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

        const response = await axios.get("http://localhost:3001/phone", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPhones(response.data);
      } catch (e) {
        setError("Erro ao carregar telefones. Por favor, tente novamente.");
      }
    };

    fetchPhones();
  }, []);

  const filteredPhones = filterPhones(
    phones,
    filter,
    colorFilter,
    minPrice,
    maxPrice
  ).sort((a, b) => a.id - b.id);

  if (expiredSession) {
    return <h1>Sessão expirada. Por favor, faça login novamente.</h1>;
  }

  return (
    <div>
      <h2>Lista de Telefones</h2>
      <input
        type="text"
        value={filter}
        placeholder="Filtre por nome, modelo ou marca"
        onChange={(e) => setFilter(e.target.value)}
      />
      <input
        type="text"
        value={colorFilter}
        placeholder="Filtre por cor"
        onChange={(e) => setColorFilter(e.target.value)}
      />
      <input
        type="number"
        value={minPrice}
        placeholder="Preço mínimo"
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <input
        type="number"
        value={maxPrice}
        placeholder="Preço máximo"
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {filteredPhones.map((phone) => (
        <PhoneCard
          key={phone.id}
          id={phone.id}
          name={phone.name}
          model={phone.model}
          brand={phone.brand}
          price={phone.price}
          color={phone.color}
        />
      ))}
    </div>
  );
}

export default PhoneList;
