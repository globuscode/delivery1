import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import fontelloConfig from '../assets/icons/selection.json';
import { Font } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';

var IconD;

Font.loadAsync({
	'FontName': require('../assets/icons/fonts/icomoon.ttf')
});

export default createIconSetFromIcoMoon(fontelloConfig, 'FontName');
