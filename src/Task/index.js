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
        const {
            actions,
        } = this.props;

        actions.task.fetchTasks();
    }

    onTextInsert(text) {
        this.setState({
            insertedValue: text,
        });
    }

    onSubmit() {
        const {
            insertedValue,
        } = this.state;

        const {
            taskData: {
                currentTask,
            },
            actions,
        } = this.props;

        if (insertedValue.toLowerCase() === currentTask.answer) {
            actions.task.selectNextTask();
            actions.task.countScore();
        }

        this.setState({
            insertedValue: '',
        });
    }

    renderTask() {
        const {
            insertedValue,
        } = this.state;

        const {
            taskData: {
                currentTask,
            },
        } = this.props;

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
            taskData: {
                currentTask,
                loading,
            },
        } = this.props;

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

const mapStateToProps = state => ({
    taskData: state.taskData,
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Task);
