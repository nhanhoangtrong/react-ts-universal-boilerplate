declare type TodoFilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

declare type TodoItemState = ITodoItem[];

/* Declare Global state */
declare interface GlobalState {
    filter?: TodoFilterType;
    isLoading?: boolean;
}
