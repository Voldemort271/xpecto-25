# Xpecto '25 Development Website

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`. Learn about the file and
folder structure in the docs.

## Run the website

### Live link: [Xpecto '25](https://create.t3.gg)

### Local Development:

1. Clone the repo
2. Run the following commands:

```bash 
pnpm i
pnpm dev
```

## Tech used

- [Next.js 15](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Motion](https://motion.dev)
- [GSAP](https://gsap.com)
- [shadcn/ui](https://ui.shadcn.com/)
- [three.js](https://threejs.org/)
- [tRPC](https://trpc.io)
- [Clerk](https://clerk.dev)

## Contribution guidelines

- Name your commits meaningfully.
- Submit a pull request after you've done your changes.
- Format your code properly.
- We probably won't need to use the `start-database.sh` file given here, so it's best not to bother about that.
- The `DATABASE_URL` environment variable is commented out for now, but we will need to use that later. Take a took
  at the `env.js` file to learn about how the environment variables are validated here.
- Backend guys are encouraged to learn a bit about tRPC and how it can be used to make the backend simpler, as we've
  used it here.
- Frontend people, y'all got tons of different libraries to learn about now, so best to get started! 
