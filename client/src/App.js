import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import TabsRouter from "./compoents/tabsrouter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <TabsRouter />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
