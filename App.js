import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';

import store from './store/store';
import Header from './src/Header';
import Task from './src/Task';

const App = () => (
    <Provider store={ store }>
        <View style={ styles.container }>
            <Header />
            <Task />
        </View>
    </Provider>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
