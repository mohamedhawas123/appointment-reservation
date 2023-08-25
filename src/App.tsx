import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/home';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import LoginScreen from './screens/login';
import appointmentList from './screens/appintmentList';




const App = ()  =>{
  return (
    <div className="container  mt-5  ">

      console.log('app')
      <Router>
        <Container>
        <Route exact  path="/" component={HomeScreen} />

        <Route exact path="/login" component={LoginScreen} />

        <Route exact path="/list" component={appointmentList} />

        

        </Container>
      </Router>
    </div>
  );
}



export default App;
