export interface Wish {
  id: string;
  name: string;
  relationship: string;
  message: string;
  blessingTag: string;
  createdAt: string;
  likes: number;
}

export const initialWishes: Wish[] = [
  {
    id: "wish-1",
    name: "Anoop & Meera",
    relationship: "Family Friend",
    message:
      "Wishing you both a lifetime of shared dreams, laughter, and divine grace. May your union be as auspicious and enduring as tradition. Heartfelt congratulations Vishnuraj & Josly!",
    blessingTag: "Eternal Love",
    createdAt: "2026-11-01T10:30:00.000Z",
    likes: 12,
  },
  {
    id: "wish-2",
    name: "Ashwin & Sneha",
    relationship: "Friend of Groom",
    message:
      "So overjoyed to celebrate this unforgettable chapter with you in Vaikom! May every tomorrow bring deeper friendship and boundless joy. Cheers to a wonderful lifetime ahead!",
    blessingTag: "Joy & Happiness",
    createdAt: "2026-11-02T14:15:00.000Z",
    likes: 9,
  },
  {
    id: "wish-3",
    name: "Marykutty Chacko",
    relationship: "Bride's Family",
    message:
      "Dearest Josly and Vishnuraj, may God shower your marriage with abundant peace, good health, and heavenly blessings. So proud and delighted for you both!",
    blessingTag: "Divine Blessings",
    createdAt: "2026-11-03T09:40:00.000Z",
    likes: 15,
  },
];
