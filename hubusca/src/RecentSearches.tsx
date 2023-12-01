import React from 'react';
import styled from 'styled-components';

interface GithubUser {
  avatar_url: string;
  name: string;
  login: string;
  location: string;
}

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const RecentSearches = ({ users }: { users: GithubUser[] }) => {
  return (
    <div>
      {users.map((user, index) => (
        <UserContainer key={index}>
          <UserImage src={user.avatar_url} alt={user.name} />
          <div>
            <p>{user.name}</p>
            <p>{user.login}</p>
            <p>{user.location}</p>
          </div>
        </UserContainer>
      ))}
    </div>
  );
};

export default RecentSearches;