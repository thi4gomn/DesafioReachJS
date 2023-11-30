import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

interface GithubUser {
  avatar_url: string;
  name: string;
  login: string;
  location: string;
  id: number;
  followers: number;
  public_repos: number;
}

interface GithubRepo {
  name: string;
  language: string;
  description: string;
  created_at: string;
  pushed_at: string;
  html_url: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
  color: lime;
  padding: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RepoTitle = styled.h2`
  margin-top: 20px;
`;

const BackButton = styled.button`
  background-color: lime;
  color: black;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
`;

const UserProfile = ({ username, onBackClick }: { username: string, onBackClick: () => void }) => {
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [userRepos, setUserRepos] = useState<GithubRepo[] | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get<GithubUser>(`https://api.github.com/users/${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuário', error);
      }
    };

    const fetchRepos = async () => {
      try {
        const response = await axios.get<GithubRepo[]>(`https://api.github.com/users/${username}/repos`);
        setUserRepos(response.data);
      } catch (error) {
        console.error('Erro ao buscar repositórios', error);
      }
    };

    fetchUser();
    fetchRepos();
  }, [username]);

  return (
    <Container>
      <BackButton onClick={onBackClick}>Voltar</BackButton>

      <Content>
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
                <p>Acessar repositório, clique aqui: <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></p>
                <p>Linguagem: {repo.language}</p>
                <p>Descrição: {repo.description}</p>
                <p>Data de criação: {repo.created_at}</p>
                <p>Data do último push: {repo.pushed_at}</p>
                <p>----------------------------------------------------</p>
              </div>
            ))}
          </div>
        )}
      </Content>
    </Container>
  );
};

export default UserProfile;
