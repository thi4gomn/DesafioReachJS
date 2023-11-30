import React, { useState } from 'react';
import UserSearch from './UserSearch';
import UserProfile from './UserProfile'; // Importando o componente UserProfile

function App() {
  const [username, setUsername] = useState('');
  const [showSearch, setShowSearch] = useState(true);

  const handleSearch = (username: string) => {
    setUsername(username);
    setShowSearch(false);
  };

  const handleBackClick = () => {
    setShowSearch(true);
  };

  return (
    <div className="App">
      {showSearch ? (
        <UserSearch />
      ) : (
        <UserProfile username={username} onBackClick={handleBackClick} />
      )}
    </div>
  );
}

export default App;
