import React from 'react';
import {
	View,
	TouchableOpacity,
	Dimensions,
	StyleSheet,
	ScrollView,
	Image,
	WebView,
    Linking,
    KeyboardAvoidingView,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TabNavigator from 'react-native-tab-navigator';
import Button from 'react-native-button';
import {
	LinearGradient,
	Constants
} from 'expo';

import IconD from '../IconD';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const hr = <View style={{ alignSelf: 'stretch', marginHorizontal: 20, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;
const hrShort = <View style={{ width: 290, alignSelf: 'center', margin: 0, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;

const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;

export default class Login extends React.Component {
    navigationOptions = {
		title: 'Авторизация',
	};
	constructor(props) {
		super(props);
		this.state = {
			rang: 2,
			canNav: true,
		};
	};

	render = () => {
        return <KeyboardAwareScrollView behavior='position' style={styles.container} contentContainerStyle={{flex: 1}}>
            <View style={{height: (screen == 0 ? 20 : screen == 1 ? 37 : 49) + 4}}/>

            <Text style={{
                fontFamily: 'stem-medium',
                fontSize: 16,
                alignSelf: 'center',
                letterSpacing: 1.1,
                color: 'rgb( 255, 255, 255)',
            }}>{'Пожалуйста представьтесь'}</Text>

            <View style={{flexDirection: 'column', paddingHorizontal: screen == 0 ? 20 : screen == 1 ? 27 : 30}}>

                <TextField 
                    tintColor='#dcc49c'
                    baseColor='rgb( 87, 88, 98)'
                    textColor='white'
                    returnKeyType='send'
                    style={{
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                    inputContainerStyle={{ flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}
                    label='Имя'
                    value={this.state.firstName}
                    onChangeText={(firstName) => {this.state.firstName = firstName; }}
                    onBlur={() => this.setState({hidePrevious: true})}
                />
                <View style={{height: (screen == 0 ? 34 : screen == 1 ? 42 : 48)-25}}/>

                <TextField 
                    tintColor='#dcc49c'
                    baseColor='rgb( 87, 88, 98)'
                    textColor='white'
                    returnKeyType='send'
                    style={{
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                    inputContainerStyle={{ flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}
                    label='Фамилия'
                    value={this.state.secondName}
                    onChangeText={(name) => {this.state.secondName = name; }}
                    onBlur={() => this.setState({hidePrevious: true})}
                />
                <View style={{height: (screen == 0 ? 34 : screen == 1 ? 42 : 48)-25}}/>

                <TextField 
                    tintColor='#dcc49c'
                    baseColor='rgb( 87, 88, 98)'
                    textColor='white'
                    returnKeyType='send'
                    style={{
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                    inputContainerStyle={{ flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}
                    label='E-mail адрес'
                    value={this.state.email}
                    onChangeText={(address) => {this.state.email = address; }}
                    onBlur={() => this.setState({hidePrevious: true})}
                />
                <View style={{height: (screen == 0 ? 34 : screen == 1 ? 42 : 48)-25}}/>

                <TextField 
                    secureTextEntry
                    tintColor='#dcc49c'
                    baseColor='rgb( 87, 88, 98)'
                    textColor='white'
                    returnKeyType='send'
                    style={{
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                    inputContainerStyle={{ flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}
                    label='Пароль'
                    value={this.state.password}
                    onChangeText={(address) => {this.state.password = address; }}
                    onBlur={() => this.setState({hidePrevious: true})}
                />
            </View>

            <View style={{
            position: 'absolute',
            alignSelf: 'center',
            width: viewportWidth - 30,
            bottom: 0,
            height: 49,
            borderTopWidth: 2,
            borderColor: this.isNext() ? 'rgb(225, 199, 155)' : '#575862',
            flexDirection: 'row',
            justifyContent: 'center'
            }}>
            <TouchableOpacity onPress={this.next}
                style={{
                    alignSelf: 'center',
                }}>
                <Text style={[
                styles.nextButtonText,
                {
                    color: this.isNext() ? 'rgb(225, 199, 155)' : '#575862'
                }
                ]}>Далее</Text>
            </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>;
    }

    next = () => {
        if (this.state.canNav && this.isNext()) {
            this.props.navigation.navigate('RegistratePhone');
            this.state.canNav = false;
            setTimeout(() => {
                this.state.canNav = true;
            }, 1500);
        }
    }

    isNext = () => {
        return  (this.state.firstName && this.state.secondName && this.state.password && this.state.email);
    }
}

const styles = StyleSheet.create({
	text: {
		color: 'white',
		fontSize: 20,
	},
	row: {
		flexDirection: 'row',
		alignSelf: 'stretch'
	},
	column: {
		flexDirection: 'column',
		alignSelf: 'stretch'
	},
	container: {
        flex: 1,
        flexDirection: 'column',
		elevation: -10,
		backgroundColor: 'rgb( 45, 46, 58)',
	},
});