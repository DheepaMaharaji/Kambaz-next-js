import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import BooleanVariables from "./BooleanVariables";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInline";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import ForLoops from "./ForLoops";
import IfElse from "./IfElse";
import ImpliedReturn from "./ImpliedReturn";
import JsonStringify from "./JsonStringify";
import LegacyFunctions from "./LegacyFunctions";
import MapFunction from "./MapFunction";
import SimpleArrays from "./SimpleArrays";
import TemplateLiterals from "./TemplateLiterals";
import TernaryOperator from "./TernaryOperator";
import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import House from "./House";
import Spreader from "./Spreader";
import Destructing from "./Destructing";
import DestructingImports from "./DestuctingImports";
import Classes from "./Classes";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import TOC from "./TOC";
import PageParameters from "./PageParameters";
import TodoList from "./todos/TodoList";
      

export default function Lab3() {
    console.log('Hello World!');
  return(
    <div id="wd-lab3">
      <TOC />
      <h3>Lab 3</h3>
      <VariablesAndConstants/>
      <VariableTypes/>
      <BooleanVariables/>
      <IfElse/>
      <TernaryOperator/>
      <ConditionalOutputIfElse/>
      <ConditionalOutputInline/>
      <LegacyFunctions/>
      <ImpliedReturn/>
      <TemplateLiterals/>
      <SimpleArrays/>
      <ArrayIndexAndLength/>
      <AddingAndRemovingToFromArrays/>
      <ForLoops/>
      <MapFunction/>
      <FindFunction/>
      <FindIndex/>
      
      <FilterFunction/>
      <JsonStringify/>
      <House />
      <Spreader/>
      <Destructing/>
      <DestructingImports/>
      <Classes/>
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
       <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
     <PageParameters />
     <TodoList />

    </div>
  );
}
