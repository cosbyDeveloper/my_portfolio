// components/shared/Lightbox.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FaTimes,
	FaChevronLeft,
	FaChevronRight,
	// FaExternalLinkAlt,
} from 'react-icons/fa';

interface LightboxProps {
	images: {
		src: string;
		alt: string;
		caption?: string;
	}[];
	isOpen: boolean;
	onClose: () => void;
	initialIndex?: number;
}

const Lightbox = ({
	images,
	isOpen,
	onClose,
	initialIndex = 0,
}: LightboxProps) => {
	const [currentIndex, setCurrentIndex] = useState(initialIndex);

	const goToPrevious = () => {
		setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className='fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm'
				onClick={onClose}>
				{/* Close button */}
				<button
					onClick={onClose}
					className='absolute top-6 right-6 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition'
					aria-label='Close lightbox'>
					<FaTimes className='w-6 h-6' />
				</button>

				{/* Navigation buttons */}
				{images.length > 1 && (
					<>
						<button
							onClick={(e) => {
								e.stopPropagation();
								goToPrevious();
							}}
							className='absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition'
							aria-label='Previous image'>
							<FaChevronLeft className='w-6 h-6' />
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								goToNext();
							}}
							className='absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition'
							aria-label='Next image'>
							<FaChevronRight className='w-6 h-6' />
						</button>
					</>
				)}

				{/* Current image */}
				<div
					className='relative max-w-5xl max-h-[85vh] w-full mx-6'
					onClick={(e) => e.stopPropagation()}>
					<div className='relative w-full h-full'>
						<Image
							src={images[currentIndex].src}
							alt={images[currentIndex].alt}
							width={1200}
							height={800}
							className='object-contain w-full h-full rounded-lg'
							sizes='100vw'
						/>
					</div>

					{/* Image counter */}
					{images.length > 1 && (
						<div className='absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm'>
							{currentIndex + 1} / {images.length}
						</div>
					)}

					{/* Caption */}
					{images[currentIndex].caption && (
						<div className='absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent text-white'>
							<p className='text-center'>{images[currentIndex].caption}</p>
						</div>
					)}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default Lightbox;
