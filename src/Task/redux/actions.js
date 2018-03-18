import randomizeArray from '../../utils';

function selectNextTask () {
    return {
        type: "SELECT_NEXT_TASK",
        payload: {}
    }
}

// function countScore() {
//     return {
//         type: "COUNT_SCORE",
//         payload: 1
//     }
// }

export default {
    selectNextTask,

    fetchTasks() {
        return function (dispatch) {
            dispatch({ type: "BEFORE_FETCH_TASKS" });

            fetch("https://raw.githubusercontent.com/FlyingCarpets/quiz-react/master/assets/data/questions.json")
                .then(response => response.json())
                .then(responseJson => {
                    dispatch({ type: "FETCH_TASKS", payload: randomizeArray(responseJson) });
                })
                .then(() => {
                    dispatch({ type: "SELECT_CURRENT_TASK" });
                    dispatch({ type: "AFTER_FETCH_TASKS" });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}
