// Importando as bibliotecas necessárias
import React from 'react';
import styled from 'styled-components';

// Importando a interface GithubUser
import { GithubUser } from './GithubUser';

// Estiliza o contêiner do usuário
const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: rgba(128, 128, 128, 0.5); // Adiciona um fundo cinza transparente
  padding: 10px; // Adiciona um pouco de espaço ao redor do conteúdo
  border-radius: 10px; // Adiciona bordas arredondadas
`;

// Estiliza a imagem do usuário
const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

// Estiliza o botão Voltar
const BackButton = styled.button`
  background-color: lime;
  color: black;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  margin-bottom: 20px;
`;

// Estiliza o contêiner principal
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

// Define o componente RecentSearches
const RecentSearches = ({ users, onBackClick }: { users: GithubUser[], onBackClick: () => void }) => {
  return (
    <MainContainer>
      <BackButton onClick={onBackClick}>Voltar</BackButton> {/* Adiciona o botão Voltar */}
      <div>
        {users.map((user, index) => (
          <UserContainer key={index}>
            <UserImage src={user.avatar_url} alt={user.name} />
            <div>
              <p>{user.name}</p>
              <p>{user.login}</p>
              <p>{user.location}</p>
              <p>ID: {user.id}</p>
              <p>Seguidores: {user.followers}</p>
              <p>Repositórios públicos: {user.public_repos}</p>
              {user.repos && user.repos.map((repo, repoIndex) => ( // Adiciona uma lista de repositórios
                <div key={repoIndex}>
                  <p>Nome do repositório: {repo.name}</p>
                  <p>Linguagem: {repo.language}</p>
                  <p>Descrição: {repo.description}</p>
                  <p>Data de criação: {repo.created_at}</p>
                  <p>Data do último push: {repo.pushed_at}</p>
                  <p><a href={repo.html_url} target="_blank" rel="noopener noreferrer">Link para o repositório</a></p>
                </div>
              ))}
            </div>
          </UserContainer>
        ))}
      </div>
    </MainContainer>
  );
};

export default RecentSearches;
