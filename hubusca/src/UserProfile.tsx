// Importando as bibliotecas necessárias
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Definindo a interface para os dados do usuário do GitHub
interface GithubUser {
  avatar_url: string;
  name: string;
  login: string;
  location: string;
  id: number;
  followers: number;
  public_repos: number;
}

// Definindo a interface para os repositórios do usuário do GitHub
interface GithubRepo {
  name: string;
  language: string;
  description: string;
  created_at: string;
  pushed_at: string;
}

// Definindo os estilos para o container do componente
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; // Garante que o Container tenha pelo menos a altura da janela do navegador
  background-color: black;
  color: lime;
`;

// Definindo os estilos para o título dos repositórios
const RepoTitle = styled.h2`
  margin-top: 20px;
`;

// Definindo o componente UserProfile
const UserProfile = ({ username }: { username: string }) => {
  // Definindo o estado para os dados do usuário e os repositórios do usuário
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [userRepos, setUserRepos] = useState<GithubRepo[] | null>(null);

  // Usando o hook useEffect para buscar os dados quando o componente for montado
  useEffect(() => {
    // Função para buscar os dados do usuário
    const fetchUser = async () => {
      try {
        const response = await axios.get<GithubUser>(`https://api.github.com/users/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
      }
    };

    // Função para buscar os repositórios do usuário
    const fetchRepos = async () => {
      try {
        const response = await axios.get<GithubRepo[]>(`https://api.github.com/users/${username}/repos`);
        setUserRepos(response.data);
      } catch (error) {
        console.error("Erro ao buscar repositórios", error);
      }
    };

    // Chamando as funções para buscar os dados
    fetchUser();
    fetchRepos();
  }, [username]); // O array de dependências contém 'username', então as funções serão chamadas novamente se 'username' mudar

  // Retornando o JSX para o componente
  return (
    <Container>
      {userData && (
        <div>
          <img src={userData.avatar_url} alt={userData.name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h2>{userData.name}</h2>
          <p>{userData.login}</p>
          <p>{userData.location}</p>
          <p>ID: {userData.id}</p>
          <p>Seguidores: {userData.followers}</p>
          <p>Repositórios públicos: {userData.public_repos}</p>
        </div>
      )}

      {userRepos && (
        <div>
          <RepoTitle>Repositórios</RepoTitle>
          {userRepos.map((repo) => (
            <div key={repo.name}>
              <h3>{repo.name}</h3>
              <p>Linguagem: {repo.language}</p>
              <p>Descrição: {repo.description}</p>
              <p>Data de criação: {repo.created_at}</p>
              <p>Data do último push: {repo.pushed_at}</p>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default UserProfile;
