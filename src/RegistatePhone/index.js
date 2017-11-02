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
        return <KeyboardAvoidingView behavior='position' style={styles.container} contentContainerStyle={{flex: 1}}>
            <View style={{height: (screen == 0 ? 24 : screen == 1 ? 41 : 53) + 4}}/>

            <Text style={{
                fontFamily: 'stem-medium',
                fontSize: 14,
                alignSelf: 'center',
                letterSpacing: 1.1,
                color: 'rgb( 255, 255, 255)',
            }}>{'Введите новый номер телефона'}</Text>

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
                    label='Введите новый номер телефона'
                    value={this.state.phone}
                    onChangeText={(phone) => {this.state.phone = phone; }}
                    onBlur={() => this.setState({hidePrevious: true})}
                />
                <View style={{height: (screen == 0 ? 30 : screen == 1 ? 39 : 45)-25}}/>
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
        </KeyboardAvoidingView>;
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