import './App.css';
import { createContext, useState } from 'react';

// Component
import Wrapper from './Components/Wrapper';

export const UserContext = createContext();

function App() {

  const updateContext = (username) => {
    setUserContext({
      username: username,
      updateContext
    });
  }

  const [userContext, setUserContext] = useState({
    username: undefined,
    updateContext
  });

  return (
    <div className="App">
      <UserContext.Provider value={userContext}>
        <Wrapper/>
      </UserContext.Provider>
    </div>
  );
}

export default App;
