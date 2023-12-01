// Importando as bibliotecas necessárias
import React, { useState } from 'react';
import UserSearch from './UserSearch';
import UserProfile from './UserProfile'; // Importando o componente UserProfile

// Definindo o componente App
function App() {
  // Definindo o estado para o nome de usuário e se a página de busca deve ser exibida
  const [username, setUsername] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  // Definindo a função para lidar com a busca do usuário
  const handleSearch = (username: string) => {
    setUsername(username); // Define o nome de usuário
    setShowSearch(false); // Esconde a página de busca
  };

  // Definindo a função para lidar com o clique no botão Voltar
  const handleBackClick = () => {
    setShowSearch(true); // Mostra a página de busca
  };

  // Retornando o JSX para o componente
  return (
    <div className="App">
      {showSearch ? (
        <UserSearch /> // Renderiza o componente UserSearch se showSearch for true
      ) : (
        <UserProfile username={username} onBackClick={handleBackClick} /> // Renderiza o componente UserProfile se showSearch for false
      )}
    </div>
  );
}

export default App;
