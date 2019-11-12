import React from 'react';
//import './App.css';
import { Route, Switch } from "react-router-dom";
import { routes } from "../../config/routes/index.js";

function App() {
  return (
    <div className="container no-padding-xs pb-4 flex-grow-1" id="page-wrap">
      
      <Switch>
            {routes.map(route => (<Route key={route.path} {...route} />))}
      </Switch>
      
    </div>
    );
}

export default App;
