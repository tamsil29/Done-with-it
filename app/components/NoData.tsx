import React from 'react';
import { View, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../config/colors';
import AppText from './AppText';

interface Props{
    value?: string;
    content?: string;
    isLoading?: boolean;
}

function NoData({value = 'data', content, isLoading}: Props) {
    if(isLoading) return null;
    return (
       <View style={styles.container}>
            <MaterialCommunityIcons name='cloud-alert' color={colors.primary} size={80}/>
            {content ? <AppText>{content}</AppText> : <AppText>No {value} found!</AppText>}
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default NoData;