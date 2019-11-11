import React, {Component} from 'react';
import PaymentCard from './Payments';
import PageBar from './PageBar';
import PromotionCard from './Promotions';
import "./styles.scss"


class PaymentsHome extends Component {
	render()  {
		return (
			<div>
				 <PageBar></PageBar>
				 <h2 class="text-black" style={{marginLeft:50}}>Payment Methods</h2>
                 <PaymentCard></PaymentCard>
				 <h2 class="text-black" style={{marginLeft:50}}>Special Offers</h2>
				 <PromotionCard></PromotionCard>
			</div>
		);
	}
}

export default PaymentsHome;