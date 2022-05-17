import "./App.css";
import { Navbar } from "./frontend/Components/Navbar/Navbar";
import { useTheme } from "./frontend/contexts/theme-context";
import { Routing } from "./frontend/Routing/Routing";

function App() {
  const { theme } = useTheme();
  return (
    <div className={`app ${theme}`}>
      <Navbar />
      <Routing />
    </div>
  );
}

export default App;
