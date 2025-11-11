"use client";
import store from "./store";
import { Provider } from "react-redux";

import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArraysStateVariable from "./ArraysStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import ReduxExamples from "./ReduxExamples";
export default function Lab4Page() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>

    <div>
      <h1>Lab 4 Page</h1>
     

      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArraysStateVariable />
      <ParentStateComponent />
       <ReduxExamples/>
    </div>
    </Provider>
  );
}