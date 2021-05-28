import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import {Link,Route, Switch} from 'react-router-dom';
import Shop from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndUp from './pages/sign-in-and-up/sign-in-and-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser: null
    }
  }

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if ( userAuth ){
        const userRef = createUserProfileDocument(userAuth);
        (await userRef).onSnapshot(snapShot => {
            console.log(snapShot.data());
            this.setState({
              currentUser: {
                id: snapShot.id,
                ... snapShot.data()
              }
            });
        });
      }else{
        this.setState({ currentUser: userAuth});
      }
      
    });

  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  unsubscribeFromAuth = null;


  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}></Header>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
          <Route path="/signin" component={SignInAndUp} />
        </Switch>
      </div>
    );
  }
}

export default App;

