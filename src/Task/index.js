import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTasks } from './redux/actions';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    ActivityIndicator,
    Button
} from 'react-native';

import taskActions from './redux/actions';
import randomizeArray from '../utils';

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            currentTask: null,
            loading: true,
            insertedValue: "",
        };

        this.onTextInsert = this.onTextInsert.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.renderTask = this.renderTask.bind(this);
        this.renderFinish = this.renderFinish.bind(this);
    }

    componentDidMount() {
        fetch("https://raw.githubusercontent.com/FlyingCarpets/quiz-react/master/assets/data/questions.json")
            .then((response) => response.json())
            .then((responseJson) => {

                const taskList = randomizeArray(responseJson);

                this.setState({
                    tasks: taskList,
                    loading: false,
                    currentTask: taskList[0],
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

    onSubmit() {
        const {
            tasks,
            currentTask,
            insertedValue,
        } = this.state;

        if (insertedValue.toLowerCase() === currentTask.answer) {
            const currentTaskIndex = tasks.indexOf(currentTask);

            if (currentTaskIndex+1 < tasks.length) {
                this.setState({
                    currentTask: tasks[currentTaskIndex+1],
                    insertedValue: '',
                });
            } else {
                this.setState({
                    currentTask: 'finish',
                });
            }
        } else {
            this.setState({
                insertedValue: '',
            });
        }
    }

    renderTask() {
        const {
            currentTask,
            insertedValue,
        } = this.state;

        return (
            <View>
                <Text>What is this instrument called?</Text>
                <Image
                    source={{ uri: currentTask.image }}
                    style={ styles.image }
                />
                <TextInput
                    onChangeText={ this.onTextInsert }
                    value={ insertedValue }
                    placeholder="Answer"
                    style={ styles.input }
                />
                <Button
                    onPress={ this.onSubmit }
                    title="Submit"
                    color="blue"
                    accessibilityLabel="Submit"
                />
            </View>
        );
    }

    renderFinish() {
        return (
            <View>
                <Text>The End</Text>
            </View>
        );
    }

    render() {
        const {
            currentTask,
            loading,
        } = this.state;

        const tasksAvaiable = currentTask !== 'finish';

        if (loading) {
            return (
                <View style={ styles.container }>
                    <ActivityIndicator size="large" color="steelblue" />
                </View>
            );
        }

        return (
            <View style={ styles.container }>
                { tasksAvaiable
                    ? this.renderTask()
                    : this.renderFinish()
                }
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    actions: {
        task: bindActionCreators(taskActions, dispatch),
    },
});

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

export default connect(null, mapDispatchToProps)(Task);
