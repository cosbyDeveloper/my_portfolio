// components/layout/ScrollHandler.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect, startTransition } from 'react';

const ScrollHandler = () => {
	const pathname = usePathname();

	useEffect(() => {
		startTransition(() => {
			// Check if smooth scrolling is supported
			const supportsSmoothScroll =
				'scrollBehavior' in document.documentElement.style;

			setTimeout(() => {
				window.scrollTo({
					top: 0,
					left: 0,
					behavior: supportsSmoothScroll ? 'smooth' : 'instant',
				});
			}, 100); // Small delay to allow page to start rendering
		});
	}, [pathname]);

	return null;
};

export default ScrollHandler;
