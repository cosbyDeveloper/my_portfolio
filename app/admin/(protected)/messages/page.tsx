// app/admin/(protected)/messages/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
	FaEnvelope,
	FaTrash,
	FaSpinner,
	FaCheckCircle,
	FaPhone,
	FaUser,
	FaCalendarAlt,
	FaTag,
	FaFlag,
	FaEye,
	FaReply,
} from 'react-icons/fa';
import Link from 'next/link';
import { Message } from '@/lib/types';

export default function MessagesPage() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [deleting, setDeleting] = useState<string | null>(null);
	const [marking, setMarking] = useState<string | null>(null);
	const [filter, setFilter] = useState<'all' | 'unread' | 'high'>('all');

	useEffect(() => {
		fetchMessages();
	}, []);

	const fetchMessages = async () => {
		try {
			const response = await fetch('/api/admin/messages', {
				method: 'GET',
				credentials: 'include',
			});

			if (!response.ok) {
				throw new Error('Failed to fetch messages');
			}

			const data = await response.json();
			setMessages(data.data || []);
		} catch (err) {
			setError('Failed to load messages');
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (_id: string) => {
		if (!confirm('Are you sure you want to delete this message?')) return;

		setDeleting(_id);
		try {
			const response = await fetch(`/api/admin/messages/${_id}`, {
				method: 'DELETE',
				credentials: 'include',
			});

			if (response.ok) {
				setMessages(messages.filter((m) => m._id !== _id));
			}
		} catch (err) {
			console.error('Delete failed:', err);
			alert('Failed to delete message');
		} finally {
			setDeleting(null);
		}
	};

	const handleMarkAsRead = async (_id: string) => {
		setMarking(_id);
		try {
			const response = await fetch(`/api/admin/messages/${_id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ read: true }),
			});

			if (response.ok) {
				setMessages(
					messages.map((m) =>
						m._id === _id ? { ...m, read: true, status: 'read' } : m,
					),
				);
			}
		} catch (err) {
			console.error('Mark as read failed:', err);
		} finally {
			setMarking(null);
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
			case 'archived':
				return 'text-gray-600 bg-gray-500/10';
			case 'spam':
				return 'text-red-600 bg-red-500/10';
			default:
				return 'text-gray-600 bg-gray-500/10';
		}
	};

	const filteredMessages = messages.filter((msg) => {
		if (filter === 'unread') return !msg.read;
		if (filter === 'high') return msg.priority === 'high';
		return true;
	});

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-64'>
				<div className='text-center'>
					<FaSpinner className='w-8 h-8 text-accent animate-spin mx-auto mb-4' />
					<p className='text-muted-foreground'>Loading messages...</p>
				</div>
			</div>
		);
	}

	const unreadCount = messages.filter((m) => !m.read).length;
	const highPriorityCount = messages.filter(
		(m) => m.priority === 'high' && !m.read,
	).length;

	return (
		<div>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='mb-8'>
				<div className='flex items-center justify-between flex-wrap gap-4'>
					<div className='flex items-center gap-3'>
						<div className='p-2 rounded-lg bg-accent/10'>
							<FaEnvelope className='w-6 h-6 text-accent' />
						</div>
						<div>
							<h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
								Messages
							</h1>
							<p className='text-muted-foreground mt-1'>
								{unreadCount > 0 ? (
									<>
										You have{' '}
										<span className='text-accent font-semibold'>
											{unreadCount}
										</span>{' '}
										unread message{unreadCount !== 1 ? 's' : ''}
										{highPriorityCount > 0 && (
											<span className='ml-2 text-red-600'>
												({highPriorityCount} high priority)
											</span>
										)}
									</>
								) : (
									'All messages read'
								)}
							</p>
						</div>
					</div>

					{/* Filters */}
					<div className='flex gap-2'>
						<button
							onClick={() => setFilter('all')}
							className={`px-3 py-1.5 rounded-lg text-sm transition-all ${filter === 'all' ? 'bg-accent text-white' : 'border border-default hover:bg-muted/50'}`}>
							All
						</button>
						<button
							onClick={() => setFilter('unread')}
							className={`px-3 py-1.5 rounded-lg text-sm transition-all ${filter === 'unread' ? 'bg-accent text-white' : 'border border-default hover:bg-muted/50'}`}>
							Unread
						</button>
						<button
							onClick={() => setFilter('high')}
							className={`px-3 py-1.5 rounded-lg text-sm transition-all ${filter === 'high' ? 'bg-red-600 text-white' : 'border border-default hover:bg-muted/50'}`}>
							High Priority
						</button>
						<button
							onClick={() => fetchMessages()}
							className='px-3 py-1.5 rounded-lg border border-default hover:bg-muted/50 transition-all'>
							<FaSpinner className='w-4 h-4' />
						</button>
					</div>
				</div>
			</motion.div>

			{/* Error Message */}
			{error && (
				<motion.div
					initial={{ opacity: 0, y: -10 }}
					animate={{ opacity: 1, y: 0 }}
					className='mb-6 rounded-xl bg-red-500/10 border border-red-500/20 p-4'>
					<p className='text-red-600 dark:text-red-400 text-sm'>{error}</p>
				</motion.div>
			)}

			{/* Empty State */}
			{filteredMessages.length === 0 ? (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className='text-center py-16'>
					<div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent/10 mb-4'>
						<FaEnvelope className='w-10 h-10 text-accent/40' />
					</div>
					<h3 className='text-xl font-semibold mb-2'>No messages yet</h3>
					<p className='text-muted-foreground'>
						Messages from your contact form will appear here
					</p>
				</motion.div>
			) : (
				/* Messages List */
				<div className='space-y-3'>
					{filteredMessages.map((message, index) => (
						<motion.div
							key={message._id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className='group relative'>
							<div
								className={`absolute -inset-0.5 bg-linear-to-r from-accent/20 to-primary/20 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300 ${!message.read ? 'opacity-30' : ''}`}
							/>
							<div
								className={`relative bg-background/50 backdrop-blur-sm rounded-xl border border-default p-5 hover:border-accent/50 transition-all ${!message.read ? 'border-accent/30' : ''}`}>
								<div className='flex items-start justify-between gap-4'>
									{/* Message Content */}
									<div className='flex-1 min-w-0'>
										{/* Header with name and status */}
										<div className='flex items-center gap-3 mb-3 flex-wrap'>
											<div className='flex items-center gap-2'>
												<div className='p-1.5 rounded-lg bg-accent/10'>
													<FaUser className='w-3 h-3 text-accent' />
												</div>
												<h3 className='text-lg font-semibold'>
													{message.lastName
														? `${message.firstName} ${message.lastName}`
														: message.firstName}
												</h3>
											</div>
											{!message.read && (
												<span className='text-xs font-semibold bg-accent/20 text-accent px-2 py-1 rounded-full'>
													Unread
												</span>
											)}
											<span
												className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(message.priority || 'normal')}`}>
												<FaFlag className='inline w-3 h-3 mr-1' />
												{message.priority || 'normal'}
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

										{/* Contact Info */}
										<div className='grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3'>
											<a
												href={`mailto:${message.email}`}
												className='text-sm text-accent hover:underline inline-flex items-center gap-1'>
												<FaEnvelope className='w-3 h-3' />
												{message.email}
											</a>
											{message.phone && (
												<div className='text-sm text-muted-foreground inline-flex items-center gap-1'>
													<FaPhone className='w-3 h-3' />
													{message.phone}
												</div>
											)}
										</div>

										{/* Subject */}
										{message.subject && (
											<p className='text-sm font-medium text-foreground mb-2'>
												Subject: {message.subject}
											</p>
										)}

										{/* Message Preview */}
										<p className='text-sm text-muted-foreground leading-relaxed line-clamp-2'>
											{message.message}
										</p>

										{/* Reply Info */}
										{message.replyCount > 0 && (
											<div className='flex items-center gap-1 mt-2 text-xs text-green-600'>
												<FaReply className='w-3 h-3' />
												<span>
													{message.replyCount} repl
													{message.replyCount === 1 ? 'y' : 'ies'}
												</span>
											</div>
										)}

										{/* Timestamp */}
										<div className='flex items-center gap-1 mt-3 text-xs text-muted-foreground'>
											<FaCalendarAlt className='w-3 h-3' />
											<span>
												{message.createdAt
													? new Date(message.createdAt).toLocaleString()
													: 'N/A'}
											</span>
										</div>
									</div>

									{/* Actions */}
									<div className='flex items-center gap-2 shrink-0'>
										<Link
											href={`/admin/messages/${message._id}`}
											className='p-2 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all hover:scale-110'
											title='View Details'>
											<FaEye className='w-4 h-4' />
										</Link>
										{!message.read && (
											<button
												onClick={() => handleMarkAsRead(message._id || '')}
												disabled={marking === message._id}
												className='p-2 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 transition-all hover:scale-110 disabled:opacity-50'
												title='Mark as read'>
												{marking === message._id ? (
													<FaSpinner className='w-4 h-4 animate-spin' />
												) : (
													<FaCheckCircle className='w-4 h-4' />
												)}
											</button>
										)}
										<button
											onClick={() => handleDelete(message._id || '')}
											disabled={deleting === message._id}
											className='p-2 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-all hover:scale-110 disabled:opacity-50'
											title='Delete message'>
											{deleting === message._id ? (
												<FaSpinner className='w-4 h-4 animate-spin' />
											) : (
												<FaTrash className='w-4 h-4' />
											)}
										</button>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			)}
		</div>
	);
}
