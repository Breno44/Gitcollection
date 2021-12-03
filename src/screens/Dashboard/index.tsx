import { Title, Form, Repos, Loader, Error } from "./styles";
import logo from "../../assets/logo.svg";
import { FiChevronRight } from "react-icons/fi";
import { api } from "../../services/api";
import { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface GithubRepository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export function Dashboard() {
  const [repos, setRepos] = useState<GithubRepository[]>(() => {
    const storageRepos = localStorage.getItem("@GitCollection:repositories");

    if (storageRepos) {
      return JSON.parse(storageRepos);
    }

    return [];
  });
  const [newRepo, setNewRepo] = useState("");
  const [loading, setLoading] = useState(false);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    localStorage.setItem("@GitCollection:repositories", JSON.stringify(repos));
  }, [repos]);

  async function handleAddRepo(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    setLoading(true);

    if (!newRepo) {
      setInputError("Informe o username/repositório");
      setLoading(false);
      return;
    }

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

      <Form hasError={Boolean(inputError)} onSubmit={(e) => handleAddRepo(e)}>
        <input
          placeholder="username/repository_name"
          onChange={(e) => setNewRepo(e.target.value)}
          value={newRepo}
        />
        <button type="submit">
          {loading ? <Loader /> : <span>Buscar</span>}
        </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repos>
        {repos.map((repo, key) => (
          <Link to={`/repositories/${repo.full_name}`} key={key}>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />

            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repos>
    </>
  );
}
