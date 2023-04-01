import './App.css';
import { createContext, useState } from 'react';

// Component
import Wrapper from './Components/Wrapper';

export const UserContext = createContext();

function App() {

  // listen for changes on user's table
  // if current user changes, update current user

  const updateContext = (user) => {
    setUserContext({
      user,
      updateContext
    });
  }

  const [userContext, setUserContext] = useState({
    user: undefined,
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
