import React from 'react';

class Customer extends React.Component {
  render() {
	  return (
		  <tr>
				<td>{this.props.id}</td>
				<td><img src={this.props.image} alt="img"/></td>
				<td>{this.props.name}</td>
				<td>{this.props.birthday}</td>
				<td>{this.props.gender}</td>
				<td>{this.props.job}</td>
		  </tr>
	  )
  }
}

export default Customer;