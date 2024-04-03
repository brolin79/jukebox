import { useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { LoggedNavigation } from './routes/LoggedNavigation';
import { Auth } from './pages';

export default function App() {

  const [user, setUser] = useState(undefined);
  const auth = getAuth();

  onAuthStateChanged(getAuth(), (user) => {
    setUser(user);
  });

  if (user === undefined) { return null; }

  return  user ? <LoggedNavigation /> : <Auth />;
  
}
