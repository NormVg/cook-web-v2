# Setup Instructions

## Quick Start

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Configure your .env file with your credentials:**
   ```env
   # Admin Credentials (Change these!)
   ADMIN_USERNAME=cookadmin
   ADMIN_PASSWORD=Cook@2025!Secure

   # Database
   DATABASE_URL=your_database_url

   # Appwrite
   APPWRITE_API_KEY=your_key
   APPWRITE_API_PROJECT=your_project
   APPWRITE_API_BUCKET=your_bucket

   # TAO Auth
   TAO_AUTH_TOKEN=your_token
   TAO_AUTH_URL=your_url
   TAO_AUTH_CALLBACK=your_callback
   TAO_TOKEN_WEB=your_web_token

   # App
   APP_URL=http://localhost:3000

   # Email
   MAIL_DIVER_API_KEY=your_key
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

4. **Run the development server:**
   ```bash
   pnpm dev
   ```

5. **Access Admin Dashboard:**
   - Navigate to: `http://localhost:3000/admin`
   - Login with your ADMIN_USERNAME and ADMIN_PASSWORD from .env

## Important Notes

- **Never commit your `.env` file to version control**
- The `.env.example` file is a template - copy it to `.env` and fill in your values
- Change the default admin credentials before deploying to production
- Admin credentials are now environment variables for better security

## Admin Features

See [ADMIN_README.md](./ADMIN_README.md) for detailed admin dashboard documentation.
