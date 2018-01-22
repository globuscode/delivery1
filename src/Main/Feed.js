import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	AsyncStorage,
	Dimensions,
	ScrollView,
	Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Recomendations from './Recomendations';
import RestouransOfTheWeek from './RestouransOfTheWeek';
import Collections from './Collections';
import { connect } from 'react-redux';
import Storage from '../Reducers';



import IconD from '../IconD';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			canNav: true,
			"plates": null,
			"popular": null,
			"collections": null,
			"restaurants": null,
		}
	}

	componentWillMount = () => {
		if (this.props.recomendations) {
			if (this.props.recomendations.plates != [])
				this.state.plates = this.props.recomendations.plates;
			if (this.props.recomendations.popular != [])
				this.state.popular = this.props.recomendations.popular;
			if (this.props.recomendations.collections != [])
				this.state.collections = this.props.recomendations.collections;
			if (this.props.recomendations.restaurants != [])
				this.state.restaurants = this.props.recomendations.restaurants;
			this.setState({});
		}
	}

	componentDidMount() {
	}

	renderCardHeader = (title, icon, settingsText, nav) => {
		return (
			<View style={{
				flexDirection: 'row',
				alignSelf: 'stretch',
				justifyContent: 'space-between',
				marginHorizontal: 20,
				marginBottom: 0,
				marginTop: 9,
				alignItems: 'center'
			}}>
				<Text style={{
					marginLeft: 10,
					letterSpacing: 0.8,
					color: 'white',
					fontFamily: 'stem-medium',
					fontSize: 16
				}}>{title}</Text>

				<TouchableOpacity onPress={() => {
					if (this.state.canNav) {
						this.props.navigation.navigate(nav);
     				this.state.canNav = false;
						setTimeout(() => {
							this.state.canNav = true;
						}, 1500);
 			   }
				}}>
					<View style={{
						flexDirection: 'row',
						alignItems: 'center'
					}}>
						<View style={{ top: -3 }}><IconD name={icon} size={20} color='#dcc49c' /></View>
						<Text style={{
							marginLeft: 8.3,
							fontFamily: 'stem-medium',
							letterSpacing: 0.4,
							color: '#dcc49c',
							fontSize: 11,
						}}>{settingsText}</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	changeTab = (tab) => {
		this.props.changeTab(tab);
	}
	componentWillReceiveProps = (newProps) => {
		this.props = newProps;
		this.setState({});
	  }

	render() {
		/*Storage.subscribe(() => {
			this.setState({});
		});*/
		const isAuth = Object.keys(this.props.userData).length != 0;
		return (
			<View style={styles.container}>
				<View style={{
					flexDirection: 'row',
					alignSelf: 'stretch',
					alignContent: 'center',
					alignItems: 'center',
					justifyContent: 'space-between',
					margin: 20,
					marginBottom: 0,
					paddingVertical: 5,
					borderBottomWidth: 1,
					borderColor: 'rgb(119, 122, 136)'
				}}>
					<TouchableOpacity onPress={() => {
					if (this.state.canNav) {
						if (!isAuth)
							this.props.navigation.navigate('Login');
						else
							this.props.navigation.navigate('Profile');
     					this.state.canNav = false;
						setTimeout(() => {
							this.state.canNav = true;
						}, 1500);
					}
					}}>
						<View style={{
							flexDirection: 'row', alignItems: 'center'
						}}>
							<IconD name='contact' color='#dcc49c' size={30} />
							<View style={{ marginLeft: 10 }}>
								<Text style={{
									color: 'white',
									fontWeight: 'bold',
									flexDirection: 'row',
									fontSize: 14
								}}>
									{!isAuth ? 'Личный кабинет' : (this.props.userData.user.firstName + ' ' + this.props.userData.user.lastName)}
								</Text>
								<Text style={{
									color: 'rgb(119, 122, 136)',
									fontWeight: 'bold',
									flexDirection: 'row',
									fontSize: 10
								}}>
									{isAuth ? 'Личный кабинет' : 'Войдите или зарегистрируйтесь'}
								</Text>
							</View>
						</View>
					</TouchableOpacity>
					{/*<TouchableOpacity style={{width: 30, justifyContent: 'center'}}><IconD name='find' color='#dcc49c' size={15} /></TouchableOpacity>*/}
				</View>
				<ScrollView ref='scroll'  horizontal={false}>

					{this.renderCardHeader('Рекомендуем', 'cutlery', 'Изменить\nсвои вкусы', 'SelectTags')}
					<Recomendations data={this.state.plates} navigation={this.props.navigation} onNextButtonPress={() => { this.refs['scroll'].scrollTo({ y: 580, animated: true })}}/>

					{/*this.renderCardHeader('Подборки', 'settings', 'Настроить\nподборки', 'SelectTastes')
					<Collections data={this.state.collections} onNextButtonPress={() => { this.refs['scroll'].scrollTo({ y: 1130, animated: true }) }}/>*/}

					{this.renderCardHeader('Рестораны недели', 'look-all', 'Смотреть \nвсе', 'AllRestourans')}
					<RestouransOfTheWeek data={this.state.restaurants} navigation={this.props.navigation} />
					<View style={{ height: 20 }} />
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
			</View>
		);
	}
};

export default connect(
	state => ({
	  userData: state.user,
	  recomendations: state.recomendations
	}),
	dispatch => ({
	})
  )(Feed);


const styles = StyleSheet.create({
	backgroundImage: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover'
	},
	text: {
		color: 'white',
		fontSize: 20,
	},
	container: {
		flex: 1,
		elevation: -10,
		paddingTop: 0,
		backgroundColor: '#292b37',
		paddingBottom: 0,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
});