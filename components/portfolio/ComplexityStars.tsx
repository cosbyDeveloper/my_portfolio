import { FaStar } from 'react-icons/fa';

type Complexity = 'low' | 'medium' | 'high';

const ComplexityStars = ({
	complexity = 'medium',
}: {
	complexity?: Complexity;
}) => {
	// Progressive mapping: each level adds more stars
	const ratingMap: Record<Complexity, { stars: number; label: string }> = {
		low: { stars: 2, label: 'Beginner' }, // ☆☆☆☆☆
		medium: { stars: 3, label: 'Intermediate' }, // ★★★☆☆
		high: { stars: 5, label: 'Advanced' }, // ★★★★★
	};

	const { stars, label } = ratingMap[complexity];

	return (
		<div className='flex items-center gap-1'>
			{[...Array(5)].map((_, i) => {
				const isFilled = i < stars;

				return (
					<FaStar
						key={i}
						className={`w-4 h-4 transition-colors ${
							isFilled ? 'text-yellow-500' : 'text-gray-300'
						}`}
					/>
				);
			})}
			<span className='text-sm text-muted-foreground ml-2'>{label}</span>
		</div>
	);
};

export default ComplexityStars;
