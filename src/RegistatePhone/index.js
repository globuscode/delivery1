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
import { TextInputMask } from 'react-native-masked-text';
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
    
    renderButton = (title, callback) => {
		return <View style={{ alignSelf: 'stretch' }}>
			<View style={[
				styles.row,
				{
					justifyContent: 'center',
					position: 'absolute',
					width: viewportWidth - 80,
					borderWidth: 1,
					height: (viewportWidth >= 320 && viewportWidth < 375) ? 44 : (viewportWidth >= 375 && viewportWidth < 414) ? 52 : 57,
					marginTop: 31,
					marginBottom: 10,
					marginHorizontal: 40,
					alignItems: 'center',
					alignContent: 'center',
					borderRadius: 8,
					borderColor: 'white'
				}]}>
				<Text style={{ color: '#ffffff', fontSize: 14, fontFamily: 'stem-medium', }}>{title}</Text></View>

			<TouchableOpacity
				activeOpacity={0}
				onPress={callback}
				style={[
					styles.row,
					{
						justifyContent: 'center',
						borderWidth: 1,
						height: (viewportWidth >= 320 && viewportWidth < 375) ? 44 : (viewportWidth >= 375 && viewportWidth < 414) ? 52 : 57,
						marginTop: 31,
						marginBottom: 10,
						marginHorizontal: 40,
						alignItems: 'center',
						alignContent: 'center',
						borderRadius: 8,
						borderColor: 'rgb( 87, 88, 98)'
					}]}>
				<Text style={{ color: '#ffffff', fontSize: 14, fontFamily: 'stem-medium', }}>{title}</Text>
			</TouchableOpacity></View>;
	}

	render = () => {
        return <KeyboardAwareScrollView behavior='position' style={styles.container} contentContainerStyle={{flex: 1}}>
            <View style={{height: (screen == 0 ? 24 : screen == 1 ? 41 : 53) + 4}}/>

            <Text style={{
                fontFamily: 'stem-medium',
                fontSize: 14,
                alignSelf: 'center',
                letterSpacing: 1.1,
                color: 'rgb( 255, 255, 255)',
            }}>{'Введите новый номер телефона'}</Text>

            <View style={{flexDirection: 'column', paddingHorizontal: screen == 0 ? 20 : screen == 1 ? 27 : 30}}>

                <TextInputMask
                    ref={'myDateText'}
                    type={'custom'}
                    customTextInputProps={{
                        tintColor: '#dcc49c',
                        baseColor: 'rgb( 87, 88, 98)',
                        textColor: 'white',
                        returnKeyType: 'send',
                        keyboardType: 'phone-pad',
                        style: {
                            alignItems: 'center',
                            textAlign: 'center',
                        },
                        inputContainerStyle: { flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' },
                        label: 'Введите новый номер телефона',
                    }}
                    options={{
	                    mask: '+7 999 999 99-99',
                    }}
                    customTextInput={TextField} 
                    value={this.state.phone}
                    onChangeText={(phone) => {this.state.phone = phone; }}
                    onBlur={() => this.setState({hidePrevious: true})}
                />
                <View style={{height: (screen == 0 ? 30 : screen == 1 ? 39 : 45)-25}}/>
            </View>
            {this.renderButton('Получить код', ()=>{})}

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
        if (this.isNext()) {
            var payload = {
                "userName": this.props.navigation.state.params.userName ? this.props.navigation.state.params.userName : 'null',
                "firstName": this.props.navigation.state.params.firstName ? this.props.navigation.state.params.firstName : 'null',
                "middleName": this.props.navigation.state.params.middleName ? this.props.navigation.state.params.middleName : 'null',
                "lastName": this.props.navigation.state.params.lastName ? this.props.navigation.state.params.lastName : 'null',
                "email": this.props.navigation.state.params.email ? this.props.navigation.state.params.email : 'null',
                "phone": this.state.phone ? this.state.phone : 'null',
                "password": this.props.navigation.state.params.password
            };
            var data = new FormData();
            data.append( "json", JSON.stringify( payload ) );
            
            fetch("http://dostavka1.com/v1/auth/register",
            {
                method: "POST",
                body: data
            })
            .then((res)=>{
                return res.json();
            })
            .then((data) => {
                console.log( JSON.stringify( data ) );
                this.props.navigation.setParams(data);
                this.props.navigation.goBack(this.props.navigation.state.params.loginKey, );
            })
        }
            
    }

    isNext = () => {
        return  (this.state.phone);
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