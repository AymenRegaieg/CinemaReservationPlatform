import Menu from "./navigation/menu";
import { BrowserRouter as Router,} from 'react-router-dom';

import Acceuil from "./Acceuil";
import Root from "./navigation/root";
function App() {
  return (
      <Router>
            <Root />
      </Router>   
  );
}

export default App;
