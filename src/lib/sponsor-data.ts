export type Sponsor = {
  name: string;
  title: string;
  website: string;
  logo: string;
  desc?: string;
  tier?:
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
    website: "https://www.theeducationtree.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741429741/spon_logos/a8al3cmtgtt6y5suboc3.jpg",
    desc: "The Education Tree empowers youth through leadership, social initiatives, and creative learning, impacting students across 1,500+ colleges in India.",
    tier: "platinum",
  },
  {
    name: "jiosaavn",
    title: "music streaming partner",
    website: "https://www.jiosaavn.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741430792/spon_logos/hyendbng6jzgbjg3pohr.png",
    desc: "JioSaavn is an Indian music streaming service offering 80+ million songs, podcasts, and playlists in multiple languages with free and premium options.",
    tier: "platinum",
  },
  {
    name: "unstop",
    title: "pre-event partner",
    website: "https://unstop.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741429752/spon_logos/guqfrn99vviujkgavxew.jpg",
    desc: "Unstop is an early talent engagement and hiring platform connecting ~4.5 million students, freshers, and professionals with employers.",
    tier: "platinum",
  },
  {
    name: "upstox",
    title: "trading partner",
    website: "https://upstox.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741429767/spon_logos/nkpphrglus7amgaqrwnm.png",
    desc: "Upstox is an Indian online brokerage platform offering trading in stocks, commodities, currencies, mutual funds, and ETFs. Founded in 2009, it is backed by investors like Ratan Tata and Tiger Global. ",
    tier: "platinum",
  },
  {
    name: "chess.com",
    title: "chess event partner",
    website: "https://chess.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741429817/spon_logos/yusf4iamboyfscjhkbbh.png",
    desc: "Chess.com is a leading online platform for playing and learning chess, offering various game modes, training tools, and community features.",
    tier: "platinum",
  },
  {
    name: "yord india",
    title: "",
    website: "https://yordindia.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741429835/spon_logos/imyq3utdtuhdnuvhxcz6.jpg",
    desc: "",
    tier: "platinum",
  },
  {
    name: "sjvn",
    title: "",
    website: "https://sjvn.nic.in/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741429951/spon_logos/o8iu5k8yednvtigym46n.webp",
    desc: "",
    tier: "platinum",
  },
  {
    name: "hp tourism",
    title: "platinum sponsor",
    website: "https://himachaltourism.gov.in/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1742129758/spon_logos/wypqatsojsiocskiiuah.png",
    desc: "",
    tier: "platinum",
  },
  {
    name: "valorant",
    title: "valorant event sponsor",
    website: "https://playvalorant.com/en-us/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1742129801/spon_logos/fzbsfhbotufc86bg4bjj.svg",
    desc: "Riot Games, established in 2006, is an American video game developer and publisher renowned for titles like League of Legends and Valorant.",
    tier: "platinum",
  },
  {
    name: "zebronics",
    title: "",
    website: "https://zebronics.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1742129758/spon_logos/zgcb4ismxoawwyw7sgkb.webp",
    desc: "",
    tier: "platinum",
  },
  {
    name: "vrkaa",
    title: "e-sports partner",
    website: "https://vrkaa.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741504237/spon_logos/hcgguu2nbzh79rvhiil7.png",
    desc: "",
    tier: "platinum",
  },
  {
    name: "finlatics",
    title: "course partner",
    website: "https://www.finlatics.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741430653/spon_logos/skqqrzeqprayhsal3csb.jpg",
    desc: "Finlatics, established in June 2017, is a platform offering experiential learning in finance, business, technology, and data science.",
    tier: "platinum",
  },
  {
    name: "easemytrip",
    title: "vacation partner",
    website: "https://www.easemytrip.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741429986/spon_logos/xgrbt3npiip3gxqff9wn.jpg",
    desc: "EaseMyTrip is an Indian online travel company offering flight bookings, hotel reservations, holiday packages, and bus bookings.",
    tier: "platinum",
  },
  {
    name: "noticebard",
    title: "media partner",
    website: "https://noticebard.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741431326/spon_logos/boib1b5elxjld18wvjxd.png",
    desc:
      "NoticeBard is an online platform that publishes educational and professional opportunities for students" +
      " across various fields in India.",
    tier: "platinum",
  },
  {
    name: "rigbetel labs",
    title: "",
    website: "https://www.rigbetellabs.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741431216/spon_logos/vphwsgxav5holfbbxa4l.png",
    desc: "",
    tier: "platinum",
  },
  {
    name: "pathway",
    title: "",
    website: "https://pathway.com/",
    logo: "https://res.cloudinary.com/diqdg481x/image/upload/v1741430028/spon_logos/tuq3jmnkdf4h1od2kzzp.svg",
    desc: "",
    tier: "platinum",
  },
];
