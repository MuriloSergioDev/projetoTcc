import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styles from './styles'

type Props = {
    label?: string
    color?: string
    underlayColor?: string
    textColor?: string
    borderColor?: string
    onPress?: any,
    children?: ReactNode
}

const ButtonMenu = ({ label, color, underlayColor, textColor, borderColor, onPress, children }: Props) => {

    return (
        <TouchableHighlight
            underlayColor={underlayColor}
            onPress={onPress}
            style={[
                styles.container,
                { backgroundColor: color, borderColor: borderColor }]}>

            <View style={styles.viewBox}>
                {children}
                <Text style={[styles.text, { color: textColor }]}>{label}</Text>
            </View>

        </TouchableHighlight>
    );

}

export default ButtonMenu;


