import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import LayoutCalendar from "./components/LayoutCalendar"
import store from "./store"
const calendarApp = document.querySelector('#calendar-app')


ReactDOM.render((<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/:room" component={LayoutCalendar}/>
      </Switch>
    </BrowserRouter>
    </Provider>
), calendarApp);
