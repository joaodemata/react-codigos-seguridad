import {UseState} from './use_state.js'
import {ClassState}  from './class_state.js'
import { UseReducer } from './user_reducer.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState"/> 
      <ClassState name="ClassState"/> 
      <UseReducer name="UseReducer"/> 
    </div>
  );
}

export default App;
