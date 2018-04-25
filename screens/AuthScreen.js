//@flow
import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
    componentDidMount() {
        this.goToMap = this.goToMap.bind(this); 
        
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    renderButton() {
       return(  
                <Button 
                   onPress={this.goToMap.bind(this)} 
                   title="Go to Map"
                />
       ); 
        
    }

    goToMap() {
            this.props.navigation.navigate('map');
    }

    onAuthComplete(props) {
        if (props.token) {
            this.goToMap();
        }
    }

    render() {
        return (
            <View>
                { this.renderButton() }     
            </View>

        );
    }
}

function mapStateToProps({ auth }) {
    return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);