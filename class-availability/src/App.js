import './App.css';
import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Hello frontend</p>
        <SearchBar/>
      </header>
    </div>
  );
}


function SearchBar(props){
  return (
    <div>
        <form>
          <label>
            Hey:
            <input
            id = "anything"
            ></input>
          </label>
        </form>
    </div>
  );
}

export default App;
