export type Sponsor = {
  name: string;
  title: string;
  link: string;
  img: string;
  desc: string;
  tier:
    | "title"
    | "associate"
    | "platinum"
    | "gold"
    | "silver"
    | "bronze"
    | "event";
};

export const sponData: Sponsor[] = [
  {
    name: "the education tree",
    title: "youth community partner",
    link: "https://www.theeducationtree.com/",
    img: "https://placehold.co/600x400",
    desc: "The Education Tree empowers youth through leadership, social initiatives, and creative learning, impacting students across 1,500+ colleges in India.",
    tier: "platinum",
  },
  {
    name: "jiosaavn",
    title: "music streaming partner",
    link: "https://www.jiosaavn.com/",
    img: "https://placehold.co/600x400",
    desc: "JioSaavn is an Indian music streaming service offering 80+ million songs, podcasts, and playlists in multiple languages with free and premium options.",
    tier: "platinum",
  },
  {
    name: "unstop",
    title: "pre-event partner",
    link: "https://unstop.com/",
    img: "https://placehold.co/600x400",
    desc: "Unstop is an early talent engagement and hiring platform connecting ~4.5 million students, freshers, and professionals with employers.",
    tier: "platinum",
  },
  {
    name: "upstox",
    title: "trading partner",
    link: "https://upstox.com/",
    img: "https://placehold.co/600x400",
    desc: "Upstox is an Indian online brokerage platform offering trading in stocks, commodities, currencies, mutual funds, and ETFs. Founded in 2009, it is backed by investors like Ratan Tata and Tiger Global. ",
    tier: "platinum",
  },
  {
    name: "chess.com",
    title: "chess event partner",
    link: "https://chess.com/",
    img: "https://placehold.co/600x400",
    desc: "Chess.com is a leading online platform for playing and learning chess, offering various game modes, training tools, and community features.",
    tier: "platinum",
  },
  {
    name: "yord india",
    title: "",
    link: "https://yordindia.com/",
    img: "https://placehold.co/600x400",
    desc: "",
    tier: "platinum",
  },
  {
    name: "svjn",
    title: "",
    link: "https://svjn.nic.in/",
    img: "https://placehold.co/600x400",
    desc: "",
    tier: "platinum",
  },
  {
    name: "riot games",
    title: "valorant event sponsor",
    link: "https://www.riotgames.com/en",
    img: "https://placehold.co/600x400",
    desc: "Riot Games, established in 2006, is an American video game developer and publisher renowned for titles like League of Legends and Valorant.",
    tier: "platinum",
  },
  {
    name: "finlatics",
    title: "course partner",
    link: "https://www.finlatics.com/",
    img: "https://placehold.co/600x400",
    desc: "Finlatics, established in June 2017, is a platform offering experiential learning in finance, business, technology, and data science.",
    tier: "platinum",
  },
  {
    name: "easemytrip",
    title: "vacation partner",
    link: "https://www.easemytrip.com/",
    img: "https://placehold.co/600x400",
    desc: "EaseMyTrip is an Indian online travel company offering flight bookings, hotel reservations, holiday packages, and bus bookings.",
    tier: "platinum",
  },
  {
    name: "noticebard",
    title: "media partner",
    link: "https://noticebard.com/",
    img: "https://placehold.co/600x400",
    desc:
      "NoticeBard is an online platform that publishes educational and professional opportunities for students" +
      " across various fields in India.",
    tier: "platinum",
  },
  {
    name: "rigbetel labs",
    title: "",
    link: "https://www.rigbetellabs.com/",
    img: "https://placehold.co/600x400",
    desc: "",
    tier: "platinum",
  },
  {
    name: "pathway",
    title: "",
    link: "https://pathway.com/",
    img: "https://placehold.co/600x400",
    desc: "",
    tier: "platinum",
  },
];
