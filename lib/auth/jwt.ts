import jwt from 'jsonwebtoken';

function getJwtSecret(): string {
	const secret = process.env.JWT_SECRET;

	if (!secret) {
		throw new Error('JWT_SECRET environment variable is not defined');
	}

	return secret;
}

export interface JWTPayload {
	userId: string;
	email: string;
	name: string;
	role: 'admin' | 'editor';
}

export function signToken(payload: JWTPayload): string {
	return jwt.sign(payload, getJwtSecret(), {
		expiresIn: '7d',
	});
}

export function verifyToken(token: string): JWTPayload | null {
	try {
		return jwt.verify(token, getJwtSecret()) as JWTPayload;
	} catch {
		return null;
	}
}
