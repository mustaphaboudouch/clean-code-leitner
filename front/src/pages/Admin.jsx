import { ErrorComponent } from '@tanstack/react-router';
import React, { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Admin = () => {
	const queryClient = useQueryClient();
	const formRef = useRef(null);

	const {
		data: cards,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['cards'],
		queryFn: async () => {
			const response = await fetch('http://localhost:3000/cards');
			const data = await response.json();
			return data;
		},
	});

	const mutation = useMutation({
		mutationFn: (data) => {
			return fetch('http://localhost:3000/cards', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
		},
		onError: (error) => {
			console.error(error);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cards'] });
			formRef.current?.reset();
		},
	});

	function onSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);
		const data = {
			question: formData.get('question'),
			answer: formData.get('answer'),
			tag: formData.get('tag'),
		};

		mutation.mutate(data);
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <ErrorComponent error={error} />;
	}

	return (
		<div className='container'>
			<div className='section'>
				<h1 className='title'>All cards</h1>

				<div className='cards-list'>
					{cards.map((card) => (
						<div key={card.id} className='card'>
							<p className='card__question'>{card.question}</p>
							<span className='card__tag1'>{card.category}</span>
							<span className='card__tag2'>{card.tag}</span>
						</div>
					))}
				</div>
			</div>

			<div className='section'>
				<h1 className='title'>Create new card</h1>

				<form
					ref={formRef}
					action='POST'
					onSubmit={onSubmit}
					className='admin__form'
				>
					<input type='text' name='question' placeholder='Question' />
					<input type='text' name='answer' placeholder='Answer' />
					<input type='text' name='tag' placeholder='Tag' />
					<button type='submit'>Create</button>
				</form>
			</div>
		</div>
	);
};

export default Admin;
