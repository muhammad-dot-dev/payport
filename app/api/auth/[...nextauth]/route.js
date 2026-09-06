import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
// import Facebook from "next-auth/providers/facebook";
// import Apple from "next-auth/providers/apple";



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
    if(account.provider === "github"){
      //Connect to database
      const client = await mongoose.connect();
      //Check if user is in database
      // const currentUSer = await client.db("users").collection("users").findOne({email:email})
    }
  }
}
});
// export async function GET(request) {}
 
// export async function HEAD(request) {}
 
// export async function POST(request) {}
export { handler as GET, handler as POST };