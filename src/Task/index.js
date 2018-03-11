import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, ActivityIndicator } from 'react-native';

import randomizeArray from '../utils';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            loading: true,
            insertedValue: "",
        };

        this.onTextInsert = this.onTextInsert.bind(this);
    }

    componentDidMount() {
        fetch("https://raw.githubusercontent.com/FlyingCarpets/quiz-react/master/assets/data/questions.json")
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    tasks: randomizeArray(responseJson),
                    loading: false,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    onTextInsert(text) {
        this.setState({
            insertedValue: text,
        });
    }

    render() {
        const {
            tasks,
            loading,
            insertedValue,
        } = this.state;

        if (loading) {
            return (
                <View style={ styles.container }>
                    <ActivityIndicator size="large" color="steelblue" />
                </View>
            );
        }

        return (
            <View style={ styles.container }>
                <Text>What is this instrument called?</Text>
                <Image
                    source={{ uri: tasks[0].image }}
                    style={ styles.image }
                />
                <TextInput
                    onChangeText={ this.onTextInsert }
                    value={ insertedValue }
                    placeholder="Answer"
                    style={ styles.input }
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d1d1d1',
    },
    image: {
        width: 200,
        height: 200,
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
    },
});

export default Task;
