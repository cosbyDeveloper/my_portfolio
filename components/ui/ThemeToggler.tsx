'use client';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from 'next-themes';

const ThemeToggler = ({
	collapsed = false,
	showText = true,
	className = '',
	fullWidth = true,
}) => {
	const { theme, setTheme } = useTheme();

	return (
		<button
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className={`${className} flex transition-all hover:pl-1 duration-300 hover:text-primary ${
				fullWidth ? 'w-full mt-10 text-lg' : 'w-auto mt-7 text-2xl'
			} ${collapsed ? 'justify-center' : 'justify-start'}`}
			aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
			<div
				className={`flex items-center transition-all duration-300 ${
					collapsed ? 'justify-center w-full' : ''
				}`}>
				<div className='transition-all duration-300 hover:scale-110'>
					{theme === 'dark' ? <FaSun /> : <FaMoon />}
				</div>
				{showText && (
					<span
						className={`transition-all duration-300 ml-2 ${
							collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
						}`}>
						{theme === 'dark' ? 'Light mode' : 'Dark mode'}
					</span>
				)}
			</div>
		</button>
	);
};

export default ThemeToggler;
