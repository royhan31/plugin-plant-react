/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
//import { Button } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from 'firebase';
import { config } from './config';

export default class App extends Component<Props> {
 
 constructor() {
    super();
    if (!firebase.apps.length) {
    this.app = firebase.initializeApp(config);
    database = this.app.database().ref('sensor');
    //dataLed = this.app.database().ref('sensor').child('led');
    }
    this.state = {
        temperature: 0,
        led: true
       }
    }
    
    componentDidMount() {
        database.on("value", snap => {
            this.setState({
                temperature: snap.val().temperature,
                led: snap.val().led.on
            });
        });
    }
    
    //buttonLedPress(){
    //this.database().ref('sensor').child('led').set({
	//'led'  : true
    //});
    //}
    
    ledButtonOn(){
        database.child('led').set({
	    'on'  : true
        });
    }
    
    ledButtonOff(){
        database.child('led').set({
	    'on'  : false
        });
    }
    
  render() {
     if(this.state.led === true){
      return (
      <View style={styles.container}>
           <Text> {this.state.temperature} </Text> 
           <Button
            onPress={this.ledButtonOff}
            title="turn off"/>        
      </View>
    );
    }else{
    return (
      <View style={styles.container}>
           <Text> {this.state.temperature} </Text> 
           <Button
            onPress={this.ledButtonOn}
            title="turn on"/>        
      </View>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
