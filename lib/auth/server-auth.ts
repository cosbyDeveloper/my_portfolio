import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

export async function getAuthenticatedUser() {
	const cookieStore = await cookies();

	const token = cookieStore.get('authToken')?.value;

	if (!token) {
		return null;
	}

	return verifyToken(token);
}
