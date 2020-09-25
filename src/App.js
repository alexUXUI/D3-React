import React from "react";
import ScatterPlotView from "./ScatterPlot/View";
import "./App.css";

import { Link, Route } from 'react-router-dom';

function App() {
  return (
    <div class="app-root">
      <section className="links">
        <span className="title">
          <h1>React + D3</h1> 
          <h4>Playground</h4>
        </span>
        <hr />
        <nav className="navigation">
          <ul>
            <li>
              <Link to={{ pathname: '/home'}}>Home</Link>
            </li>
            <li>
              <Link to={{ pathname: '/scatter-plot'}}>Scatter Plot</Link>
            </li>
          </ul>
        </nav>
      </section>
      <div class="App">
        <Route path="/scatter-plot" exact={true} component={ScatterPlotView} />
        <Route path="/home" exact={true} component={() => <div className="home">Select a D3 experiment in the left panel to see more 🚀</div>} />
      </div>
    </div>
  )
}

export default App;

