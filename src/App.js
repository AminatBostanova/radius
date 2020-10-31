
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter, useHistory } from "react-router-dom"
import store from "./store"
import Routes from './routes'
import  Header  from './components/NavBar'
import Footer from './components/Footer';


function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header/>
        <Routes/>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}
export default App;
