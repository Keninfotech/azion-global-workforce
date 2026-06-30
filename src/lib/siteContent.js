import homeRaw from "../../1-Home.md?raw";
import aboutRaw from "../../2-About.md?raw";
import servicesRaw from "../../3-Services.md?raw";
import industriesRaw from "../../4-Industries.md?raw";
import processRaw from "../../5-Process.md?raw";
import whyRaw from "../../6-Why-AZION.md?raw";
import contactRaw from "../../7-Contact.md?raw";

const normalizeText = (value = "") =>
  value
    .replace(/\r/g, "")
    .replace(/â€”/g, " - ")
    .replace(/Â©/g, "©")
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€�/g, '"')
    .replace(/Â/g, "")
    .trim();

const stripMarkdown = (value = "") =>
  normalizeText(value)
    .replace(/^#+\s*/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\[(.*?)\]/g, "$1")
    .trim();

const getTitle = (raw) => stripMarkdown(raw.match(/^#\s+(.+)$/m)?.[1] ?? "");

const getSectionBody = (raw, heading) => {
  const normalized = normalizeText(raw);
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matcher = new RegExp(`##\\s+${escapedHeading}\\n([\\s\\S]*?)(?=\\n##\\s+|$)`);

  return normalizeText(normalized.match(matcher)?.[1] ?? "");
};

const getIntroBody = (raw) => {
  const normalized = normalizeText(raw);
  const content = normalized.replace(/^#\s+.+\n?/, "");

  return normalizeText(content.split(/\n##\s+/)[0] ?? "");
};

const getParagraphs = (text) =>
  normalizeText(text)
    .split(/\n\s*\n/)
    .map((paragraph) => stripMarkdown(paragraph))
    .filter(Boolean);

const getBullets = (text) =>
  normalizeText(text)
    .split("\n")
    .filter((line) => line.trim().startsWith("- "))
    .map((line) => stripMarkdown(line.replace(/^- /, "")));

const getBoldBlocks = (text) => {
  const matches = [...normalizeText(text).matchAll(/\*\*(.+?)\*\*\n([\s\S]*?)(?=\n\*\*|$)/g)];

  return matches.map((match) => ({
    title: stripMarkdown(match[1]),
    description: stripMarkdown(match[2]),
  }));
};

const getOrderedSteps = (text) =>
  normalizeText(text)
    .split("\n")
    .filter((line) => /^\d+\./.test(line.trim()))
    .map((line) => {
      const match = line.match(/^\d+\.\s+\*\*(.+?)\*\*\s+-\s+(.+)$/);

      return {
        title: stripMarkdown(match?.[1] ?? line),
        description: stripMarkdown(match?.[2] ?? ""),
      };
    });

const getCtas = (text) => [...normalizeText(text).matchAll(/\[([^\]]+)\]/g)].map((match) => stripMarkdown(match[1]));

const homeHeroBody = getSectionBody(homeRaw, "Hero Section");
const homeHeroParagraphs = getParagraphs(homeHeroBody).filter((paragraph) => !paragraph.includes("["));
const contactIntro = getIntroBody(contactRaw);
const contactFields = getBullets(getSectionBody(contactRaw, "Get in Touch")).filter(
  (field) => field.toLowerCase() !== "submit",
);

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Process", href: "/process" },
  { label: "Why AZION", href: "/why-azion" },
  { label: "Contact", href: "/contact" },
];

export const siteContent = {
  home: {
    title: getTitle(homeRaw),
    eyebrow: "International Recruitment Solutions",
    hero: {
      title: homeHeroParagraphs[0] ?? "AZION - Your Global Workforce Partner",
      lead: homeHeroParagraphs[1] ?? "",
      description: homeHeroParagraphs[2] ?? "",
      ctas: getCtas(homeHeroBody),
    },
    intro: stripMarkdown(getSectionBody(homeRaw, "Intro Strip")),
    highlights: getBullets(getSectionBody(homeRaw, "Quick Highlights")),
    trustBadges: ["Europe", "Australia", "GCC", "Bangalore HQ"],
  },
  about: {
    title: getTitle(aboutRaw),
    eyebrow: "Built For Cross-Border Hiring",
    sections: [
      { heading: "Who We Are", paragraphs: getParagraphs(getSectionBody(aboutRaw, "Who We Are")) },
      { heading: "Our Mission", paragraphs: getParagraphs(getSectionBody(aboutRaw, "Our Mission")) },
      { heading: "Our Vision", paragraphs: getParagraphs(getSectionBody(aboutRaw, "Our Vision")) },
      {
        heading: "International Recruitment Experience",
        paragraphs: getParagraphs(getSectionBody(aboutRaw, "International Recruitment Experience")),
      },
    ],
  },
  services: {
    title: getTitle(servicesRaw),
    eyebrow: "Solutions Across The Hiring Lifecycle",
    intro: getParagraphs(getIntroBody(servicesRaw))[0] ?? "",
    coreServices: getBoldBlocks(getSectionBody(servicesRaw, "Core Recruitment Services")),
    workforce: {
      intro: getParagraphs(getSectionBody(servicesRaw, "Workforce Solutions"))[0] ?? "",
      bullets: getBullets(getSectionBody(servicesRaw, "Workforce Solutions")),
    },
  },
  industries: {
    title: getTitle(industriesRaw),
    eyebrow: "Sector-Specific Talent Coverage",
    cards: getBoldBlocks(
      normalizeText(industriesRaw)
        .replace(/^#\s+.+\n?/, "")
        .split(/\n##\s+Footer/)[0],
    ),
  },
  process: {
    title: getTitle(processRaw),
    eyebrow: "A Structured Delivery Model",
    intro: getParagraphs(getIntroBody(processRaw))[0] ?? "",
    steps: getOrderedSteps(processRaw),
  },
  why: {
    title: getTitle(whyRaw),
    eyebrow: "Why Companies Partner With AZION",
    intro: getParagraphs(getIntroBody(whyRaw))[0] ?? "",
    pillars: getBoldBlocks(
      normalizeText(whyRaw)
        .replace(/^#\s+.+\n?/, "")
        .split(/\n##\s+Footer/)[0],
    ),
  },
  contact: {
    title: getTitle(contactRaw),
    eyebrow: "Let's Build The Right Workforce Together",
    intro: getParagraphs(contactIntro)[0] ?? "",
    office: {
      name: "AZION",
      location: stripMarkdown(contactIntro.match(/\*\*AZION\*\*\n(.+?)\n\n\*\*Email:/s)?.[1] ?? "Bangalore, Karnataka, India"),
      email: contactIntro.match(/\*\*Email:\*\*\s+(.+)/)?.[1]?.trim() ?? "azionoverseas@gmail.com",
    },
    formFields: contactFields,
  },
};
