/* Declare TodoItem model */
declare interface TodoItemData {
    id?: TodoItemId;
    text?: string;
    completed?: boolean;
}

declare type TodoItemId = string;

declare type TodoFilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

declare type TodoStoreState = TodoItemData[];

/* Declare Global state */
declare interface GlobalState {
    filter?: TodoFilterType;
    isLoading?: boolean;
}

declare type GlobalStoreState = GlobalState;
