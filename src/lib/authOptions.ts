import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { connect } from "@/db-config/dbConfig";

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        connect();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          // Any variables you want to set to the session object MUST
          // be defined in the Mongoose Schema (requires restart)
          // https://stackoverflow.com/a/36522374
          session.user.id = sessionUser._id.toString();
          session.user.role = sessionUser.role;
          return session;
        }
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Email",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "bruce@wayne.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (credentials?.email && credentials?.password) {
          connect();

          // Check for user
          const foundUser = await User.findOne({ email: credentials.email });

          if (!foundUser) {
            return null;
          }

          // Compare password
          const validPassword = await bcrypt.compare(
            credentials.password,
            foundUser.password
          );

          if (!validPassword) {
            return null;
          }
          return foundUser;
        }

        return null;
      },
    }),
  ],
};
