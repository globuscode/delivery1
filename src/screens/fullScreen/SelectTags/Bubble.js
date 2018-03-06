import React from 'react';
import { View, Text, WebView } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default class Bubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pressed: this.props.pressed,
            margin: Math.random()*10*(Math.random() < 0.5 ? -1 : 1),
        };
    }

    componentWillReceiveProps = (newProps) => {
        this.setState({ pressed: newProps.pressed });
    }

    render = () => {
        let bubbleIcon = `<div
            style="
                background-color: ${this.state.pressed ? "#292b37" : 'rgb(225, 199, 155)'};
                width: 100%; height: 100%;
                -webkit-mask: url(http:${this.props.icon}) no-repeat center; 
                mask: url(http:${this.props.icon}) no-repeat center; 
                mask-position: center; 
                -webkit-mask-position: center; 
                justify-content: center; 
                align-self: center; 
                align-items: center;"
        />`;
        return <Touchable 
        background={Touchable.SelectableBackground()}
        onPress={() => {
            this.setState({ pressed: !this.state.pressed });
            if (this.props.onPress != undefined)
                this.props.onPress();
        }}
        style={{
            width: 100,
            height: 100,
            margin: 15,
            //marginHorizontal: Math.random()*30+10,
            top: this.state.margin,
            left: this.state.margin,
            borderRadius: 50,
            backgroundColor: this.state.pressed ? 'rgb(225, 199, 155)' : 'transparent',
            borderColor: 'rgb(225, 199, 155)',
            borderWidth: 1.5,
            justifyContent: 'center'
        }}>
            <View style={{
                position: 'absolute',
                width: 100,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                {this.props.icon == '' ? null : 
                <WebView
                    bounces={false}
                    scrollEnabled={false}
                    source={{ html: bubbleIcon }}
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: 'transparent'
                    }}
                />}
                <Text style={{
                    color: this.state.pressed ? "#292b37" : 'rgb(225, 199, 155)',
                    top: this.props.icon == '' ? 0 : -20
                }}>{this.props.title}</Text>
            </View>
        </Touchable>
    }
}
