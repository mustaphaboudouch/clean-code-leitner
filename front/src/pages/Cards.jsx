import React from 'react';
import { groupCardsByCategory } from '../util/helpers';
import { CATEGORY_TYPES } from '../constants/cardTypes';
import { ErrorComponent } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import Card from '../components/Card';

const Cards = () => {
	const {
		data: cards,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['cards', 'quizz'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3000/cards/quizz');
			const data = await response.json();
			return groupCardsByCategory(data);
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	return (
		<div className='container'>
			<h1 className='title'>Today's cards</h1>

			{Object.keys(CATEGORY_TYPES).map((type) => (
				<div key={type} className='section'>
					<h2 className='section__title'>{type}</h2>

					{cards[type]?.length ? (
						<div className='cards-list'>
							{cards[type].map((card) => (
								<Card {...card} />
							))}
						</div>
					) : (
						<p>No cards for this category</p>
					)}
				</div>
			))}
		</div>
	);
};

export default Cards;
