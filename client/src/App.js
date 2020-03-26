import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import TabsRouter from "./compoents/tabsrouter";
import "./App.css";

function App() {
  return (
    <>
      <header className="App-header">
        <h2>Clasificador de Imágenes y Audio</h2>
      </header>
      <div className="App">
        <div className="dividerHeader" />
        <Router>
          <Switch>
            <TabsRouter />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
