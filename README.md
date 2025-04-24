
# Album-Gallery-Unsplash




# 📸 Unsplash Developer Account Registration & Authentication

To use the Unsplash API in your application, you'll need to register for a developer account and authenticate your requests using either an **Access Key** (for public access) or **OAuth** (for user-level access) and With a free account, you can make only 50 requests per hour.

---

## 🔧 Steps to Register

1. **Create an Unsplash Account**
   - Go to [https://unsplash.com/join](https://unsplash.com/join)
   - Sign up using your email or a social login (Google, Apple, etc.)

2. **Apply for a Developer Account**
   - Go to the [Unsplash Developer Portal](https://unsplash.com/developers)
   - Click on **"Your Applications"**
   - Click **"New Application"**

3. **Fill Out Application Details**
   - **Name**: Give your app a unique name.
   - **Description**: Describe what your app does.
   - **Website / Callback URLs**: Provide a valid URL. For local development, you can use `http://localhost:3000`.
   - **Use Case**: Briefly explain how you will use the Unsplash API.
   - Accept the API Guidelines and Terms of Service.

4. **Get Your API Keys**
   - After creating your app, you’ll get an **Access Key** and a **Secret Key**.
   - Use the **Access Key** for basic, public API calls.
   - Use **OAuth** if you need to perform user-authenticated actions (like user likes, collections, etc.)

---

## 🔐 Authentication Methods

### ✅ 1. Public Access (Access Key)

For simple search and image retrieval, use your **Access Key** by passing it as a query parameter:

```http
GET https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
```

Or in headers (for some HTTP clients):

```http
Authorization: Client-ID YOUR_ACCESS_KEY
```

---

### 🔁 2. User Authentication (OAuth 2.0)

For requests that involve user-specific data (like creating a collection), you'll need to implement OAuth:

#### 📌 Authorization Flow

1. Redirect user to authorize:
```
https://unsplash.com/oauth/authorize?client_id=YOUR_ACCESS_KEY
&redirect_uri=YOUR_CALLBACK_URL
&response_type=code
&scope=public+read_user
```

2. Unsplash redirects back with a `code`. Exchange it for a token:

```bash
POST https://unsplash.com/oauth/token
Content-Type: application/x-www-form-urlencoded

client_id=YOUR_ACCESS_KEY
&client_secret=YOUR_SECRET_KEY
&redirect_uri=YOUR_CALLBACK_URL
&code=THE_CODE_YOU_RECEIVED
&grant_type=authorization_code
```

3. Initially, under 🔒 Redirect URI & Permissions, you must grant all necessary permissions to enable the full authorization flow.


📚 [Full OAuth documentation →](https://unsplash.com/documentation#user-authentication)

---

4. You'll receive a `Bearer` access token. Use it like this:

```http
Authorization: Bearer USER_ACCESS_TOKEN
```

📚 [Full OAuth documentation →](https://unsplash.com/documentation#user-authentication)

---



## Installation Instructions for FE

Follow these steps to set up the project:

```sh
# 1. Clone the repository 
git https://github.com/Nithushan-Balasingham/album-gallery
cd FE

# 2. Install dependencies
npm i

# 3. Start the development server
npm run dev
```

## Environment Variables
Ensure you have a `.env` file with the required variables:

```ini
VITE_ACCESS_KEY="ACCESS_KEY"
VITE_SECRET_KEY="SECRET_KEY"
VITE_REDIRECT_URI="REDIRECT_URI"




```
## Loom_Video
https://www.loom.com/share/11161de353344561a8fbae03fa8c2b09?sid=2cf3df63-e696-4769-af1d-5a02e87bf5ed

