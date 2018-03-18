import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './root-reducer'; //Import the reducer

export default createStore(reducers, applyMiddleware(thunk));
