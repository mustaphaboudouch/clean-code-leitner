import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';

const Card = ({ id, question, answer, tag }) => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (data) => {
			return fetch(`http://localhost:3000/cards/${data.cardId}/answer`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ isValid: data.isValid }),
			});
		},
		onError: (error) => {
			alert(error.message);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cards', 'quizz'] });
			alert('Answer submitted');
		},
	});

	function onSubmit(e) {
		e.preventDefault();

		const formData = new FormData(e.target);

		if (formData.get('answer') == '') {
			alert('Please enter an answer.');
			return;
		}

		const data = {
			cardId: formData.get('id'),
			isValid: formData.get('answer') === formData.get('correctAnswer'),
		};

		mutation.mutate(data);
	}

	return (
		<div className='card'>
			<span className='card__tag'>{tag}</span>
			<p className='card__question'>{question}</p>
			<form action='POST' onSubmit={onSubmit} className='card__form'>
				<input type='hidden' name='id' value={id} />
				<input type='hidden' name='correctAnswer' value={answer} />
				<input type='text' name='answer' placeholder='Your answer' />
				<button type='submit'>Answer</button>
			</form>
		</div>
	);
};

export default Card;
