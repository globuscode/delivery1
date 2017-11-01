import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Platform,
	Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Drawer from 'react-native-drawer'
import Picker from "../Picker";
import { LinearGradient } from 'expo';
import TabNavigator from 'react-native-tab-navigator';

import RestouransOfTheWeek from '../Main/RestouransOfTheWeek';

const shadowOpt = {
	width: 180,
	height: 170,
	color: "#000",
	border: 10,
	radius: 10,
	opacity: 0.2,
	x: 0,
	y: 3,
	style: { marginVertical: 5 }
}
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class AllRestourans extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			types: [
				'Все кухни',
				'Армянская',
				'Американская',
				'Итальянская',
				'Русская',
				'Армянская',
				'Американская',
				'Итальянская',
				'Русская',
			],
			selectedType: 0
		}
	}

	componentDidMount() {
	}

	render() {
		//ios - contact - outline
		return (<Drawer
			ref={(ref) => this._drawer = ref}
			content={(<View style={{
					height: 330,
					backgroundColor: 'rgb(39, 40, 48)',
					width: viewportWidth,
					borderTopWidth: 1,
					borderColor: '#dcc49c'
					}}>
					<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
					<TouchableOpacity onPress={() => {
						this.selectedType = 0;
						this._drawer.close();
						}} style={{ padding: 10 }}>
						<Text style={{ color: '#dcc49c', fontSize: 18 }}>{'Отмена'}</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {
						this.selectedType = 0;
						this.setState({selectedType: this.state.preSelectedType})
						this._drawer.close();
					}} style={{ padding: 10 }}><Text style={{ color: '#dcc49c', fontSize: 18 }}>{'Далее'}</Text></TouchableOpacity>
					</View>
				<Picker
					height={200}
					backgroundColor='rgb(39, 40, 48)'
					itemStyle={{ color: "#dcc49c", fontSize: 30 }}
					data={this.state.types}
					onValueChange={(index) => { this.state.preSelectedType = index }}/>
				</View>)}
			side='bottom'
			openDrawerOffset={viewportHeight - 340}
			type='overlay'
			captureGestures={false}
			>
			<View style={styles.container}>
				<View style={{
					flexDirection: 'row',
					alignSelf: 'center',
					alignItems: 'center',
					justifyContent: 'center',
					margin: 20,
					marginBottom: 0,
					width: viewportWidth - 40,
					paddingVertical: 20,
					borderBottomWidth: 1,
					borderColor: 'rgb(119, 122, 136)'
				}}>
					<TouchableOpacity>
						<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
							<Text style={{
								color: 'white',
								fontWeight: 'bold',
								flexDirection: 'row',
								fontSize: 18
							}}>
								{'Рестораны города Москва'}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				
				<ScrollView contentContainerStyle={{width: viewportWidth}}>

					<Text style={{ fontSize: 10, color: '#dcc49c', textAlign: 'center', marginTop: 10 }}>{'Тип кухни'}</Text>
					<View style={{
						width: viewportWidth - 40,
						marginBottom: 20,
						padding: 5,
						alignSelf: 'center',
						flexDirection: 'row',
						justifyContent: 'center',
						borderBottomWidth: 1,
						borderColor: '#dcc49c'
					}}>
						<TouchableOpacity onPress={() => this._drawer.open()} style={{ flexDirection: 'row' }}>
							<Text style={{ fontSize: 18, color: '#ffffff' }}>{this.state.types[this.state.selectedType] + ' '}</Text>
							<Icon name='ios-arrow-down' color='#ffffff' size={18}/>
						</TouchableOpacity>
					</View>

					<RestouransOfTheWeek navigation={this.props.navigation}/>
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

					
			</View></Drawer>
		);
	}
};


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