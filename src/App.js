import React from 'react';
import { Button } from 'semantic-ui-react';
import { getAuth } from 'firebase/auth';

export default function App() {

  const auth = getAuth();

  console.log(auth);

  return (
    <div>
      <h1>Musicfy 1.0</h1>
      <Button primary>Play</Button>
      <Button secondary>Pause</Button>
    </div>
  );
}
