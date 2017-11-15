import React from 'react';
import {
	View,
	TouchableOpacity,
	Dimensions,
	StyleSheet,
	ScrollView,
	Image,
	Platform,
	WebView,
	Linking,
	Text
} from 'react-native';
import { Badge } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {
	LinearGradient,
	Constants
} from 'expo';
import Accordion from 'react-native-collapsible/Accordion';


import IconD from './IconD';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const hr = <View style={{ alignSelf: 'stretch', margin: 20, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;
const hrShort = <View style={{ alignSelf: 'stretch', margin: 10, marginHorizontal: 20, height: 1, backgroundColor: 'rgb(87, 88, 98)' }} />;



export default class Price extends React.Component {
	constructor(props) {
		super(props);
	};


	/**
	 * Возвращает кнопку с ценой
	 * @param {Number} price 
	 */
	render = () => {
		const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;
		return <View style={{
			width: screen == 0 ? 89 : screen == 1 ? 97 : 104,
			height: screen == 0 ? 28 : screen == 1 ? 30 : 34,

			flexDirection: 'row',
			justifyContent: 'space-between',
			alignContent: 'center',
			alignItems: 'center',

			borderColor: '#e1c79b',
			borderWidth: 1.5,
			borderRadius: 4
		}}>
			<TouchableOpacity onPress={this.props.onRemovePress}><Icon name='ios-remove-outline' size={25} color='#777a88' style={{
				paddingHorizontal: 5,
				backgroundColor: 'transparent'
			}}/></TouchableOpacity>
			<Text style={{
				color: '#fff',
				fontFamily: 'stem-medium',
				top: Platform.OS === 'ios' ? 3 : 0,
				fontSize: 14,
				textAlign: 'center',
			}}>{this.props.value}</Text>
			<TouchableOpacity onPress={this.props.onAddPress}><Icon name='ios-add-outline' size={25} color='#777a88' style={{
				paddingHorizontal: 5,
				backgroundColor: 'transparent'
			}}/></TouchableOpacity>
			</View>;
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
		backgroundColor: '#292b37',
	},
});