// ─── Semantic concept map ─────────────────────────────────────────────────────
// Shared by the episode and video search. Maps the terms a user is likely to
// type (triggers) to the related vocabulary that actually appears across the
// episode/video corpus and transcripts (synonyms). When a query matches a
// trigger, the synonyms are added to the search so, e.g., "money" also finds
// "funding", "investment", "remittances" etc.
//
// Grounded in the language used across the GPODH transcripts. To extend it,
// add a [triggers, synonyms] pair — keep everything lowercase.
export const CONCEPT_MAP: [string[], string[]][] = [
  [
    ['ai', 'artificial intelligence', 'machine learning', 'ml', 'llm', 'llms', 'genai', 'generative ai', 'algorithm', 'chatbot'],
    ['machine learning', 'artificial intelligence', 'ai', 'algorithm', 'llm', 'large language model', 'chatbot', 'generative', 'deep learning', 'model', 'gpt', 'meditron', 'clinical decision support', 'predictive', 'agent', 'rag'],
  ],
  [
    ['funding', 'money', 'grants', 'investment', 'finance', 'financial', 'capital', 'cash', 'donors', 'revenue', 'economics', 'fundraising'],
    ['funding', 'money', 'investment', 'grant', 'finance', 'financial', 'capital', 'cash', 'dollars', 'revenue', 'profit', 'roi', 'economics', 'budget', 'fundraising', 'philanthropy', 'venture', 'donor', 'usaid', 'gates', 'wellcome', 'remittances', 'blended finance', 'endowment'],
  ],
  [
    ['impact investing', 'venture capital', 'vc', 'investor', 'returns', 'seed funding'],
    ['impact investing', 'venture capital', 'vc', 'investor', 'returns', 'portfolio', 'seed', 'fund', 'africa health ventures', 'endless', 'catalytic capital', 'sustainable business model', 'social enterprise'],
  ],
  [
    ['usaid', 'aid cuts', 'funding cuts', 'oda', 'foreign aid', 'development assistance', 'aid'],
    ['usaid', 'aid', 'cuts', 'overseas development assistance', 'oda', 'foreign aid', 'stop work order', 'defunding', 'withdrawal', 'global fund', 'pepfar', 'philanthropy', 'aid industrial complex'],
  ],
  [
    ['equity', 'inequality', 'disparities', 'underserved', 'marginalised', 'marginalized', 'inequities'],
    ['equity', 'underserved', 'disparities', 'marginalised', 'low-income', 'lmic', 'excluded', 'vulnerable', 'inverse care law', 'health data poverty', 'access', 'inclusion', 'leave no one behind'],
  ],
  [
    ['africa', 'sub-saharan', 'subsaharan'],
    ['africa', 'kenya', 'nigeria', 'ghana', 'rwanda', 'ethiopia', 'uganda', 'malawi', 'mozambique', 'eswatini', 'senegal', 'burkina faso', 'tanzania', 'drc', 'congo', 'south africa', 'nairobi', 'kigali', 'blantyre', 'continent'],
  ],
  [
    ['asia', 'south asia', 'southeast asia'],
    ['india', 'bangladesh', 'pakistan', 'indonesia', 'nepal', 'sri lanka', 'dhaka', 'rajasthan', 'mumbai', 'myanmar', 'cambodia'],
  ],
  [
    ['latin america', 'latam', 'south america'],
    ['brazil', 'colombia', 'peru', 'bolivia', 'mexico', 'bogota', 'sao paulo'],
  ],
  [
    ['community health', 'chw', 'community health worker', 'asha', 'last mile', 'frontline'],
    ['community health worker', 'chw', 'asha', 'last mile', 'frontline', 'grassroots', 'village', 'primary care', 'peer educator', 'task shifting', 'health worker', 'community clinic'],
  ],
  [
    ['supply chain', 'logistics', 'stock', 'commodities', 'procurement'],
    ['supply chain', 'logistics', 'stock management', 'commodities', 'procurement', 'inventory', 'pharmacy', 'drug shop', 'distribution', 'replenishment', 'cold chain'],
  ],
  [
    ['interoperability', 'fhir', 'dhis2', 'standards', 'integration', 'data exchange'],
    ['interoperability', 'fhir', 'dhis2', 'standards', 'integration', 'data exchange', 'open source', 'api', 'registry', 'digital public infrastructure', 'health information exchange', 'integrated'],
  ],
  [
    ['clinical decision support', 'cdss', 'guidelines', 'decision support', 'protocols'],
    ['clinical decision support', 'cdss', 'guidelines', 'decision support', 'screening', 'triage', 'point of care', 'protocol', 'almanach', 'noviguide', 'diagnosis', 'treatment'],
  ],
  [
    ['antibiotics', 'antimicrobial resistance', 'amr', 'antibiotic', 'antibiotic resistance'],
    ['antibiotics', 'antimicrobial resistance', 'amr', 'overprescribing', 'stewardship', 'prescribing', 'overuse'],
  ],
  [
    ['maternal', 'maternal health', 'pregnancy', 'antenatal', 'neonatal', 'newborn', 'child health'],
    ['maternal', 'pregnancy', 'antenatal', 'prenatal', 'postnatal', 'neonatal', 'newborn', 'child health', 'midwife', 'obstetric', 'under five', 'infant', 'mortality'],
  ],
  [
    ['immunization', 'immunisation', 'vaccine', 'vaccination', 'vaccines'],
    ['immunization', 'vaccine', 'vaccination', 'immunisation', 'coverage', 'measles', 'polio', 'routine immunization', 'vaccine preventable'],
  ],
  [
    ['mental health', 'psychology', 'wellbeing', 'depression', 'anxiety', 'psychosocial'],
    ['mental health', 'psychology', 'wellbeing', 'depression', 'anxiety', 'psychosocial', 'psychiatry', 'adolescent', 'suicide', 'trauma', 'schizophrenia', 'digital biomarkers', 'youth'],
  ],
  [
    ['refugee', 'refugees', 'displaced', 'humanitarian', 'migrant', 'asylum', 'stateless'],
    ['refugee', 'displaced', 'humanitarian', 'migrant', 'asylum', 'statelessness', 'identity', 'displacement', 'camp', 'syria', 'icrc', 'conflict', 'crisis'],
  ],
  [
    ['identity', 'digital identity', 'id'],
    ['digital identity', 'id', 'identification', 'verification', 'credentials', 'biometric', 'birth registration', 'statelessness', 'legal identity'],
  ],
  [
    ['regulation', 'regulatory', 'governance', 'compliance', 'fda', 'mhra', 'mdr', 'ce mark'],
    ['regulatory', 'regulation', 'approval', 'compliance', 'policy', 'governance', 'fda', 'mhra', 'eu mdr', 'imdrf', 'medical device', 'software as a medical device', 'quality management', 'iso 13485', 'cyber security', 'ce mark', 'thalidomide'],
  ],
  [
    ['evaluation', 'evidence', 'rct', 'trial', 'monitoring', 'impact', 'outcomes', 'measurement'],
    ['evaluation', 'evidence', 'randomized control trial', 'rct', 'trial', 'monitoring', 'impact', 'outcomes', 'theory of change', 'logic model', 'implementation science', 'process evaluation', 'proxy metrics', 'endpoints', 'validation', 'delphi', 'measure'],
  ],
  [
    ['implementation', 'scale', 'scaling', 'deploy', 'rollout', 'adoption'],
    ['implementation', 'deploy', 'scale', 'rollout', 'adoption', 'operationalise', 'pilot', 'co-design', 'co-creation', 'user feedback', 'local ownership', 'sustainability', 'change management'],
  ],
  [
    ['data', 'health data', 'health records', 'ehr', 'emr'],
    ['health data', 'electronic health record', 'ehr', 'emr', 'surveillance', 'analytics', 'interoperability', 'data poverty', 'longitudinal', 'registry', 'records'],
  ],
  [
    ['telehealth', 'telemedicine', 'remote', 'mhealth'],
    ['telehealth', 'telemedicine', 'remote care', 'virtual', 'mhealth', 'mobile health', 'chatbot', 'whatsapp', 'sms', 'sms reminders'],
  ],
  [
    ['who', 'world health organization', 'world health organisation', 'global health'],
    ['who', 'world health', 'global health', 'geneva', 'un', 'multilateral', 'ministry of health', 'global fund', 'alma ata', 'redhi'],
  ],
  [
    ['communications', 'comms', 'marketing', 'storytelling', 'pr', 'media'],
    ['communications', 'comms', 'marketing', 'storytelling', 'pr', 'media', 'narrative', 'peso model', 'content', 'branding', 'linkedin', 'podcast', 'audience'],
  ],
  [
    ['decolonise', 'decolonize', 'decolonisation', 'colonial', 'power dynamics'],
    ['decolonise', 'decolonisation', 'colonial', 'power dynamics', 'local ownership', 'local leadership', 'self-reliance', 'locally led', 'localization'],
  ],
  [
    ['ethics', 'ethical', 'responsible ai', 'bias', 'fairness'],
    ['ethics', 'ethical', 'responsible ai', 'bias', 'fairness', 'beneficence', 'autonomy', 'justice', 'explainability', 'accountability', 'transparency', 'privacy', 'consent', 'minimum viable ethical product'],
  ],
  [
    ['value based', 'value-based', 'incentives', 'payment', 'fee for service'],
    ['value based care', 'incentives', 'payment', 'fee for service', 'volume', 'outcomes based', 'performance based financing', 'reimbursement', 'pay for value'],
  ],
  [
    ['failure', 'fail', 'fail festival', 'failures', 'lessons'],
    ['failure', 'fail festival', 'learning', 'lessons learned', 'pre-mortem', 'retrospective', 'transparency', 'implementation report', 'failing well'],
  ],
  [
    ['radiology', 'imaging', 'ultrasound', 'x-ray', 'diagnostics', 'diagnosis', 'testing'],
    ['radiology', 'imaging', 'ultrasound', 'x-ray', 'diagnostic', 'diagnosis', 'test', 'screening', 'point-of-care', 'rapid diagnostic test', 'find'],
  ],
  [
    ['infrastructure', 'connectivity', 'electricity', 'offline', 'devices'],
    ['infrastructure', 'connectivity', 'electricity', 'offline', 'devices', 'smartphone', 'battery', 'low resource', 'digital public infrastructure', 'servers', 'network', 'feature phone'],
  ],
  [
    ['trust', 'community', 'engagement', 'compassion'],
    ['trust', 'community', 'engagement', 'co-design', 'social license', 'compassion', 'person-centered', 'patient-centered', 'relationships', 'human-centered design'],
  ],
  [
    ['women', 'gender', 'womens health', 'girls', 'female'],
    ['women', 'gender', 'womens health', 'girls', 'female', 'femtech', 'maternal', 'equity', 'misogyny', 'leadership'],
  ],
  [
    ['privacy', 'security', 'cyber security', 'data protection', 'confidentiality'],
    ['privacy', 'security', 'cyber security', 'data protection', 'confidentiality', 'gdpr', 'breach', 'consent', 'encryption', 'compliance'],
  ],
  [
    ['sustainability', 'business model', 'sustainable', 'revenue model'],
    ['sustainability', 'business model', 'sustainable', 'revenue model', 'financial viability', 'self-sustaining', 'market', 'willingness to pay', 'resilient'],
  ],
]

export interface ConceptExpansion {
  terms: string[]
  concepts: string[]
}

/**
 * Expand a raw query into the original term plus any related vocabulary from
 * the concept map, and the list of matched concept labels (for UI hints).
 */
export function expandQuery(raw: string): ConceptExpansion {
  const q = raw.toLowerCase().trim()
  if (!q) return { terms: [], concepts: [] }

  const extraTerms = new Set<string>()
  const matchedConcepts: string[] = []

  for (const [triggers, synonyms] of CONCEPT_MAP) {
    const hit = triggers.some((t) => q.includes(t) || t.includes(q))
    const synHit = !hit && synonyms.some((s) => q.includes(s) || (s.length > 3 && s.startsWith(q)))
    if (hit || synHit) {
      matchedConcepts.push(triggers[0])
      synonyms.forEach((s) => extraTerms.add(s))
    }
  }

  return {
    terms: [q, ...Array.from(extraTerms)],
    concepts: matchedConcepts,
  }
}
