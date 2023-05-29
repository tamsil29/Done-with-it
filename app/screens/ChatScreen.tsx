import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';

function ChatScreen() {
    const navigation = useNavigation();
    useEffect(()=>{
      navigation.setOptions({tabBarVisible: false});
    },[])
    return (
       <View style={styles.container}></View>
    );
}

const styles = StyleSheet.create({
    container: {}
})

export default ChatScreen;