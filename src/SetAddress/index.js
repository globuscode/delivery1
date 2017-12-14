import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	PixelRatio,
	AsyncStorage
} from 'react-native';
import { LinearGradient } from 'expo';
import { Header } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Ionicons';
import Touchable from 'react-native-platform-touchable';
import { connect } from 'react-redux';

import { host } from "../etc";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

class SelectAddress extends React.Component {
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
			address: '',
			house: ''
		};
	};

	componentWillMount = async () => {
		const response = await fetch(`${host}/restaurant?restaurantId=${this.props.navigation.state.params.id}`)
		const responseJson = await response.json();

		let prevAddress = await AsyncStorage.getItem('Addresses');
		let nan = await AsyncStorage.getItem('nan');
		if (prevAddress != nan)
			prevAddressJson = JSON.parse(prevAddress);
		else
			prevAddressJson = [];

		this.setState({
			restaurantName: responseJson["data"]["result"]["title"],
			history: prevAddressJson
		});
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
				}}>{'Отлично'}</Text>
			</View>;
	};

	validateAddress = async (address) => {
		const response = await fetch(`${host}/address?cityId=36&street=${this.state.address}&house=${this.state.house}&restaurantId=${this.props.navigation.state.params.id}`)
		const responseJson = await response.json();
		this.setState({ deliver: responseJson["data"]["result"] == 0 });
	}

	next = () => {
		if (this.notDeliver(this.state.address))
			if (this.state.canNav) {
				const lastAddress = this.state.history[this.state.history.length - 1];
				const isInit = this.state.history.length == 0;
				if (isInit && this.state.deliver)
					this.state.history.push({
						street: this.state.address,
						house: this.state.house
					});
				else
				if (lastAddress.street != this.state.address || lastAddress.house != this.state.house)
					if (this.state.deliver)
						this.state.history.push({
							street: this.state.address,
							house: this.state.house
						});
				if (this.state.history.length <= 2)
					AsyncStorage.setItem(
						'Addresses',
						JSON.stringify(this.state.history)
					);
				else
					AsyncStorage.setItem(
						'Addresses',
						JSON.stringify([
							this.state.history[this.state.history.length-1],
							this.state.history[this.state.history.length-2]
						])
					);
				this.props.saveAddress({
					street: this.state.address,
					house: this.state.house
				});
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
					return <TouchableOpacity key={i} onPress={() => this.setState({address: e.street, house: e.house, deliver: true})}><Text style={[styles.text, {
						color: '#dcc49c',
						fontFamily: 'open-sans',
						fontSize: 14,
						marginTop: (viewportWidth >= 320 && viewportWidth < 375) ? 12 : (viewportWidth >= 375 && viewportWidth < 414) ? 17 : 21,
					}]}>{`Ул. ${e.street}, д. ${e.house}`}</Text></TouchableOpacity>
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
							label='Улица доставки'
							value={this.state.address}
							onChangeText={(address) => { this.state.address = address; }}
							onBlur={() => {
								this.validateAddress();
								this.setState({hidePrevious: true})
							}}
						/>
					</View>
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
							label='Дом доставки'
							value={this.state.house}
							onChangeText={(address) => { this.state.house = address; }}
							onBlur={() => {
								this.validateAddress();
								this.setState({hidePrevious: true})
							}}
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

export default connect(
	state => ({}),
	dispatch => ({
		saveAddress: address => dispatch({ type: "SAVE_ADDRESS", payload: address })
	})
)(SelectAddress);

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