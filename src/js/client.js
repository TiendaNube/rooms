import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Route } from 'react-router-dom'

import Layout from "./components/Layout"
import store from "./store"
import './index.css'
import './App.css'
const app = document.querySelector('#app')


ReactDOM.render((<Provider store={store}>
    <BrowserRouter>
      <Route path="/:room?" component={Layout}/>
    </BrowserRouter></Provider>
  ), app);
