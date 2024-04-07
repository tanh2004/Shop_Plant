import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from "./Reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST, PURGE,
    REGISTER,
    persistReducer,
} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    app: appReducer,
});

//Khởi tạo persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddeware) =>
    getDefaultMiddeware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export const persistor = persistStore(store);