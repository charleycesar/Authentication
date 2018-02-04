import React, { Component } from 'react';
import {
  View
} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDqWRjYweGGAzpN9Xx93kY8r3q1H9auv9I',
      authDomain: 'authentication-2f96b.firebaseapp.com',
      databaseURL: 'https://authentication-2f96b.firebaseio.com',
      projectId: 'authentication-2f96b',
      storageBucket: 'authentication-2f96b.appspot.com',
      messagingSenderId: '718868142329'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText={'Authentication'} />
        {this.renderContent()}
      </View>
    );
  }
}
