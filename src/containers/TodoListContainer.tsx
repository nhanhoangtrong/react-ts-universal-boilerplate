import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootDispatch } from '../redux';
import { addTodo } from '../redux/actions/todos';
import TodoList from '../components/TodoList';

const mapDispatchToProps = (dispatch: RootDispatch) => {
    return {
        addTodo: bindActionCreators(addTodo, dispatch),
    };
};

export default connect(null, mapDispatchToProps)(TodoList) as any;
