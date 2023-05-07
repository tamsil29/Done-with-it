import React from 'react';
import AppText from "../AppText";
import { StyleSheet } from 'react-native'

interface Props{
    error: string | any
    visible: boolean | any
}

function ErrorMessage({error,visible}: Props) {
    if(!visible || !error) return null
    return (
        <AppText style={styles.error}>{error}</AppText>
    );
}

const styles = StyleSheet.create({
    error:{ color: "red" }
})

export default ErrorMessage;