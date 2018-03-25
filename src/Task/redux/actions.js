import { createAction } from 'redux-actions';

import randomizeArray from '../../utils';

export const selectNextTask = createAction("SELECT_NEXT_TASK");
export const countScore = createAction("COUNT_SCORE");

export default {
    selectNextTask,
    countScore,

    fetchTasks: () => dispatch => {
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
