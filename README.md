# Ritik Kamwal portfolio

Next.js portfolio with Firebase-backed testimonial submission and moderation.

## Firebase setup

1. In Firebase Console, open **Project settings > General > Your apps**. Create or select a Web app and copy its config into `.env.local` using `.env.example` as the template. The Firebase `appId` starts with `1:<sender-id>:web:`; a `G-...` value is a Google Analytics measurement ID and is not the app ID.
2. Open **Authentication > Sign-in method** and enable **Email/Password**.
3. Open **Authentication > Users > Add user** and create the email/password you want to use for the admin dashboard. There is deliberately no default password in the source code.
4. Set `NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL` in `.env.local` to that same email address. Keep the email in the `isAdmin()` function in `firestore.rules` identical.
5. Deploy the repository's `firestore.rules` file with `npx firebase-tools deploy --only firestore:rules --project ritik-kamwal-portfolio`, or paste those rules into **Firestore Database > Rules** and publish them.
6. Restart the development server after changing `.env.local`.

The app creates the `testimonials` collection automatically when the first testimonial is submitted. Do not create `contactMessages`; the current site does not use it.

Admin login is available at `/admin/login`. Use the email and password created in step 3. No `admins` collection is required; both the client and Firestore rules restrict administration to the configured email.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
