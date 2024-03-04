import { Outlet } from "react-router-dom";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  
  const userName = localStorage.getItem("user");

  const handleViewPhones = () => {
    navigate("/phones");
  };

  const handleAddPhones = () => {
    navigate("/phones/add");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <header className={token ? styles.header : styles.hideHeader}>
        <h2>Bem vindo, {userName ? userName : ""}!</h2>
        <div className={styles.headerButtons}>
          <button
            className={styles.viewPhones}
            onClick={() => handleViewPhones()}
          >
            Ver telefones
          </button>
          <button
            className={styles.addPhones}
            onClick={() => handleAddPhones()}
          >
            Adicionar telefones
          </button>
          <button className={styles.logout} onClick={() => handleLogout()}>
            Sair da conta
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default Header;
