import React from 'react';

class AboutPage extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <h2>This is a test application simulating a Metal Trading app</h2>
        <h3>Uses following technologies at a high level:</h3>
        <ul>
          <li>React</li>
          <li>MobX</li>
          <li>Antd</li>
          <li>Apollo Client</li>
          <li>Jest</li>
        </ul>
      </div>
    );
  }
}

export default AboutPage;
