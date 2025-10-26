# Admin Dashboard

## Access

**URL:** `/admin`

### Credentials

Admin credentials are now stored in environment variables for easy configuration.

**Default Credentials (from .env):**
- **Username:** `cookadmin`
- **Password:** `Cook@2025!Secure`

> ⚠️ **Important:** Set these in your `.env` file:
> ```env
> ADMIN_USERNAME=your_username
> ADMIN_PASSWORD=your_secure_password
> ```

## Environment Setup

1. Copy `.env.example` to `.env`
2. Update the admin credentials:
   ```env
   ADMIN_USERNAME=cookadmin
   ADMIN_PASSWORD=Cook@2025!Secure
   ```
3. Restart your application

## Features

### 1. File Management
- **Scan Files:** Compares files in the database vs Appwrite storage
- **View Unlisted Files:** Shows files that exist in Appwrite but not in the database
- **Delete Single File:** Remove individual unlisted files
- **Bulk Delete:** Remove all unlisted files at once

### 2. Dashboard Stats
- Total files in database
- Total files in Appwrite storage
- Count of unlisted files

### 3. Activity Log
- Real-time logging of all operations
- Color-coded by severity (info, success, warning, error)
- Auto-scrolling with history

## How It Works

### File Comparison Logic
1. Fetches all file records from the database (`fileBucket` table)
2. Lists all files from Appwrite storage
3. Compares file IDs to find orphaned files
4. Displays files that exist in Appwrite but not in the database

### Security
- Middleware protection on dashboard route
- Client-side token stored in localStorage
- Admin-only API endpoints
- Hardcoded credentials (not in database)

## API Endpoints

### Authentication
- `POST /api/admin/auth` - Login with credentials

### File Management
- `GET /api/admin/files/db-list` - Get all files from database
- `GET /api/admin/files/appwrite-list` - Get all files from Appwrite
- `POST /api/admin/files/delete` - Delete a file from Appwrite

## Usage Guide

1. **Login**
   - Navigate to `/admin`
   - Enter credentials
   - Click "Login"

2. **Scan for Unlisted Files**
   - Click "🔍 Scan Files" button
   - Wait for the scan to complete
   - View results in stats and file list

3. **Delete Files**
   - **Single:** Click "Delete" next to a file
   - **Bulk:** Click "🗑️ Delete All Unlisted" (requires confirmation)

4. **Monitor Activity**
   - Check the Activity Log section for operation results
   - Logs show timestamps and status

## Changing Admin Credentials

Update your `.env` file:

```env
ADMIN_USERNAME=your_new_username
ADMIN_PASSWORD=your_new_secure_password
```

Then restart your application for changes to take effect.

## Database Schema

The `fileBucket` table structure:
```typescript
{
  id: varchar (primary key)
  pointer: varchar (Appwrite file ID)
  datetime: varchar
  type: varchar
}
```

## Notes

- Deleting files from Appwrite is permanent and cannot be undone
- Files referenced in the database will not be deleted
- Only orphaned files (in Appwrite but not in DB) are identified
- Bulk operations may take time for large numbers of files
