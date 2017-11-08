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
import {Badge} from 'react-native-elements';
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
	navigationOptions = {
		title: 'Home',
	};

	constructor(props) {
		super(props);
		this.state = {
			pressed: this.props.pressed ? this.props.pressed : false,
			value: this.props.value,
			count: this.props.count ? this.props.count : 0
		};
	};


	/**
	 * Возвращает кнопку с ценой
	 * @param {Number} price 
	 */
	render = () => {
		const screen = (viewportWidth >= 320 && viewportWidth < 375) ? 0 : (viewportWidth >= 375 && viewportWidth < 414) ? 1 : 2;
		return <TouchableOpacity onPress={this.props.onPress} onPressOut={() => this.setState({ pressed: true })}>
			<View style={{
				flexDirection: 'row',
				alignSelf: 'flex-start',
				//width: 100,
				borderWidth: 1,
				height: (viewportWidth >= 320 && viewportWidth < 375) ? 28 : (viewportWidth >= 375 && viewportWidth < 414) ? 30 : 34,
				borderRadius: 5,
				alignItems: 'center',
				justifyContent: 'center',
				alignContent: 'center',
				borderColor:  '#dcc49c',
				flexDirection: 'row',
				minWidth: (viewportWidth >= 320 && viewportWidth < 375) ? 89 : (viewportWidth >= 375 && viewportWidth < 414) ? 97 : 104,
				backgroundColor: this.state.pressed ? '#dcc49c' : 'transparent',
			}}>
				<View style={{}}><IconD 
					name='cart' 
					size={(viewportWidth >= 320 && viewportWidth < 375) ? 12 : (viewportWidth >= 375 && viewportWidth < 414) ? 12 : 12} 
					color={!this.state.pressed ? '#dcc49c' : '#292b37'} /></View>
				<Text style={{
					top: Platform.OS === 'ios' ? 3 : 0,
					fontSize: (viewportWidth >= 320 && viewportWidth < 375) ? 14 : (viewportWidth >= 375 && viewportWidth < 414) ? 14 : 16,
					marginLeft: 5,
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'center',
					fontFamily: 'stem-medium',
					color: !this.state.pressed ? '#fff' : '#292b37',
				}}>
					{this.state.value + ' ₽'}</Text>
			</View>
			{this.state.count ==0 ? null :
			<Badge
				value={this.state.count}
				wrapperStyle={{
					right: -8,
					top: -3,

					position: 'absolute'
				}}
				textStyle={{ color: 'orange' }}
				/>}
		</TouchableOpacity>;
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