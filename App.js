import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './src/Header';
import Task from './src/Task';

const App = () => (
    <View style={ styles.container }>
        <Header />
        <Task />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
