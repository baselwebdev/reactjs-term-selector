import { Store, createStore } from 'redux';
import { ApplicationState, createRootReducer } from './index';

export default function configureStore(initialState: ApplicationState): Store<ApplicationState> {
    // We'll create our store with the combined reducers/sagas, and the initial Redux state that
    // we'll be passing from our entry point.
    const store = createStore(createRootReducer(), initialState);

    return store;
}
