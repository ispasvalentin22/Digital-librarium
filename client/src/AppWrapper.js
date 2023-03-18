import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import articleReducer from './redux/article/article.reducer';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import storage from 'redux-persist/lib/storage';
import rootReducer from './redux/root-reducer';

const persistConfig = {
  key: 'root',
  storage,
}

const pReducer = persistReducer(persistConfig, rootReducer);

const AppWrapper = () => {
  const store = configureStore({
    reducer: pReducer
  });

  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <App />
      </PersistGate>
    </Provider>
  )
}

export default AppWrapper;