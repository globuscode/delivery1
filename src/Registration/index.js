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
import Button from 'react-native-button';
import Touchable from 'react-native-platform-touchable';
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
            passwordInputError: null,
            emailInputError: null,
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
                    autoCapitalize='words'
                    style={{
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                    inputContainerStyle={{ flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}
                    label='Имя'
                    value={this.state.firstName}
                    onChangeText={(firstName) => {this.state.firstName = firstName; }}
                    
                />
                <View style={{height: (screen == 0 ? 34 : screen == 1 ? 42 : 48)-25}}/>

                <TextField 
                    tintColor='#dcc49c'
                    baseColor='rgb( 87, 88, 98)'
                    textColor='white'
                    returnKeyType='send'
                    autoCapitalize='words'
                    style={{
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                    inputContainerStyle={{ flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}
                    label='Фамилия'
                    value={this.state.secondName}
                    onChangeText={(name) => {this.state.secondName = name; }}
                    
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
                    autoCapitalize='none'
                    keyboardType='email-address'
                    inputContainerStyle={{ flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}
                    label='E-mail адрес'
                    error={ this.state.emailInputError }
                    value={this.state.email}
                    onEndEditing={() => {
                        if ( !validateEmail(this.state.email) )
                            this.setState({ emailInputError: 'Неверный формат' });
                        else
                            this.setState({ emailInputError: null });
                    }}
                    onChangeText={(address) => {
                        this.state.email = address;
                    }}
                    
                />
                <View style={{height: (screen == 0 ? 34 : screen == 1 ? 42 : 48)-25}}/>

                <TextField 
                    ref='password'
                    secureTextEntry
                    tintColor='#dcc49c'
                    baseColor='rgb( 87, 88, 98)'
                    textColor='white'
                    returnKeyType='send'
                    error={ this.state.passwordInputError }
                    style={{
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                    inputContainerStyle={{ flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}
                    label='Пароль'
                    value={ this.state.password }
                    onEndEditing={() => {
                        if (this.state.password)
                            if ( this.state.password.length <= 6 )
                                this.setState({ passwordInputError: 'Пароль должен состоять минимум 7 символов' });
                            else
                                this.setState({ passwordInputError: null });
                        else
                            this.setState({ passwordInputError: 'Это поле обязательно' });
                    }}
                    onChangeText={(address) => {
                        this.state.password = address;
                    }}
                    
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
            <Touchable 
                background={Touchable.Ripple('gray')} 
                onPress={this.next}
                style={{
                    alignSelf: 'stretch',
                    flexDirection: 'column',
                    justifyContent: "center",
                    width: viewportWidth
                }}>
                <Text style={[
                styles.nextButtonText,
                {
                    color: this.isNext() ? 'rgb(225, 199, 155)' : '#575862'
                }
                ]}>Далее</Text>
            </Touchable>
            </View>
        </KeyboardAwareScrollView>;
    }

    next = () => {
        if (this.state.canNav && this.isNext()) {
            this.props.navigation.navigate('RegistratePhone', {
                "userName": this.state.email,
                "firstName": this.state.firstName,
                "middleName": this.state.firstName,
                "lastName": this.state.secondName,
                "email": this.state.email,
                "password": this.state.password,
                "loginKey": this.props.navigation.state.key
            });
            this.state.canNav = false;
            setTimeout(() => {
                this.state.canNav = true;
            }, 1500);
        }
    }

    isNext = () => {
        return  (this.state.password && this.state.firstName && this.state.secondName && this.state.passwordInputError == null && this.state.emailInputError == null);
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
    nextButtonText: {
      fontSize: 16,
      color: "#dcc49c",
      alignSelf: 'center',
      textAlign: "center",
      letterSpacing: 0.8,
      fontFamily: "stem-regular"
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