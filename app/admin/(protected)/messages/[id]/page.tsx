'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	FaEnvelope,
	FaTrash,
	FaSpinner,
	FaPhone,
	FaUser,
	FaCalendarAlt,
	FaTag,
	FaFlag,
	FaReply,
	FaArrowLeft,
	FaCheckCircle,
	FaPaperPlane,
} from 'react-icons/fa';
import { Message } from '@/lib/types';

export default function MessageDetailPage() {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;
	const [message, setMessage] = useState<Message | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [replyContent, setReplyContent] = useState('');
	const [sendingReply, setSendingReply] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchMessage();
	}, [id]);

	const fetchMessage = async () => {
		try {
			const response = await fetch(`/api/admin/messages/${id}`, {
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch message');
			}

			const data = await response.json();
			setMessage(data.data);

			// Mark as read if not already
			if (!data.data.read) {
				await fetch(`/api/admin/messages/${id}`, {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include',
					body: JSON.stringify({ read: true }),
				});
			}
		} catch (err) {
			setError('Failed to load message');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSendReply = async () => {
		if (!replyContent.trim()) return;

		setSendingReply(true);
		try {
			const response = await fetch(`/api/admin/messages/${id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ replyContent }),
			});

			if (response.ok) {
				setReplyContent('');
				await fetchMessage();
			} else {
				throw new Error('Failed to send reply');
			}
		} catch (err) {
			console.error('Reply failed:', err);
			alert('Failed to send reply');
		} finally {
			setSendingReply(false);
		}
	};

	const handleDelete = async () => {
		if (!confirm('Are you sure you want to delete this message?')) return;

		try {
			const response = await fetch(`/api/admin/messages/${id}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			if (response.ok) {
				router.push('/admin/messages');
			}
		} catch (err) {
			console.error('Delete failed:', err);
			alert('Failed to delete message');
		}
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case 'high':
				return 'text-red-600 bg-red-500/10';
			case 'low':
				return 'text-green-600 bg-green-500/10';
			default:
				return 'text-blue-600 bg-blue-500/10';
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'new':
				return 'text-purple-600 bg-purple-500/10';
			case 'read':
				return 'text-blue-600 bg-blue-500/10';
			case 'replied':
				return 'text-green-600 bg-green-500/10';
			default:
				return 'text-gray-600 bg-gray-500/10';
		}
	};

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<FaSpinner className='w-8 h-8 text-accent animate-spin mx-auto mb-4' />
					<p className='text-muted-foreground'>Loading message...</p>
				</div>
			</div>
		);
	}

	if (error || !message) {
		return (
			<div className='rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center'>
				<p className='text-red-600 dark:text-red-400'>
					{error || 'Message not found'}
				</p>
				<Link
					href='/admin/messages'
					className='inline-block mt-4 text-accent hover:underline'>
					← Back to Messages
				</Link>
			</div>
		);
	}

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='mb-6'>
				<div className='flex items-center justify-between flex-wrap gap-4'>
					<div className='flex items-center gap-3'>
						<Link
							href='/admin/messages'
							className='p-2 rounded-lg border border-default hover:bg-muted/50 transition-all'>
							<FaArrowLeft className='w-4 h-4' />
						</Link>
						<div className='p-2 rounded-lg bg-accent/10'>
							<FaEnvelope className='w-6 h-6 text-accent' />
						</div>
						<div>
							<h1 className='text-2xl md:text-3xl font-bold tracking-tight'>
								Message Details
							</h1>
						</div>
					</div>
					<button
						onClick={handleDelete}
						className='flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all'>
						<FaTrash className='w-4 h-4' />
						<span>Delete</span>
					</button>
				</div>
			</motion.div>

			{/* Message Content */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className='bg-background/50 backdrop-blur-sm rounded-2xl border border-default p-6 mb-6'>
				{/* Status Badges */}
				<div className='flex flex-wrap gap-2 mb-6'>
					{!message.read && (
						<span className='text-xs font-semibold bg-accent/20 text-accent px-2 py-1 rounded-full'>
							Unread
						</span>
					)}
					<span
						className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(message.priority || 'normal')}`}>
						<FaFlag className='inline w-3 h-3 mr-1' />
						{message.priority || 'normal'} priority
					</span>
					<span
						className={`text-xs px-2 py-1 rounded-full ${getStatusColor(message.status || 'new')}`}>
						{message.status || 'new'}
					</span>
					{message.category && (
						<span className='text-xs px-2 py-1 rounded-full bg-gray-500/10 text-gray-600'>
							<FaTag className='inline w-3 h-3 mr-1' />
							{message.category}
						</span>
					)}
				</div>

				{/* Sender Info */}
				<div className='mb-6 pb-6 border-b border-default'>
					<h2 className='text-xl font-semibold mb-4'>From</h2>
					<div className='space-y-2'>
						<div className='flex items-center gap-2'>
							<FaUser className='w-4 h-4 text-muted-foreground' />
							<span className='font-medium'>
								{message.lastName
									? `${message.firstName} ${message.lastName}`
									: message.firstName}
							</span>
						</div>
						<div className='flex items-center gap-2'>
							<FaEnvelope className='w-4 h-4 text-muted-foreground' />
							<a
								href={`mailto:${message.email}`}
								className='text-accent hover:underline'>
								{message.email}
							</a>
						</div>
						{message.phone && (
							<div className='flex items-center gap-2'>
								<FaPhone className='w-4 h-4 text-muted-foreground' />
								<a href={`tel:${message.phone}`}>{message.phone}</a>
							</div>
						)}
						<div className='flex items-center gap-2'>
							<FaCalendarAlt className='w-4 h-4 text-muted-foreground' />
							<span>{new Date(message.createdAt).toLocaleString()}</span>
						</div>
					</div>
				</div>

				{/* Message Body */}
				<div className='mb-6'>
					<h3 className='font-semibold mb-2'>Subject</h3>
					<p className='text-muted-foreground mb-4'>{message.subject}</p>

					<h3 className='font-semibold mb-2'>Message</h3>
					<div className='bg-muted/30 rounded-xl p-4 whitespace-pre-wrap'>
						{message.message}
					</div>
				</div>

				{/* Replies Section */}
				{message.replies && message.replies.length > 0 && (
					<div className='mt-6 pt-6 border-t border-default'>
						<h3 className='font-semibold mb-4 flex items-center gap-2'>
							<FaReply className='w-4 h-4' />
							Replies ({message.replies.length})
						</h3>
						<div className='space-y-4'>
							{message.replies.map((reply, idx) => (
								<div
									key={idx}
									className={`p-4 rounded-xl ${reply.sentBy === 'admin' ? 'bg-primary/5 border border-primary/20 ml-4' : 'bg-muted/30 mr-4'}`}>
									<div className='flex justify-between items-center mb-2'>
										<span className='font-medium'>
											{reply.sentBy === 'admin'
												? 'You (Admin)'
												: message.lastName
													? `${message.firstName} ${message.lastName}`
													: message.firstName}
										</span>
										<span className='text-xs text-muted-foreground'>
											{new Date(reply.sentAt).toLocaleString()}
										</span>
									</div>
									<p className='text-sm whitespace-pre-wrap'>{reply.content}</p>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Reply Form */}
				<div className='mt-6 pt-6 border-t border-default'>
					<h3 className='font-semibold mb-4 flex items-center gap-2'>
						<FaReply className='w-4 h-4' />
						Reply to{' '}
						{message.lastName
							? `${message.firstName} ${message.lastName}`
							: message.firstName}
					</h3>
					<textarea
						value={replyContent}
						onChange={(e) => setReplyContent(e.target.value)}
						rows={4}
						className='w-full px-4 py-3 rounded-xl border border-default bg-background focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none'
						placeholder='Write your reply here...'
					/>
					<div className='flex justify-end mt-4'>
						<button
							onClick={handleSendReply}
							disabled={sendingReply || !replyContent.trim()}
							className='flex items-center gap-2 px-6 py-2 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all disabled:opacity-50'>
							{sendingReply ? (
								<>
									<FaSpinner className='w-4 h-4 animate-spin' />
									<span>Sending...</span>
								</>
							) : (
								<>
									<FaPaperPlane className='w-4 h-4' />
									<span>Send Reply</span>
								</>
							)}
						</button>
					</div>
					<p className='text-xs text-muted-foreground mt-2'>
						Note: Reply will be saved in the system. Email notification to the
						user will be implemented soon.
					</p>
				</div>
			</motion.div>
		</div>
	);
}
