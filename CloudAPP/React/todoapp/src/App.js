import React from 'react';
const axios = require('axios').default;

class App extends React.Component {
  state = { eventList: [] }

  componentDidMount() {
    let url = "https://reststop.randomhouse.com/resources/authorevents/?start=0&max=3&expandLevel=1&isbn=0&authorid=0"
    const req = axios.get(url);
    console.log(req);
    req.then(resp => {
      let listOfEvents = resp.data.authorEvent;
      let listOfEventsAsArray = Object.entries(listOfEvents);
      let eventDetails = listOfEventsAsArray.map((eventDetial) => {
        let eventListCollection = Object.entries(eventDetial[1])
        return <tr>
                  <td style={{color: "red",border: "1px solid black"}}>{eventListCollection[4][1]}</td>
                  <td style={{color: "red",border: "1px solid black"}}>{eventListCollection[5][1]}</td>
                  <td style={{color: "red",border: "1px solid black"}}>{eventListCollection[7][1]}</td>
                  <td style={{color: "red",border: "1px solid black"}}>{eventListCollection[10][1]}</td>
                  <td style={{color: "red",border: "1px solid black"}}>{eventListCollection[11][1]}</td>
                </tr>
      })
      this.setState({ eventList:<table style={{border: "1px solid black"}}><tbody>{eventDetails}</tbody></table> })
    })
      .catch(err => {
        console.log(err.toString())
      });
  }


  render() {
    const colorStyle = { color: this.props.color, fontSize: this.props.size + "px" }
    return (
      <div style={colorStyle}>
        Events List
        <br/>
          {this.state.eventList}
      </div>
    );
  }
}
export default App;