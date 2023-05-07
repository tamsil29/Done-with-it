import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';

interface Props{
    label: string;
    onPress: React.Dispatch<any>
}

function PickerItem({label, onPress}: Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppText style={styles.text}>{label}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text:{
        padding: 20
    }
})

export default PickerItem;