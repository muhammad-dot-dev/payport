import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
// import Facebook from "next-auth/providers/facebook";
// import Apple from "next-auth/providers/apple";
import mongoose from "mongoose";
import User from "../../../models/User";
import Payment from "../../../models/Payment";
import connectDB from "../../../db/connectDb";



export const handler = NextAuth({

  providers: [
    // Google({
    //   clientId: process.env.AUTH_GOOGLE_ID,
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET,
    // }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    // Facebook({
    //   clientId: process.env.AUTH_FACEBOOK_ID,
    //   clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    // }),

    // Apple({
    //   clientId: process.env.AUTH_APPLE_ID,
    //   clientSecret: process.env.AUTH_APPLE_SECRET,
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (account.provider === "github") {

        await connectDB();
        //Connect to database
        // const client = await mongoose.connect("mongodb://localhost:27017/PayPort");
        //Check if user is in database
        const currentUser = await User.findOne({ email: user.email })
        if (!currentUser) {
          const newUser = new User({
            email: user.email,
            username: user.email.split("@")[0]
          })
          await newUser.save();
          user.name = newUser.username;

        }

        //We have to return true otherwise it will not allow to sign i(Permission denied)
      }
      // else{
      //   user.name = currentUser.username;
      // }
      return true
    },
    async session({ session, user, token }) {

      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email })

      if (dbUser) {
        session.user.name = dbUser.username;
      }
      return session
    }
  }
});
// export async function GET(request) {}

// export async function HEAD(request) {}

// export async function POST(request) {}
export { handler as GET, handler as POST };