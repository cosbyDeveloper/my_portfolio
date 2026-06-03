# Setting Up Admin User

## Prerequisites
- `.env.local` file with database credentials
- Server running (`npm run dev`)

## Steps

1. **Set environment variables** in `.env.local`:
   ```
   ADMIN_EMAIL=admin@example.com
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

5. **Login** at `http://localhost:3000/admin/login` with your credentials

## Troubleshooting

**Error: "Missing ADMIN_EMAIL and ADMIN_PASSWORD"**
- Ensure `.env.local` has both variables set

**Error: "Admin user already exists"**
- Admin already created - proceed to login

**Error: Connection refused**
- Make sure `npm run dev` is running before executing seed script
- Verify MONGODB_URI is correct in `.env.local`
