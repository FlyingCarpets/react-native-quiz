const initialState = {
    tasks: [],
    currentTask: "",
    score: 0,
    loading: false
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case "BEFORE_FETCH_TASKS": {
            return {
                ...state,
                loading: true
            };
        }
        case "FETCH_TASKS": {
            return {
                ...state,
                tasks: state.tasks.concat(action.payload),
            };
        }
        case "SELECT_CURRENT_TASK": {
            return {
                ...state,
                currentTask: state.tasks[0]
            };
        }
        case "AFTER_FETCH_TASKS": {
            return {
                ...state, loading: false
            };
        }
        case "SELECT_NEXT_TASK": {
            let currentTaskIndex = state.tasks.indexOf(state.currentTask);

            if (currentTaskIndex+1 < state.tasks.length) {
                return {
                    ...state,
                    currentTask: state.tasks[currentTaskIndex+1]
                };
            } else {
                return {
                    ...state,
                    currentTask: "finish"
                };
            }
        }
        case "COUNT_SCORE": {
            return {
                ...state,
                score: state.score + 1
            }
        }
    }
    return state;
};

export default taskReducer;
