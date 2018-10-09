import React, { Component } from 'react';
import { GbCard50Skewed } from '../components/gbCard50Skewed';
import { SearchSVG } from '../components/svg/SearchSVG';
import { DoneSVG } from '../components/svg/DoneSVG';
import { CardSVG } from '../components/svg/CardSVG';
import {NavFooterWrapper} from '../containers/NavFooterWrapper';

class Homse extends Component {
	state = {
		showModal: false
	};

	showThisModal = (modalName) => {
		this.setState({
			showModal: modalName
		})
	};

	render() {
		return (
			<div className="home-page">
				<div className='header'>
					<GbCard50Skewed
						backgroundUrl='https://images.unsplash.com/photo-1516807947649-1054add6bc97?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=11be05062d1f7ba80ca7d217e0aa241f&auto=format&fit=crop&w=1049&q=80'
						type='Photographers'
						aboutType='Find the job that suits you and get the job done.'
						modalHandler={this.showThisModal}
						showModal={this.state.showModal == 'photographers'}
						modalLink='signUp/photographer'
						modalButtonValue='Join Now'
						modalList={[{
							'description': 'Search for the best jobs oportunities in your area of interests.',
							'icon': <SearchSVG classes='modal-icon gb-icon-fill-white gb-icon-medium' />
						}, {
							'description': 'Apply for the jobs that you are interested in.',
							'icon': <DoneSVG classes='modal-icon gb-icon-fill-white gb-icon-medium' />
						}, {
							'description': 'Do the job, get the money fast and secured.',
							'icon': <CardSVG classes='modal-icon gb-icon-fill-white gb-icon-medium' />
						}]}
					/>
					<GbCard50Skewed
						backgroundUrl='https://images.unsplash.com/photo-1523871762770-87bda6d9ab58?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=651c083bb21d6ff0ef6eaa4136cbef56&auto=format&fit=crop&w=1185&q=80'
						type='Companies'
						aboutType='Find the photographer that suits you and get the job done'
						modalHandler={this.showThisModal}
						showModal={this.state.showModal == 'companies'}
						modalLink='signUp/company'
						modalButtonValue='Get Started'
						modalList={[{
							'description': 'Search for the best photographer in your area, or post a public job.',
							'icon': <SearchSVG classes='modal-icon gb-icon-fill-white gb-icon-medium' />
						}, {
							'description': 'Sign the contract with the chosen photographer.',
							'icon': <DoneSVG classes='modal-icon gb-icon-fill-white gb-icon-medium' />
						}, {
							'description': 'After the job is done, pay fast and secured.',
							'icon': <CardSVG classes='modal-icon gb-icon-fill-white gb-icon-medium' />
						}]}
					/>
				</div>

			</div>
		);
	}
}

const Home = NavFooterWrapper(Homse);
export default Home;