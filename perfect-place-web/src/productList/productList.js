import React, {Component} from 'react';
import './productList.css';

class ProductList extends Component{
	render () {
			return(
				<li className="list-group-item pc-condensed">
					<a className="btn btn-outline-danger button-location">+</a>
					<p>{this.props.product.title} | <b>${this.props.product.price}</b></p>
				</li>
		);
	}
}

export default ProductList;