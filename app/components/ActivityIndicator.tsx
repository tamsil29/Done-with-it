import React from 'react';
import { View, StyleSheet } from 'react-native'
import AnimatedLottieView from 'lottie-react-native';

function ActivityIndicator({visible}: {visible: boolean}){
    if(!visible) return <></>
    return (
       <AnimatedLottieView source={require('../assets/animations/done.json')} autoPlay loop/>
    );
}

const styles = StyleSheet.create({
    container: {}
})

export default ActivityIndicator;