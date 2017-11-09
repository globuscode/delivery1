import React from 'react';
import {
	View,
	TouchableOpacity,
	Dimensions,
	StyleSheet,
	ScrollView,
	TouchableNativeFeedback,
	Image,
	WebView,
	Platform,
	Linking,
	Text
} from 'react-native';
import { Header } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import {
	LinearGradient,
	Constants
} from 'expo';
import { connect } from 'react-redux';

import Counter from '../Counter';
import PriceButton from '../PriceButton';
import Storage from '../Reducers';

import Recomendations from '../Main/Recomendations';
import IconD from '../IconD';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const hr = <View style={{ alignSelf: 'stretch', marginHorizontal: 20, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;
const hrShort = <View style={{ width: 290, alignSelf: 'center', margin: 0, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;

class Cart extends React.Component {
	constructor(props) {
		super(props);

		this.state = { 
			promocode: '',
			cart: [],
			canNav: true,
			cartSet: [],
			restaurant: {
				id: 0,
				title: "Джон Джоли",
				image: "http://lamcdn.net/the-village.ru/post_image-image/stUDrX37wGq1g-9mFWRl4A-article.jpg",
				logoImage: 'https://image.ibb.co/fPo4vm/meatless_logo.png',
				favorite: false,
				tagGroups: [
					{
						"title": 'Россия',
						"icon": 'ios-person',
						"size": 15,
						"icon": "http://gg.svg"
					},
					{
						"id": 12,
						"title": "Италия",
						"size": 15,
						"icon": "http://gg.svg"
					},
				],
				minOrder: 8888,
				description: {
					title: 'Настоящее грузинское гостеприимство в ресторанах «Джон Джоли»',
					description: 'Хлебосольная, щедрая, сказочная, гостеприимная Грузия! Удивительная страна, которая известна своими застольями, подарила Москве частичку своей души.'
				},
				bestPlates: [
					{
						"photo": "https://img02.rl0.ru/afisha/o/s1.afisha.net/MediaStorage/d5/12/535a1080132c4530a7a4446612d5.jpg",
						"name": "Дабл роял бургер",
						"restourant": "Джон Джоли",
						"weight": "400 гр",
						"price": "8888",
						"restourantLogo": "https://image.ibb.co/fPo4vm/meatless_logo.png",
						"favourite": false
					},
					{
						"photo": "http://shop.web01.widgets.vigbo.com/storage/shops/7776/products/313707/images/2-8606f84da77c5a05532ee2d3f1d9e351.jpg",
						"name": "Стейк",
						"restourant": "Стейк Хаус",
						"weight": "200 гр",
						"price": "30",
						"restourantLogo": "https://image.ibb.co/fPo4vm/meatless_logo.png",
						"favourite": false
					},
					{
						"photo": "http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg",
						"name": "Шоколадный милкшейк",
						"restourant": "Джон Джоли",
						"weight": "150 гр",
						"price": "1000",
						"restourantLogo": "https://image.ibb.co/fPo4vm/meatless_logo.png",
						"favourite": false
					},
					{
						"photo": "https://img02.rl0.ru/afisha/o/s1.afisha.net/MediaStorage/d5/12/535a1080132c4530a7a4446612d5.jpg",
						"name": "Бургер",
						"restourant": "КБ",
						"weight": "200 гр",
						"price": "30",
						"restourantLogo": "https://image.ibb.co/fPo4vm/meatless_logo.png",
						"favourite": false
					}
				],
				/*promo: {
						id: <int>,
						title: <string>,
						description: <html>
				},*/
				menu: {
					'Мясные блюда': [
						{
							title: 'Мясной хлеб',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"weight": '200/25/40/ 15/5/2 гр.',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						}, {
							title: 'Мясной хлеб',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"weight": '200/25/40/ 15/5/2 гр.',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						},
					],
					'Салаты': [
						{
							title: 'Мясной хлеб',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"weight": '200/25/40/ 15/5/2 гр.',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						}, {
							title: 'Мясной хлеб',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"weight": '200/25/40/ 15/5/2 гр.',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						},
					],
					'Супы': [
						{
							title: 'Борщ',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"weight": '200/25/40/ 15/5/2 гр.',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						}, {
							title: 'Уха',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"weight": '200/25/40/ 15/5/2 гр.',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						},
					]
				},
				time: 'с 11:00 до 22:30 пт, сб до 05:15 \nдоставим за 90 мин или ко времени',
				averageBill: 9000,
				minBill: 1000,
				web: 'www.google.com',
				discount: 25
			}
		};
	}

	componentWillMount = async () => {

	}

	addPlate = async (plate) => {
	}

	clear = async () => {
	}

	renderButton = (title, callback) => {
		return <View style={{ alignSelf: 'stretch' }}>
			<View style={[
				styles.row,
				{
					justifyContent: 'center',
					position: 'absolute',
					width: viewportWidth - 30,
					borderWidth: 1,
					height: (viewportWidth >= 320 && viewportWidth < 375) ? 44 : (viewportWidth >= 375 && viewportWidth < 414) ? 52 : 57,
					marginTop: 31,
					marginBottom: 10,
					marginHorizontal: 15,
					alignItems: 'center',
					alignContent: 'center',
					borderRadius: 4,
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
						marginHorizontal: 15,
						alignItems: 'center',
						alignContent: 'center',
						borderRadius: 4,
						borderColor: '#dcc49c'
					}]}>
				<Text style={{ color: '#ffffff', fontSize: 14, fontFamily: 'stem-medium', }}>{'Открыть меню ресторана'}</Text>
			</TouchableOpacity></View>;
	}

	update = async () => {
		this.setState({});
	}

	totalPrice = () => {
		let result = 0;
		for (var i=0; i<this.props.globalStore.cart.length; i++) {
			result += parseFloat(this.props.globalStore.cart[i].plate.price) * parseFloat(this.props.globalStore.cart[i].count);
		}

		return result;
	}

	_renderContent = (e, index) => {
		const imageHeight = (viewportWidth >= 320 && viewportWidth < 375) ? 100 : (viewportWidth >= 375 && viewportWidth < 414) ? 117 : 130;
		const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;
		//const textMarginRight = (viewportWidth >= 320 && viewportWidth < 375) ? 40 : (viewportWidth >= 375 && viewportWidth < 414) ? 117 : 130;
		return <View style={{
			flexDirection: 'row',
			marginLeft: 10,
			width: viewportWidth - 10,
			marginTop: 10,
			justifyContent: 'flex-start'
		}}>
				<Image source={{
					uri: e.plate.image
				}}
					style={{
						width: imageHeight,
						height: imageHeight,
						borderRadius: 10,
					}}
				/>
				<View style={{ flexDirection: 'column', justifyContent: 'space-between', marginLeft: 10, width: viewportWidth - 20 - 20 - imageHeight }}>
					<View style={{top: 4}}>
						<Text style={{ color: '#fff', fontSize: 14, fontFamily: 'stem-medium', top: 3, lineHeight: 18, letterSpacing: 1 }}>{e.plate.title}</Text>
						<Text style={{
							color: 'rgb( 119, 122, 136)', fontSize: 14, lineHeight: 18, marginBottom: 5, fontFamily: 'stem-medium'
						}}>{e.plate.weight}
						</Text>
					</View>
					
					<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<Counter value={e.count}
					onRemovePress={async () => {
						this.props.removePlate(index);
					}}
					onAddPress={() => {
						this.props.addPlate(e.plate);
					}}
					/>

						<Text style={{
							color: 'rgb( 255, 255, 255)',
							fontSize: 16,
							fontFamily: 'stem-medium'
						}}>{e.plate.price.toString() + ' ₽'}
						</Text>
					</View>
				</View>
			</View>
		};

	nav = () => {
		if (this.state.canNav) {
			this.props.navigation.navigate('SetAddress');
			this.state.canNav = false;
			setTimeout(() => {
				this.state.canNav = true;
			}, 1500);
		}
	}

	render() {
		Storage.subscribe(() => {
			this.setState({});
		});
		const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;
		if (this.props.globalStore.cart.length != 0)
		return <View style={styles.container} ><ScrollView contentContainerStyle={{
			justifyContent: 'flex-start',
			alignItems: 'center',
		}}>

			{/* Логотип ресторана в котором оформляется заказ */}
			<View style={[styles.row, { justifyContent: 'center', marginTop: 30 }]}>
				<WebView
					bounces={false}
					scrollEnabled={false}
					source={{
						html: `<div 
							style="
							width: 100%;
							height: 100%;
							background: url('` + this.state.restaurant.logoImage + `') center center no-repeat; 
							background-size: contain" />`
					}}
					style={{
						width: viewportWidth - 40,
						height: 130,
						alignSelf: 'center',
						backgroundColor: 'transparent',
					}} />
			</View>
			{-this.totalPrice() + this.state.restaurant.minBill <= 0 ? null : 
			<Text style={{
				fontFamily: 'open-sans',
				fontSize: 12,
				letterSpacing: 0.8,
				textAlign: 'center',
				color: 'rgb( 225, 199, 155)'
			}}>{'Ресторан установил ограничение \nна минимальную сумму заказа '+this.state.restaurant.minBill+'.\nВам осталось выбрать еще на '+(-this.totalPrice()+this.state.restaurant.minBill).toString()+' ₽'}</Text>}

		{/* Кнопка Открыть меню ресторана */}
		{this.renderButton('Открыть меню ресторана', this.nav)}

		<View style={{ width: screen == 0 ? 290 : screen == 1 ? 346 : 376, height: 1, borderWidth: 1, borderColor: 'rgb( 87, 88, 98)' }} />
		{this.props.globalStore.cart.map((e,i)=>{
			return <View key={i} style={{flexDirection: 'row'}}>
				{this._renderContent(e, i)}
				</View>
		})}
		<View style={{ height: screen == 0 ? 30 : screen == 1 ? 34 : 39.1,}}/>
		<View style={{ width: screen == 0 ? 290 : screen == 1 ? 346 : 376, height: 1, borderWidth: 1, borderColor: 'rgb( 87, 88, 98)'}}/>

		<Text style={{
			fontFamily: 'stem-medium', 
			color: '#fff',
			letterSpacing: 1.1,
			textAlign: 'center',
			marginTop: screen == 0 ? 28 : screen == 1 ? 34 : 38, 
			marginBottom: screen == 0 ? 10 : screen == 1 ? 13 : 15,
		}}>{'Есть сертификат?'}</Text>

		<Text style={{
			fontFamily: 'open-sans',
			color: 'rgb( 119, 122, 136)',
			fontSize: 12,
			lineHeight: 13,
			letterSpacing: 0.8,
			textAlign: 'center',
			maxWidth: 250,
			marginBottom: screen == 0 ? 33 : screen == 1 ? 45 : 65,
			}}>{'Если у вас есть сертификат, введите номер чтобы получить скидку'}</Text>
		<TextField
			returnKeyType='send'
			style={{
				alignItems: 'center',
				textAlign: 'center',
			}}
			inputContainerStyle={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
			label='Введите номер сертификата'
		/>
		<View style={{ height: screen == 0 ? 32 : screen == 1 ? 40 : 46, }} />
		<View style={{ width: screen == 0 ? 290 : screen == 1 ? 346 : 376, height: 1, borderWidth: 1, borderColor: 'rgb( 87, 88, 98)' }} />
		<View style={{
			flexDirection: 'row', 
			justifyContent: 'space-between',
			height: screen == 0 ? 39 : screen == 1 ? 45 : 50,
			alignItems: 'center',
			alignContent: 'center',
			alignSelf: 'stretch',
			marginHorizontal: 20,
			//paddingTop: screen == 0 ? 10 : screen == 1 ? 13 : 15,
			//paddingBottom: screen == 0 ? 15 : screen == 1 ? 18 : 21,
		}}>
			<Text style={{
				fontFamily: 'stem-medium',
				fontSize: 16,
				lineHeight: 16,
				top: 3,
				letterSpacing: 1.1,
				color: 'rgb( 225, 199, 155)',

			}}>{'Сумма заказа'}</Text>
			<Text style={{
				fontFamily: 'stem-medium',
				fontSize: 16,
				textAlignVertical: 'center',
				top: 3,
				lineHeight: 16,
				letterSpacing: 1.1,
				color: 'rgb( 255, 255, 255)',

				}}>{this.totalPrice().toString() + ' ₽'}</Text>
		</View>
		<View style={{ width: screen == 0 ? 290 : screen == 1 ? 346 : 376, height: 1, borderWidth: 1, borderColor: 'rgb( 87, 88, 98)' }} />
		<View style={{
			flexDirection: 'row',
			justifyContent: 'space-between',
			height: screen == 0 ? 39 : screen == 1 ? 45 : 50,
			alignItems: 'center',
			alignContent: 'center',
			alignSelf: 'stretch',
			marginHorizontal: 20,
			//paddingTop: screen == 0 ? 10 : screen == 1 ? 13 : 15,
			//paddingBottom: screen == 0 ? 15 : screen == 1 ? 18 : 21,
		}}>
			<Text style={{
				fontFamily: 'stem-medium',
				fontSize: 16,
				lineHeight: 16,
				top: 3,
				letterSpacing: 1.1,
				color: 'rgb( 225, 199, 155)',

			}}>{'Доставка'}</Text>
			<Text style={{
				fontFamily: 'stem-medium',
				fontSize: 16,
				textAlignVertical: 'center',
				top: 3,
				lineHeight: 16,
				letterSpacing: 1.1,
				color: 'rgb( 255, 255, 255)',

			}}>{'бесплатно'}</Text>
		</View>
		<View style={{ width: screen == 0 ? 290 : screen == 1 ? 346 : 376, height: 1, borderWidth: 1, borderColor: 'rgb( 87, 88, 98)' }} />
		<View style={{
			flexDirection: 'row',
			justifyContent: 'space-between',
			height: screen == 0 ? 39 : screen == 1 ? 45 : 50,
			alignItems: 'center',
			alignContent: 'center',
			alignSelf: 'stretch',
			marginHorizontal: 20,
			//paddingTop: screen == 0 ? 10 : screen == 1 ? 13 : 15,
			//paddingBottom: screen == 0 ? 15 : screen == 1 ? 18 : 21,
		}}>
			<Text style={{
				fontFamily: 'stem-medium',
				fontSize: 16,
				lineHeight: 16,
				top: 3,
				letterSpacing: 1.1,
				color: 'rgb( 225, 199, 155)',

			}}>{'Итоговая сумма заказа'}</Text>
			<Text style={{
				fontFamily: 'stem-medium',
				fontSize: 16,
				textAlignVertical: 'center',
				top: 3,
				lineHeight: 16,
				letterSpacing: 1.1,
				color: 'rgb( 255, 255, 255)',

				}}>{this.totalPrice() + ' ₽'}</Text>
		</View>
			

		<TouchableOpacity style={{margin: 20}} onPress={this.clear}><Text>{'Очистить корзину'}</Text></TouchableOpacity>
		<TouchableOpacity style={{margin: 20}} onPress={this.update}><Text>{'Обновить'}</Text></TouchableOpacity>
			<View style={{ height: 60 }} />
		</ScrollView>
			<LinearGradient colors={['rgba(39, 40, 48, 0)', 'rgba(39, 40, 48, 1)']} style={{
				height: 60,
				position: 'absolute',
				bottom: 0,
				width: viewportWidth
			}} />
</View>;
		return this.renderEmpty();
	}

	renderEmpty = () => {
		const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;
		return <View style={styles.container} ><ScrollView contentContainerStyle={{
			justifyContent: 'flex-start',
			alignItems: 'center',
		}}>

			<Text style={{
				fontFamily: 'stem-medium',
				fontSize: 14,
				color: 'rgb( 225, 199, 155)',
				letterSpacing: 0.9,
				alignSelf: 'stretch',
				marginHorizontal: screen == 0 ? 32 : screen == 1 ? 37.5 : 41.4,
				marginTop: screen == 0 ? 18 : screen == 1 ? 21.1 : 23.3,
				marginBottom: screen == 0 ? 19 : screen == 1 ? 24.8 : 28.7,
			}}>{'Начните заказ с любимого блюда'}</Text>
			<View style={{ height: screen == 0 ? 18 : screen == 1 ? 28.5 : 35.2 }} />
			<View style={{
				flexDirection: 'row',
				alignSelf: 'stretch',
				justifyContent: 'space-between',
				marginLeft: 20,
				marginRight: screen == 0 ? 36.3 : screen == 1 ? 36.5 : 36.7
			}}>
				<Text style={{
					fontFamily: 'open-sans',
					color: '#fff',
					fontSize: 12,
					lineHeight: 14,
					maxWidth: screen == 0 ? 195 : screen == 1 ? 230.8 : 273,
					letterSpacing: 0.8,
					top: Platform.OS == 'ios' ? 2 : 0,
					textAlignVertical: 'bottom'
				}}>{'Нажмите на значек корзины на карточке или рядом с описанием блюда'}</Text>
				<View><IconD name='cart' size={30} color='rgb( 225, 199, 155)'/></View>
			</View>
			<View style={{ height: screen == 0 ? 18 : screen == 1 ? 28.5 : 35.2}} />
			<View style={{ width: screen == 0 ? 290 : screen == 1 ? 346 : 376, height: 1, borderWidth: 1, borderColor: 'rgb( 87, 88, 98)' }} />
			<TouchableOpacity style={{ margin: 20 }} onPress={this.update}><Text>{'Обновить'}</Text></TouchableOpacity>
			<View style={{ height: 60 }} />
		</ScrollView>
			<View pointerEvents='none' style={{
				height: 60,
				position: 'absolute',
				bottom: 0,
				width: viewportWidth
			}}>
				<LinearGradient colors={['rgba(39, 40, 48, 0)', 'rgba(39, 40, 48, 1)']} style={{
					flex: 1
				}} /></View>
		</View>;
	}
};


export default connect(
	state => ({
	  globalStore: state
	}),
	dispatch => ({
		removePlate: plateIndex => dispatch({type: 'REMOVE_PLATE', index: plateIndex }),
		addPlate: plate => dispatch({type: 'ADD_PLATE', payload: plate })
	})
  )(Cart);

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
		elevation: -10,
		paddingTop: Constants.statusBarHeight,
		backgroundColor: 'rgb( 39, 40, 51)',
	},
});
