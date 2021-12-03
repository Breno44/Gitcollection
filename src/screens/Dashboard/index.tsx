import { Title, Form, Repos } from "./styles";
import logo from "../../assets/logo.svg";
import { FiChevronRight } from "react-icons/fi";
import { api } from "../../services/api";

export function Dashboard() {
  return (
    <>
      <img src={logo} alt="logo" />
      <Title>Catálogo de repositorios do Github</Title>

      <Form>
        <input placeholder="username/repository_name" />
        <button type="submit">Buscar</button>
      </Form>

      <Repos>
        <a href="/repositories">
          <img src="https://github.com/Breno44.png" alt="logoRepositorio" />

          <div>
            <strong>breno44/testeteste</strong>
            <p>teste</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  );
}
