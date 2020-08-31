import React, {Component} from 'react';
import './wishlist.css';
import DataService from '../services/data-service';
import NotificationService from '../services/notification-service';

//Component
import ProductList from '../productList/productList';

class WishList extends Component{
	
	constructor(props){
		super(props);
	
		this.state = {wishList:[
			{
				title:"GoodLine Shoes",
				price:456.87,
				_id:"vsdvesavrsdbb"
			},			
			{
				title:"Bigbang Studio Camera",
				price:87.54,
				_id:"uklylyu"
			},
			{
				title:"I am Groot",
				price:87.24,
				_id:"rhj5ejngfbcvb"
			}
		]};
		this.createWishList = this.createWishList.bind(this);
	}
	
	
	
	createWishList = () => {
		const list = this.state.wishList.map((product) => 
			<ProductList product={product} key={product._id} />											 
		);											 
		return (list);
	}
	
	render () {
		return(
		<div className="card">
			<div className="card-block">
				<h4 className="card-title">Wish List</h4>
				<ul className="list-group">
					{this.createWishList()}
				</ul>
			</div>
		</div>
		);
	}
}

export default WishList;