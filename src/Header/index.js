import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text } from 'react-native';

const Header = ({ taskData: { score } }) => (
    <View style={ styles.container }>
        <Text style={ styles.text }>
            Points: { score }
        </Text>
    </View>
);

const mapStateToProps = state => ({
    taskData: state.taskData,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'steelblue',
    },
});

export default connect(mapStateToProps)(Header);
