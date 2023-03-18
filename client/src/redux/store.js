// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './root-reducer';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const middlewares = [thunk];

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const pReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(
//   pReducer,
//   composeWithDevTools(applyMiddleware(...middlewares))
// );
// let persistor = persistStore(store);

// export { store, persistor };