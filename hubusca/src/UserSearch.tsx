// Importando as bibliotecas necessárias
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import githubLogo from './img/github.gif'; 

// Definindo a interface para os dados do usuário do GitHub
interface GithubUser {
  avatar_url: string;
  name: string;
  login: string;
  location: string;
}

// Definindo os estilos para o container do componente
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: black;
  color: lime;
`;

// Definindo os estilos para o logo do GitHub
const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

// Definindo os estilos para a caixa de texto de busca
const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  border-radius: 20px; 
`;

// Definindo os estilos para o botão de busca
const SearchButton = styled.button`
  background-color: lime;
  color: black;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  cursor: pointer;
`;

// Definindo os estilos para as informações do usuário
const UserInfo = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  margin-top: 20px; 
`;

// Definindo o componente UserSearch
const UserSearch = () => {
  // Definindo o estado para o nome de usuário e os dados do usuário
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GithubUser | null>(null);

  // Definindo a função para buscar os dados do usuário
  const fetchUser = async () => {
    try {
      const response = await axios.get<GithubUser>(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário", error);
    }
  };

  // Retornando o JSX para o componente
  return (
    <Container>
      <Logo src={githubLogo} alt="GitHub Logo" />
      <SearchInput
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Digite o nome do usuário do GitHub"
      />
      <SearchButton onClick={fetchUser}>Buscar</SearchButton>

      {userData && (
        <UserInfo>
          <img src={userData.avatar_url} alt={userData.name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          <h2>{userData.name}</h2>
          <p>{userData.login}</p>
          <p>{userData.location}</p>
        </UserInfo>
      )}
    </Container>
  );
};

export default UserSearch;
