import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { TextField } from "react-native-material-textfield";
import { TextInputMask } from 'react-native-masked-text';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Touchable from "react-native-platform-touchable";
import { connect } from "react-redux";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
    "window"
);

const screen =
viewportWidth >= 320 && viewportWidth < 375
  ? 0
  : viewportWidth >= 375 && viewportWidth < 414 ? 1 : 2;

class Forms extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selected: 0,
            firstName: props.user.token ? props.user.user.firstName : "",
            secondName: props.user.token ? props.user.user.secondName : "",
            phone: props.user.token ? props.user.user.phone : "",
            address: {
                street: "",
                house: "",
                flat: "",
                entrance: "",
                floor: "",
                commentary: "",
            }
        };
    }

    isNext = () => {
        if (this.state.firstName === "")
            return 0;
        if (this.state.secondName === "")
            return 0;
        if (this.state.phone === "")
            return 0;
        if (this.state.address.street === "")
            return 0;
        if (this.state.address.house === "")
            return 0;
        if (this.state.address.flat === "")
            return 0;
        if (this.state.address.entrance === "")
            return 0;
        if (this.state.address.floor === "")
            return 0;
        return 1;
    }

    next = () => {
        if (this.isNext())
            this.props.navigation.navigate('MakeOrder', {

            });
    }

    render = () => <KeyboardAwareScrollView behavior='position'>
        <Text style={{
            fontFamily: 'stem-medium',
            fontSize: 16,
            letterSpacing: 0.9,
            textAlign: 'center',
            alignSelf: 'stretch',
            color: '#fff',
            marginTop: screen == 0 ? 20 : screen == 1 ? 36 : 48
        }}>{'Получатель заказа'}</Text>
        <View style={{
            alignSelf: 'stretch',
            marginHorizontal: screen == 0 ? 23 : screen == 1 ? 25 : 30
        }}>
            <TextField
                tintColor="#dcc49c"
                baseColor="rgb(87, 88, 98)"
                textColor="#fff"
                returnKeyType="send"
                style={{
                alignItems: "center",
                alignSelf: 'stretch',
                textAlign: "center"
                }}
                inputContainerStyle={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
                }}
                onChangeText={(text) => this.setState({ firstName: text })}
                value={this.state.firstName}
                label="Имя"
            />
            <TextField
                tintColor="#dcc49c"
                baseColor="rgb(87, 88, 98)"
                textColor="#fff"
                returnKeyType="send"
                style={{
                alignItems: "center",
                alignSelf: 'stretch',
                textAlign: "center"
                }}
                inputContainerStyle={{
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
                }}
                onChangeText={(text) => this.setState({ secondName: text })}
                value={this.state.secondName}
                label="Фамилия"
            />
            <TextInputMask
                    ref={'phone'}
                    type={'custom'}
                    customTextInputProps={{
                        tintColor: '#dcc49c',
                        baseColor: 'rgb( 87, 88, 98)',
                        textColor: 'white',
                        returnKeyType: 'send',
                        keyboardType: 'phone-pad',
                        style: {
                            alignItems: 'center',
                            textAlign: 'center',
                        },
                        inputContainerStyle: {
                            flexDirection: 'column' ,
                            alignItems: 'center',
                            justifyContent: 'center'
                        },
                        label: 'Телефон',
                    }}
                    options={{
                        mask: '+7 999 999 99-99',
                    }}
                    onChangeText={(text) => this.setState({ phone: text })}
                    value={this.state.phone}
                    customTextInput={TextField}
                />
        </View>

        <Text style={{
            fontFamily: 'stem-medium',
            fontSize: 16,
            letterSpacing: 0.9,
            textAlign: 'center',
            alignSelf: 'stretch',
            color: '#fff',
            marginTop: screen == 0 ? 61 : screen == 1 ? 75 : 82
        }}>{'Адрес доставки'}</Text>
        <View style={{
            alignSelf: 'stretch',
            marginHorizontal: screen == 0 ? 23 : screen == 1 ? 25 : 30
        }}>
            <TextField
                tintColor="#dcc49c"
                baseColor="rgb(87, 88, 98)"
                textColor="#fff"
                returnKeyType="send"
                style={{
                    alignItems: "center",
                    alignSelf: 'stretch',
                    textAlign: "center"
                }}
                inputContainerStyle={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onChangeText={(text) => this.setState({address: {street: text}})}
                value={this.state.address.street}
                label="Улица"
            />
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: screen == 0 ? 128 : screen == 1 ? 150 : 165 }}>
                <TextField
                    tintColor="#dcc49c"
                    baseColor="rgb(87, 88, 98)"
                    textColor="#fff"
                    returnKeyType="send"
                    style={{
                        alignItems: "center",
                        textAlign: "center"
                    }}
                    inputContainerStyle={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onChangeText={(text) => this.setState({address: {house: text}})}
                    value={this.state.address.house}
                    label="Дом"
                />
            </View>
            <View style={{width: screen == 0 ? 128 : screen == 1 ? 150 : 165 }}>
                <TextField
                    tintColor="#dcc49c"
                    baseColor="rgb(87, 88, 98)"
                    textColor="#fff"
                    returnKeyType="send"
                    style={{
                        alignItems: "center",
                        alignSelf: 'stretch',
                        textAlign: "center"
                    }}
                    inputContainerStyle={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    keyboardType='numeric'
                    onChangeText={(text) => this.setState({address: {flat: text}})}
                    value={this.state.address.flat}
                    label="Квартира"
                />
            </View>
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{width: screen == 0 ? 128 : screen == 1 ? 150 : 165 }}>
                <TextField
                    tintColor="#dcc49c"
                    baseColor="rgb(87, 88, 98)"
                    textColor="#fff"
                    returnKeyType="send"
                    style={{
                        alignItems: "center",
                        textAlign: "center"
                    }}
                    inputContainerStyle={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    keyboardType='numeric'
                    onChangeText={(text) => this.setState({address: {entrance: text}})}
                    value={this.state.address.entrance}
                    label="Подъезд"
                />
            </View>
            <View style={{width: screen == 0 ? 128 : screen == 1 ? 150 : 165 }}>
                <TextField
                    tintColor="#dcc49c"
                    baseColor="rgb(87, 88, 98)"
                    textColor="#fff"
                    returnKeyType="send"
                    style={{
                        alignItems: "center",
                        alignSelf: 'stretch',
                        textAlign: "center"
                    }}
                    keyboardType='numeric'
                    inputContainerStyle={{
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onChangeText={(text) => this.setState({address: {floor: text}})}
                    value={this.state.address.floor}
                    label="Этаж"
                />
            </View>
            </View>
            <TextField
                tintColor="#dcc49c"
                baseColor="rgb(87, 88, 98)"
                textColor="#fff"
                returnKeyType="send"
                style={{
                    alignItems: "center",
                    alignSelf: 'stretch',
                    textAlign: "center"
                }}
                inputContainerStyle={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onChangeText={(text) => this.setState({address: {commentary: text}})}
                value={this.state.address.commentary}
                label="Код домофона или комментарий"
            />
        </View>


        <Text style={{
            fontFamily: 'stem-medium',
            fontSize: 16,
            letterSpacing: 0.9,
            textAlign: 'center',
            alignSelf: 'stretch',
            color: '#fff',
            marginBottom: screen == 0 ? 20 : screen == 1 ? 36 : 48,
            marginTop: screen == 0 ? 42 : screen == 1 ? 50 : 55
        }}>{'Когда доставить?'}</Text>
        <View style={{
            alignSelf: 'stretch',
            marginHorizontal: screen == 0 ? 23 : screen == 1 ? 25 : 30
        }}>

            <Touchable onPress={() => this.setState({selected: 0})}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: screen == 0 ? 25 : screen == 1 ? 35 : 40
                }}>
                    <View style={{
                        borderWidth: 2,
                        borderColor: 'rgb(225, 199, 155)',
                        padding: 2,
                        width: 17,
                        height: 17,
                    }}><View style={{
                        backgroundColor: this.state.selected == 0 ? 'rgb(225, 199, 155)' : 'transparent',
                        width: 9,
                        height: 9,

                    }}/></View>
                    <Text style={{
                        fontFamily: 'open-sans',
                        color: 'rgb(225, 199, 155)',
                        marginLeft: 10,
                        fontSize: 14
                    }}>{'Как можно скорее'}</Text>
                </View>
            </Touchable>
            
            <Touchable onPress={() => this.setState({selected: 1})}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginBottom: screen == 0 ? 18 : screen == 1 ? 24 : 29, }}>
                    <View style={{
                            borderWidth: 2,
                            borderColor: 'rgb(225, 199, 155)',
                            padding: 2,
                            width: 17,
                            height: 17,
                        }}><View style={{
                            backgroundColor: this.state.selected == 1 ? 'rgb(225, 199, 155)' : 'transparent',
                            width: 9,
                            height: 9,
                            
                        }}/></View>
                    <Text style={{
                        fontFamily: 'open-sans',
                        color: 'rgb(225, 199, 155)',
                        marginLeft: 10,
                        fontSize: 14
                    }}>{'Доставка к  времени:'}</Text>
                </View>
            </Touchable>

            
        </View>
        <View style={{height: 50}}/>
        <View style={{
            position: 'absolute',
            alignSelf: 'center',
            width: viewportWidth - 30,
            bottom: 0,
            height: 49,
            borderTopWidth: 2,
            borderColor: this.isNext() ? '#dcc49c' : '#575862',
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
                width: viewportWidth,
              }}>
              <Text style={[
                {
                    fontSize: 16,
                    alignSelf: 'center',
                    textAlign: 'center',
                    letterSpacing: 0.8,
                    fontFamily: 'stem-regular',
                    color: this.isNext() ? '#dcc49c' : '#575862'
                }
              ]}>Далее</Text>
            </Touchable>
          </View>
    </KeyboardAwareScrollView>
}

export default connect(
    state => ({
      user: state.user,
    }),
    dispatch => ({
      onAddPlate: plate => {
        dispatch({ type: "ADD_PLATE", payload: plate });
      }
    })
  )(Forms);