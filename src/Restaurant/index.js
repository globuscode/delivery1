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
	Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TabNavigator from 'react-native-tab-navigator';
import Button from 'react-native-button';
import {
	LinearGradient,
	Constants
} from 'expo';
import HTMLView from 'react-native-htmlview';


import Recomendations from '../Main/Recomendations';
import IconD from '../IconD';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const hr = <View style={{ alignSelf: 'stretch', marginHorizontal: 20, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;
const hrShort = <View style={{ width: 290, alignSelf: 'center', margin: 0, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;


export default class Restaurant extends React.Component {
	navigationOptions = {
		title: 'Home',
	};

	constructor(props) {
		super(props);
		this.state = {
			rang: 2,
			canNav: true,
			data: {
				id: 0,
				title: "Джон Джоли",
				image: "http://lamcdn.net/the-village.ru/post_image-image/stUDrX37wGq1g-9mFWRl4A-article.jpg",
				logoImage: 'https://image.ibb.co/fPo4vm/meatless_logo.png',
				favorite: false,
				type: 'Grill ресторан',
				/*
				tagGroups: [
						{
							"id": 12,
							"title": "<string>",
							"size": <float>,
							“icon”: “http://gg.svg”
						},
						<tag_grou_id>,
				],*/
				minOrder: 8888,
				description: {
					title: 'Настоящее грузинское гостеприимство в ресторанах «Джон Джоли»',
					description: 'Хлебосольная, щедрая, сказочная, гостеприимная Грузия! Удивительная страна, которая известна своими застольями, подарила Москве частичку своей души.'
				},
				/*bestPlates: [
						<plate>,
						<plate>,
						…
				],
				promo: {
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
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						}, {
							title: 'Мясной хлеб',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						},
					],
					'Салаты': [
						{
							title: 'Мясной хлеб',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						}, {
							title: 'Мясной хлеб',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						},
					],
					'Супы': [
						{
							title: 'Борщ',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						}, {
							title: 'Уха',
							"favorite": false,
							"image": 'http://img.povar.ru/uploads/a0/99/e9/31/molochnii_kokteil_s_shokoladom-318319.jpg',
							"price": 8888,
							"description": 'С хрустящими шариками из сулугуни и кукурузной муки с домашними соусами',
						},
					]
				},
				time: 'с 11:00 до 22:30 \nпт, сб до 05:15',
				averageBill: 9000,
				minBill: 1000,
				web: 'www.google.com',
				/*discount: <float>*/
			}
		};
		this.navigationOptions.title = this.state.data.title;
	};

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
				<Text style={{ color: '#ffffff', fontSize: 14, fontFamily: 'stem-medium', top: 2}}>{title}</Text></View>
		
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
				<Text style={{ color: '#ffffff', fontSize: 14, fontFamily: 'stem-medium', top: 2}}>{'Открыть меню ресторана'}</Text>
			</TouchableOpacity></View>;
	}

	render() {
		var restaurant = <View ><ScrollView style={styles.container} contentContainerStyle={{
			justifyContent: 'flex-start',
			alignItems: 'center',
		}}>
			{/* Фото ресторана */}
			<Image source={{
				uri: this.state.data.image 
			}}
			style={{
				width: viewportWidth,
				height: (viewportWidth >= 320 && viewportWidth < 375) ? 230 : (viewportWidth >= 375 && viewportWidth < 414) ? 236 : 262,
			}}
			/>
			<LinearGradient colors={['rgba(39, 40, 51, 0)', 'rgba(39, 40, 51, 1)']} style={{
				height: 100,
				position: 'absolute',
				top: ((viewportWidth >= 320 && viewportWidth < 375) ? 230 : (viewportWidth >= 375 && viewportWidth < 414) ? 236 : 262) - 100 + 2,
				width: viewportWidth
			}} />




			{/* Логотип ресторана */}
			<View style={{ position: 'absolute', top: ((viewportWidth >= 320 && viewportWidth < 375) ? 230 : (viewportWidth >= 375 && viewportWidth < 414) ? 236 : 262) - 60}}>
				<WebView
					bounces={false}
					scrollEnabled={false}
					source={{
						html: '<div style="width:100%; height: 100%; background: url(' + this.state.data.logoImage + ') center center no-repeat; background-size: contain" />'
					}}
					style={{
						width: viewportWidth,
						height: 120,
						backgroundColor: 'transparent',
					}} />
				</View>
			<View style={{height: 70}}/>




			{/* Ранг пользователя */}
			<View style={[styles.row, {justifyContent: 'center'}]}>
				<Text style={{ color: '#dcc49c', fontFamily: 'open-sans-semibold', fontSize: 11 }}>{'Новичок'}</Text>
			</View>
			<View style={[styles.row, { justifyContent: 'center' }]}>
				{[1, 2, 3].map(e => 
					<View
						key={ e }
						style={{margin: 3.3}}>
							<IconD
								name='dostavka'
								color={e <= this.state.rang ? '#dcc49c' : 'rgb(87, 88, 98)'}
								size={16}/>
					</View>)}
			</View>




			{/* Кнопка Хочу скидку */}
			<View style={[styles.row, { justifyContent: 'center' }]}>
				<TouchableOpacity>
					<View style={{
						margin: 5,
					}}>
					<Text style={{
							color: 'white', fontFamily: 'open-sans-semibold', fontSize: 11 
					}}>{'Хочу скидку в этом ресторане'}</Text></View>
				</TouchableOpacity>
			</View>




			{/* Название ресторана */}
			<View style={[styles.row, { justifyContent: 'center' }]}>
				<Text style={{ marginTop: 13,color: '#dcc49c', fontSize: 20, fontFamily: 'stem-medium', lineHeight: 22, letterSpacing: 0.9, top: 2 }}>{this.state.data.title}</Text>
			</View>
			<View style={[styles.row, { justifyContent: 'center' }]}>
				<Text style={{ marginTop: 6, color: '#fff', fontSize: 13, fontFamily: 'stem-medium', lineHeight: 16, letterSpacing: 0.6, top: 4 }}>{this.state.data.type}</Text>
			</View>

			{/* Кнопка Открыть меню ресторана */}
			{this.renderButton('Открыть меню ресторана', () => {
				if (this.state.canNav) {
					this.props.navigation.navigate('SetAddress');
					this.state.canNav = false;
					setTimeout(() => {
						this.state.canNav = true;
					}, 1500);
				}
				})}


			{/* Минимальная сумма заказа и бесплатная доставка */}
			<View style={[{ justifyContent: 'center', flexDirection: 'row', left: -15, marginBottom: 38 }]}>
				<View style={{width: 35, top: -2}}><IconD color='#dcc49c' size={35} name='truck'/></View>
				<Text style={{ color: '#ffffff', fontSize: 11, fontFamily: 'open-sans', lineHeight: 13, top: 2, marginLeft: 15}}>{`Минимальная сумма заказа 2 000 ₽ \nБесплатная доставка от 3 500 ₽`}</Text>
			</View>

			{/* Описание ресторана */}
			{hr}{/* Описание ресторана */}
			{<View
				style={{ alignItems: 'flex-start', alignSelf: 'stretch', marginTop: 15, marginBottom: 27, marginHorizontal: 20 }}
			>
				<View style={[styles.row, { justifyContent: 'flex-start' }]}>
					<Text style={{ color: '#dcc49c', fontSize: 13, lineHeight: 16, letterSpacing: 0.6, top: 3 }}>{this.state.data.description.title}</Text>
				</View>
				<View style={{ height: 17 }} />
				<View style={[styles.row, { justifyContent: 'flex-start' }]}>
					<Text style={{ color: '#ffffff', fontSize: 13, lineHeight: 17, top: 4 }}>{this.state.data.description.description}</Text>
				</View>
			</View>}
			{hr}


			{/* Лучшие блюда */}
			<View style={[styles.row, { justifyContent: 'flex-start', marginTop: 12 }]}>
				<Text style={{ color: '#FFF', fontSize: 20, marginLeft: 20, }}>{'Лучшие блюда'}</Text>
			</View>
			<View style={{height: (viewportWidth - 40)*1.32+130}}><Recomendations navigation={this.props.navigation}/></View>

			{/* Дополнительная информация */}
			{hrShort}
			{this.renderHeader('Дополнительная информация')}
			<View style={[styles.row, { justifyContent: 'space-around', marginHorizontal: 20, marginBottom: 18 }]}>
				<View style={{
					flexDirection: 'row'
				}}>
					<View style={{margin: 0}}>
					<IconD
						name='clock'
						color={'#dcc49c'}
						size={30} /></View>
					<View style={{flexDirection: 'column', justifyContent: 'flex-start', marginLeft: 15}}>
						<Text style={{ color: '#dcc49c', fontSize: 11, height: 15 }}>{'Время работы\n'}</Text>
						<Text style={{ color: '#ffffff', fontSize: 11, }}>{this.state.data.time}</Text>
					</View>
				</View>
				<View style={{
					flexDirection: 'row'
				}}>
					<View style={{ marginHorizontal: 15 }}>
						<IconD
							name='coins'
							color={'#dcc49c'}
							size={30} /></View>
					<View style={{ flexDirection: 'column', justifyContent: 'flex-start', }}>
						<Text style={{ color: '#dcc49c', fontSize: 11, height: 15 }}>{'Средний счет\n'}</Text>
						<Text style={{ color: '#ffffff', fontSize: 11, }}>{this.state.data.averageBill.toString() + ' ₽'}</Text>
					</View>
				</View>
			</View>
			{hrShort}
			

			{/* Сайт ресторана */}
			{this.renderHeader('Сайт ресторана')}

			<View style={[styles.row, { justifyContent: 'flex-start', marginHorizontal: 20, marginBottom: 25 }]}>
				<View style={{
					flexDirection: 'row'
				}}>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(this.state.data.web)
						}>
						<View style={{
							flexDirection: 'row',
							alignSelf: 'center',
							marginLeft: 20,
						}}>
							<Icon
								name='ios-globe-outline'
								color={'#dcc49c'}
								style={{}}
								size={30} />
							<View style={{
								borderBottomWidth: 1,
								marginLeft: 20,
								//backgroundColor: 'red',
								//height: 15,
								top: -3,
								alignSelf: 'center',
								borderColor: '#dcc49c'
							}}><Text
								style={{
									color: '#dcc49c',
									alignSelf: 'center',
									fontSize: 14,
								}}>
								{this.state.data.web}
							</Text></View>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{height: 60}}/>
		</ScrollView>
			<View pointerEvents='none' style={{
				height: 60,
				position: 'absolute',
				bottom: 0,
				width: viewportWidth
			}}>
				<LinearGradient colors={['rgba(39, 40, 48, 0)', 'rgba(39, 40, 48, 1)']} style={{
					flex: 1
				}} /></View></View>;

		return restaurant;
	}

	/**
	 * @param {String} title – текст заголовка
	 */
	renderHeader = (title) => {
		return <View style={[styles.row, { justifyContent: 'flex-start', marginVertical: 14, marginLeft: 15 }]}>
			<Text style={{ color: '#FFF', fontSize: 16, letterSpacing: 0.8, marginLeft: 15, fontFamily: 'stem-medium', }}>{title}</Text>
		</View>
	}

	renderIcon = (name, tab) => {
		if (!IconD)
			return <View />;
		return (<TouchableOpacity
			onPress={() => this.setState({ selectedTab: tab })}>
			<View>
				<IconD
					size={25}
					name={name}
					color={'#e1c79b'}
				/>
			</View>
		</TouchableOpacity>);
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
		elevation: -10,
		backgroundColor: 'rgb( 39, 40, 51)',
	},
});