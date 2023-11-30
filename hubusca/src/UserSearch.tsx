// Importando as bibliotecas necessárias
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import githubLogo from './img/github.gif'; // Substitua 'nome-da-sua-imagem.png' pelo nome real da sua imagem
import UserProfile from './UserProfile'; // Importando o componente UserProfile

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
  min-height: 100vh; // Garante que o Container tenha pelo menos a altura da janela do navegador
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
  border-radius: 20px; // Adiciona bordas arredondadas à caixa de texto
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
  display: flex; // Adiciona flexbox
  flex-direction: column; // Organiza os itens em uma coluna
  align-items: center; // Centraliza os itens horizontalmente
  justify-content: center; // Centraliza os itens verticalmente
  margin-top: 20px; // Move as informações do usuário para baixo
  cursor: pointer; // Muda o cursor para um ponteiro quando o mouse está sobre a imagem
`;

// Definindo o componente UserSearch
const UserSearch = () => {
  // Definindo o estado para o nome de usuário e os dados do usuário
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [showProfile, setShowProfile] = useState(false); // Novo estado para rastrear se o perfil do usuário deve ser exibido

  // Definindo a função para buscar os dados do usuário
  const fetchUser = async () => {
    try {
      const response = await axios.get<GithubUser>(`https://api.github.com/users/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuário", error);
    }
  };

  // Função para lidar com o clique na foto do usuário
  const handleImageClick = () => {
    setShowProfile(true); // Define showProfile como true quando a imagem é clicada
  };

  // Retornando o JSX para o componente
  return (
    <Container>
      {!showProfile && ( // Renderiza a página de busca se showProfile for false
        <>
          <Logo src={githubLogo} alt="GitHub Logo" /> {/* Adiciona o logo do GitHub */}
          <SearchInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite o nome do usuário do GitHub"
          />
          <SearchButton onClick={fetchUser}>Buscar</SearchButton>

          {userData && (
            <UserInfo onClick={handleImageClick}> {/* Adiciona o manipulador de eventos onClick à imagem */}
              <p><strong>Click na foto para ver perfil !!</strong></p>
              <img src={userData.avatar_url} alt={userData.name} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
              <h2>{userData.name}</h2>
              <p>{userData.login}</p>
              <p>{userData.location}</p>
            </UserInfo>
          )}
        </>
      )}

      {showProfile && <UserProfile username={username} onBackClick={() => setShowProfile(false)} />} {/* Renderiza o UserProfile se showProfile for true */}
    </Container>
  );
};

export default UserSearch;
