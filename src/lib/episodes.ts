export interface Timestamp {
  time: string
  label: string
}

export interface Episode {
  id: string
  slug: string
  episodeNumber?: number
  title: string
  guest: string
  guestRole: string
  date: string
  duration?: string
  description: string
  url: string
  artworkUrl?: string
  themes: string[]
  country: string
  tags: string[]
  // Rich content for episode landing pages
  bio?: string
  topics?: string[]
  timestamps?: Timestamp[]
  pullQuote?: string
}

export const episodes: Episode[] = [
  {
    id: '1',
    slug: 'how-to-develop-ai-that-addresses-health-inequities',
    episodeNumber: 24,
    title: 'How to develop AI that addresses health inequities',
    guest: 'Joe Alderman',
    guestRole: 'Anaesthetist and AI academic',
    date: 'Mar 2026',
    description: 'What it takes to deploy and monitor AI in healthcare with equity at the centre.',
    url: 'https://www.gpodh.org/how-to-develop-ai-that-addresses-health-inequities/',
    themes: ['AI', 'Health Equity', 'Clinical AI'],
    country: 'United Kingdom',
    tags: ['artificial intelligence', 'inequities', 'diagnostics', 'deployment', 'monitoring'],
  },
  {
    id: '2',
    slug: 'digital-innovation-in-humanitarian-settings',
    episodeNumber: 23,
    title: 'Digital innovation in humanitarian settings',
    guest: 'Javier Elkin',
    guestRole: 'International Committee of the Red Cross',
    date: 'Feb 2026',
    description: 'How global organisations built to respond to conflict are navigating digital transformation.',
    url: 'https://www.gpodh.org/javier-elkin-digital-innovation-humanitarian/',
    themes: ['Humanitarian', 'Innovation', 'Implementation'],
    country: 'Switzerland',
    tags: ['conflict', 'humanitarian', 'digital transformation', 'ICRC', 'Red Cross', 'crisis'],
  },
  {
    id: '3',
    slug: 'usaid-cuts-womens-health-and-leading-the-right-way',
    episodeNumber: 21,
    title: "USAID cuts, women's health and leading the right way",
    guest: 'Patty Mecheal',
    guestRole: "CEO, women's health organisation",
    date: 'Jan 2026',
    description: "Navigating the collapse of development funding and what comes next for women's health.",
    url: 'https://www.gpodh.org/usaid-cuts-womens-health/',
    themes: ["Women's Health", 'Global Health Funding', 'Leadership'],
    country: 'United States',
    tags: ['USAID', 'funding', 'development finance', 'maternal health', 'women', 'aid cuts'],
  },
  {
    id: '4',
    slug: 'nadia-kadhim-digital-identity-for-refugees',
    episodeNumber: 22,
    title: 'Why displaced people need a digital identity',
    guest: 'Nadia Kadhim',
    guestRole: 'Co-founder and CEO, Naq',
    date: 'Jan 2026',
    duration: '50 min',
    description: 'Digital identity and healthcare access for refugees and displaced populations.',
    url: 'https://www.gpodh.org/nadia-kadhim-digital-identity-for-refugees/',
    themes: ['Digital Identity', 'Refugees', 'Access'],
    country: 'International',
    tags: ['identity', 'refugees', 'displaced populations', 'digital rights', 'inclusion', 'stateless'],
    bio: "Nadia Kadhim is an Iraqi-Surinamese-Dutch co-founder and CEO of Naq, a compliance automation platform helping organisations across the UK and Europe streamline data security and compliance. Trained as a Child Rights Lawyer and GDPR expert, she holds a Master's in Public International Law with a focus on International Humanitarian Law and children's rights. She began her career as a Human Rights professional at UNICEF before moving into data security and compliance. Nadia's father was a refugee, which shapes her commitment to digital rights for displaced people. By 2022 she had received a Most Inspiring Women in Cyber Award and been named on the Forbes 30 Under 30 list.",
    topics: [
      'Why digital identity for displaced people is broken',
      'Real barriers to healthcare access created by identity gaps',
      'Why healthcare systems are not set up for meaningful care for refugees',
      'Can political will exist when agendas are moving the wrong way?',
      'Rising displacement from conflict and climate: an everybody problem',
      'Ownership and security of health data',
      'Ethics and regulatory compliance in digital health',
      "Nadia's recommendations for policy makers and digital health founders",
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction to digital health and human rights' },
      { time: '07:19', label: 'Data, identity, and access to healthcare' },
      { time: '10:39', label: 'Challenges faced by refugees in healthcare' },
      { time: '15:21', label: 'Real-life stories of refugees and healthcare access' },
      { time: '20:32', label: 'Why no solution yet?' },
      { time: '23:01', label: 'The future of healthcare for displaced people' },
      { time: '30:29', label: 'The role of funding and multi-stakeholder approaches' },
      { time: '31:59', label: 'Data and human lives: the health data poverty problem' },
      { time: '34:22', label: 'Ethics and regulatory compliance in digital health' },
      { time: '38:22', label: 'Ownership and security of health data' },
      { time: '43:13', label: "Nadia's recommendations for policy makers and founders" },
    ],
    pullQuote: 'This is an everybody problem, which is part of why it is so hard to solve.',
  },
  {
    id: '5',
    slug: 'community-health-workers-and-digital-tools',
    episodeNumber: 20,
    title: 'Community health workers and digital tools in Sub-Saharan Africa',
    guest: 'Dr Amara Diallo',
    guestRole: 'Digital Health Lead, MSF',
    date: 'Dec 2025',
    description: 'How community health workers are using and being shaped by digital tools at the last mile.',
    url: 'https://gpodh.org',
    themes: ['Community Health', 'Africa', 'Last Mile'],
    country: 'Guinea',
    tags: ['community health workers', 'sub-saharan africa', 'MSF', 'last mile', 'mobile health', 'frontline'],
  },
  {
    id: '6',
    slug: 'regulation-safety-and-the-global-south',
    episodeNumber: 19,
    title: 'Regulation, safety and the global South',
    guest: 'Dr Maria Santos',
    guestRole: 'Health Regulatory Advisor, WHO',
    date: 'Nov 2025',
    description: 'What regulatory frameworks for digital health look like outside of the US and EU.',
    url: 'https://gpodh.org',
    themes: ['Regulation', 'Policy', 'Global South'],
    country: 'Brazil',
    tags: ['regulation', 'safety', 'WHO', 'policy', 'low-income', 'middle-income', 'governance'],
  },
  {
    id: '7',
    slug: 'maternal-health-tech-what-works-and-what-does-not',
    episodeNumber: 18,
    title: 'Maternal health tech: what works and what does not',
    guest: 'Dr Fatima Yusuf',
    guestRole: 'OB/GYN and Digital Health Researcher',
    date: 'Oct 2025',
    description: 'An honest assessment of digital health in maternal and newborn care across LMICs.',
    url: 'https://gpodh.org',
    themes: ['Maternal Health', 'Evidence', 'Implementation'],
    country: 'Nigeria',
    tags: ['maternal', 'newborn', 'obstetrics', 'evidence', 'LMICs', 'pregnancy', 'antenatal'],
  },
  {
    id: '8',
    slug: 'mental-health-apps-and-the-global-mental-health-crisis',
    episodeNumber: 17,
    title: 'Mental health apps and the global mental health crisis',
    guest: 'Dr James Okafor',
    guestRole: 'Psychiatrist, Lagos University Teaching Hospital',
    date: 'Sep 2025',
    description: 'The gap between the mental health app market and the populations who need it most.',
    url: 'https://gpodh.org',
    themes: ['Mental Health', 'Apps', 'Africa'],
    country: 'Nigeria',
    tags: ['mental health', 'apps', 'psychiatry', 'Lagos', 'access', 'depression', 'anxiety'],
  },
]

export const ALL_THEMES = [...new Set(episodes.flatMap((e) => e.themes))].sort()
export const ALL_COUNTRIES = [...new Set(episodes.map((e) => e.country))].sort()
