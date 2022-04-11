import React, { Component } from 'react';
import RoomAllocation from './components/RoomAllocation'


class App extends Component {
  render() {
    return <RoomAllocation guest={10}
                            room={3}
                            onChange={result=>console.log(result)}/>;
  }
}

export default App;
