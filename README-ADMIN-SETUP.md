# Admin Setup Guide

## Single-User Security

This portfolio backend is protected for single-user access only. No public signup is available.

### Initial Setup

1. **Set environment variables** in `.env.local`:
   ```
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-secure-password
   ADMIN_NAME=Your Name
   ```

2. **Run the seed script** to create admin user:
   ```bash
   npm run seed
   ```

3. **Login** at `/admin/login` with your credentials

### Why No Signup?

- **Security**: Prevents unauthorized access to your portfolio backend
- **Single-user**: Only you need access
- **No multi-tenancy**: Simplifies the architecture
- **Protected**: Database operations are admin-only

### Manage Admin User

The admin user is created once and persists in the database. Subsequent seed script runs will detect the existing user and skip creation.

To reset or change admin credentials:
1. Delete the user from MongoDB
2. Update `.env.local` with new credentials
3. Run `npm run seed` again

### Login

Navigate to `http://localhost:3000/admin/login` and use your credentials.
