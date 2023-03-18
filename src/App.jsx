import React from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './components/widgets/Auth/LoginForm';
import Navbar from './components/widgets/navbar/Navbar';

const App = () => {
  const user = useSelector((store) => store.Auth.user);
  return (
    <div>
      <Navbar />
      <LoginForm/>
      <div>{JSON.stringify(user)}</div>
    </div>
  );
}

export default App;
