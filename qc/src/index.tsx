import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { A } from "./components/a";

const App = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
      />
      <A />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
