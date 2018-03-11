import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Header = () => (
    <View style={ styles.container }>
        <Text style={ styles.text }>Points: </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'steelblue',
    },
});

export default Header;
