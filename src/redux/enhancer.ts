import thunkMiddleware from 'redux-thunk';
import { compose, applyMiddleware } from 'redux';

export default applyMiddleware.bind(null, thunkMiddleware);
