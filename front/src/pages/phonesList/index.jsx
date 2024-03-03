import { useState, useEffect } from "react";
import axios from "axios";
import PhoneCard from "../../components/phoneCard";
import filterPhones from "../../utils/filterPhones";

function PhoneList() {
  const [phones, setPhones] = useState([]);
  const [error, setError] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filter, setFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlck5hbWUiOiJUZXN0ZSIsImlhdCI6MTcwOTQ2Nzg3OCwiZXhwIjoxNzEwMDcyNjc4fQ.zyRDvnJajcp3AsxAe2TDALoTOH8DL62L-U1xy1hrZRk";

        const response = await axios.get("http://localhost:3001/phone", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPhones(response.data);
      } catch (error) {
        setError("Erro ao carregar telefones. Por favor, tente novamente.");
      }
    };

    fetchPhones();
  }, []);

  console.log(filter);

  const filteredPhones = filterPhones(phones, filter, colorFilter, minPrice, maxPrice);

  console.log(filteredPhones);

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
