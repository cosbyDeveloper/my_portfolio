# Admin Setup Guide

## Single-User Security

This portfolio backend is protected for single-user access only. No public signup is available.

# Local Development

## Initial Setup

1. **Set environment variables** in `.env.local`:

   ```
   MONGODB_URI=your-local-mongodb-uri
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-secure-password
   ADMIN_NAME=Your Name
   ```

2. **Start the development server** (in one terminal):

   ```bash
   npm run dev
   ```

3. **Run the seed script** (in another terminal):

   ```bash
   npm run seed
   ```

4. **Expected output**:
   ```
   🌱 Seeding admin user...
   ✓ Admin user created successfully
     Email: admin@example.com
     Name: Your Name
   ```

## Login

Navigate to `http://localhost:3000/admin/login` and use your credentials.

---

---

# Production

## Initial Setup

1. **Set environment variables** in production environment:

   ```
   MONGODB_URI=your-production-mongodb-uri
   ADMIN_EMAIL=your-email@example.com
   ADMIN_PASSWORD=your-secure-password
   ADMIN_NAME=Your Name
   ```

2. **Make one cURL request from any terminal**:

   ```bash
   curl -X POST https://yourdomain.com/api/auth/seed \
   -H "Content-Type: application/json"
   ```

3. **Expected output**:
   ```
   {"success":true,"message":"Admin user created successfully","data":{"email":"admin@example.com","name":"Your Name","role":"admin"}}
   ```

## Login

Navigate to `https://yourdomain.com/admin/login` and use your credentials.

---

---

---

## Why No Signup?

- **Security**: Prevents unauthorized access to your portfolio backend
- **Single-user**: Only you need access
- **No multi-tenancy**: Simplifies the architecture
- **Protected**: Database operations are admin-only

## Manage Admin User

The admin user is created once and persists in the database. Subsequent seed script runs will detect the existing user and skip creation.

To reset or change admin credentials:

1. Delete the user from MongoDB
2. Update `.env.local` or production environment with new credentials
3. Run `npm run seed` or the cURL again

## Troubleshooting

**Error: "Missing ADMIN_EMAIL and ADMIN_PASSWORD"**

- Ensure `.env.local` or production environment has both variables set

**Error: "Admin user already exists"**

- Admin already created - proceed to login

**Error: Connection refused**

- Make sure `npm run dev` or production server is running before executing seed script
- Verify MONGODB_URI is correct in `.env.local` or production environment
