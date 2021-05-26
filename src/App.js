import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Link,Route, Switch} from 'react-router-dom';
import Shop from './pages/shop/shop.component';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={Shop} />
      </Switch>
    </div>
  );
}

export default App;
