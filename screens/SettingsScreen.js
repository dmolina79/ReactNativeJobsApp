import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { clearLikedJobs } from '../actions';


class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings',
        headerStyle: { 
            marginTop: Platform.OS === 'android' ? 24 : 0 
        },
        tabBarLabel: 'Review Jobs',
        tabBarIcon:  ({ tintColor }) => (
            <Icon 
              name='favorite'
              size={30} 
              color={tintColor}
            />
        
        ),
    }

    render() {
        return (
            <View>
                <Button 
                    title="Reset Liked Jobs"
                    large
                    icon={{ name: 'delete-forever'}}
                    backgroundColor="#F44336"
                    onPress={this.props.clearLikedJobs}
                />
            </View>
        );
    }
}

export default connect(null, { clearLikedJobs })(SettingsScreen);