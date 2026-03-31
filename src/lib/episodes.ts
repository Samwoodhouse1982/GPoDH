export interface Timestamp {
  time: string
  label: string
}

export interface Episode {
  id: string
  slug: string
  episodeNumber?: number | string
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
  // Embed player URLs - paste the full share/embed URL from each platform:
  //   Transistor: copy the share link from share.transistor.fm/e/... and paste as-is
  //   Spotify episode:    open.spotify.com/episode/{spotifyEpisodeId}
  //   YouTube video:      youtube.com/watch?v={youtubeVideoId}
  transistorUrl?: string      // full URL e.g. "https://share.transistor.fm/e/abc12345"
  spotifyEpisodeId?: string
  youtubeVideoId?: string
  // Rich content for episode landing pages
  bio?: string
  topics?: string[]
  timestamps?: Timestamp[]
  pullQuote?: string
  transcript?: string
  guestLinkedIn?: string
}

export const episodes: Episode[] = [
  {
    id: '1',
    slug: 'how-to-develop-ai-that-addresses-health-inequities',
    episodeNumber: 25,
    title: 'How to develop AI that addresses health inequities',
    guest: 'Joe Alderman',
    guestRole: 'NHS Anaesthetist and NIHR Clinical Lecturer in AI, University of Birmingham',
    artworkUrl: '/guests/joe-alderman.jpg',
    date: 'Mar 2026',
    description: 'Joe Alderman has a rare double view: anaesthetist by night, AI academic by day. His insights on what it takes to deploy and monitor AI in healthcare - with a lens on not leaving people behind - are relevant wherever in the world you are. We cover health data poverty, the STANDING Together initiative, algorithmic bias, LLM safety for patients and clinicians, anti-patterns in the industry, and what people building in low-resource settings specifically need to think about.',
    url: 'https://www.gpodh.org/how-to-develop-ai-that-addresses-health-inequities/',
    themes: ['AI', 'Health Equity', 'Clinical AI', 'Regulation'],
    country: 'United Kingdom',
    tags: ['AI', 'health inequities', 'health data poverty', 'STANDING Together', 'algorithmic bias', 'LLMs', 'regulation', 'MHRA', 'chatbot', 'clinical AI', 'inverse care law', 'NHS'],
    topics: [
      'We\'re starting with the dataset or the technology we happen to have, instead of working backwards from what we\'re fundamentally trying to achieve',
      'Health data poverty and the inverse care law: how algorithmic healthcare can amplify existing inequities',
      'The STANDING Together initiative: where things are now, two years on from episode 1',
      'In the UK, life expectancy is falling in some areas. Health inequalities are rising. This is not a tech deficiency problem - it\'s a whole society problem',
      'What a responsible development team can do starting tomorrow to be more proactive about underserved communities',
      'Algorithmic bias: systematic errors are more dangerous than human errors because they scale to millions in one morning',
      'The regulation of LLMs for healthcare: why it\'s harder than for narrow AI, and what the MHRA\'s AI Commission is working on',
      'How patients and clinicians can think more critically about which tasks to use Gen AI for, and how to think about safety and liability',
      'The Health Chatbot Users\' Guide: building tools to help lay people navigate this new world',
      'Why the risk-benefit calculation inverts in low-resource settings - and why that doesn\'t remove the responsibility to do good engineering',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction and Joe\'s work' },
      { time: '06:36', label: 'The role of AI in patient care' },
      { time: '07:52', label: 'Navigating AI risks and benefits' },
      { time: '18:13', label: 'Addressing health data poverty' },
      { time: '24:28', label: 'Building responsible AI systems' },
      { time: '30:18', label: 'Exploring large language models in healthcare' },
      { time: '34:05', label: 'Addressing bias and representativeness in AI models' },
      { time: '40:04', label: 'Navigating regulatory challenges for AI technologies' },
      { time: '40:51', label: 'Empowering patients in the age of AI' },
      { time: '44:32', label: 'Public perception and trust in digital health' },
      { time: '47:00', label: 'Identifying real problems in healthcare technology' },
      { time: '52:00', label: 'The future of AI in healthcare' },
      { time: '55:29', label: 'Joe\'s insights for those building in low-resource settings' },
      { time: '56:57', label: 'Book recommendation and critical thinking for patients and clinicians' },
    ],
    pullQuote: 'We\'re starting with the dataset or the technology we happen to have, instead of working backwards from what we are fundamentally trying to achieve in the world.',
    bio: 'Joe Alderman is an NHS anaesthetist in Birmingham and an NIHR Clinical Lecturer (assistant professor) in AI and digital health at the University of Birmingham. He leads mixed-methods research and policy engagement on getting the most from AI in healthcare - including the STANDING Together initiative on health data poverty and algorithmic bias. He recently founded an international initiative to build the Health Chatbot Users\' Guide, providing practical guidance for patients using LLMs to manage their own health.',
    transcript: `Joseph Alderman (00:00)
One big thing that frequently annoys me about the sector is solving the easy things or fixing problems that aren't really problems. It's often tempting to reach for the easy, or to say: we have this dataset, what can we do with it? Rather than: fundamentally, what are we trying to achieve in the real world? What pain points are we trying to fix? What system are we trying to make more efficient? If you don't understand the system you're developing for, if you don't understand the people that interact with that system, it's likely that your solution will be off piste.

And it's not enough to play lip service to this by speaking to one doctor or one patient. Truly understanding a system is much more than having one perspective. Meaningful engagement with clinical teams who live and breathe this stuff, and meaningful engagement with patients who live with these diseases - that's where the best products will come from.

Shubhanan Upadhyay (01:56)
The people who need healthcare the most are the least likely to receive it. That's the inverse care law. And health data poverty can exacerbate that - if you're developing an AI algorithm, you're training it on data that is available. The data that exists inherently excludes underserved communities, people who aren't accessing healthcare, people in rural areas, people on paper records or no records at all. It's with this in mind that I'm really thrilled to talk to Joe Alderman - an academic fighting the fight around policy, regulation, and what it takes to develop and validate AI with the lens of not leaving people behind.

Joseph Alderman (08:14)
I think sometimes we have black and white positions in healthcare AI. One extreme: we'll all be replaced by AI. Other extreme: it's too dangerous, we'll never use it. Neither is right. What seems more likely is that the way we practice healthcare will change - in the same way that randomised control trials, evidence-based medicine, and surgery itself weren't around forever. Things change. AI feels like one of those moments.

Direct-to-consumer language models can provide day-by-day coaching on managing chronic conditions - asthma, eczema - in a way that a specialist appointment every three months can't. Whether or not they're any good at it is a different question. But delivering that at scale, daily, is something they can do. As the technology improves, the way we deliver outpatient medicine will shift somewhat.

Joseph Alderman (12:36)
I on a daily basis in my anaesthetic practice will be asked to make some estimation of someone's risk - say, for an emergency laparotomy. We use a tool called the National Emergency Laparotomy Audit Risk Calculator. It's certainly better than licking my finger and feeling the wind. But whenever we drop an algorithm into practice, there will be performance gaps. It'll work well in some cases and less well in others. And if we don't understand the nature of those errors, we risk putting certain groups at risk of harm.

The risk with algorithms is that they can be systematically wrong. Whereas human errors don't all multiply in the same direction, an algorithm making the wrong call could affect millions of patients in one morning. That, to me, is more worrying.

Joseph Alderman (19:50)
On the STANDING Together initiative: when I first joined the team back in 2022, the understanding of algorithmic bias was still developing. Obermeier's seminal work showing that an algorithm in the States to prioritise healthcare expenditure systematically disadvantaged Black patients - that used to get gasps from an audience. Now it's much better understood.

But I don't think it's solvable. If we're going to continue to have societies which advantage certain people over others, if we're going to continue to have social deprivation, we can't expect our datasets not to show bias. Work by Professor Michael Marmot shows that inequalities are rising in the UK, life expectancy in some areas is falling. This is not a data problem or an algorithm problem. It's a social problem. And you can't fix an underlying social issue with technical fiddling with datasets. You can mitigate, but you can't eliminate it.

Joseph Alderman (24:28)
For a development team that wants to act responsibly: first, understand who your algorithm is for. You can't say "this is for everyone." Who specifically? Adults, kids, primary care, secondary care? Then: who are the groups you're most worried about hurting? Groups already disadvantaged in the system - by race, ethnicity, housing, employment, rural location, addiction, care responsibilities. Then proactively structure an evaluation that can disprove the hypothesis that your algorithm is biased for those groups. And be transparent about what you found - whether good or bad.

This is not a nice-to-have. Many products will live and die based on their safety and quality metrics. Seeing this as a nice-to-have would be a real mistake.

Joseph Alderman (36:03)
On LLMs: closed-source models mean you can't examine what training data they were built on. We know that when you speak to a language model in certain dialects or ways of phrasing, you get different responses - so if your users ask questions in language more common in certain communities, the model may give them different answers. That's undesirable. Engineering teams might not even think about it.

If you're working with frontier models from a hyperscaler, the hyperscaler might update the model - and that could change performance characteristics of your tool without you knowing. This makes LLMs in healthcare much less predictable than narrow AI systems. Not impossible to work with responsibly, but much more challenging.

Joseph Alderman (40:51)
I recently founded an initiative to build the Health Chatbot Users' Guide - because millions of patients worldwide are already using direct-to-consumer LLMs to manage their own health. It's not our job as physicians to say no. But it's really important that we help the public understand what the risks and opportunities are. When we're delivering health technology outside of the healthcare sector - just the patient and the technology company, no doctor or nurse involved - what responsibilities is the patient now taking on that they didn't have before? What responsibilities is the tech company taking on?

Joseph Alderman (55:44)
For people building in low-resource settings: the risk-benefit profile inverts. In an advanced healthcare system, deploying LLMs can cause harm because people already have access to relatively good care. If the baseline is no access or extremely inequitable access, even an imperfect tool changes the calculation. But it does not absolve you of responsibility. You still have an obligation to do the good engineering work, understand the problem, do the evidence generation, and mitigate risks. The context is different. The responsibilities are not.

For books: How Big Things Get Done by Bent Flyvbjerg - on why big projects go wrong and what the common themes around planning are. And The Future of the Professions by Richard and Daniel Susskind - on what the future of work looks like in healthcare and other professions.`,
    transistorUrl: 'https://share.transistor.fm/e/0cb86e83',
  },
  {
    id: '19',
    slug: 'ethics-for-digital-health-companies',
    episodeNumber: '10B',
    title: 'Ethics for digital health companies',
    guest: 'Jess Morley',
    guestRole: 'Digital Ethics Center, Yale University',
    artworkUrl: '/guests/jess-morley.jpg',
    date: 'Feb 2025',
    description: 'A special bonus episode: a focused cut of the conversation with Jess Morley on making ethics a real business priority for digital health companies - not a nice-to-have. How do you stop your ethical initiative from getting kicked down the roadmap when good intentions meet business realities?',
    url: 'https://www.gpodh.org/digital-mental-health-research-insights/',
    themes: ['AI Ethics', 'Policy', 'AI'],
    country: 'International',
    tags: ['ethics', 'digital health companies', 'product management', 'AI ethics', 'Yale', 'founders', 'regulation', 'minimum viable ethical product'],
    topics: [
      'How to move ethical approaches from "nice to have" to a genuine business priority',
      'The minimum viable ethical product (MVEP): building ethics into everyday product practices',
      'Why ethics is risk mitigation - not just a moral choice',
      'Lessons from care.data and GPDPR: the cost of ignoring social license',
      'Core ethics concepts explained: beneficence, non-maleficence, autonomy, justice, explainability',
      'Framing regulation as an enabler, not a stifler',
      'Practical takeaways for product managers, founders, engineers, and clinical safety officers',
    ],
    transcript: `Shubs Upadhyay (00:00)
To a lot of people, ethics is kind of a nebulous fuzzy concept. So hey, we've got this course, the WHO have a course, you do it and you're like, tick, like ethics is done. And actually, people have really good intentions around it. And yes, this is our mindset. This is how we're going to do it. We're going to create these ethical principles. And then what happens, I think, which is the key thing is these intentions bump up against like business realities. So product prioritization conversations. Hey, this is not a business priority right now. How can people with good intentions negotiate these things in a really good way?

Jess (00:38)
Yeah, so I think for me, ethics is primarily a way of thinking. And the best way I think you can sort of clearly understand it, actually is a metaphor that my prof. Luciano Floridi uses all the time. If you think about it, law being the rules of the game and ethics being how you win. So ethics is really that sprinkling on the top of how you make sure that something doesn't really massively backfire in a way that would be damaging to society, but also damaging to your business model.

Within ethics, then there tend to be the main way in which people get into it, at least in this domain, in the space of digital health or technology anyway, is by talking through different principles, the most common of which are beneficence, non-maleficence, autonomy, justice, and explainability. So very, very briefly, beneficence is essentially do good. Non-maleficence is effectively do no harm. Autonomy is protect the individual's right to determine their own life. Justice is a complicated one and people get really controversial about what that means. They sometimes think it means diversity, sometimes they think it means fairness. There are upwards of 33 different definitions of fairness.

And so it's very complicated, but normally in the space of health, there are sort of two pillars of justice: equality and equity. Equality basically meaning everybody gets the same outcomes or access, and equity meaning everybody gets what they need in order to achieve the same outcome. And then explainability is really about: do you understand what an algorithm is doing?

Then there are some sort of subsidiary terms that often get banded around - accountability and transparency are probably two of the main ones. Accountability is essentially who do I point the finger at if something goes wrong? And transparency is really the mechanism that enables that accountability. And then validation, calibration and evaluation. Validation: does the thing do what it says it does? Calibration: what tweaks need to be made to make something work in a specific local context? And evaluation: what has happened as a result of that algorithm being used in real time.

Shubs Upadhyay (04:07)
Thanks, Jess. That's really useful. What's your take on how we can get ethical principles from being a nice to have to a business priority for a vendor?

Jess (04:22)
So I think there are a few different ways of talking about it. The first one is the reason why people, especially vendors and SMEs, are sometimes reticent. A few years ago we went out and surveyed people and did interviews - the number one comment was: it's expensive. And it eats into the bottom line.

I think the first way to change this is to get away from the narrative that ethics is just an extra thing. You can build ethics into your everyday practices without it necessarily being seen as an extra thing. If you're making sure you have representative data sets and making sure that things perform equally for everyone - yes, that might feel like extra hoops. But there's a different way of seeing it: this means I get to sell my product to more people.

So that's sort of number one. How do you get to the MVEP - the minimum viable ethical product? What are the things that just mean we don't let AI get away with a different standard to any other technology? You build those concepts into your everyday business as usual.

The second thing is that policy has an enormous role to play. Rhetoric actually has an enormous amount of shaping power. That is how people go in and pitch. That is how you win contracts with the government. That is how you get grants as an academic researcher. And I think we have lost good shaping rhetoric from government about saying: these are the ethical practices we want to see.

And the third, more cynical way of framing it: this also stops you from having egg on your face. The clearest example I can give is care.data and GPDPR. The government wanted to pool electronic health records and make them accessible to innovators. There was massive public backlash. They paused the whole thing. Then in 2021, they tried to do the exact same thing with the exact same result. All of those projects were entirely legal - but they failed to understand the social license. They failed to understand that there was a social reticence to the idea. That is where ethical thinking and ethical foresight analysis can help. It is risk mitigation.

Shubs Upadhyay (11:39)
I really like that. And actually, if I relate that to my own experience - the times when it really worked was when we used it in pre-mortems, risk storming sessions, where clinicians were talking with designers and engineers about how we're going to be deploying in this context. Applying equity as a quality pillar perspective. What could go wrong here? Therefore, what do we need to do?

I'm a product manager, a designer, a clinical safety officer, a founder. What can I take away in action? What can I take to my everyday work and decision making?

Jess (12:48)
Biggest sort of summary takeaway: don't fall foul of AI exceptionalism. Anything that you would apply to any other form of technology, apply it to AI. There is no clinical safety officer who would buy a blood pressure cuff without knowing it was calibrated and tested. So why would you do that if you were buying an AI or digital health solution?

On the regulation point: frame regulation as an enabler. Regulation at the moment has a really bad rep. We can think of regulation as being an inherent good. What we can design is regulatory-friendly innovation rather than innovation-friendly regulation - and make sure that the regulation is designed in a way that it is an enabler, not a stifler.

Shubs Upadhyay (14:31)
My quick takeaways: three to five years ago we were really pro-ethical and this was seen as a strategic advantage. You see a shift now because of the macroeconomic climate. Second: build ethics into your everyday product thinking. Third: think critically about whether AI is really the right thing for the outcome you want - who decided this, what's the opportunity cost? And the fourth one I'll leave people with as a mindset: be sceptically optimistic.

Jess (16:08)
Yes. Definitely. Thanks so much for the conversation.

Shubs Upadhyay (16:13)
Jess, it's been really, really insightful. Thank you so much.`,
  },
  {
    id: '23',
    slug: 'from-crisis-to-revolution-why-africas-moment-is-now-a-healthtech-vcs-case',
    episodeNumber: 14,
    title: 'From crisis to revolution: why Africa\'s moment is now, a healthtech VC\'s case',
    guest: 'Rowena Luk',
    guestRole: 'Managing Partner, Africa Health Ventures',
    date: 'May 2025',
    description: 'A healthtech investor\'s view on healthcare in Africa over the next 10 years. Rowena Luk has built and scaled digital health in over 40 African countries. Now she\'s backing founders through her VC firm - and makes a measured, compelling case for why this moment of crisis is also the biggest opportunity Africa has seen.',
    url: 'https://www.gpodh.org/from-crisis-to-revolution-why-africas-moment-is-now-a-healthtech-vcs-case/',
    themes: ['Africa', 'Health Equity', 'Global Health Funding', 'Innovation', 'Implementation'],
    country: 'Africa',
    tags: ['Africa', 'VC', 'impact investing', 'USAID', 'aid cuts', 'Africa Health Ventures', 'distribution', 'infrastructure', 'diagnostics', 'healthcare systems'],
    topics: [
      'Why this is Africa\'s moment - Rowena\'s hard-metrics business case for investing now',
      'How VC funding differs from philanthropy: 10-year horizons versus short program cycles',
      'Meet the market where it is: Africa is not homogenous - do the work to understand what\'s needed now',
      'Myths and realities of investing in Africa: checking your biases and mental models at the door',
      'Why distribution and infrastructure are as important as the technology itself',
      'How the USAID cuts have accelerated the case for building resilient, locally accountable businesses',
      'Conflating positive health outcomes with a viable organisation - and why that\'s a mistake',
      'Spotlight on portfolio startups: Remedy (Egypt) and AI Diagnostics (South Africa)',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction to digital health in Africa' },
      { time: '04:36', label: 'Rowena\'s journey in digital health' },
      { time: '06:43', label: 'The investing landscape in Africa' },
      { time: '13:19', label: 'The case for VC investment over philanthropic funding' },
      { time: '20:47', label: 'Reimagining healthcare in Africa: building resilient health systems' },
      { time: '26:00', label: 'Do VCs see value beyond financial returns?' },
      { time: '29:08', label: 'Myths and realities of investing in Africa' },
      { time: '36:14', label: 'Understanding investment biases in Africa' },
      { time: '38:39', label: 'Identifying market needs and product diversity' },
      { time: '40:44', label: 'Evaluating healthcare solutions and market readiness' },
      { time: '42:22', label: 'Spotlight on innovative startups' },
      { time: '46:26', label: 'Learning from past experiences' },
      { time: '51:56', label: 'Key tips for building in underserved communities' },
      { time: '54:30', label: 'Getting started with impact investing' },
      { time: '54:54', label: 'The future of healthcare in Africa' },
    ],
    pullQuote: 'If you\'re in Africa like I am, and you\'re investing, it\'s not impact investing - it\'s just investing.',
    bio: 'Rowena Luk is the Managing Partner of Africa Health Ventures, a pan-African seed fund investing in healthcare innovations that will dramatically improve access and quality of care on the continent and around the world. A healthtech founder, entrepreneur, and software engineer, she has deep experience scaling healthtech in 40 countries across Africa. Previously, Rowena was a Director at Madiro, an impact fund investing in healthcare in Africa; CSO at Dimagi, a social enterprise deploying digital health to 130 countries; and founder of a digital health nonprofit in West Africa. She lives in South Africa.',
    transcript: `Rowena (00:00)
In terms of where we are right now with global health, it's a scary time. Having worked in this space for the past 20 years, I know dozens of organizations - thousand-person organizations - that have basically disappeared in the course of a week or two. The industry is in turmoil.

At a macro scale, USAID has cut 80% of its programs, the WHO is downsizing by 20%. It is a true moment of - one might say crisis, one might say transformation - for the global health community.

But Africa isn't going anywhere. If you're in Africa like I am, and you're investing, it's not impact investing, it's just investing. It's just recognising that there's going to be half a billion people born here in the next 10 years. And those people are going to need healthcare. Healthcare is a defensive market. Whatever's happening with global macroeconomics, those people are going to need medicines, they're going to be delivering babies. That is an undeniable market growth - an opportunity not just to meet the need of the moment, but to create efficient, scalable innovations that will deliver healthcare effectively to that population. The moment, I really believe, is now.

Shubhanan Upadhyay (02:04)
Rowena, I consider you as one of the OGs of bringing visibility to digital health in Africa. Please tell us about your journey and the work you're doing with Africa Health Ventures.

Rowena (02:35)
I'm originally a software engineer from Canada. Over 20 years, I've built two social enterprises and two nonprofits all focused on healthcare innovations in Africa. I built the software diagnostic used in every primary care facility in Burkina Faso, the supply chain tool used to distribute family planning commodities across Senegal, supported outbreak monitoring across Uganda and elsewhere. Then in 2020, I transitioned into impact investing - from angel investor to building a venture philanthropy vehicle in Canada, and finally to Africa Health Ventures, where today I'm Managing Partner investing in seed-stage healthcare innovations that will dramatically improve access and quality of healthcare in Africa and around the world.

Rowena (07:14)
One key thing: in 2023, the US government put about $10 billion into health and humanitarian assistance in Africa. Compare that to remittances into Africa - $50 billion. Foreign direct investments - $70 billion. Trade - hundreds of billions. Many of those flows of capital are larger than the aid industry. Africa isn't going anywhere. The question is: how can we make a dollar go further in a future that is inevitably leaner and has less philanthropic money?

Also worth noting: the sense that healthcare in Africa has to be a philanthropic project is particularly strong in the United States. When you talk to investors in Europe, Asia, and Africa, it's much more normalised. They just see a market opportunity.

Rowena (14:09)
On philanthropy being the "long game" - in theory yes, but in practice, no. Because these programs are funded for five years, or one year, or two years, the thinking for a lot of program and research funding is short-term. A 10-year closed-end fund like Africa Health Ventures actually takes a longer view than most global health programs.

Investing allows organisations to build the core bones they need for scalable, resilient enterprises. It's hard to find research or donor funding that will pay for an HR person or a business development person. Whereas with investing, particularly impact investing, you're investing in the core opportunity of the organisation itself. When USAID cuts hit, those businesses can evolve - they can work with governments, with local charities, with out-of-pocket spending - because they were built to survive.

Rowena (20:47)
What this moment reveals: there was a lot of inefficiency in the old system, a lack of ownership and leadership within the countries we aimed to serve, and significant political interests from donors expressed through aid. The opportunity now is to put capital closer to communities, reduce inefficiencies, and create accountability to local markets.

We have the opportunity to set the rails for a quarter of the world's population. Africa is where Southeast Asia was 10 to 15 years ago. It can leapfrog ahead if given the opportunity.

Rowena (26:45)
What makes our fund different from typical impact funds: we're actually measuring health outcomes - improving access, lowering cost of healthcare so more people can gain access, improving quality of care delivered. Most funds in Africa are sector-agnostic. For us, it's hard to imagine creating the kind of value we can create without being sector specific.

Rowena (29:31)
Africa is home to 11% of the world's population, houses 25% of the global disease burden, and yet captures only 4% of the global pharmaceutical market. By 2050, one in four people on the planet will be in Africa. The average age on the continent is 19 years old - a young population that grew up with cell phones and mobile money. The Africa Continental Free Trade Agreement, if realised, would create the largest, fastest-growing market in the world.

If you always fish in the same pond, you'll always catch the same fish. Investors coming from finance backgrounds need to check their biases at the door. Look at the quality of the market, the quality of the revenue, the quality of the product - and then look at the founder through that lens.

The other thing: in Africa, you need to allow for hybrid models - software plus some services, some agents, some physical presence. The most successful apps often rely on networks of community health workers putting a human face to a new technology. That isn't a weakness, it's a feature of meeting the market where it is.

Rowena (48:01)
One learning from when I was building: don't conflate positive health outcomes with a viable organisation. I wish demonstrating positive health outcomes was enough to get a program funded and scaled - our lives would be much easier. The reality is there is a leap: between the science, the health system, the incentives, and the personalities around it. For an innovation with positive health outcomes to scale, you need an organisation whose job it is to understand the health system, work within it, and win it over.

There's a company in Rwanda with a life-changing innovation for neonatal ICUs - clinical trials have proven it works, it would undeniably save lives cost-effectively. The problem: nobody in West Africa has ever heard of it. Nobody knows how it gets to the hospital, who delivers it, how it gets maintained. That's the distribution gap. It's one of the reasons we invest in distribution channels at Africa Health Ventures.

Rowena (51:57)
For impact-oriented builders: validate the market early. So many organisations in global health have no pathway to market - it just isn't built in to the first year of building. For profit-oriented builders: be mindful not to create a two-tier health system. Build innovations that can partner with public systems, that can serve as examples to galvanise governments. The private sector has always been the birthplace of innovation - but the goal is to leapfrog the whole population forward, not leave most of it behind.

Rowena (54:55)
Ten years from now could be very different from today. We have the opportunity to deliver AI-enabled, technology-enabled information, services, and access to care in a way that is smarter, faster, and better than anything before. The question is whether we act with the right mindset - both internationally and within Africa - to unlock that opportunity.`,
  },
  {
    id: '24',
    slug: 'implementation-101-and-how-to-fail-well',
    episodeNumber: 15,
    title: 'Implementation 101 and how to fail well',
    guest: 'Caroline Perrin',
    guestRole: 'Executive Director, Geneva Digital Health Hub',
    date: 'May 2025',
    description: 'The Geneva Digital Health Hub\'s Caroline Perrin on what it takes to implement digital health well in LMICs - why most failures are predictable, the role of community health workers, and how the Implementome community is building a global learning culture around implementation.',
    url: 'https://www.gpodh.org/implementation-101-and-how-to-fail-well/',
    themes: ['Implementation', 'Global Health', 'Community Health', 'Digital Health'],
    country: 'International',
    tags: ['implementation', 'LMIC', 'community health workers', 'digital health', 'GDHD', 'Implementome', 'failure', 'learning', 'interoperability', 'Geneva'],
    topics: [
      'What the Geneva Digital Health Hub does and why it exists',
      'Why most digital health implementations fail - and how to predict it',
      'The role of community health workers in making digital tools work on the ground',
      'Implementome: building a global community of practice around implementation',
      'How to fail well: learning from failure rather than hiding it',
      'Interoperability and why it remains a persistent challenge',
      'What funders and governments need to change about how they commission digital health',
      'The ingredients of a successful implementation: people, process, and technology in that order',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction' },
      { time: '03:15', label: 'What is the Geneva Digital Health Hub?' },
      { time: '07:40', label: 'Why digital health implementations fail' },
      { time: '14:22', label: 'The role of community health workers' },
      { time: '21:05', label: 'Implementome: a global learning community' },
      { time: '28:30', label: 'How to fail well - and learn from it' },
      { time: '35:10', label: 'Interoperability challenges' },
      { time: '41:00', label: 'What funders and governments need to change' },
      { time: '47:20', label: 'Key lessons for implementers' },
    ],
    pullQuote: 'Failure is not the opposite of success in implementation - hiding failure is.',
    bio: 'Caroline Perrin is the Executive Director of the Geneva Digital Health Hub (GDHD), a global centre of excellence that connects digital health innovators, implementers, and policymakers. She leads the Implementome - a growing community of practice for people implementing digital health tools across low- and middle-income countries - and organises one of the sector\'s leading annual conferences on digital health implementation.',
    transcript: `Shubhanan Upadhyay (00:00)
Caroline, welcome to Global Perspectives on Digital Health. I've been wanting to have you on for a while - the Geneva Digital Health Hub does so much, and I think a lot of people in the space know the name but maybe don't know everything it does. Can you start by telling us what GDHD is and why it exists?

Caroline Perrin (00:20)
Thank you so much for having me. The Geneva Digital Health Hub was created about five years ago with a clear mandate: to accelerate the responsible use of digital health in low- and middle-income countries. We sit at the intersection of innovation, implementation, and policy. And Geneva is a unique place to do that - you have the WHO, you have a huge amount of global health infrastructure, and you have an enormous amount of goodwill and convening power.

What we noticed early on was that there were lots of people building digital health tools - apps, platforms, AI - and lots of money going into it. But the tools weren't reaching the people who needed them. So we decided to focus on the implementation gap. Not just: does the tool work technically? But: does it work in context? Does it reach patients? Does it change behaviour? Is it sustained? That's harder. And it's what we work on.

Caroline Perrin (03:40)
The Implementome is probably our most important initiative right now. It's a community of practice - currently about 1,200 people - who are actually implementing digital health in LMICs. Not researchers, not investors, not policymakers primarily - though they're welcome - but people doing the actual work on the ground. Health workers, programme managers, national health IT leads, NGO staff. The people who know what it actually takes.

The Implementome runs online learning sessions, workshops, a resource library, and our annual conference. The idea is simple: most of what goes wrong in implementation is already known. Somebody, somewhere, has made that mistake before. Our job is to make that knowledge accessible so we're not all repeating the same errors.

Caroline Perrin (08:12)
Why do implementations fail? In my experience, the technology is almost never the primary reason. The reasons are almost always around people and process. You haven't engaged the community. You haven't understood the existing workflow. You've designed something for a health worker who already has 12 other things to do and given them one more thing. You've ignored the infrastructure constraints - power, connectivity, device ownership. You haven't built any mechanism for feedback from users. You haven't thought about what happens when the pilot funding runs out.

These are predictable failures. We know about them. And yet they happen again and again because the incentive structure of global health - the funding cycles, the reporting requirements, the pressure to show outputs quickly - doesn't reward taking the time to do implementation well.

Shubhanan Upadhyay (12:45)
Tell me about the community health worker piece. It feels like CHWs keep coming up whenever we talk about implementation in LMICs.

Caroline Perrin (13:02)
Because they're the last mile. In many low-income settings, the community health worker is the primary point of contact between the health system and the patient. And digital health tools are increasingly being designed with them in mind - or being pushed out to them without proper consideration of their situation. CHWs are often unpaid or barely paid. They're often women. They often have very limited formal education. And they carry an enormous burden of trust with their communities.

When digital tools are designed well with CHWs - designed with them, not just for them - they can be transformative. They can support decision-making, reduce errors, improve data quality, help with supply chain. But when they're designed badly? They undermine trust. They add burden. They fail.

The critical thing I'd tell any implementer: budget for training not just at the beginning, but ongoing. Turnover in CHW programmes is high. If your implementation plan assumes the same people are there six months in, it's going to be in trouble.

Caroline Perrin (21:22)
What does failing well look like? First, it means documenting failure - not just in internal retrospectives that nobody reads, but in a way that contributes to the collective knowledge of the field. At GDHD, we are actively trying to create spaces where people can share what went wrong without career risk. That's hard in global health, where the incentive to show funders that everything is working is enormous.

Second, it means building feedback loops into your implementation from the start. Regular check-ins. User testing that doesn't stop after the pilot. Mechanisms for frontline health workers to flag problems before they cascade.

Third - and this is the one people resist - it means being willing to stop. If the evidence is telling you this isn't working in this context, stop. Iterate. Don't double down. The sunken cost fallacy kills a lot of digital health programmes.

Caroline Perrin (35:44)
Interoperability remains one of the biggest unsolved problems. We have countries with 50, 60, 70 different digital health tools that don't talk to each other. Data is siloed. Health workers are logging the same patient in multiple systems. Ministries of health can't get a clear picture.

The technical solutions exist - FHIR, open standards, shared infrastructure. The barriers are mostly political and financial. Vendors don't want to open their systems. Governments don't have the capacity or leverage to mandate it. Donors fund their own tools and don't insist on interoperability.

What I'd say to funders specifically: make interoperability a condition of funding. Not a nice-to-have. A requirement. If the tool you're funding can't communicate with the national health information system, don't fund it.

Caroline Perrin (47:55)
My key message for anyone starting an implementation: flip the order. Most people go technology first, then process, then people. It should be the exact reverse. Start with the people - the health workers, the patients, the community - understand their lives and their constraints. Then design the process. Then find the technology that fits. Technology is the last step, not the first.

And be humble about timelines. A well-implemented digital health programme takes three to five years to show real impact. If someone is promising you results in 12 months, they're either measuring the wrong things or telling you what you want to hear.`,
  },
  {
    id: '25',
    slug: 'how-the-world-health-organization-is-evolving',
    episodeNumber: 16,
    title: 'How the World Health Organization is evolving',
    guest: 'Dr Alain Labrique',
    guestRole: 'Director, Digital and Innovation, World Health Organization',
    date: 'Jun 2025',
    description: 'A conversation on the future of the World Health Organization, rethinking how we approach digital implementation and funding in LMICs, and what it really means to decolonize global health. Alain Labrique - shaped by a childhood in Dhaka and decades of implementation science - offers a refreshingly honest take on the USAID funding crisis, the quiet collapse of digital infrastructure it has triggered, and where WHO is focusing next.',
    url: 'https://www.gpodh.org/how-the-world-health-organization-is-evolving/',
    themes: ['Global Health Policy', 'WHO', 'Digital Infrastructure', 'Decolonisation', 'AI'],
    country: 'International',
    tags: ['WHO', 'USAID cuts', 'digital infrastructure', 'REDHI', 'decolonise', 'global health funding', 'AI for health', 'identity', 'implementation', 'India', 'Bangladesh', 'private sector'],
    topics: [
      'Alain\'s journey: from Dhaka to Johns Hopkins to the WHO - and why there is no linear path',
      'The quiet collapse: how USAID cuts have taken down servers, EHR systems, and supply chain platforms across the Global South',
      'REDHI - Resilient Essential Digital Health Infrastructure: what minimum core systems every country needs to own',
      'Shifting the nexus of control: why earmarked donor assistance has to stop',
      'Private sector myths: why companies thrive on rules and clear governance, not chaos',
      'India\'s national digital health mission as a model for structured ecosystem building',
      'WHO\'s Global Strategy on Digital Health extended to 2034 - and what the priorities are',
      'The Global Initiative on AI for Health: regulatory alignment, agent-based models, and helping governments differentiate what works',
      'Identity as foundational infrastructure: hundreds of millions of people who still don\'t officially exist',
      'Advice to builders in the Global North: invest to make yourself irrelevant',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction and background of Alain Labrique' },
      { time: '12:05', label: 'Development funding cuts - impact on digital infrastructure' },
      { time: '24:01', label: 'What future funding mechanisms need to consider' },
      { time: '27:26', label: 'The role of private sector in health infrastructure' },
      { time: '31:14', label: 'Responsible partnerships in health innovation' },
      { time: '33:00', label: 'The evolving role of WHO in digital health' },
      { time: '38:21', label: 'Building capacity and governance in health systems' },
      { time: '40:41', label: 'Navigating AI in healthcare' },
      { time: '46:22', label: 'Learning from failures in health initiatives' },
      { time: '50:27', label: 'Advice to founders building in underserved communities' },
    ],
    pullQuote: 'Countries need to be in the driver\'s seat of their own development agenda… The earmarking of assistance has to stop.',
    bio: 'Dr Alain Labrique is the Director of Digital Health and Innovation at the World Health Organization. A Belgian-Indian-Bangladeshi who grew up in Dhaka, he spent nearly a decade as a field epidemiologist in rural Bangladesh before joining Johns Hopkins as a professor of public health, where he founded the Center for Global Digital Health and Innovation. He chaired the first ever WHO evidence-based guidelines on digital health and has been a defining voice in establishing the field\'s foundational taxonomy and research standards.',
    transcript: `Alain Labrique (00:03)
One that's also very much neglected - when we think about infrastructure, we think about electricity and connectivity and broadband. But the one that always gets left behind, and I think it is a foundational piece of the puzzle, is identity. Not having an identity remains a challenge for hundreds of millions of human beings on this planet, whether that is in the form of a recognised national ID card or some kind of a recognition that you even exist. It's one of the drivers of the tragedy that we have so many deaths that happen that go uncounted because those people don't have a foundational identity. There's no birth registration, let alone death registration. And those are some of the foundational injustices that I think we do need to continue to fight for.

It's very easy when you are working at the policy level or working at the level of population scale data to get lost in the indicators and the vastness of the topic that you're dealing with. And a lot of these things can rapidly become very impersonal and generic. The constant struggle and challenge that we all have to really prioritise is remembering that every data point reflects a human life. That's something my professor of biostatistics drilled into us decades ago when I was knee high to a grasshopper. Always remember that what you do ultimately will have an impact on individual human lives. And that's not something to ever take lightly.

Shubhanan Upadhyay (04:07)
Alain, I would love to start with hearing about your background and your journey to becoming the Digital Director of the WHO.

Alain Labrique (04:29)
There is no linear path to where life will take you. I'm a bit of an international mutt - Belgian Indian Bangladeshi. I was born and raised in the streets of Dhaka. I lived and worked in rural Bangladesh as a field epidemiologist for almost a decade, and spent many years as a professor at Johns Hopkins teaching public health and conducting large-scale randomised trials in low-resource settings with ministries of health and local institutions - trying to find ways to reduce maternal and neonatal mortality.

As we were working out in the field in the early 2000s, we began to live through what I call the mobile phone revolution. This disruptive technology introduced in remote rural parts of the globe completely upended how people lived - their capacity to be connected, to tap into resources far beyond what they might otherwise have had access to. And we began to see how a simple phone call at the right time and place could be the determinant between death and survival.

That led me to launch, as a professor at Johns Hopkins, the Global mHealth Initiative - today known as the Center for Global Digital Health and Innovation. That set the foundations for collaborations with WHO, working on the fundamental taxonomy of how we speak about digital health, guidance on how to do research in this space, and eventually chairing the first ever WHO evidence-based guidelines on digital health.

Alain Labrique (12:41)
With every new innovation, there's always shiny objectism. We have to guard ourselves fiercely against it. When we talk about global health, we're often talking about governments with very limited budgets and populations with limited disposable income. It's a zero-sum game. So you have to be able to make the case that the new thing you're investing in can augment and improve the goals of your health system while being cost-effective and sustainable. Embracing the new while tempering enthusiasm with science and evidence - that's the formula for sustainability.

Alain Labrique (16:25)
What we've really seen in the last three to four months: the collapse of overseas development assistance has had a cascade effect on systems that were extremely reliant on external funding. Perhaps the cost of a server to store data was being covered by a grant. Perhaps technical staff assigned to a clinic to process data were on the payroll of an ODA-funded grant. When those systems or critical elements were removed, we immediately started to see the dominoes tumble.

What we've heard in the media is a lot of discussion about the impact on people - people living with HIV not receiving medication, pregnant women not accessing antenatal care. But the digital systems supporting those functions have also failed. Supply chain management systems, electronic health records, laboratory information systems, point-of-care decision support tools for frontline health workers - we've seen all of these go down across all six WHO regions, primarily in the Global South.

We have to learn from this. We have to build back better. And we have to make sure this can never happen again. We came up with an acronym: REDHI - Resilient Essential Digital Health Infrastructure. What is the minimum core set of systems that a country needs to set up, but also needs to be able to operate, own, and pay for within their own capacity?

Alain Labrique (24:43)
The Paris Declaration, the Accra Accord - these are things that have been reaffirmed over decades. Countries need to be in the driver's seat of their own development agenda. The earmarking of assistance has to stop, and has to go into the control of nationally democratically elected governments empowered to determine how funds are spent for the good of their people.

Despite all of these good intentions for so many decades, it has continued to be difficult to separate the priorities and the insistence of those providing the funds from the autonomy that countries were insisting they be given. I think you are going to see a lot more strong pushback from governments - especially those hit hard by this sudden shock - to really say: if you would like to support us as a country, allow us to use those resources as we see fit.

Alain Labrique (28:23)
One of the biggest myths about the private sector: people imagine that companies are waiting for a situation of chaotic lack of rules so that they can profit uncontrollably. The more I speak with private sector leadership, the farther I realise that is from the truth. What brings investment to the table is the reduction of risk. When there is clear structure, when the rules of engagement are well-defined, when there is a regulatory pathway for new technologies - that's what attracts capital.

India is a great model. Their national digital health mission has defined rules of engagement, created sandboxes where software companies can test compliance to national standards, and created incentive schemes with actual revenue models to engage in supporting public sector goals. That opens the landscape to a whole new scope of actors to participate in strengthening the health system.

Alain Labrique (33:58)
Times like this really do force you to prioritise. We have to examine all of the things we do and differentiate what we want to do from what we need to do.

Our member states agreed to extend the Global Strategy on Digital Health for another two years, and are seeking a renewal to 2034. That's a real declaration of mandate. The first priority is robust foundations - you can't build high-rise buildings if you haven't invested in solid groundwork. Human capacity first. Then policy, governance, and regulatory environment. Then a blueprint - a national architectural plan. Without the blueprint, folks will come to the table with different resources and build things that don't fit together. Kenya was the first country in Africa to have a national digital health act - a law describing the roles of a digital health agency with clear mandate, budget, and tasks.

Alain Labrique (47:15)
We don't talk enough about the importance of learning from what doesn't work. In the space of digital health, it's almost as important to celebrate failure and deconstruct why something didn't work. Was it contextual? Human capacity? Ecosystem? And I think one of the important things is to ensure that breakthroughs - whether from AI or digital health - are accessible to everyone irrespective of where they live. Almost two billion people still aren't connected to any network. We still have swaths of the globe without electricity.

Alain Labrique (50:40)
If you are based in the Global North and have ambitions to help build in countries struggling with major public health challenges, invest your time and energy in building local capacity in such a way that you almost make yourself irrelevant in that setting after a period of years. The greatest reward lies in being able to step back and see the ecosystem that you helped create.

It's not about charity. It's about participating in their struggle, in their journey. It's about listening to what those countries have prioritised, what those communities need. The first step of any innovation journey should be listening - with humility and with deep respect. And at the macro level: identify what the country strategies are, and see what you are producing that can advance those goals. You can do good and do well in the same breath.`,
  },
  {
    id: '26',
    slug: 'healthtech-comms-communicate-your-impact',
    episodeNumber: 17,
    title: 'Healthtech comms. Communicate your impact',
    guest: 'James Somauroo',
    guestRole: 'Co-founder and CEO, SomX',
    date: 'Jul 2025',
    description: 'Your metrics don\'t matter if no one gets the message. James Somauroo has hosted over 400 podcasts and built one of the most influential media and comms agencies in healthtech. We cover why so many well-intentioned digital health projects fail to scale - not because the tech or evidence isn\'t good enough, but because the story isn\'t being told in a way people understand or care about.',
    url: 'https://www.gpodh.org/healthtech-comms-communicate-your-impact/',
    themes: ['Communications', 'Storytelling', 'Fundraising', 'Digital Health'],
    country: 'United Kingdom',
    tags: ['communications', 'marketing', 'storytelling', 'pitch deck', 'content strategy', 'SomX', 'healthtech', 'PESO model', 'evidence communication', 'community', 'LinkedIn', 'failure'],
    topics: [
      'Why comms is a massive unlock - from policy to implementation to on-the-ground innovation',
      'The evolution: from Health IT → mHealth → digital health → healthtech, and why words matter',
      'Democratisation of audience-building: the PESO model (Paid, Earned, Shared, Owned)',
      'The algorithm is just human behavior - focus on giving value, not gaming the system',
      'Authenticity and differentiation in the attention economy: document what you\'ve actually done',
      'Storytelling for pitch decks: forget the template, tell your story in the optimal order',
      'Psychology of decision-making (Rory Sutherland): emotion over logic, second and third-order effects',
      'How to communicate evidence: know your audience, find their metric, lead with it',
      'Why sharing failures resonates - and the role of psychological safety and community',
      'Quick-fire tips: the biggest comms anti-patterns, how to find your UVP, and what to do when it\'s not working',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction to James and SomX' },
      { time: '07:51', label: 'The evolution of health communications' },
      { time: '13:12', label: 'State of comms in digital health' },
      { time: '18:20', label: 'Navigating the attention economy' },
      { time: '21:00', label: 'The importance of authenticity in content' },
      { time: '23:41', label: 'Psychology in marketing and communication' },
      { time: '31:11', label: 'The role of emotion in decision making' },
      { time: '32:48', label: 'Transforming scientific communication through storytelling' },
      { time: '37:09', label: 'Crafting compelling narratives for impact' },
      { time: '43:59', label: 'Communicating evidence effectively' },
      { time: '48:28', label: 'The importance of sharing failures' },
      { time: '52:10', label: 'James\' quick-fire tips' },
    ],
    pullQuote: 'If you give without the expectation of receiving, everything will get better.',
    bio: 'James Somauroo is the co-founder and CEO of SomX, a communications and creative agency for healthcare companies. He hosts The Healthtech Podcast (400+ episodes) and is Editor-in-Chief of Healthtech Pigeon. An anaesthetics and ICU doctor by training, he has held leadership and innovation roles at NHS England, Health Education England, and the BMJ, directed two healthtech startup accelerators, and is a guest lecturer on healthtech entrepreneurship at institutions around the world.',
    transcript: `James Somauroo (00:00)
If rather than treating marketing like a tick-box - I need to put three posts out this week for the algorithm, five posts for the algorithm, the algorithm, the algorithm - you remembered that the algorithm is literally humans and their behavior at the other end. The algorithm is just going to put posts in front of people that are doing well. So basically: just put posts out that people are most likely to find value from. That's going to take care of most of what you think the algorithm is looking for. Trust me.

It's about focusing on value for content. It's not about arbitrarily thinking about what an algorithm does. I think this is more a commentary on human nature than it is on anything else.

Shubhanan Upadhyay (00:50)
Today we're talking about communication. We have one of the biggest names in healthtech comms - Dr James Somauroo, co-founder of SomX, a healthcare media and communications agency. We've talked a lot on this podcast about policy, regulation, implementation, and trust in communities. A big enabler of making sure all of this work doesn't fall flat on its face is good communication. Making sure people connect with your vision, your message, the impact you've created - it's a massive unlock, whether you're in policy, you're a founder, or you're a product team.

James Somauroo (03:57)
I'm a doctor by background - anaesthetics and intensive care, practiced clinically for five years. I've done lots of things in leadership, policy, and innovation in the NHS and the wider commercial health sector: NHS England, Health Education England, the BMJ. I ran a couple of healthtech accelerators. But the other side of my life was always media. I used to write for Forbes on healthtech. I run the Healthtech Podcast - over 400 episodes, listeners around the world. And the main show in town for me now is SomX, which does communication strategy, multimedia content, press and PR, branding and design, events and community, and media production - all purpose-built for the healthtech, biotech, and pharma space.

I never actually wanted to start SomX. I used two PR companies myself and had a very underwhelming experience. Health is very binary, healthtech even more specific - niche areas with specific audiences, specific messages, specific value propositions. I ended up rewriting the press releases myself. And I realised: I've got a podcast, I've got a newsletter, I'm pretty good on LinkedIn. I could do content for healthtech startups. My wife Jess was Director at Fleishman Hillard - she knows how to build an agency, I knew the clinical medicine and the content. Started with one client. Started from the bottom. Now we're here.

James Somauroo (10:32)
People often think communications and marketing is about "look at me, look at my product, buy my product." But 80% of the content you put out should be either educating, entertaining, or inspiring your audiences - or all three. That's how you gain trust. That's how you become a trusted authority. Then when you turn around and say "I'm selling this thing," they're already listening. That's what I did in my whole career - 12 years of just putting good stuff out into the space. When I started a business, I launched with four clients within four weeks, because I had the podcast and the network.

James Somauroo (13:53)
Healthcare was behind in communications broadly. When we were calling it "healthcare IT" or "health informatics," it needed a rebrand - and a rebrand it got when digital came along, and then healthtech when the Silicon Valley tech boom hit healthcare. Healthtech as a single word finally gave the space a unified umbrella and identity.

Before social media and the internet, big trade events and national publications held the ring. You had to get to them to get your message anywhere. Now we've truly democratised the ability to build an audience. Everyone should know the PESO model - Paid, Earned, Shared, Owned. Every company should become its own production company. Build your owned media - your podcast, your newsletter. You own that audience. Social is rented from LinkedIn, Spotify, Google. Spread your bets.

James Somauroo (25:10)
My personal content has never performed better, even as LinkedIn is flooded with AI posts. Someone left a comment on one of my posts that stuck with me: "this actually stopped me scrolling because it's someone documenting something they've actually done in the real world, not just talking about a theme." That's the thing. If you approach content with authenticity - document what you're up to, share genuine learning, actually research a topic - people reward the effort. People are jealous of where you are, not how you got there. They're jealous of what you've got, but they respect how you got it.

James Somauroo (31:53)
The answer, when it comes to communicating evidence, is emotion. Only want to exit your company because of how you think it will make you feel. Perception is reality.

Think about the astrophysicists on TikTok: they take a horrendously dull academic journal, put it in the green screen background, and then just talk - as a human, telling a story - about the most incredible things. That is storytelling. Scientific rigour is absolutely necessary, and it lives in that journal. But it goes nowhere unless it's communicated externally. Think about who your audience is, what they care about, where they absorb information - and put your message there in their language.

James Somauroo (38:12)
On pitch decks: people follow the Sequoia template - 10 slides, problem, solution, market size, competitors. Forget the order. Tell me the story exactly how you'd tell it. Because the same 10 things in the same order cannot possibly be the best way to tell everyone's investment story.

I spoke to a client last week who didn't mention until slide four that they had two signed contracts with hospital groups. That's their differentiator. Lead with that. Slide one, slide two maximum. Because an investor's default is: this deck is terrible, and 98% of the time they'd be right. You're battling against the no. Lead with your strongest card.

And think about second and third-order consequences - the way journalists do, the way good advertising does. If you increase clinical outcomes, so what? Your clinical nurse specialist is now going to have time to do loads of other things. Your finance director cares about in-year savings. Know your audience, find the metric they care about most, and lead with it.

James Somauroo (49:11)
Not everything needs to go on LinkedIn. The biggest move you can make in 2025 is owning a community around something in your space - without thinking first about the commercial value. Just know that if you set up a community of genuine value, it will benefit you somehow. Set up a space where people can be honest. I used to run small events - 20, 30 people - and I'd interview a founder. I'd say: this isn't for online, just be honest about what happened. The questions were incredible. The honesty was cathartic. That is psychological safety. And that is where real learning lives.

James Somauroo (52:20)
Biggest comms anti-pattern: focusing on selling and not on giving value.

How to find a UVP that resonates: feedback, feedback, feedback. Find the exact person that value proposition should chime with and ask them. If you ask for advice, you'll get money. If you ask for money, you'll get advice.

Signs your comms isn't working: it's not performing well. It's not meeting your business goals. End of story.

Biggest lesson: if you give without the expectation of receiving, everything will get better.`,
  },
  {
    id: '27',
    slug: 'evolving-beyond-verticals-and-funding-what-matters-in-healthcare',
    episodeNumber: 18,
    title: 'Evolving beyond verticals and funding what matters in healthcare',
    guest: 'Rubayat Khan',
    guestRole: 'Director of Health Programs, Endless Foundation',
    date: 'Jul 2025',
    description: 'A systems thinker, entrepreneur, and now investor, Rubayat Khan brings the rare perspective of someone who has been a patient, builder, and funder. We unpack what it means to move beyond vertical health solutions, how to prioritise innovation in an era of shrinking aid budgets, and how LLMs might unlock integrated, people-centred care in low-resource settings - including why a 48-second doctor consultation in Bangladesh makes the case for AI more powerfully than any paper.',
    url: 'https://www.gpodh.org/evolving-beyond-verticals-and-funding-what-matters-in-healthcare/',
    themes: ['Global Health Funding', 'AI', 'LMICs', 'Self-care', 'Innovation'],
    country: 'Bangladesh',
    tags: ['Bangladesh', 'LLMs', 'AI', 'self-care', 'vertical health', 'digital colonialism', 'global health funding', 'Endless Foundation', 'mPower', 'Jeeon', 'last mile', 'people-centred care'],
    topics: [
      'Why governments are not always best placed to design people-centred care: clinics in rural Bangladesh open 10am–2pm when everyone is working in the fields',
      'Four priority areas Endless Foundation is focusing on',
      'How LLMs could shift the access, quality, and cost curve in low-resource settings if implemented thoughtfully',
      'A 48-second doctor consultation in Bangladesh - and why Rubayat\'s own parents find LLMs more useful',
      'Why self-care is the blind spot we can no longer afford to ignore',
      'The dangers of "digital colonialism" and what needs to change in global AI governance',
      'Evaluating AI against the right counterfactuals - not Western standards, but local reality',
      'What funders can do differently to support impact beyond rhetoric',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction' },
      { time: '08:33', label: 'Navigating the challenges of healthcare in Bangladesh' },
      { time: '10:46', label: 'Transitioning from ground-level solutions to system-level thinking' },
      { time: '18:07', label: 'Identifying key challenges in global health systems' },
      { time: '23:20', label: 'Seizing opportunities amidst crisis in global health' },
      { time: '29:30', label: 'Leveraging AI and technology for healthcare transformation' },
      { time: '37:49', label: 'AI vs human decision-making in healthcare' },
      { time: '41:26', label: 'Evaluating AI in healthcare contexts' },
      { time: '44:07', label: 'AI\'s potential in low-resource settings' },
      { time: '46:47', label: 'Concerns about digital colonialism and data ownership' },
      { time: '51:05', label: 'The need for coordinated leadership in healthcare' },
      { time: '54:26', label: 'Finding the right problems to solve' },
    ],
    pullQuote: 'Most of what we call healthcare happens outside clinics. If we ignore that, we miss the biggest opportunity for real impact.',
    bio: 'Rubayat Khan is a health entrepreneur and technologist from Bangladesh, and Director of Health Programs at Endless Foundation, a US family foundation reimagining how global health innovation is funded and delivered. He co-founded mPower Social Enterprises and Jeeon, which have pioneered innovative models for delivering healthcare and essential services to last-mile populations across 15 countries, currently reaching over 120 million people. A passionate advocate for bottom-up and user-centred thinking in global health, he has written in the Guardian, SSIR, and Frontiers in Public Health. He is an Acumen and Aspen New Voices Fellow.',
  },
  {
    id: '28',
    slug: 'digital-health-innovation-with-refugees-a-founders-story',
    episodeNumber: 19,
    title: 'Digital health innovation with refugees. A founder\'s story.',
    guest: 'Dr Aral Surmeli',
    guestRole: 'Founder and CEO, HERA Digital Health',
    date: 'Sep 2025',
    description: 'As underserved communities go, refugees are among the most vulnerable. Aral Surmeli is the founder of HERA Digital Health, which has built an AI-powered tool serving Syrian refugees in Turkey - initially targeted at mothers-to-be and mothers with young children missing antenatal and child development appointments. This is not a shiny rainbow story. It\'s about real struggle, USAID funding being cut, and what it means to keep going when the communities you serve don\'t get to quit.',
    url: 'https://www.gpodh.org/digital-health-innovation-with-refugees-a-founders-story/',
    themes: ['Humanitarian Health', 'Refugees', 'AI', 'Implementation', 'Funding'],
    country: 'Turkey',
    tags: ['refugees', 'humanitarian', 'Syria', 'Turkey', 'HERA', 'maternal health', 'USAID cuts', 'digital identity', 'WhatsApp', 'offline', 'co-design', 'open source'],
    topics: [
      'In humanitarian settings, context is not static - it is always changing',
      'HERA hired developers who were themselves in the refugee camps: short feedback loops, immersed context',
      '\"Build with, not for\" - the most powerful example of what this actually means',
      'The downstream effects of missed antenatal and child development appointments - and what Aral saw in the ER',
      'Cultural sensitivity in health solutions: what works in one community may not transfer directly',
      'Navigating USAID funding cuts and the stop-work order: how Aral prioritised survival',
      'Defining success differently: not about HERA surviving or Aral succeeding - about the impact to those people',
      'Digital identity as a critical challenge for displaced populations',
      'Why humanitarian innovation cannot rely on investors or market returns - and what governments and philanthropy must do instead',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction to digital health innovations' },
      { time: '05:05', label: 'The journey of Aral Surmeli: from medicine to tech' },
      { time: '07:47', label: 'Understanding refugee health needs' },
      { time: '10:13', label: 'Building HERA: the digital health tool' },
      { time: '18:23', label: 'Cultural sensitivity in health solutions' },
      { time: '28:01', label: 'Navigating challenges in humanitarian innovation' },
      { time: '30:50', label: 'Funding dilemmas in humanitarian contexts' },
      { time: '36:01', label: 'Adapting strategies for sustainability' },
      { time: '44:03', label: 'The role of digital identity in healthcare' },
      { time: '46:51', label: 'Finding hope amidst challenges' },
      { time: '48:50', label: 'Advice for aspiring humanitarian innovators' },
    ],
    pullQuote: 'The communities he is serving do not get to quit. Why should he.',
    bio: 'Dr Aral Surmeli is the Founder and CEO of HERA Digital Health, a nonprofit that helps refugee women and children access local healthcare through AI-powered digital tools. HERA has served over 300,000 users across Turkey, the Middle East, and Africa, providing immunisation reminders, prenatal care tracking, and digital health records accessible via WhatsApp and offline apps. The platform is open source, co-designed with local healthcare workers and refugee communities, and integrates with national health systems and NGO services. Dr Surmeli holds an MPH from Harvard and is pursuing a DrPH at Johns Hopkins. He is a former Innovation Fellow at the Harvard Humanitarian Initiative and has been supported by Google.org, Grand Challenges Canada, MIT Solve, and Harvard iLab.',
  },
  {
    id: '29',
    slug: 'social-impact-in-a-time-of-scarcity-and-the-power-of-community',
    episodeNumber: 20,
    title: 'Social impact in a time of scarcity, and the power of community',
    guest: 'Nick Martin',
    guestRole: 'Founder and CEO, TechChange',
    date: 'Oct 2025',
    description: 'Nick Martin is one of the biggest voices in social impact - a connector, builder, and community organiser who has spent two decades training Ministry of Health officials and bringing global digital health people together. We talk about the USAID funding crisis: what happened, what it revealed, and what the sector needs to do differently. Plus: the Global Digital Health Forum, fail festivals, and how to navigate a career and an organisation in a world of scarcity.',
    url: 'https://www.gpodh.org/social-impact-in-a-time-of-scarcity-and-the-power-of-community/',
    themes: ['Global Health Funding', 'USAID', 'Community', 'Career', 'Digital Health'],
    country: 'International',
    tags: ['USAID cuts', 'TechChange', 'Global Digital Health Forum', 'Nairobi', 'fail festival', 'community', 'philanthropy', 'career', 'social impact', 'digital development', 'scarcity'],
    topics: [
      'Before the freeze: what was working at USAID and what wasn\'t - and why the sector didn\'t build a political constituency',
      'The week it all fell apart: stop work orders, the globalaidfreeze.com response, and the power of community rallying',
      'Eight months on: organizations pivoting to government sales, mergers, graceful wind-downs',
      'Career advice for people affected - new grads vs mid-career vs senior - and why AI skills plus sector knowledge is the combo',
      'Why philanthropy has been disappointing in its public response, and the reasons behind that',
      'TechChange: 20 years of digital training across 300+ organisations and 90+ countries',
      'The Global Digital Health Forum moving to Nairobi - why leaving Washington mattered',
      'Fail festivals: the origin story, the songs Nick performed, and why failure-sharing is the most valuable format at any conference',
      'Wisdom corner: constraints breed creativity, prioritise learning and community above all else',
    ],
    timestamps: [
      { time: '00:00', label: 'Intro: Nick\'s story' },
      { time: '03:58', label: 'USAID cuts - before, during, after: reflections from the development sector' },
      { time: '21:13', label: 'Career transition advice' },
      { time: '24:14', label: 'Funders need to step up more, but it\'s not that simple' },
      { time: '26:34', label: 'TechChange origins' },
      { time: '28:22', label: 'The Global Digital Health Forum: bringing people together' },
      { time: '34:30', label: 'Fail festivals and creating the space to talk about failure' },
      { time: '38:56', label: 'Wisdom corner: Nick\'s top tips' },
    ],
    pullQuote: 'Nobody wants to fight this administration. I understand that. But I was hopeful there would be more stepping up - and there hasn\'t been.',
    bio: 'Nick Martin is the Founder and CEO of TechChange, a social enterprise that has become a leading provider of digital health training and convening solutions worldwide. Under his leadership, TechChange has trained thousands of Ministry of Health officials in more than 90 countries through flagship programs including Digital Health: Planning National Systems, developed in partnership with USAID, WHO, and Digital Square. He also leads the Global Digital Health Forum, the premier annual gathering for policymakers, donors, researchers, and implementers working at the intersection of technology and health.',
    transcript: `Nick Martin (00:00)
I've been a little disappointed by the public displays of funding that have emerged. What I have heard is that foundations are doing more in the shadows to support, but they do not want to draw the public attention of the administration. I hope that's true. I've also heard from a lot of organizations that they don't have as long as they would like to make the pivots - and that the work they're doing is mission critical for the people they serve and they don't have a way to deliver on that. Philanthropy as a whole, and there are many exceptions, has not moved publicly as fast and as decisively as I was hoping. Nobody wants to fight this administration. I understand those things. But I was hopeful there would be more stepping up, and there hasn't been.

Nick Martin (02:03)
I was a modern poetry major in college at Swarthmore and studied peace and conflict. My father was set on me becoming a CIA agent - we got in a big fight about it. I ended up teaching English literature and then found a program in Costa Rica doing education, peace and human rights with a United Nations flavour. I came back thinking: technology is disrupting education everywhere. Maybe there's an opportunity to connect those dots specifically for the humanitarian, global health, and global development population and bring new kinds of training to them using the power of tech. That was the origin instinct around TechChange. We were lucky to grow up at a time when distance learning was just becoming available, and we married that with a whole slew of experts willing to share knowledge in cohort-based learning settings. Founded in 2009.

Nick Martin (07:27)
If you'd asked me what wasn't great about the before times: I do think USAID had gotten quite large, and there was not a ton of coordination in certain parts. And as a sector, we did not do a great job of making the case to the American people for the importance and value of global aid. That got very easy to politicise without a strong lobbying infrastructure or voter base. People vote based on issues that affect their lives. Our very small niche just didn't have that populist support. That made us an easy target.

Nick Martin (10:52)
That Friday, everything fell apart. I was on a phone call with Catherine Rayfelsen who leads Society for International Development when the executive orders dropped. In the following week it got quite real. My first instinct was to get a website up - globalaidfreeze.com - to give people a way to share the stories of how they were being affected. The response was overwhelming. Journalists contacting me. Thousands of comments on posts. But what I want to remember from those early days is not the cruelty and the flippant nature of this decision - it's the way the community rallied. The resilience and the generosity were tremendous.

Nick Martin (15:09)
The project I know best: we ran Digital Health Planning National Systems - a longstanding partnership with USAID's Global Health Bureau, going into countries ministry by ministry to train senior officials in how to digitise and strengthen their health systems. We had a whole year planned. Destroyed overnight. We have a waitlist of over a thousand people who are hungry for this training. The Gates Foundation has come in to support some of it. But this is the slow, prudent, hard, challenging work that is required in strengthening health systems. The effects of losing it will carry forward for years.

Nick Martin (18:34)
Eight months out, I think of this as a period of reckoning and reimagination. Crisis forces creativity - that's a truism I live by as an entrepreneur. We're seeing organizations think creatively about mergers and partnerships with each other. We're seeing groups pivot to selling services directly to governments, thinking about their offerings as products. At TechChange we're launching an accelerator to help organizations with that transition. And then there's another camp that are going to have to wind down in a dignified way. For individuals: many amazing humans lost jobs and are now figuring out what a portfolio career or consulting looks like. It is a very complicated and challenging market.

Nick Martin (39:28)
We're entering a period of scarcity, and I think you have to be really honest with yourself and your colleagues about what the runway looks like. Can you pivot your business model? Does it make sense to merge? Is it better to gracefully wind down? For people earlier in their careers: be on the wavelength that learns AI skills. The blend of technical abilities plus sector sensibilities is a powerful combo. Constraints and chaos breed creativity. When we started TechChange in 2009, nobody had jobs. We were able to build something beautiful because talent was available and people had energy to put into something new.

And wherever you can - often and always - prioritise learning and community. We are in a state of constant reinvention as humans, not just in our sector. The more you shift your mindset to never stop learning, and scaffold that journey with incredible humans and community, the more powerful you will be for any of these shocks and challenges that arise. Build your virtual community and prioritise it in your trajectory. Sharing is caring.`,
  },
  {
    id: '30',
    slug: 'evaluation-level-up-measuring-what-matters',
    episodeNumber: 21,
    title: 'Evaluation level up: Measuring what matters',
    guest: 'Dr Shay Soremekun',
    guestRole: 'Epidemiologist and Co-deputy Director, Centre for Evaluation, LSHTM',
    date: 'Nov 2025',
    description: 'Everyone\'s talking about LLM evals and benchmarking. But ultimately people care about impact - and impact is rarely a neat linear path to a yes/no answer. Dr Shay Soremekun of the London School of Hygiene and Tropical Medicine shares what it took to evaluate a digital health tool for community health workers in Mozambique and Uganda: program theory, logic models, process evaluation, and an unexpected finding that changed everything.',
    url: 'https://www.gpodh.org/evaluation-level-up-measuring-what-matters/',
    themes: ['Evaluation', 'Implementation Science', 'Community Health', 'Africa', 'Decolonisation'],
    country: 'Mozambique',
    tags: ['evaluation', 'program theory', 'logic model', 'process evaluation', 'community health workers', 'Malaria Consortium', 'inSCALE', 'upSCALE', 'Mozambique', 'Uganda', 'decolonial', 'co-production', 'LSHTM', 'evidence generation'],
    topics: [
      'Program theory and logic models: connecting intervention to intermediate steps to outcomes - not just the final number',
      'The inSCALE study: evaluating a digital decision support tool for CHWs treating malaria, diarrhoea, and pneumonia in children under five',
      'The unexpected finding: facility staff, not community health workers, were the main driver of improved outcomes',
      'Why understanding how it works is as important as knowing that it works - for adaptation and scale',
      'Formative research and co-creation: how to generate hypotheses on what to measure',
      'Iterating during implementation: network outages, older CHWs, changing app partners mid-study',
      'The community health worker who started a solar phone-charging business with the trial equipment',
      'Decolonising evaluation: indigenous methods, co-production, and ceding control to people on the ground',
      'Quick-fire: how digital health companies should approach evidence generation and outcome selection',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction' },
      { time: '02:27', label: 'Shay\'s background and the Centre for Evaluation at LSHTM' },
      { time: '04:25', label: 'The inSCALE study: digital health for CHWs in Mozambique and Uganda' },
      { time: '08:50', label: 'Program theory, logic models, and process evaluation' },
      { time: '12:49', label: 'What the randomised trial found - and the unexpected result' },
      { time: '18:52', label: 'How to create hypotheses on what to measure' },
      { time: '21:35', label: 'Co-creation with people on the ground' },
      { time: '27:52', label: 'Challenges: network outages, adaptation, and iteration' },
      { time: '33:12', label: 'Decolonising evaluation: the big picture challenge' },
      { time: '40:02', label: 'The case for and against decolonial approaches' },
      { time: '45:02', label: 'Quick-fire: measuring what matters, evidence generation tips' },
    ],
    pullQuote: 'To understand why it improved care, if it did, was as important, if not more important, than understanding that it did.',
    bio: 'Dr Shay Soremekun is an epidemiologist and Co-deputy Director of the Centre for Evaluation at the London School of Hygiene and Tropical Medicine. Her research focuses on child and adolescent health in low and middle income settings, including trials of low-cost digital disease prevention programmes. She is a member of the UK Government Evaluation and Trial Advice Panel (ETAP) and sits on the steering committee for the John Snow Society. She lectures at postgraduate level on evaluation, epidemiology, and public health, and leads an MSc module in Study Design.',
    transcript: `Dr Shay Soremekun (04:25)
I work with the Malaria Consortium - a worldwide charitable organisation that looks at ways to prevent and control malaria in endemic settings. They approached us about evaluating a digital intervention to improve the care that children receive for suspected malaria, diarrhoea, or pneumonia. Together those three are the largest killers of children under five in sub-Saharan Africa. These are treatable conditions and many of the deaths are completely preventable. But historically health worker capacity has not been great, particularly in rural areas where community health workers are the last mile provider.

Community health worker programmes were introduced with fanfare two or three decades ago, but over the last ten years they have been chronically underfunded. CHWs have felt poorly supervised, poorly trained, disconnected from the wider health system. Drugs and diagnostic tests in their kits weren't replaced promptly. Our goal was to design a digital intervention that addressed these concerns - to co-create it with them and thereby lead to improved treatment of children.

Dr Shay Soremekun (07:43)
The intervention was a smartphone programme providing clinical decision support to community health workers in the diagnosis and treatment of children with suspected malaria, diarrhoea, or pneumonia. It also improved their reporting to facility supervisors, gave them automated and personalised feedback from their submitted data, and enabled free calls to other CHWs and facility staff. Because electricity is unstable in the areas in which they worked, we gave them a solar charger and multiple charging pins for different phone models.

We used what we call a program theory - an approach to design and evaluation. We proposed that improving treatment of children would be based on a series of mechanisms of change: the intervention would lead to improved CHW performance, motivation, and retention, which would ultimately result in improved coverage of children receiving appropriate care when sick. We created a logic model to show this whole process, and agreed a set of indicators right along the proposed pathway - not just the final outcome.

Dr Shay Soremekun (12:49)
We ran a randomised controlled trial across large areas in Mozambique and Uganda. Areas that received the digital intervention versus those that didn't were randomly assigned, so we can be quite certain about the causal pathway. We saw improvements in appropriate treatment of children of between 10 and 26% - really good for a pragmatic trial.

But our process evaluation revealed something unexpected. The community health workers in both groups - intervention and control - showed similar levels of motivation, connectedness to the wider health system, and performance. What we actually found was that facility-based health workers provided better care where they had access to the digital package. A major area for true focus was not community health worker care, but facility care.

And it made sense - our qualitative research showed facility staff had expressed a desire to have access to the smartphones too. There could have been tensions if it was perceived that the CHWs had received extra support and they hadn't. The lesson: we need to take a wider, systems-level lens. Supporting the final-mile workers is exemplary, but it is often not enough.

Dr Shay Soremekun (18:52)
We didn't identify what to measure by accident. Before the trial, we spent two to three years on formative research in both countries - speaking to families of sick children, community health workers, health facility staff, mobile phone network operators, local and national government ministers. We did a pile-sorting exercise where we looked at various possible interventions and whittled them down to what stakeholders thought would work in their area. We did a large literature review on digital interventions - how they work, in which contexts.

All of that is published in separate papers because it really is a big job. But that process is how we arrived at our program theory. And then I remember days of workshops in Mozambique and Uganda - making lists and lists of intermediate indicators that we were both counting. Working with people on the ground who knew the context. Some things you might want to measure aren't even feasible to measure in a given setting. That's only something the people on the ground can tell you.

Dr Shay Soremekun (23:21)
We found a community health worker who had started a side business: charging his community members' phones for a small nominal fee using the solar charger and pins we had provided as part of the trial. He showed us his account book. He was so happy - it had increased his standing in the community, helped him feel more confident when treating children, and provided a small income. We thought that was brilliant. He was resourceful, he was offering a service to his community at a reasonable price. And we liked that very much.

Dr Shay Soremekun (27:52)
Our biggest challenge was network coverage in sub-Saharan Africa. Particularly in Mozambique, we just couldn't predict the level of network outages. And we had some difficulty with adoption among older community health workers who were well respected by their communities but found the smartphone a bit difficult. So we had to constantly take information in and adapt iteratively.

The first change: store report information on the phone so they didn't have to be constantly connected. They only needed to upload when they had network coverage - no deadlines, no timelines. We also learned you probably do need IT staff physically in the country to fix phone problems. You can't do that remotely.

Dr Shay Soremekun (33:12)
At the Centre for Evaluation at LSHTM - a school with historical links to the colonial past - we wanted to move away from a model of evaluation where you identify a problem in someone else's setting and then solve it using methods developed in high-income westernised countries over centuries. That disconnect is one reason why interventions often don't scale or get adopted even when they show positive results.

We want to make evaluation more equitable, relevant to low and middle income settings, and decolonial in approach. That means: who decides what matters? How are the people most affected by an intervention involved in designing how it's evaluated? Co-production - making sure the right people are leading the design on the ground - has a massive impact not just on evaluation quality, but on the chances of seeing success and the chances of it being adopted.

We're about to publish a scoping review of papers characterising indigenous evaluation methods - whole ways of knowing the world that we don't consider because they come from people who historically haven't been empowered. We're also publishing a position piece. These methods, incorporated into how we do evaluations, can transform the chances of an intervention actually reaching and benefiting the communities it's meant to serve.

Dr Shay Soremekun (45:02)
How to measure what matters: co-create your evaluation design with people on the ground - those who will conduct the research, those exposed to the intervention, and those with the agency to scale it. Consider your evaluation not just around a hard impact endpoint, but around the context in which it's being delivered. And try to measure things in that context.

For digital health companies choosing clinical outcomes: do formative research. Talk to the people who are going to be affected. Once you've produced a program theory - how does your AI intervention achieve its impact? - create a logic model mapping every stage. Then agree on indicators all along that process, not just the final outcome.`,
  },
  {
    id: '31',
    slug: 'why-displaced-people-need-a-digital-identity',
    episodeNumber: 22,
    title: 'Why displaced people need a digital identity',
    guest: 'Nadia Kadhim',
    guestRole: 'Co-founder, Naq',
    date: 'Jan 2026',
    artworkUrl: '/guests/nadia-kadhim.jpg',
    description: 'There are 43 million people displaced through conflict and environmental disaster. Their likelihood of accessing good healthcare is already poor - and as we race towards algorithmic decision-making, they are becoming invisible in the data underpinning it. Nadia Kadhim, co-founder of Naq and daughter of an Iraqi refugee, explores what digital identity and data ownership really mean for displaced people, why this is an everybody problem, and what builders, policymakers, and funders need to do differently.',
    url: 'https://www.gpodh.org/why-displaced-people-need-a-digital-identity/',
    themes: ['Digital Identity', 'Refugees', 'Data', 'Policy', 'Human Rights'],
    country: 'International',
    tags: ['digital identity', 'refugees', 'displaced people', 'data ownership', 'interoperability', 'compliance', 'GDPR', 'health data', 'statelessness', 'climate displacement', 'ethics', 'Naq'],
    topics: [
      'Digital identity for displaced people is broken - and how this creates very real barriers to care',
      'Two stories: a friend who fled imprisonment with no identity documents, and a Ukrainian mother whose daughter\'s chronic illness nearly went untreated',
      'Why statelessness blocks not just healthcare but the ability to attach any human rights to a person',
      'The collision of law, politics, healthcare, and innovation: why this problem keeps not getting solved',
      'Whose data is it? Moving from records about refugees to records owned by refugees',
      'Data security risks unique to displaced people: governments as bad actors, data that could be used for persecution',
      'The inverse care law and health data poverty: the people who need algorithmic decision-making most are least represented in the training data',
      'The business case problem: a refugee\'s health shouldn\'t live or die by a VC return timeline',
      'What founders building digital health tools should do right now - even if refugees aren\'t their primary user group',
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
      { time: '43:13', label: 'Nadia\'s recommendations for policymakers and digital health founders' },
    ],
    pullQuote: 'We need to stop thinking about records about people and about refugees - and start thinking about records owned by refugees and displaced people themselves.',
    bio: 'Nadia Kadhim is co-founder of Naq, an automated compliance platform for healthcare and digital health companies. With a background in international humanitarian law, child rights, and privacy from Leiden University and years as a privacy officer, Nadia co-founded Naq to make regulatory compliance accessible and meaningful for health organisations. Her father was an Iraqi refugee, and her passion for human rights and digital identity for displaced people runs through everything she does.',
    transcript: `Nadia Kadhim (00:00)
How do we ensure that these people can access that data - and just the people that they want to share it with can access that data - at the time that they need it, at the place that they need it? I think we need to stop thinking about records about people and about refugees, and start thinking about records owned by refugees and displaced people themselves.

Shubhanan Upadhyay (00:24)
There are 43 million people displaced through conflict and environmental disaster. Refugees, through no choice of their own. The likelihood of this is going up. The likelihood of you being directly affected by this is going up. And yet our health systems are not really set up to deal with people who have come from a different place accessing healthcare.

Imagine you've had to leave at very short notice your home with your family. You've barely scraped together some documents. People don't speak your language. You have acute healthcare needs - maybe someone is hurt, sick, or has suffered trauma. How do you tell people what chronic conditions you have when you don't know the language? Maybe you have a health record in your country, but there is no way for anyone to access that in the clinic where you are trying to get your insulin. If you don't get it, you will end up in a really bad situation.

Nadia Kadhim (02:58)
My early career started after I did my law degree at Leiden University and a master's in international humanitarian law, specialising in child rights and the legal aspects of child abuse. I really just wanted to help the most vulnerable people in society. After my master's I became a privacy officer at a child protection organisation - my first introduction to privacy. The problems I saw with tech and privacy compliance and cybersecurity led me to start Naq with my co-founder Chris.

My father is an Iraqi refugee. His travel to the Netherlands in the early 90s was traumatic, as it is for millions of people around the world. My personal interest in helping people, in human rights and refugees, comes from that lived experience. And my work today is grounded in data - because data is power. Data can enable innovation. But a lack of data can block innovation, block adoption, and block human rights. The right to access healthcare is enshrined in international law. But that right is massively impacted if there is no data - and no legal identity - to attach it to.

Nadia Kadhim (13:48)
At the heart of this problem: it's very difficult to have rights attached to data, or even the right to healthcare, when there is no legal identity. We're talking about statelessness. Some estimates say 250 million people have been displaced over the last 10 years. And if you factor in the climate crisis, this will only increase. All the very necessary innovation in healthcare is focused on people like you and I who can go on holiday, who even if they don't have their digital patient file ready, have the means to communicate. Imagine when that isn't possible - when there's a massive language barrier, a cultural barrier, a lack of money, and no documents.

Nadia Kadhim (15:21)
Two examples. A friend of mine fled a conflict situation after nine months of imprisonment. They came to the Netherlands after a long time on back roads and on foot. They were sent to a refugee camp. Once shelter and food were sorted, there was finally space to think: am I healthy? But they had lost their passport - it had been taken. They had no way of using healthcare provisions in local hospitals. The lack of identity was a direct blocker to care.

The second: I spoke to a group of healthcare professionals and mentioned the need for a digital identity owned by the displaced person themselves. A woman came up to me afterwards. She was a refugee from Ukraine, travelling with two daughters, one of whom had a chronic illness. She couldn't remember everything - vaccinations, allergies, medications. She didn't have the language. She was too traumatised to start explaining. She said: this is exactly what I would have needed. Unfortunately, she is not alone.

Nadia Kadhim (22:20)
Why hasn't this been solved? Because it cuts across law, policy, politics, healthcare, and innovation. One of the core issues is recognition - just as countries need to recognise territories, a person needs a recognised legal identity to have rights attached to it. What counts as identity in one country, one hospital, one emergency care tent, is different throughout the world. That requires legal change, multi-stakeholder collaboration, and a very uncomfortable question: who pays?

I often say a refugee's health shouldn't live or die by a VC return timeline. This immediate ROI logic can't be applied to a problem at the intersection of healthcare, law, politics, ethics, and basic human rights. We need to measure returns differently: prevention of public outbreaks, social integration, economic contribution, human dignity. If we can't provide basic infrastructure for the people who need it most, our definitions of value need to change.

Nadia Kadhim (38:22)
One thing we haven't discussed: data can be used for harm. Electronic patient files contain very sensitive information. In certain countries and contexts, data about someone's sexuality, beliefs, or political history can be used as a reason to persecute them. So we really need to think about data holistically: accessibility, interoperability, compliance - but also security from potentially bad actors, in a context where government itself can be a bad actor.

And ownership. Who owns the data? We need to move from records about refugees to records owned by refugees. How do we ensure they can access their own data, share it only with who they choose, at the time and place they need it?

Nadia Kadhim (45:37)
For digital health founders and builders: your tool might not be built for refugees - but could it be? Is it built with ethics in mind: transparency, interoperability, security? If so, you are already building something that could potentially be used by these very vulnerable groups of people - whether that is someone in a conflict situation now, or your neighbour in ten years who has to find another place to live because of rising water levels.

Don't think of ethics and compliance as a tick-box exercise. Think of it as putting humanity at the centre. When you do that, you are already part of the solution.`,
  },
  {
    id: '33',
    slug: 'digital-innovation-in-humanitarian-settings',
    episodeNumber: 24,
    title: 'Digital innovation in humanitarian settings',
    guest: 'Javier Elkin',
    guestRole: 'Former Head of Digital Health, ICRC',
    date: 'Feb 2026',
    description: 'How does an organisation like the ICRC - working in conflict zones, disasters, and last-mile settings across the world - approach digital transformation? Javier Elkin spent three years building the ICRC\'s digital health unit from scratch. He shares the prioritisation framework he developed, two landmark implementation examples (including using DHIS2 to spin up a trauma tracking system in two weeks), and the extraordinary MOOVE/Medotron initiative to validate and contextualise LLMs for humanitarian settings where \'call 911\' is not a useful answer.',
    url: 'https://www.gpodh.org/digital-innovation-in-humanitarian-settings/',
    themes: ['Humanitarian Health', 'AI', 'Implementation', 'Open Source', 'LLMs'],
    country: 'International',
    tags: ['ICRC', 'humanitarian', 'digital health', 'DHIS2', 'open source', 'LLMs', 'Medotron', 'MOOVE', 'EPFL', 'prioritization', 'Nigeria', 'Almanac', 'conflict zones', 'theory of change'],
    topics: [
      'Building a digital health unit from scratch at the ICRC - and navigating a 700 million franc financial crisis two months in',
      'The prioritization quadrant framework: strategic alignment, impact, technical alignment, and effort',
      'The Almanac in Nigeria: 413 facilities, 450,000 paediatric visits, and a phased strategic handover to the Nigerian Ministry of Health that led to national scale-up',
      'DHIS2 in a conflict escalation: spinning up a trauma centre monitoring form in two weeks using existing open source infrastructure',
      'The MOOVE initiative: Massive Online Open Validation Evaluation for contextualising LLMs in humanitarian settings',
      'Why \'dial 911\' is technically correct but has zero value in a conflict zone - and how to build AI that gives actually useful answers',
      'Medotron: retraining open source LLMs on medical data and validating them with field clinicians via a humanitarian validathon',
      'The three phases of responsible AI deployment: external validation, silent move (AI in parallel with humans), true move with clinical outcomes',
      'Honest reflections on the humanitarian sector: the crisis of trust, why the values aren\'t enough anymore, and what needs to change',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction to digital health and Javier\'s journey' },
      { time: '07:55', label: 'Approach to creating a digital health unit from scratch' },
      { time: '13:53', label: 'Prioritization framework' },
      { time: '22:32', label: 'Innovative solutions in humanitarian health' },
      { time: '29:21', label: 'Strategic handover and local ownership - Nigeria' },
      { time: '35:20', label: 'Integrating digital health in conflict zones - DHIS2' },
      { time: '41:21', label: 'Evaluating AI in humanitarian settings - MOOVE and Medotron' },
      { time: '53:26', label: 'Reflections on trust and the humanitarian sector' },
    ],
    youtubeVideoId: 'LjbXiGTCtDs',
    pullQuote: 'Your LLM might be technically and even medically correct - but completely useless on the ground for someone in a conflict zone.',
    bio: 'Javier Elkin spent three years as Head of Digital Health at the International Committee of the Red Cross (ICRC), where he built the digital health unit from scratch and developed a portfolio spanning clinical decision support, pharmacy stock management, physical rehabilitation digitisation, telehealth, and AI evaluation. Previously he was at WHO\'s Department of Digital Health and Innovation under Alain Labrique, serving as product owner for the WHO\'s Facebook Messenger chatbot (2 million users), and at Unitaid. He has a PhD in neuroscience and was raised across seven countries by UN human rights lawyers.',
    transcript: `Javier Elkin (04:03)
I studied psychology and was always very curious about people and how they work. I was raised in seven different countries by UN parents - both international human rights lawyers. I went on to study neuroscience, two masters and a PhD. That was also when I first started working with AI algorithms and digital technology. I was doing mass experiments for public health with apps and tablets on mental health. I didn't even know I was doing digital health, but apparently I was.

From there I went to work in startup incubators and the strategy funding units of the UK government. Then I moved to Geneva and joined IQVIA, working with pharma companies. Then Unitaid - a mobile health funder hosted by WHO - in the strategy team, creating new funding mechanisms. When COVID hit I joined WHO proper under Alain Labrique, advising ministries of health on national digital health strategies and serving as product owner for the WHO's Messenger chatbot on Facebook - two million users, 100,000 subscribers, with smoking cessation, mental health support, and a natural language processing interface that people engaged with far more than the old press-1-2-3-4 format.

Then a position opened at ICRC: the first digital health coordinator, building something from scratch. I started there three years ago. Last week, I'm no longer at ICRC. But it seemed a good opportunity to reflect and share what happened.

Javier Elkin (07:55)
When I arrived, there was this idea that so much was already being done in digital health across the ICRC that it needed order, a systematic approach, a portfolio. The ICRC is a very innovative organization - people in field delegations are always thinking of new ways to solve problems. The issue was that without a systematic approach, every problem got its own solution. And there are so many problems that we ended up with a lot of solutions on our hands.

The first thing I did was take a lay of the land - what was happening well, what wasn't. But two months into my role, we had a financial crisis. A 700 million franc deficit. So the priorities had to change.

I've always believed: never let a good crisis go to waste. The financial crisis was an opportunity to present a new digital model that addressed the organization's real questions. That was most of the first year.

Javier Elkin (13:53)
The prioritization framework we developed had four criteria: strategic alignment, impact, technical alignment, and effort.

Strategic alignment: is this aligned with our logical framework and institutional strategy? Does it have sustainability? Are local partners able to take it on?

Technical alignment: is it open source or paid licensing? What are the data security implications? Do we have the in-house skills or does it need new expertise?

Impact: what are the health outcomes? Can we make a financial case for a partner to adopt it because it saves them money versus business as usual? How many people will it reach? Is it relevant beyond one country?

Effort: how much money and how many people does it need? Can it be integrated into daily work?

This empowered the team to say yes or no confidently. When we had to say no, people could come to me with a case using the same criteria. No more "he asked me first." And for leadership, it provided clarity, continuity, and resilience of decisions - especially important when people rotate in and out all the time.

Javier Elkin (29:21)
The Almanac story. The Almanac - algorithm for management of childhood illness - is a tablet-based solution developed with Swiss TPH that gives the WHO's IMCI guide for treating children to community health workers who may not have full medical training. It was deployed across 413 facilities in Adamawa State, northeastern Nigeria, covering 450,000 visits of children under five.

In 2023, the conflict in that area was deescalating and ICRC needed to exit and redirect resources. Instead of a standard exit, I proposed a strategic handover. The local district health had already shown leadership and pride in the programme. So we designed a two-year phased exit. Phase one: transfer assets and programme ownership to the Ministry of Health, build capacity, train other states. Phase two: scale to five additional states, covering over 25 million children.

The Nigerian Ministry of Health adopted Almanac. We helped them draft recommendations for policy change. The National Council for Health approved Almanac as a tool of choice nationally. We created a roadmap so that after we left, they would keep building on the momentum. That wouldn't have happened with a standard exit. But the internal tension is real: some say we're a humanitarian actor, not a development actor. When emergency dies down, we leave. Others say we've been in some of these places for decades - we've created dependence. How do we leave responsibly? It is possible to think more strategically about this when you've been engaged for so long.

Javier Elkin (35:20)
The second example shows what you can do when you invest in open source. An escalation in one context suddenly meant more trauma patients. Field teams needed a simple digital solution to monitor patient flows and staff activities across three or four trauma care centres, sometimes far apart.

The existing process: pen and paper, computer systems in different facilities, a field officer collecting data weekly, someone in a central function cleaning it and putting it into Excel, then sharing back to decision makers at delegation and headquarters level. Fragmented, slow, outdated by the time it arrived.

What we built: a trauma centre form configured in DHIS2 - which we were already using for medical databases and other tools. We created dashboards linked to it. Within an offline app. From the field requesting it to deployment through all internal approvals: two weeks.

Hospital staff just captured data directly on their phone or web app. It automatically synced. Reporting became immediate and coordinated. The impact was instant - data in one system, better team coordination, staff spending less time on administrative burden and more time supporting patients. The simplest solutions often have the most impact.

Javier Elkin (41:21)
As soon as I started at ICRC, everyone was excited about LLMs. There was almost pressure to start using them for clinical decision making - and nobody really knew what responsible looked like. Luckily ICRC had a partnership with EPFL, where a brilliant partner called Annie Hartley had been developing Medotron: an open source LLM retrained on medical data - textbooks, journals, PubMed - to make it relevant for humanitarian health.

The challenge: standard AI benchmarks don't translate to humanitarian contexts. If you ask an LLM what to do for a gunshot wound in a remote conflict zone, it might say: call emergency services. Technically correct. Zero value on the ground. What you need is: put this person on the back of a motorcycle, drive to the nearest health centre, here is what to do to stabilise them first. Correctness is situational. A clinically correct answer can be completely unusable in our context.

So we adopted Medotron through the MOOVE - Massive Online Open Validation Evaluation. It's a platform where field clinicians - nurses, doctors, surgeons experienced in conflict settings - log in and are asked questions. They receive two answers from different models and vote on which is better, and why. They score for clinical accuracy, fairness, bias, length, sourcing. With a minimum of three expert reviews per question, you correct for inter-clinician variability. We also introduced a RAG layer - Retrieval Augmented Generation - so we could feed in ICRC's institutional guidelines and reduce the model's degrees of freedom.

We eventually opened this up to the whole humanitarian sector. MSF and other partners joined. It became a humanitarian validathon at themoove.org - anyone can still enrol their experts today. EPFL will eventually give each organisation its own contextualised chatbot.

Phase one was external validation. Phase two - the silent move - moves to real questions from the field, but the AI never influences care. It observes in parallel: what would the AI have recommended versus what the doctor did? Phase three - the true move - is where AI is used alongside standard care in a controlled way, with clinical outcomes compared between AI-assisted and non-assisted care.

What this work illustrates: you can't call a model finished just because it performs well on a benchmark. You're not done. You need to go through these steps to move from experimentation to responsible, scalable AI. It has to be cautious, stepwise, structured. And it has to co-design with the end users all the way through.

Javier Elkin (53:26)
My honest reflection on the humanitarian sector: the funding crisis is real, but to me it's more a symptom than the cause. The deeper problem is a crisis of trust and coherence. There are many organisations in the sector all claiming to abide by the same principles - humanity, impartiality, neutrality - but applying and communicating them differently. That creates a credibility problem.

And internally, under pressure, organisations tend to retreat into what's familiar: cut innovation functions, hope that simplification will bring control. But the complexity won't disappear because we put it to the side.

The sector also has a tendency to assume that because the work involves helping people in terrible situations, it is inherently good. At an individual level, that is absolutely true. At an organisational and sector level, I don't think it's enough anymore. There are no scrutiny mechanisms for the humanitarian sector. All claims are allowed. We need to invite external and independent scrutiny - not as a threat, but as a necessity. We need to be transparent about where we fall short. We need to question some long-standing assumptions. We need to stop looking at the past and saying: we've been around for 163 years, therefore we can be trusted. Trust is earned. And it can be lost.`,
  },
  {
    id: '32',
    slug: 'usaid-cuts-womens-health-and-leading-the-right-way',
    episodeNumber: 23,
    title: 'USAID cuts, women\'s health and leading the right way',
    guest: 'Dr Patricia (Patty) Mechael',
    guestRole: 'Co-founder and CEO, health.enabled',
    date: 'Jan 2026',
    description: 'Recorded live at the Global Digital Health Forum in Nairobi in December 2025, Patty Mechael brings nearly three decades of mHealth and digital health experience into a wide-ranging conversation on the state of global health after a year of upheaval. We cover the USAID funding crisis, repeating patterns from the 1990s, women as both decision-makers and consumers of health technology, how to evaluate digital health tools in ways that actually matter, and what compassionate leadership looks like when the incentives don\'t reward doing the right thing.',
    url: 'https://www.gpodh.org/usaid-cuts-womens-health-and-leading-the-right-way/',
    themes: ['Global Health Funding', 'Women\'s Health', 'Leadership', 'Digital Health', 'AI'],
    country: 'International',
    tags: ['USAID cuts', 'women\'s health', 'gender', 'digital health', 'mHealth', 'leadership', 'health.enabled', 'Nairobi', 'Global Digital Health Forum', 'evaluation', 'ethics', 'AI', 'compassion'],
    topics: [
      'The state of 2025: USAID cuts and their ripple effects on healthcare and digital health in underserved communities',
      'Lessons from the 1990s to now: what patterns keep repeating, and what fundamental mistakes we\'re still making',
      'Women as decision-makers AND consumers: why this is not just the right thing to do, but represents massive unmet market opportunity',
      'Value and context in evaluation: how to actually assess digital health and AI tools in ways that matter',
      'Building trust in digital health solutions - and the tension between scalability and trust',
      'Leadership with values: Patty\'s honest reflections on what she\'s learned and gotten wrong',
      'Compassionate leadership and ethical practices when the incentives don\'t reward it',
      'Bootstrapping and sustaining innovations in digital health',
      'The theory of change in digital health: connecting tools to outcomes',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction' },
      { time: '01:24', label: 'Reflections on the Global Digital Health Forum' },
      { time: '04:03', label: 'Patty\'s journey and background' },
      { time: '08:20', label: 'Aha moments in public health' },
      { time: '11:46', label: 'The importance of data in health interventions' },
      { time: '16:01', label: 'Learning from low-resource settings' },
      { time: '21:55', label: 'Building trust in digital health solutions' },
      { time: '24:50', label: 'Balancing scalability and trust' },
      { time: '30:22', label: 'The role of compassion in healthcare' },
      { time: '40:53', label: 'The theory of change in digital health' },
      { time: '46:13', label: 'Bootstrapping innovations in digital health' },
      { time: '52:49', label: 'Compassionate leadership and ethical practices' },
      { time: '57:08', label: 'The role of women in health and technology' },
    ],
    pullQuote: 'Women are not just a target population. They are decision-makers and consumers representing the biggest unmet market opportunity in health.',
    bio: 'Dr Patricia (Patty) Mechael is a global digital health leader, speaker, and award-winning author with nearly 30 years of experience shaping equity-centred health and technology initiatives across more than 45 countries. She is Co-Founder and CEO of health.enabled, where she leads the Global Digital Health Monitor and Digital Health and AI Strategy work with Gavi, WHO, UNICEF, and others. She is also a Senior Associate Professor at the Johns Hopkins Bloomberg School of Public Health, Co-Principal Investigator for the Gates Foundation\'s Digital Health Exemplars, and teaches a course on Gender-Intentional Digital Health.',
  },
  {
    id: '22',
    slug: 'regulatory-strategy-for-founders-and-policy-makers',
    episodeNumber: 13,
    title: 'Regulatory strategy for founders and policy makers',
    guest: 'Hugh Harvey',
    guestRole: 'Founder, Hardian Health',
    date: 'Apr 2025',
    description: 'Practical breadth and depth on the global state of regulation from someone at the cutting edge of regulatory policy. The EU versus FDA divide, what only ~40% of African countries even having medical device regulations means for founders, why regulatory debt is a company killer, and what regulators could do better.',
    url: 'https://www.gpodh.org/regulatory-strategy-for-founders-and-policy-makers/',
    themes: ['Regulation', 'Policy', 'AI', 'Global South'],
    country: 'International',
    tags: ['regulation', 'FDA', 'EU MDR', 'MHRA', 'AI regulation', 'medical devices', 'LLMs', 'cybersecurity', 'regulatory debt', 'LMICs', 'Africa', 'QMS', 'ISO 13485'],
    topics: [
      'The global state of medical device regulation: EU vs FDA and the deregulatory shift under Trump',
      'Why only ~40% of African countries have medical device regulations - and what this means for founders',
      'Cybersecurity: medical health data sells for more than financial data on the black market',
      'The five stages of regulatory grief - and how to reach acceptance',
      'Regulatory debt: why leaving it late becomes insurmountable',
      'The driving test analogy: practical mindset for founders approaching regulation',
      'What to do when deploying in a country with no regulatory framework',
      'What regulators could do better: proactivity, transparency, and funding capacity',
      'LLMs in healthcare: massively overrated for reasoning, but not without promise',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction and background' },
      { time: '04:22', label: 'The state of regulation in healthcare' },
      { time: '06:36', label: 'Why so regulated?' },
      { time: '09:24', label: 'Global perspectives on regulatory approaches' },
      { time: '16:53', label: 'Harmonisation of global standards' },
      { time: '19:34', label: 'Recommendations for regulators' },
      { time: '31:53', label: 'Regulatory strategy for founders: the driving analogy' },
      { time: '42:14', label: 'What if there is little or no regulatory enforcement where I operate?' },
      { time: '43:59', label: 'The five stages of regulatory grief' },
      { time: '47:44', label: 'Hugh\'s spicy takes' },
    ],
    pullQuote: 'What\'s the cost of not being compliant? Well, it\'s everything - it\'s your entire business model.',
    bio: 'Hugh Harvey is a former radiologist who transitioned to the digital health industry. After working at Babylon Health and serving as Clinical Director at Kheiron Medical - where the team secured Europe\'s first CE mark for a deep learning-based breast cancer detection device - Hugh founded Hardian Health to help companies navigate regulatory pathways for AI and digital health solutions.',
    transcript: `Hugh Harvey (00:00)
But literally everything we do in our life is regulated. You get in a car, you get on a train, you get on a plane, you open a bank account, you buy food, you wear clothes. They're all regulated to some extent. Healthcare is one of the most highly regulated sectors in the entire world.

The main aspect of cybersecurity risk: medical health data sells in the black market for more than financial data. The attack surface vector, especially under these generative AI models, is huge, vast, and frankly, completely unknown. It won't take long before the bad actors come pressing against these systems.

So you need to be very honest when you're going out for investment or grant funding about how much this is going to cost. I see too often that founders raise between a million and five million and their regulatory budget is 10,000 pounds. It's like saying you're going to learn to drive but not wanting to pay for your lessons - it's not going to happen.

Shubhanan Upadhyay (02:06)
Hugh Harvey of Hardian Health. Welcome to the Global Perspectives on Digital Health podcast.

Hugh Harvey (02:15)
Good to catch up - we should probably tell the listeners that we've known each other for a very long time. We went to med school together.

Hugh Harvey (03:10)
I went to med school, did foundation years on the South Coast, became a radiologist, CCT'd in 2014, then went into academia studying image manipulation techniques and machine learning. I worked at Babylon Health for a year, then became Clinical Director at Kheiron Medical where we got Europe's first CE mark for a deep learning-based device to find breast cancer on mammograms. Then I set up Hardian Health - originally helping radiology AI devices, but now all sorts: digital mental health tools, cardiology, pathology, respiratory, and even a couple of large language models, which is testing the boundaries of regulation.

Hugh Harvey (05:25)
Regulation covers everything we do in our lives and people forget this. The reason you know the food you eat is safe is because it's regulated. Healthcare is one of the most highly regulated sectors in the entire world. I'm a massive advocate for innovation and very excited about what AI can offer to medicine. But you have to innovate responsibly and meet that safety bar that everything else in life has to meet.

Hugh Harvey (07:20)
LLMs are incredibly exciting - the first generalist software humanity has created. But if you're going to claim it should be used in a clinical setting, unfortunately for you, it is also regulated. The greater the power and benefit you're claiming, the greater the risks as well, and the greater the evidence you must generate. Regulation, when you boil it down, is a benefit-risk ratio. Marketing in AI tends to be hyperbolic. I really wish people would have more mature conversations: we've shown that the benefits outweigh the risks, and here's what those risks are and how we've measured them. That engenders trust. Doctors will not use something based on the sales pitch alone.

Hugh Harvey (11:01)
The balance between regulation and innovation is tough. If you under-regulate, people come to harm. If you over-regulate, innovation is very slow to market. With the EU AI Act and EU MDR, the pressure is much higher in Europe. America, since the Trump administration, is on a deregulatory path. We're seeing FDA staff being laid off with extremely short notice - frustrating for the companies in the middle of submissions. Without regulatory parties holding the bar, cybersecurity risks become very scary.

There's a saying: regulations are written in blood. The FDA exists because of thalidomide - a drug given to treat high blood pressure, never tested in pregnant women, causing severe limb abnormalities in babies. AI can't cause physical defects like that, but it can cause errors in medical treatment, errors in medical records, errors in clinical decision-making, and it poses a huge cybersecurity risk.

Hugh Harvey (16:28)
In Africa, in 2017, WHO research found that around 40% of African countries have actual medical device regulations. The rest have nothing at all. Only South Africa has proper medical device regulations, a medical device authority, and notified bodies. Then there's a middle group with some kind of regulation that leans on European or American authorizations. And then a third category with literally no medical device regulation whatsoever. Those tiers are connected to the economic wealth and stability of the country. Having good regulation that works is actually a bit of a luxury - and we shouldn't look at regulations as stifling innovation. They're saving lives.

Hugh Harvey (19:34)
What could regulators do better? Be more proactive and more transparent. It took about two years after the invention of LLMs for any regulator to make a public statement about whether they'd be considered medical devices. The FDA are the best at proactivity - they have an enforcement discretion list, a list of devices where they say: these are medical devices but low-risk enough that we're not going to chase you.

I'd also love a mechanism for anonymised public information on regulatory thinking on novel devices, so the whole industry could move in sync with regulators. And governments should fund regulators better - the backlogs in Europe are up to a year just to get an audit. That's not a problem with regulation per se; it's a problem with regulatory capacity.

Hugh Harvey (31:28)
I think of it like learning to drive. You wouldn't drive a car on the road without a driving license, so you shouldn't be using your medical software in hospital without regulatory certification. How do you learn to drive? You pay for lessons and you practise. You read the highway code. And what happens at the end? You feel safe, you know how to drive, and providing you stay safe, you'll maintain your licence for your whole life.

Your regulatory budget should be roughly 5 to 10% of your overall budget. Regulatory compliance is a day-one problem. The minute you know you're going to be a medical device, get that support, get that advice, do the budget, do the timelines. Because the later you leave it, the larger the problem - there's a concept of regulatory debt, just like technical debt. If you ignore regulations until the last minute, the level of regulatory debt sometimes becomes impassable.

What's the cost of not being compliant? Well, it's everything - it's your entire business model. So surely you're going to invest something towards it.

Hugh Harvey (42:51)
If you're operating in an African country with no regulatory framework, the morally correct path is: take your device, figure out your risk class using the IMDRF matrix, get a certification in a country with a robust authorization pathway, and then approach that African government. Say: I've done everything I need to do in these established frameworks, I know you don't have a process here, but I'd love to work with you on this. Teach them. The days are over of using populations as guinea pigs.

Hugh Harvey (44:53)
The five stages of regulatory grief: first is denial - passive (you don't know regulations exist) or active (you know but ignore them). Then anger, when the regulations feel complex and their worldview is challenged. Then bargaining - finding the cheapest, quickest route. Then depression, when they realise the level of evidence and documentation needed. And finally, the most beautiful thing: acceptance. They go, "I feel safe. I understand quality management. I can sell to customers, I've got excellent documentation, people trust my product." The acceptance phase is a wonderful thing. It's a grief process to get there, but it's worth it.

Hugh Harvey (48:13)
My spicy take: large language models are massively, massively overrated for what I call reasoning. They are fantastic for semantic search and association of concepts. I'm not convinced they are reasoning engines. Applying them in the medical device realm is going to require huge amounts of evidence. The first LLMs that get regulated will appear limited - but over time you'll see the scope increase as people get to grips with how to demonstrate safety and effectiveness.

Shubhanan Upadhyay (53:28)
Hugh, it's been really, really great talking to you. Thinking about regulation as a way to create good products and a defensive moat. What regulators could do better - particularly around transparency. And for founders: think about it like a driving test, and invest in being a good driver. Thank you so much.

Hugh Harvey (54:43)
hardianhealth.com - everything you need to know about AI medical device regulation. Thanks, Shubs.`,
  },
  {
    id: '21',
    slug: 'health-first-innovation-second-smisha-agarwal-on-what-needs-to-change-in-global-digital-health',
    episodeNumber: 12,
    title: 'Health first, innovation second: Smisha Agarwal on what needs to change in global digital health',
    guest: 'Dr Smisha Agarwal',
    guestRole: 'Director, Center for Global Digital Health Innovation; Associate Professor, Johns Hopkins Bloomberg School of Public Health',
    date: 'Apr 2025',
    description: 'Some hard truths on global digital health from one of the field\'s most clear-eyed researchers. Why health systems remain fragile, how digital tools scale without legitimacy, what\'s wrong with our fixation on significance values, and how global health is stuck in systems that haven\'t evolved.',
    url: 'https://www.gpodh.org/health-first-innovation-second-smisha-agarwal-on-what-needs-to-change-in-global-digital-health/',
    themes: ['Health Equity', 'Evidence', 'Policy', 'Global Health Funding', 'Implementation'],
    country: 'International',
    tags: ['Johns Hopkins', 'USAID', 'monitoring and evaluation', 'health first', 'community health workers', 'donors', 'Oxford Open Digital Health', 'LMICs', 'plausibility', 'aid cuts'],
    topics: [
      'Why global health systems remain fragile - and how digital tools often scale without legitimacy',
      'The impact of USAID aid cuts: abruptness, trust, and what was lost',
      'What\'s wrong with our fixation on significance values and yes/no impact questions',
      'Health first: starting with the health outcome you want, then asking whether digital can help',
      'Community health workers - unpaid, unsupervised, yet expected to power digital systems at scale',
      'Outcomes proximal to your locus of control: a more honest approach to impact measurement',
      'Rethinking system-level success: contribution lines, business spreadsheet thinking, and nuance over binary answers',
      'The Oxford Open Digital Health Journal: challenging colonial structures in academic publishing',
      'Questioning the status quo - because the field hasn\'t evolved with the world',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction, Smisha\'s background' },
      { time: '05:01', label: 'Impact of global health aid cuts' },
      { time: '10:03', label: 'Challenges in monitoring and evaluation' },
      { time: '15:35', label: 'Health first: how to think about outcomes and measuring the right things' },
      { time: '20:54', label: 'Supporting healthcare workers as a goal' },
      { time: '26:37', label: 'Impact: measuring what matters' },
      { time: '28:39', label: 'Donor decision-making dynamics' },
      { time: '30:09', label: 'Rethinking system-level success: from yes/no to more nuance' },
      { time: '33:50', label: 'Innovations in academic publishing' },
      { time: '37:37', label: 'Challenging the status quo in global health' },
      { time: '42:20', label: 'Upcoming events in global digital health' },
    ],
    pullQuote: 'We\'re brought into a system of aid and global development that has stopped questioning how things were done. And the world has progressed, but our field hasn\'t.',
    bio: 'Dr Smisha Agarwal, PhD, MPH, MBA, BDS is the Director of the Center for Global Digital Health Innovation and Associate Professor in the Department of International Health at the Johns Hopkins Bloomberg School of Public Health. Her research focuses on advancing primary healthcare through community health systems and innovative technology, including predictive analytics and machine learning based on routine monitoring data. Over two decades, her work has informed WHO guidelines, donor investment strategies, and national digital health strategies. She is Editor-in-Chief of the Oxford Open Digital Health Journal.',
    transcript: `Smisha (00:00)
Can we use digitization to augment community health systems, to improve the work of community health workers, access to services for rural communities? But the truth in most settings where these very complex digital systems are being rolled out is that community health workers are not paid, they're not supervised, they're not legitimized, they are not institutionalized. And so in an innovation setup where you're just testing it out in one place, it made sense - can we leapfrog what's happening? But these systems have started to scale without question of whether the healthcare workers are being paid. And that sort of continuity without question is, I think, problematic.

Shubhanan Upadhyay (00:42)
Welcome to the Global Perspectives on Digital Health podcast. I'm very excited to have our guest today, Associate Professor at Johns Hopkins University Center for Global Health, Smisha Agarwal. We are going to be getting some great insights across some of the challenges around monitoring and evaluation and around the fallout of the USAID cuts that we've seen globally in the last couple of months.

Shubhanan Upadhyay (01:35)
Smisha, it's so great to have you on the podcast. Let's start a little bit about you and the work that you're doing at the Johns Hopkins Center for Global Health.

Smisha (01:50)
Thanks Shubs. It is the Center for Global Digital Health Innovation, and I direct it. It's an interdisciplinary centre that really brings together folks from different schools of Johns Hopkins - Public Health, Medicine, Nursing, Biomedical Engineering, and the School of Business. Our work is largely focused on primary health care and on maternal and child health. I started accidentally in digital health when I moved to a rural part of India and found that everybody - literate or with low literacy - was using phones to listen to cricket updates. As a young and enthusiastic recent business grad, I thought: let's see if we can use phones for healthcare. That was in 2008. We started a startup in Maharashtra to have community health workers monitor pregnancies and upload data to a cloud where we could identify high-risk pregnancies digitally and respond to them.

What sets our centre apart is that our driving principle is health first. If innovation gets in the way of healthcare impact, we want to remove the innovation. Innovation should be in service of delivery, not just tools and gadgets.

Smisha (05:50)
When the stop work orders came out, I was in a remote part of India in the state of Jharkhand - one of the states with the highest rates of infant mortality globally - working with the ministry to evaluate how frontline health workers can use clinical decision support tools to accurately diagnose and treat children presenting with fevers. This was funded through USAID's DIV mechanism. Unlike other proposals, DIV worked collaboratively with researchers to iteratively design the evaluation approach. It was extremely robust. And that was interrupted - and then terminated.

It's disappointing for us as research collaborators, but it's far more disappointing for our partners who have spent five or six years building community relationships, training healthcare workers, gaining trust. That is not something you can earn back quickly. It was not just the termination of it, but also the abruptness of it. Many of us in the field would agree that some things need to be fixed with the business of aid - but there is a responsible way to fix it.

Smisha (10:30)
On monitoring and evaluation: we've been supporting health programs not just to ask "does it work?" but also "when does it work well, how can you make it better, what must improve to make it work?" Those are implementation science questions. One challenge is that a lot of our practices come from pharmaco-epidemiology, where you administer a drug and there's a consistent dose. But in health systems research, there isn't a consistent dose - there's high variability because people, processes, and governments are involved.

Another challenge is plausibility. If you want to see that something works, it should theoretically make sense. But plausibility is based on prior beliefs, not logic. A technologist might think something's plausible; someone who's seen community realities might think it's implausible. Often our starting point - the question we're asking and the impact we're expecting - are incongruent.

Smisha (14:34)
We also need to change our expectations of what's feasible with technology. The average chatbot interaction lasts 15 seconds. Is that going to change vaccine beliefs? You cannot imagine a 15-second chat changing a lifetime of long-held beliefs. For developers, I recommend: identify impact measures that are closer to where you're intervening, within your locus of control. The challenge is that donors often need to be educated to allow for that, because they're looking at lives impacted.

The right outcomes are not always "better healthcare" - often the gains are in efficiency and long-term health system strengthening. Those are harder to measure, so we don't look at them.

Smisha (20:56)
As a centre focused on digital health, we often have folks come to us saying: here's an innovation grant, give us an idea in digital. My concern is that the starting point is "I want to be innovative to be competitive." We need to flip that. It's harder in the global ecosystem because we're not close to the communities where we're working. We're two steps removed from plausibility because we don't see the reality.

The example I keep coming back to: can we use digitization to augment community health systems? In an innovation test setting, yes, it made sense to try. But these systems have started to scale without asking whether the healthcare workers are being paid. In most settings where complex digital systems are being rolled out, community health workers are unpaid, unsupervised, not institutionalised. That continuity without question is problematic.

Smisha (24:57)
Where community health workers do see value in digital tools is simple: knowing what they'll get paid. Digitally having that accountability - "I've offered X services, it's performance-based financing, so I'll get Y in my bank account this month." That's a very clear logic model. The intervention, the benefit, the outcome. Financial accountability is maybe one of the clearest impact metrics.

Smisha (30:09)
The scientific community has done a disservice to policy-making by being fixated on a significance value of 0.05. For health systems interventions, we need a different lens. I like the analogy of a business spreadsheet: we have a set of assumptions, and based on those assumptions we decide a strategy. We're still evidence-driven; we're just not binary. Donors do need to make a decision - go or no go. But if there's no evidence, they still need to make a decision. By simply going yea or nay, we miss the opportunity to just get better.

The right questions are not whether something is working. The world is evolving. Some approaches are moving forward. How do we get them to work better?

Smisha (33:59)
On the Oxford Open Digital Health Journal: there is a lot wrong about international publishing in healthcare. We have a globally representative editorial board and have taken active steps to ensure globally representative reviewers. One question I had to negotiate with Oxford Publishing: why are we forcing Spanish-speaking authors to write in English, making their work inaccessible to people in their own countries? For countries that have been colonised, English is basically a tool of colonisation. When people don't communicate in a language they're familiar with, they can't communicate how effective or creative or intelligent they are. We're taking small steps: requiring that abstracts at least are available in the language of the country where the work was done; running writing workshops accessible to LMIC authors.

Smisha (37:19)
Maybe if there is a silver lining to recent events, it's that it has allowed a lot of people to voice their concerns. We want to question the status quo - we should be questioning it - because we are brought into a system of aid and global development that has stopped questioning how things were done. And the world has progressed, but our field hasn't. The answers are often complex, contextual, ever-changing. But we should at least prod on with good questions.

Shubhanan Upadhyay (44:09)
Smisha, it's been so valuable and insightful. I really appreciate the real talk instead of esoteric sound bites. A real understanding of the challenges in the field, not just sugar-coating things. I'm really grateful for your time.

Smisha (44:32)
This was really fun. Look forward to many more such conversations.`,
  },
  {
    id: '20',
    slug: 'digital-mental-health-research-insights',
    episodeNumber: 11,
    title: 'Digital mental health research insights',
    guest: 'Lucy Cesnakova',
    guestRole: 'Program Lead, Digital Medicine Society (DiME)',
    date: 'Mar 2025',
    description: 'Bringing research to implementation. Lucy Cesnakova from DiME shares insights from a landmark piece of research advancing digital solutions for mental health - with intentional representation across countries, income levels, and demographics. Universal commonalities, local nuances, and what builders and policy makers should take away.',
    url: 'https://www.gpodh.org/digital-mental-health-research-insights/',
    themes: ['Mental Health', 'Health Data', 'Implementation', 'Research'],
    country: 'International',
    tags: ['mental health', 'DiME', 'digital biomarkers', 'research', 'LMICs', 'Wellcome Trust', 'co-design', 'data privacy', 'sleep', 'physical activity'],
    topics: [
      'Why a global research effort on digital mental health technologies was urgently needed',
      'Universal commonalities: sleep, physical activity, and social behaviour as cross-geography mental health determinants',
      'Cost and access as barriers - not just in LMICs but in high-income countries too',
      'Designing for real-world use: battery life, ease of use, and unobtrusive design to avoid stigmatisation',
      'The right intervention for the right person at the right time - why mental health is uniquely complex',
      'Local nuances: community, youth, prevention awareness, and education needs in LMICs',
      'Data privacy: universally high concern, alongside strong trust in sharing data with clinical practitioners',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction to DiME and Lucy\'s work' },
      { time: '03:57', label: 'Current healthcare context' },
      { time: '06:01', label: 'Methodology of research and data collection' },
      { time: '08:27', label: 'Key findings: universal commonalities in mental health technologies' },
      { time: '16:04', label: 'Unique local insights' },
    ],
    bio: 'Lucy Cesnakova, MS, is a Program Lead at the Digital Medicine Society (DiME). At DiME, Lucy has led several projects in the space of digital measurements and technologies for health, including a pre-competitive collaboration to advance digital measurement of nocturnal scratch, an initiative exploring sensor-based digital health technologies for mental health, and recent work on use of patient-generated health data in medical product development. She works with industry, patient organisations, regulators, clinicians, and payers to improve adoption of digital technologies in research and care.',
    transcript: `Shubhanan Upadhyay (00:00)
Episode 11, Global Perspectives on Digital Health podcast. If you are working on mental health, digital biomarkers for mental health, health data poverty, ethical approaches to AI, responsible AI, then you're going to want to listen to this episode.

There's been a massive proliferation of digital solutions that serve people's mental health all around the world. There are wide variations in practice, policy, definitions, cultural contexts, healthcare workflow context, and practice. Lower and middle income country settings and underserved communities in higher income settings are also not that visible in research. So very, very excited about the key insights that they've got on what people who are in policy and decision makers and also vendors and builders can take away from this work.

Shubhanan Upadhyay (01:34)
Lucy Cesnakova, thank you so much for joining us. You work with DiME and I'm really, really excited to hear about the work that you've done. Could you tell us a little bit about yourself and the work of DiME?

Lucy Cesnakova (01:45)
Yeah, absolutely. Hello, Shubs. My name is Lucy Cesnakova, I work with DiME, Digital Medicine Society. I lead projects that are focused on improvement and innovations in digital measurements and digital endpoints. We aim to pick the problems that are most important to research - not promising that we are solving everything, but we are providing those stepping stones that help others to do important, meaningful research in this field.

Shubhanan Upadhyay (02:21)
DiME are big lighthouse leaders in terms of helping the whole industry understand what good implementation looks like. Maybe we could start with telling us a little bit about the why. Why was this needed? What kind of gap was this addressing?

Lucy Cesnakova (02:55)
This research was focused on exploring how we can advance adoption of digital health technologies for mental health. The overarching topic is that there is an immense potential for digital to aid research and care for mental health conditions, if it is done right and meaningfully. The evidence shows that it has mostly been done in isolation - small pilots, small studies, small groups. Some kind of larger support and initiative towards adoption would be great to overcome the gaps we identified.

Shubhanan Upadhyay (03:57)
We're in March 2025, and there's kind of been global seismic shifts in the way healthcare is perceived - the UK abolishing NHS England, cuts to USAID having massive cascading effects on healthcare. The cross-section you've got includes the UK and the US, but also these other contexts you've brought in. What struck you across these geographies?

Lucy Cesnakova (05:17)
In this research, what was great was that we aimed for global representation. We talked with healthcare providers, clinicians, with lived experience people - the patients - with researchers, policymakers and administrators. Not only very high income like the US and UK, but we also tapped into Africa, Asia, and Europe. It was really great to see where we can learn from one another and what are some universal similarities, and where some approaches can complement and inspire other parts of the world.

Shubhanan Upadhyay (06:14)
Do you have any key learnings from the methodology of the work?

Lucy Cesnakova (06:25)
We did three activities. First, a scoping literature review - looking at what evidence is out there. Then we talked to experts and people with lived experience in one-on-one interviews and also surveyed them in a modified Delphi approach. We got a lot from open text responses. And we closed everything with debriefing focus groups where we discussed the main learnings and areas where opinions differed.

Shubhanan Upadhyay (08:41)
What stood out for you? What were your biggest takeaways? Both the universal commonalities and the key local nuances.

Lucy Cesnakova (09:14)
I'll start with the commonalities. We explored which areas in mental health conditions can be targeted or measured by digital and sensor-based technologies. Almost universally, the highly appreciated ones were sleep, physical activity, and social behaviour. These are determinants of mental health that are universal across the world, and a lot of research has been done on them.

From the point of view of implementation, one of the interesting things that came up universally were cost and access. This was interesting because it was not only in low-income regions, but also in the US and UK - suggesting that even in high-income countries, there is a lot of heterogeneity in access to these technologies. Many people still view them as luxury items. This should not be viewed as a problem of poorer countries only.

There are ways to tackle this - building solutions that allow use of older phone models, low-cost devices, manufactured in larger quantities. These technologies don't always need to be the most high-end, newest Apple Watch.

Another universal commonality was accessibility - design tailored to the specific population and their needs. For example, people with depression sometimes have very low motivation when their depression spikes, and don't even want to plug in a device to charge. So a long battery life was highlighted as important for depression specifically. A meta concept here: if you really understand the people you're trying to serve, you get to that granular level of empathy - building for their ups and downs behaviourally.

Shubhanan Upadhyay (16:03)
How about local nuances - things unique to a certain country or area?

Lucy Cesnakova (16:03)
From the views of professionals from low and middle income countries, more emphasis was put on community, youth prevention, awareness - an approach to life that is oftentimes missing in more developed countries. People need to get better understanding about the mental health condition itself before thinking about any digital innovation. That need for education and awareness building is very strongly supported.

On stigma: when exploring what characteristics new devices should have, one thing that came up was that they shouldn't be glaring or very visible, so they don't draw attention to the condition. Sleek, unobtrusive design should be part of the thinking to avoid unnecessary stigmatisation.

A big surprise was that even across all countries, the emphasis on data privacy was very strong. People are already understanding that their data can go to many different places. They want that to be protected. But on the contrary, there is also a lot of trust in sharing data with clinical practitioners specifically.

Shubhanan Upadhyay (18:46)
What are the next steps on this?

Lucy Cesnakova (19:01)
We hope this research will inspire future work that goes more in-depth in specific conditions. We covered general recommendations and gaps. We would welcome future researchers to go deeper, but also larger - not to focus only on small pilots, but to go into larger studies and validations.

Shubhanan Upadhyay (19:33)
Lucy, thank you for sharing these valuable insights. Really great to see this type of research occurring.

Lucy Cesnakova (19:51)
Thank you very much. Have a great day.`,
  },
  {
    id: '18',
    slug: 'making-ethics-actionable-in-digital-health',
    episodeNumber: '10A',
    title: 'Making ethics actionable in digital health',
    guest: 'Jess Morley',
    guestRole: 'Digital Ethics Center, Yale University',
    artworkUrl: '/guests/jess-morley.jpg',
    date: 'Jan 2025',
    description: 'What does it actually mean to make ethics actionable - not just aspirational? Jess Morley shares hot takes on the UK\'s AI Action Plan, Ethics 101 for vendors and policy folk, how health system leaders can elevate ethical approaches in their ecosystems, and what builders at health tech companies can do when ethical imperatives meet business realities.',
    url: 'https://www.gpodh.org/making-ethics-actionable-in-digital-health/',
    themes: ['AI Ethics', 'Policy', 'AI', 'Health Equity'],
    country: 'International',
    tags: ['ethics', 'AI ethics', 'UK', 'AI action plan', 'Goldacre', 'NHSX', 'Yale', 'policy', 'LMICs', 'health tech'],
    topics: [
      'What the UK\'s AI Action Plan reveals about the state of ethics in the digital health industry',
      'How health system leaders and governments can elevate ethical approaches - what levers are available',
      'How product leaders, founders, and engineers can negotiate for ethical approaches against business realities',
      'Ethics 101 for vendors, researchers, and policy folk',
      'What leaders in LMIC settings can take away from the ethics debate in high-income countries',
    ],
    bio: 'Jess Morley is a researcher at the Digital Ethics Center at Yale University. She previously worked with NHSX and contributed to the Goldacre review in 2022, and has deep expertise on ethics, AI governance, and health policy.',
  },
  {
    id: '17',
    slug: 'policy-insights-from-the-rwanda-ministry-of-health-and-find',
    episodeNumber: 9,
    title: 'Policy insights from the Rwanda Ministry of Health and FIND',
    guest: 'Rigveda Kadam & Andrew Muhire',
    guestRole: 'Digital and AI Lead, FIND · Chief Digital Officer, Rwanda Ministry of Health',
    date: 'Dec 2024',
    description: 'Closing out the year with two fantastic guests: Rigveda Kadam from FIND and Andrew Muhire from Rwanda\'s Ministry of Health. Building on Episode 8, this discussion dives into the critical connection between product development partners and ministries of health - and what it takes to create the conditions for successful digital health implementation.',
    url: 'https://www.gpodh.org/policy-insights-from-the-rwanda-ministry-of-health-and-find/',
    themes: ['Policy', 'Implementation', 'Africa', 'Health Data'],
    country: 'Rwanda',
    tags: ['Rwanda', 'Ministry of Health', 'FIND', 'policy', 'digital health', 'antimicrobial resistance', 'systems thinking', 'LMICs', 'diagnostics'],
    topics: [
      'How Rwanda balances top-down mandates with frontline adoption to foster trust',
      'Tackling antimicrobial resistance with clinician decision support as a case study',
      'Systems thinking to measure success in evolving interventions - Andrew\'s "contribution lines" approach',
      'Rigveda\'s wishlist for the ecosystem: from WHO priority areas to better alignment on patient journeys',
      'Infrastructure, policy, and trust as the key elements for making digital health innovations stick',
    ],
    bio: 'Rigveda Kadam is an experienced global health strategist with expertise in digital health, AI, and public health programmes, driving impactful innovations and policy alignment. Andrew Muhire is the Chief Digital Officer at the Rwanda Ministry of Health.',
  },
  {
    id: '16',
    slug: 'co-designing-mental-health-solutions-with-young-people-in-rwanda',
    episodeNumber: 8,
    title: 'Co-designing mental health solutions with young people in Rwanda',
    guest: 'Dr Jana Alagarajah',
    guestRole: 'Technical Lead, YLabs; Digital Mental Health Specialist',
    date: 'Dec 2024',
    description: 'What does real, meaningful co-design look like? Dr Jana Alagarajah shares what he learned implementing a digital mental health tool with young people in Rwanda - how to listen before building, how to engage communities and carers, and how to get procurement and policy to genuinely value equitable solutions.',
    url: 'https://www.gpodh.org/co-designing-mental-health-solutions-with-young-people-in-rwanda/',
    themes: ['Mental Health', 'Co-design', 'Implementation', 'Africa', 'Community Health'],
    country: 'Rwanda',
    tags: ['mental health', 'co-design', 'Rwanda', 'YLabs', 'youth', 'UNICEF', 'USAID', 'digital health', 'Africa', 'evaluation'],
    topics: [
      'What real, meaningful co-design looks like in practice',
      'Engaging communities, young people, and carers to build solutions they actually use',
      'The mindset shift: going in with no pre-conceived notion of what will be built',
      'Getting procurement and policy to value and elevate equitable solutions',
      'Lessons from partnering with UNICEF, USAID, the King\'s Fund, and Health Foundation',
      'Co-developing Africa\'s first evidence-based digital mental health regulation with the Rwandan Ministry of Health',
      'Innovative evaluation approaches: from cluster RCTs to cyclical evaluation for digital health',
    ],
    bio: 'Dr Jana Alagarajah (MD MPH) is a digital mental health specialist, UK-trained public health doctor, and psychiatrist co-designing equitable and impactful digital health innovation in Africa with young people as Technical Lead at YLabs. Partnering with UNICEF, USAID, and the Gates Foundation, he leverages digital tools to strengthen health systems.',
  },
  {
    id: '15',
    slug: 'supporting-rural-healthcare-in-india-with-technology',
    episodeNumber: 7,
    title: 'Supporting rural healthcare in India with technology',
    guest: 'Ruchit Nagar',
    guestRole: 'CEO and Co-Founder, Khushi Baby',
    date: 'Nov 2024',
    description: 'A ground-level look at implementing technology to support India\'s community health workers - the ASHAs. Ruchit Nagar shares the challenges of integrating tech in rural healthcare, India\'s digital public health ecosystem, funding pitfalls, and the key learnings for anyone looking to implement at the last mile.',
    url: 'https://www.gpodh.org/supporting-rural-healthcare-in-india-with-technology/',
    themes: ['Community Health', 'Last Mile', 'Implementation', 'Policy', 'Health Data'],
    country: 'India',
    tags: ['India', 'ASHAs', 'community health workers', 'Khushi Baby', 'rural healthcare', 'digital public health', 'funding', 'data infrastructure'],
    topics: [
      'The role of ASHAs (Accredited Social Health Activists) in India\'s healthcare system',
      'Challenges of integrating technology to support community health workers',
      'India\'s digital public health ecosystem explained',
      'When "too much digital" gets in the way of good care',
      'Pitfalls in funding and investment approaches for health tech',
      'The 3 I\'s that drive implementation success',
      'Leveraging data for health system strengthening',
      'Aligning incentives with ground realities to improve health outcomes',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction' },
      { time: '03:53', label: 'Khushi Baby origins' },
      { time: '05:10', label: 'Challenges in community health delivery' },
      { time: '07:18', label: 'The role of ASHAs in healthcare' },
      { time: '12:28', label: 'The need for integrated solutions' },
      { time: '14:14', label: 'India public health digital ecosystem 101' },
      { time: '19:51', label: 'When "too much digital" gets in the way of good care' },
      { time: '22:28', label: 'Pitfalls in funding and investment approaches' },
      { time: '23:20', label: 'The 3 I\'s that drive implementation success' },
      { time: '31:56', label: 'Leveraging data for health system strengthening' },
      { time: '35:53', label: 'Challenges in health system integration' },
      { time: '41:35', label: 'Measuring impact and effectiveness' },
      { time: '47:44', label: 'Aligning incentives with ground realities' },
      { time: '53:56', label: 'Navigating quality, evaluation and regulatory challenges' },
      { time: '56:48', label: 'Future directions for Khushi Baby' },
      { time: '01:02:02', label: 'Ruchit\'s top takeaway for developers' },
    ],
    bio: 'Ruchit Nagar is the CEO and Co-Founder of Khushi Baby. For his efforts to deliver scalable public health impact, Ruchit has been recognised as a Forbes 30 Under 30 leader in Healthcare, a World Innovation Summit in Health Young Innovator, and a Distinguished Young Alumnus by the Yale School of Public Health.',
  },
  {
    id: '14',
    slug: 'impactful-digital-health-transformation-through-a-clear-vision-and-values-insights-from-eswatini',
    episodeNumber: 6,
    title: 'Impactful digital health transformation through a clear vision and values: insights from Eswatini',
    guest: 'Echo Vanderwal',
    guestRole: 'Executive Director, The Luke Commission',
    date: 'Aug 2024',
    description: 'What can a tiny country enveloped by South Africa teach the world about digital health done right? Echo Vanderwal shares how The Luke Commission built healthcare for those who needed it most - from telehealth hubs in shipping containers and drone delivery of antivenom, to a bespoke clinician-centred EHR - all anchored in clear values and a vision of what great care actually looks like.',
    url: 'https://www.gpodh.org/impactful-digital-health-transformation-through-a-clear-vision-and-values-insights-from-eswatini/',
    themes: ['Last Mile', 'Implementation', 'Community Health', 'Innovation', 'Leadership'],
    country: 'Eswatini',
    tags: ['Eswatini', 'Luke Commission', 'telehealth', 'drones', 'community health workers', 'EHR', 'rural healthcare', 'Starlink', 'antivenom', 'values-led'],
    topics: [
      'Telehealth hubs built from shipping containers with video access to doctors and secure medication vending, enabled by Starlink',
      'Drone delivery of critical medications including antivenom for Black mamba envenomation - and the lives it has saved',
      'Building a bespoke clinician-centred EHR and admin tool with the fastest possible feedback loops',
      'Creating a culture of compassionate patient care and the values that guided decision-making through challenging times',
      'Using the end goal of great healthcare to decide where digital can genuinely help',
      'Working proactively with the Civil Aviation Authority to safely establish a high-quality drone service - a lesson for regulators and developers everywhere',
    ],
  },
  {
    id: '13',
    slug: 'what-is-the-right-approach-for-regulation-and-evaluation-of-digital-health-technologies',
    episodeNumber: 5,
    title: 'What is the right approach for regulation and evaluation of digital health technologies?',
    guest: 'Stephen Gilbert',
    guestRole: 'Professor of Medical Device Regulatory Science, Dresden University of Technology',
    date: 'Jul 2024',
    description: 'A deep dive into digital health regulation with one of the field\'s leading experts - covering the DiGA fast track in Germany, PECAN in France, what\'s coming in the UK, stark differences between the FDA and EU approaches, and what health system leaders, policy makers, and developers should learn from all of it.',
    url: 'https://www.gpodh.org/what-is-the-right-approach-for-regulation-and-evaluation-of-digital-health-technologies/',
    themes: ['Regulation', 'Policy', 'Evidence', 'Implementation'],
    country: 'International',
    tags: ['regulation', 'evaluation', 'DiGA', 'Germany', 'France', 'PECAN', 'FDA', 'EU', 'medical devices', 'interoperability', 'reimbursement'],
    topics: [
      'Flexibility in digital health regulation: adapting to a rapidly changing landscape',
      'Integrating feedback from clinicians and patients into the regulatory process',
      'Evaluating digital health technologies holistically, not as isolated tools',
      'Suites and groupings of digital devices: regulatory approaches that acknowledge flexibility',
      'Lessons from DiGA (Germany), PECAN (France), and what\'s coming in the UK',
      'The stark differences between FDA and EU regulatory approaches - and the deeper reasons behind them',
      'Regulation\'s role in promoting interoperability across digital health systems',
      'Long-term thinking, clear goals, and continuous feedback loops for effective digital transformation',
      'Why digital transformation in healthcare requires investment and time before yielding dividends',
    ],
    bio: 'Stephen Gilbert is a Professor at the Faculty of Medicine, Dresden University of Technology (Else Kröner Fresenius Center for Digital Health), leading a multidisciplinary team specialising in regulatory science for medical devices and in vitro diagnostic devices. With over 15 years of expertise in clinical research, computational biology, and regulatory science, he is committed to advancing digital health innovation and governance.',
  },
  {
    id: '12',
    slug: 'creating-impact-with-ai-in-isolated-communities',
    episodeNumber: 4,
    title: 'Creating impact with AI in isolated communities',
    guest: 'Dino',
    guestRole: 'Audere',
    date: 'May 2024',
    description: 'How digital solutions and AI are revolutionising healthcare delivery in underserved and isolated communities - covering diagnostics, large language models, trust, and the critical role of local partnerships.',
    url: 'https://www.gpodh.org/creating-impact-with-ai-in-isolated-communities/',
    themes: ['AI', 'Last Mile', 'Implementation', 'Community Health'],
    country: 'International',
    tags: ['AI', 'isolated communities', 'diagnostics', 'language models', 'Audere', 'digital health', 'trust', 'partnerships'],
    topics: [
      'Digital solutions for overcrowded healthcare facilities: how digital health can alleviate pressure on healthcare systems',
      'The role of AI and language models in enhancing diagnostic and conversational capabilities',
      'Building trust and reliability in large language models through rigorous data handling and prompt engineering',
      'How strong local partnerships contribute to successful technology implementation',
      'Regulatory backing as a necessity for the safety and efficacy of new technologies',
    ],
  },
  {
    id: '11',
    slug: 'bridging-the-gap-the-last-mile-of-healthcare-with-bilal-mateen-digital-square-path',
    episodeNumber: 3,
    title: 'Bridging the gap: the last mile of healthcare',
    guest: 'Bilal Mateen',
    guestRole: 'Executive Director, Digital Square at PATH (now Chief AI Officer at PATH)',
    date: '',
    description: 'How do we meaningfully bridge policy and real impact at the last mile of healthcare? A conversation on digital health challenges and successes in underserved communities - covering safety, regulation, data infrastructure, community health workers, and the role of AI and large language models.',
    url: 'https://www.gpodh.org/bridging-the-gap-the-last-mile-of-healthcare-with-bilal-mateen-digital-square-path/',
    themes: ['Last Mile', 'Regulation', 'AI', 'Health Data', 'Digital Public Goods'],
    country: 'International',
    tags: ['last mile', 'digital public goods', 'PATH', 'data infrastructure', 'AI', 'LLMs', 'regulation', 'community health workers'],
    topics: [
      'Digital public goods: how digital solutions can be accessible public goods',
      'Health data poverty and its effect on global health equity',
      'The importance of strong data infrastructure',
      'Regulatory challenges and the work that still needs to be done',
      'AI and large language models to improve healthcare outcomes',
    ],
    timestamps: [
      { time: '00:00', label: 'Introduction and background' },
      { time: '05:06', label: 'Digital public goods' },
      { time: '07:04', label: 'How health data poverty plays out' },
      { time: '08:59', label: 'Reaching the last mile of healthcare' },
      { time: '15:47', label: 'AI and large language models in healthcare' },
      { time: '29:00', label: 'Investing in data science ecosystems and regulatory frameworks' },
      { time: '32:59', label: 'More global representation in regulation' },
      { time: '37:03', label: 'Considering local nuances in AI deployment' },
      { time: '39:12', label: 'Divergent approaches to regulating LLMs' },
      { time: '45:28', label: 'Regulation of LLMs as medical devices' },
      { time: '48:40', label: 'Recommendations to innovators about healthcare regulation' },
    ],
  },
  {
    id: '10',
    slug: 'health-data-poverty-part-2-with-prof-alexandre-filho',
    episodeNumber: 2,
    title: 'Practical solutions to health data poverty',
    guest: 'Prof. Alexandre Chiavegatto Filho',
    guestRole: 'Associate Professor of Machine Learning in Healthcare, University of São Paulo',
    date: '',
    description: 'How a team in Brazil is maximising the impact of data-driven technology for underserved communities - and what the global community can learn from Brazil\'s approach to data diversity.',
    url: 'https://www.gpodh.org/health-data-poverty-part-2-with-prof-alexandre-filho/',
    themes: ['Health Data', 'AI', 'Implementation', 'Global South'],
    country: 'Brazil',
    tags: ['health data poverty', 'machine learning', 'Brazil', 'data diversity', 'neonatal mortality', 'transfer learning', 'LMICs', 'algorithms'],
    topics: [
      'Global lessons from local successes: how Brazil\'s diverse datasets serve as a model for the world',
      'Overcoming data challenges and algorithm performance limitations in rural settings',
      'Neonatal mortality prediction using routinely collected data',
      'Ensuring that those from whom data is collected see direct benefits from its use',
      'Balancing highly tuned local solutions with scalable models for broader contexts',
      'ITU/WHO focus group on AI for health: benchmarking model performance across LMIC settings',
      'Using transfer learning to enhance model performance and local impact',
      'Prof. Filho\'s recommendations for innovators and implementers in the EU, US, and UK',
    ],
    pullQuote: 'The world is becoming more like Brazil.',
    bio: 'Alexandre Chiavegatto Filho is an Associate Professor of Machine Learning in Healthcare at the Department of Epidemiology, School of Public Health, University of São Paulo. He directs the Laboratory of Big Data and Predictive Analysis in Health (Labdaps), which includes a team of 30 researchers focused on developing AI algorithms to improve healthcare decisions.',
  },
  {
    id: '9',
    slug: 'health-data-poverty-part-1-with-xiao-liu',
    episodeNumber: 1,
    title: 'Health data poverty: what can we do about it?',
    guest: 'Dr Xiao Liu',
    guestRole: 'AI ethics, evaluation and regulation researcher',
    date: '',
    description: 'A crucial conversation on one of the most pressing issues in global digital health: health data poverty. What it is, why it matters, and how we might begin to address it.',
    url: 'https://www.gpodh.org/health-data-poverty-part-1-with-xiao-liu/',
    themes: ['Health Data', 'AI Ethics', 'Health Equity'],
    country: 'International',
    tags: ['health data poverty', 'AI ethics', 'data diversity', 'Lancet', 'health equity', 'data'],
    topics: [
      'Defining health data poverty: what it means and why it matters for global health',
      'Relevance to developed nations: implications for the US, EU, and UK',
      'In-depth analysis of a 2021 Lancet paper co-authored by Dr Liu',
      'Real-world examples of health data poverty and its impacts',
      'Dr Liu\'s views on current progress and the steps ahead',
      'How society and the healthcare ecosystem can address these challenges comprehensively',
    ],
  },
]

export const ALL_THEMES = [...new Set(episodes.flatMap((e) => e.themes))].sort()
export const ALL_COUNTRIES = [...new Set(episodes.map((e) => e.country))].sort()
