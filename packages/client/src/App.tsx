import { useState } from 'react';

const App = () => {
  const state = useState('hi');

  return (
    <div>
      <span>{state}</span>
    </div>
  );
};

export default App;
