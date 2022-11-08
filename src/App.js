import React from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import AppRouter from './Routes/Router';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
import Loader from './components/shared/loader';

const history = createBrowserHistory();
history.listen((location, action) => {
    window.scrollTo(0, 0)
})

function App() {
    return (
        <>
            <Loader />
            <ToastContainer autoClose={true} />
            <AppRouter />
        </>
    );
}

export default App;