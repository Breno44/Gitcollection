import { Title, Form, Repos, Loader } from "./styles";
import logo from "../../assets/logo.svg";
import { FiChevronRight } from "react-icons/fi";
import { api } from "../../services/api";
import { FormEvent, useState } from "react";

interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export function Dashboard() {
  const [repos, setRepos] = useState<GithubRepository[]>([]);
  const [newRepo, setNewRepo] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAddRepo(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    setLoading(true);

    const response = await api.get<GithubRepository>(`repos/${newRepo}`);

    setTimeout(() => {
      const repository = response.data;

      setRepos([...repos, repository]);
      setLoading(false);
      setNewRepo("");
    }, 500);
  }

  return (
    <>
      <img src={logo} alt="logo" />
      <Title>Catálogo de repositorios do Github</Title>

      <Form onSubmit={(e) => handleAddRepo(e)}>
        <input
          placeholder="username/repository_name"
          onChange={(e) => setNewRepo(e.target.value)}
          value={newRepo}
        />
        <button type="submit">
          {loading ? <Loader /> : <span>Buscar</span>}
        </button>
      </Form>

      <Repos>
        {repos.map((repo, key) => (
          <a href="/repositories" key={key}>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />

            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repos>
    </>
  );
}
