// data/portfolioData.ts

export const CLIENT_LOGOS = [
  { name: "TongErKhobor", src: "/logos/tongerkhobor.png", url: "https://www.instagram.com/tongerkhobor" },
  { name: "General Science Olympiad", src: "/logos/sciencebaze.png", url: "https://www.facebook.com/generalscienceolympiad" },
  { name: "Ta'atuf Foundation", src: "/logos/taatuf.png", url: "https://www.facebook.com/taatuf.foundation" },
  { name: "Willes Literary Club", src: "/logos/vb.png", url: "https://www.wlc.pro.bd" },
  { name: "RelaxStudio", src: "/logos/relax.png", url: "https://www.instagram.com/relaxstudio__" },
  { name: "Omni Diplomatic Forum", src: "/logos/odf.png", url: "https://www.facebook.com/OMNIDF" },
]; // [source: 1]

export const TESTIMONIALS = [
  { name: "Arifur Rahman Tahmid", text: "Unar sathe kaaj kora khubi interesting cz unar working experience er karone day by day new kichu shikha jay...", role: "President, Willes Literary Club (GEN-2)" },
  { name: "Mohammad Nasir", text: "What stands out about Fahim is his unique blend of design sense and technical automation. He doesn’t just design; he optimizes workflows.", role: "ScienceBaze" },
  { name: "Shamiul Haque Saad", text: "Fahim’s designs are clean, creative, and improving consistently. He has demonstrated good potential and dedication in his work.", role: "CEO, TongErKhobor" },
  { name: "Md Ashraful Islam", text: "Fahim is a remarkable addition to our foundation. He thinks beyond aesthetics, optimizing processes while delivering creative excellence.", role: "Founder, Ta'atuf Foundation" }
]; // [source: 1]

export const PACKAGES = [
  {
    id: "test-run",
    name: "3-Post Test Package",
    tagline: "Test my turnaround & quality with zero risk",
    price: "1,500 BDT",
    period: "One-Time",
    popular: false,
    features: [
      "3 High-Converting Social Posts",
      "Redesigned Brand Typography",
      "48-Hour Fast Delivery",
      "Source Files Included"
    ],
    waMessage: "Hi Fahim, I want to order the 3-Post Test Package for 1,500 BDT."
  },
  {
    id: "growth-retainer",
    name: "Growth Retainer",
    tagline: "Complete visual management for growing brands",
    price: "12,000 BDT",
    period: "/ Month",
    popular: true,
    features: [
      "12 Single Social Media Posts",
      "4 Carousel / Educational Posts",
      "2 YouTube/Ad Thumbnails",
      "1 Cover Banner Update",
      "Priority 24h Turnaround"
    ],
    waMessage: "Hi Fahim, I am interested in the Growth Retainer Package (12k BDT/mo)."
  },
  {
    id: "campaign-combo",
    name: "Event / Festive Launch",
    tagline: "Maximum reach for Eid, sales & product drops",
    price: "10,000 BDT",
    period: "/ Campaign",
    popular: false,
    features: [
      "1 Campaign Announcement Banner",
      "5 Discount / Promo Single Posts",
      "2 Catalog Carousel Posts",
      "3 Story Promo Templates"
    ],
    waMessage: "Hi Fahim, I want to discuss the Event Campaign Package for 10,000 BDT."
  }
];
