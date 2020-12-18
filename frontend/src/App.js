import HomePage  from "./Pages/HomePage";
import './App.css';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
