import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	PixelRatio,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Header } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from 'react-native-platform-touchable';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class SelectCity extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canNav: true,
			hidePrevious: false,
			restaurantName: '',
			history: [],
			recomededAddresses: [
				'Ул. Северная, Д. 19',
				'Ул. Северная, Д. 20',
				'Ул. Северная, Д. 21',
				'Ул. Северная, Д. 22',
			],
			deliver: false,
			address: ''
		};
	};

	componentWillMount = async () => {
		const response = await fetch(`http://dostavka1.com/v1/restaurant?restaurantId=${this.props.navigation.state.params.id}`)
		const responseJson = await response.json();

		this.setState({ restaurantName: responseJson["data"]["result"]["title"] });
	}

	notDeliver(address) {
		return this.state.deliver;
	}

	renderAutocomplete(address) {
		var result = [];
		for (var i=0; i<this.state.recomededAddresses.length; i++) {
			if (this.state.recomededAddresses[i].indexOf(address) != -1)
				result.push(<TouchableOpacity><Text>{this.state.recomededAddresses[i]}</Text></TouchableOpacity>)
		}
	}

	checkForAviability = () => {
		if (!this.notDeliver(this.state.address))
			return <View style={{ padding: 20 }}>
				<Text style={{
					fontFamily: 'open-sans',
					lineHeight: 13,
					fontSize: 12,
					top: 1,
					color: '#fff',
					textAlign: 'center'
				}}>{`К сожалению ресторан ${this.state.restaurantName} не осуществляет доставку по данному адресу. Но вы можете выбрать другой ресторан который привезет вам все что вы ни пожелаете`}</Text>
				<TouchableOpacity style={{
					borderRadius: 5,
					borderWidth: 1,
					borderColor: '#dcc49c',
					padding: 8,
					marginVertical: 15,
				}}>
					<Text style={{
						fontFamily: 'stem-medium',
						lineHeight: 13,
						fontSize: 12,
						top: 1,
						color: '#fff',
						textAlign: 'center'
					}}>{'Смотреть все рестораны \nдоступные по этому адресу' }</Text>
				</TouchableOpacity>
				</View>;
		else
			return <View style={{ padding: 20 }}>
				<Text style={{
					fontFamily: 'open-sans',
					lineHeight: 13,
					fontSize: 12,
					top: 1,
					color: '#fff',
					textAlign: 'center'
				}}>{'Отлично, мы будем у вас на пороге не позже сорока минут'}</Text>
			</View>;
	};

	validateAddress = async (address) => {
		const response = await fetch(`http://dostavka1.com/v1/address?cityId=36&street=${address}&restaurantId=${this.props.navigation.state.params.id}`)
		const responseJson = await response.json();
		this.state.address = address; 
		this.setState({ deliver: responseJson["data"]["result"] == 0 });
	}

	next = () => {
		if (this.notDeliver(this.state.address))
			if (this.state.canNav) {
				this.props.navigation.navigate('RestaurantMenu', {id: this.props.navigation.state.params.id});
				this.state.canNav = false;
				setTimeout(() => {
					this.state.canNav = true;
				}, 1500);
			}
	}

	render = () => {
		return (
				<View style={styles.container}>
				{/*<Header
					leftComponent={{ icon: 'ios-arrow-back', type: 'ionicon', color: '#dcc49c',  }}
					centerComponent={{ text: 'Адрес доставки', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
					outerContainerStyles={{ 
						width: viewportWidth - 40, 
						marginLeft: 20,
						borderColor: 'rgb(87, 88, 98)',
						alignSelf: 'center',
						alignContent: 'center',
						}}
				/>*/}
					<Text style={{
						fontFamily: 'stem-medium', 
						fontSize: 16, 
						lineHeight: 20, 
						marginTop: (viewportWidth >= 320 && viewportWidth < 375) ? 14 : (viewportWidth >= 375 && viewportWidth < 414) ? 31 : 43,
						letterSpacing: 1.1, 
						textAlign: 'center',
						color: '#fff',
						top: 4
					}}>{'Ресторан ' + this.state.restaurantName + '\nограничил зону доставки'}</Text>
					<Text style={{ 
						fontFamily: 'open-sans', 
						fontSize: 12, 
						lineHeight: 15,
						textAlign: 'center',
						marginTop: (viewportWidth >= 320 && viewportWidth < 375) ? 11 : (viewportWidth >= 375 && viewportWidth < 414) ? 19 : 25,
						marginBottom: (viewportWidth >= 320 && viewportWidth < 375) ? 16 : (viewportWidth >= 375 && viewportWidth < 414) ? 21 : 23,
						top: 3, 
						color: 'rgb(119, 122, 136)'
					}}>{'Пожалуйста убедитесь что ваш адрес\nвходит в зону доставки ресторана'}</Text>
					{ this.state.address != ''? null : this.state.history.map((e, i) => {
					return <TouchableOpacity key={i} onPress={() => this.setState({address: e})}><Text style={[styles.text, {
						color: '#dcc49c',
						fontFamily: 'open-sans',
						fontSize: 14,
						marginTop: (viewportWidth >= 320 && viewportWidth < 375) ? 12 : (viewportWidth >= 375 && viewportWidth < 414) ? 17 : 21,
					}]}>{e}</Text></TouchableOpacity>
					})}
					<View style={{alignSelf: 'stretch', paddingHorizontal: 20}}>
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
							label='Адрес доставки'
							value={this.state.address}
							onChangeText={this.validateAddress}
							onBlur={() => this.setState({hidePrevious: true})}
						/>
					</View>
					{this.state.address != '' ? this.renderAutocomplete(this.state.address) : null}
					{this.state.address != '' ? this.checkForAviability(this.state.address) : null}
					<View style={{
						position: 'absolute',
						alignSelf: 'center',
						width: viewportWidth - 30,
						bottom: 0,
						height: 49,
						borderTopWidth: 2,
						borderColor: this.notDeliver(this.state.address) ? '#dcc49c' : '#575862',
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
									color: this.notDeliver(this.state.address) ? '#dcc49c' : '#575862'
								}
							]}>Далее</Text>
						</Touchable>
					</View>
				</View>
		);
	}
}

const styles = StyleSheet.create({
	text: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	},
	nextButtonText: {
		fontSize: 16,
		color: '#dcc49c',
		alignSelf: 'center',
		textAlign: 'center',
		letterSpacing: 0.8,
		fontFamily: 'stem-regular'
	},
	container: {
		flex: 2,
		elevation: 0,
		backgroundColor: '#292b37',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
});