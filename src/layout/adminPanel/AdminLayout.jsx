import React, { Component } from 'react';
import Navbar from './Navbar';
import Header from './Header';

class AdminLayout extends Component {

	render() {
		return (
			<>
				<Navbar />
				<div className="main-panel">
					<Header />
					<div className="content">
						<div className="container-fluid">
							{this.props.children}
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default AdminLayout;