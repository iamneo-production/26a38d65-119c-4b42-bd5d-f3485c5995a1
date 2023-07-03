import React from 'react';

class DriverHomePage extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome, Driver!</h1>
        <h2>Deliver with Food Court</h2>
        <img
          src="http://thesplendidlifestyle.com/wp-content/uploads/2019/08/delivery.png"
          alt="Driver"
          style={{ maxWidth: '500px', maxHeight: '500px' }}
        />
        <h3>Make money on your terms.</h3>
        
        <h3>Anytime and anyhow.</h3>
        {/* Add more content and components as needed */}
      </div>
    );
  }
}

export default DriverHomePage;
