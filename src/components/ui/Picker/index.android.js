import React from 'react';
import {
	WebView,
	View,
	Text,
	Dimensions,
	Animated,
	StyleSheet,
	Easing
} from 'react-native';

const xOffset = new Animated.Value(0);
const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: xOffset } } }]);

import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function rotateTransform(index) {
	return {
		transform: [{
			rotateX: xOffset.interpolate({
				inputRange: [
					(index - 1) * 250,
					index * 250,
					(index + 1) * 250
				],
				outputRange: ['-30deg', '0deg', '30deg'],
			})
		}]
	};
}

viewportHeight = 250;

export default class GLExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: this.props.data,
			itemHeight: 70,
			angles: [],
		};
		this.state.angles = this.state.data.map((e, i) => 0);
		this.state.selected = props.selectedValue;
	}
/*
	transform: [
		{ rotateX: this.state.angles[index].toString()+'deg'
},
	],*/
	_renderItem = ({ item, index }) => {
		var angle = (Math.abs(index - this.state.selected) > 3) ? 90 : (-(index - this.state.selected) * 30);
		this.state.angles[index] = angle;
		return <Animated.View >
				<Text style={[{ 
					textAlign: 'center',
			}, this.props.itemStyle]}>
						{item}
				</Text>
		</Animated.View>
	}

	render() {
		return <View style={{
			width: viewportWidth,
			height: this.props.height ? this.props.height : viewportHeight,
			backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : 'rgb( 45, 46, 58)',
		}}>
			<Carousel
				horizontal={false}
				vertical
				ref={(c) => { this._carousel = c; }}
				data={this.state.data}
				slideStyle={{
					height: this.state.itemHeight,
					justifyContent: 'center',
				}}
				onScroll={onScroll}
				firstItem={this.state.selected}
				shouldOptimizeUpdates={false}
				renderItem={this._renderItem}
				lockScrollWhileSnapping
				swipeThreshold={0}
				sliderHeight={this.props.height ? this.props.height : viewportHeight}
				itemHeight={this.state.itemHeight}
				onSnapToItem={(slideIndex) => { this.props.onValueChange(slideIndex); this.setState({selected: slideIndex})}}
			/>

			<View style={{
				backgroundColor: 'rgba(0,0,0,0)',
				borderTopWidth: 1,
				borderBottomWidth: 1,
				borderColor: '#dcc49c',
				height: this.state.itemHeight,
				width: viewportWidth,
				position: 'absolute',
				top: this.props.height ? this.props.height : viewportHeight  / 2 - this.state.itemHeight/2,
			}} />
		</View>;
	}
}

var styles = StyleSheet.create({
	container: {
		flex: 1
	},
	box: {
		backgroundColor: 'red',
		position: 'absolute',
		top: 100,
		left: 100,
		width: 100,
		height: 100
	}
});