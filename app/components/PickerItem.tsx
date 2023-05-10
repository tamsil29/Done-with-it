import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';

interface Props{
    item: any;
    onPress: React.Dispatch<any>
}

function PickerItem({item, onPress}: Props) {
    return (
        <TouchableOpacity onPress={onPress}>
            <AppText style={styles.text}>{item?.label}</AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text:{
        padding: 20
    }
})

export default PickerItem;