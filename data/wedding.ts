export interface WeddingConfig {
  couple: {
    groom: {
      name: string;
      fullName: string;
      description?: string;
    };
    bride: {
      name: string;
      fullName: string;
      parents: string;
      address: string;
    };
    monogram: string;
    invitationMessage: string;
    subMessage: string;
  };
  schedule: {
    dateDisplay: string;
    dayOfWeek: string;
    malayalamDate: string;
    timeDisplay: string;
    departureTime: string;
    targetIsoDateTime: string; // 2026-11-21T11:45:00+05:30
  };
  venue: {
    name: string;
    addressLine1: string;
    addressLine2: string;
    fullAddress: string;
    googleMapsSearchUrl: string;
    googleMapsDirectionsUrl: string;
    embedQuery: string;
  };
  family: {
    hosts: string;
    address: string;
    phoneNumbers: {
      display: string;
      raw: string;
      label?: string;
    }[];
  };
  regards: string[];
  share: {
    whatsappMessage: string;
    calendar: {
      title: string;
      description: string;
      location: string;
      startTime: string; // YYYYMMDDTHHMMSSZ or Google format
      endTime: string;
    };
  };
}

export const weddingData: WeddingConfig = {
  couple: {
    groom: {
      name: "Vishnuraj T.",
      fullName: "Vishnuraj T.",
      description: "Beloved son of T. Rajan & T. J. Kusumakumari",
    },
    bride: {
      name: "Josly Merin",
      fullName: "Josly Merin",
      parents: "Daughter of Mr. K. M. Varghese and Mrs. Sheela Varghese",
      address: "Kuzhangod Vadakkethil, Kidangoor, Pathanamthitta.",
    },
    monogram: "VJ",
    invitationMessage:
      "With great pleasure, we cordially invite you to the wedding of our beloved son",
    subMessage:
      "Two hearts, one beautiful journey. Join us as we celebrate the beginning of forever.",
  },
  schedule: {
    dateDisplay: "21 November 2026",
    dayOfWeek: "Saturday",
    malayalamDate: "1202 Vrischikam 5",
    timeDisplay: "11:45 AM to 12:00 Noon",
    departureTime: "10:30 AM",
    targetIsoDateTime: "2026-11-21T11:45:00+05:30",
  },
  venue: {
    name: "Chiramel Auditorium",
    addressLine1: "Irumbuzhikkara, Udayanapuram",
    addressLine2: "Vaikom, Kerala",
    fullAddress: "Chiramel Auditorium, Irumbuzhikkara, Udayanapuram, Vaikom.",
    googleMapsSearchUrl:
      "https://www.google.com/maps/search/?api=1&query=Chirammal+Auditorium+Udayanapuram+Vaikom",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Chirammal+Auditorium+Udayanapuram+Vaikom",
    embedQuery: "mal+Auditorium+Udayanapuram+Vaikom",
  },
  family: {
    hosts: "T. Rajan & T. J. Kusumakumari",
    address: "Madayil House, Vadakkenada, Vaippinpadam, Vaikom.",
    phoneNumbers: [
      { display: "9447809274", raw: "9447809274", label: "T. Rajan" },
      { display: "8848238961", raw: "8848238961", label: "Mobile" },
      { display: "9562919314", raw: "9562919314", label: "Mobile" },
    ],
  },
  regards: ["Rahulraj T.", "Sharanya P. M.", "Ashwathy Ashok"],
  share: {
    whatsappMessage:
      "You are cordially invited to the wedding of Vishnuraj T. and Josly Merin on 21 November 2026 at Chirammal Auditorium, Vaikom. We look forward to celebrating with you!",
    calendar: {
      title: "Wedding of Vishnuraj T. & Josly Merin",
      description:
        "Wedding ceremony of Vishnuraj T. with Josly Merin at Chiramel Auditorium, Udayanapuram, Vaikom. Muhurtham: 11:45 AM - 12:00 Noon.",
      location: "Chiramel Auditorium, Irumbuzhikkara, Udayanapuram, Vaikom",
      startTime: "20261121T061500Z", // 11:45 AM IST is 06:15 AM UTC
      endTime: "20261121T063000Z",   // 12:00 PM IST is 06:30 AM UTC
    },
  },
};

