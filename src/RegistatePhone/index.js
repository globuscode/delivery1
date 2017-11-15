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
    Alert,
    KeyboardAvoidingView,
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextField } from 'react-native-material-textfield';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import Button from 'react-native-button';
import Touchable from 'react-native-platform-touchable';
import {
	LinearGradient,
	Constants
} from 'expo';
import { connect } from 'react-redux';

import IconD from '../IconD';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const hr = <View style={{ alignSelf: 'stretch', marginHorizontal: 20, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;
const hrShort = <View style={{ width: 290, alignSelf: 'center', margin: 0, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;

const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;

class Registration extends React.Component {
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
				<Text style={{ color: '#ffffff', fontSize: 14, fontFamily: 'stem-medium', top: 3}}>{title}</Text></View>

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
				<Text style={{ color: 'rgb( 225, 199, 155)', fontSize: 14, fontFamily: 'stem-medium', top: 3}}>{title}</Text>
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
                flexDirection: 'column',
                alignSelf: 'center',
                width: screen==0 ? 136 : screen == 1 ? 160 : 177,
            }}>
            <TextField
                tintColor={'#dcc49c'}
                baseColor={'rgb( 87, 88, 98)'}
                textColor={'white'}
                returnKeyType={'send'}
                keyboardType={'phone-pad'}
                style={{
                    alignItems: 'center',
                    textAlign: 'center',
                }}
                inputContainerStyle={{ flexDirection: 'column' , alignItems: 'center', justifyContent: 'center' }}
                label={'Код подтверждения'}
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
            
            fetch("http://dostavka1.com/v1/auth/register/",
            {
                method: "POST",
                body: JSON.stringify( payload )
            })
            .then((res)=>{
                return res.json();
            })
            .then((data) => {
                if (data.errors) {
                    if (data.errors.code != 200) {
                        Alert.alert(data.errors.title, data.errors.detail);
                    }
                    this.props.navigation.goBack();
                }
                else {
                    Alert.alert("Все ОК", JSON.stringify(data));
                    this.props.auth(data);
                    this.props.navigation.navigate('Feed');
                }
                    
            })
        }
            
    }

    renderMenuItem = (icon, title, nav) => {
        return 
        <TouchableOpacity
        style={{
            flexDirection: 'row',
            paddingLeft: screen == 0 ? 16 : screen == 1 ? 19 : 20,
        }}>
            <IconD name={icon} size={17} color='rgb( 225, 199, 155)'/>
            <Text style={{
                fontFamily: 'open-sans',
                fontSize: 14,
                letterSpacing: 0.4,
                color: '#ffffff'
            }}>{text}</Text>
            </TouchableOpacity>
    }

    isNext = () => {
        return  (this.state.phone);
    }
}
export default connect(
	state => ({
	  globalStore: state.user
	}),
	dispatch => ({
        auth: (data) => dispatch({type: 'AUTH', payload: data})
	})
  )(Registration);

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
    nextButtonText: {
      fontSize: 16,
      color: "#dcc49c",
      marginTop: 17,
      marginBottom: 17,
      textAlign: "center",
      letterSpacing: 0.8,
      fontFamily: "stem-regular"
    },
	container: {
        flex: 1,
        flexDirection: 'column',
		elevation: -10,
		backgroundColor: 'rgb( 45, 46, 58)',
	},
});