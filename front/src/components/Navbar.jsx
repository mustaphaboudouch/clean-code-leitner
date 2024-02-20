import React from 'react';
import { Link } from '@tanstack/react-router';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<Link
				to='/'
				preload={false}
				className='navbar__link'
				activeProps={{ className: 'active' }}
			>
				Cards
			</Link>
			<Link
				to='/admin'
				preload={false}
				className='navbar__link'
				activeProps={{ className: 'active' }}
			>
				Admin
			</Link>
		</nav>
	);
};

export default Navbar;
