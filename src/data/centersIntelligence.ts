import { CenterIntelligence, getConfidenceColor, getConfidenceLabel, getNobelRelationBadge } from '../types';

// Re-export helpers for backward compatibility
export { getConfidenceColor, getConfidenceLabel, getNobelRelationBadge };

export const centersIntelligence: CenterIntelligence[] = [
  {
    id: "perth-australia",
    name: "Brånemark Center Perth",
    location: "Perth, Australia",
    country: "Australia",
    continent: "Oceania",
    director: {
      name: { value: "Prof. Patrick Henry", confidence: "confirmed", source: "branemarkcenter.com.au" },
      title: "Prosthodontist, Member of the Order of Australia",
      background: "Established the original Brånemark Center in collaboration with Prof P-I Brånemark. Bachelor's Degree in Dental Science with first class honours from University of Western Australia (1961). MSD from University of Indiana (1962-63). Post Doctoral Research Fellow at University of Chicago (1965-66). Specialist prosthodontic degree from University of Indiana (1967).",
      yearsExperience: 60,
      publications: 100,
      awards: ["Honorary Doctorate of Dental Science - UWA", "Member of the Order of Australia", "Distinguished Lecturer Award - Greater NY Academy of Dentistry (1998)", "Distinguished Lecturer Award - American College of Prosthodontics (1999)"],
      forConnection: false,
      nobelBiocareRelation: "partner"
    },
    address: { value: "143 Colin Street, West Perth WA 6005, Australia", confidence: "confirmed" },
    phone: { value: "+61 8 9322 1223", confidence: "confirmed" },
    email: { value: "reception@branemarkcenter.com.au", confidence: "confirmed" },
    website: { value: "https://www.branemarkcenter.com.au", confidence: "confirmed" },
    coordinates: { lat: -31.9505, lng: 115.8605 },
    established: { value: 1982, confidence: "confirmed", source: "Official website" },
    implantBrands: [
      { brand: "Nobel Biocare (Brånemark System)", isPrimary: true, confidence: "likely", notes: "Historical partner of Brånemark" }
    ],
    specializations: ["Implant prosthodontics", "Zygomatic implants", "Immediate loading", "Research & Development"],
    certifications: ["ABOC Certified"],
    keyHighlights: [
      "Pioneer: Established original Brånemark Center with Prof. Brånemark",
      "100+ scientific publications, 7 textbooks",
      "Fellow of the Academy of Osseointegration",
      "Member of the Order of Australia"
    ],
    nobelBiocareOpportunity: "Strong historical partner. Key opinion leader in Asia-Pacific region.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "sao-paulo-brazil",
    name: "Odontologia Vasconcelos - Brånemark Center",
    location: "São Paulo, Brazil",
    country: "Brazil",
    continent: "South America",
    director: {
      name: { value: "Dr. Laercio W. Vasconcelos", confidence: "confirmed", source: "LinkedIn" },
      title: "Implantologist",
      background: "Pioneer in implant technique in Brazil. Thousands of implants performed over two decades. Reference center for dental implant and aesthetics in Brazil.",
      yearsExperience: 30,
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "Avenida Brasil 141, Jardim Paulista, CEP 01341-000 São Paulo, SP, Brazil", confidence: "confirmed" },
    phone: { value: "+55 (11) 3059-9999", confidence: "confirmed" },
    email: { value: "branemark@branemark.com", confidence: "confirmed" },
    website: { value: "https://branemark.com.br", confidence: "confirmed" },
    coordinates: { lat: -23.5505, lng: -46.6333 },
    established: { value: 1995, confidence: "confirmed", source: "Official website" },
    facilities: ["3 operating rooms (hospital standard)", "12 dental units", "Auditorium (60 seats)", "Workshop/training facilities"],
    specializations: ["Implantology", "Aesthetic dental rehabilitation"],
    certifications: ["ABOC Certified"],
    keyHighlights: [
      "Established 1995 - pioneers in Brazil",
      "Hospital-standard facilities with 3 operating rooms",
      "Training center with auditorium for 60",
      "Reference center for implants in Latin America"
    ],
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "hong-kong-china",
    name: "Brånemark Osseointegration Center Hong Kong",
    location: "Hong Kong, China",
    country: "China",
    continent: "Asia",
    director: {
      name: { value: "Prof. Dr. James Chow", confidence: "confirmed", source: "Nobel Biocare website" },
      title: "Oral and Maxillofacial Surgeon",
      background: "First group of locally trained OMFS specialists in Hong Kong. 30 years experience in implant dentistry. Honorary Clinical Associate Professor at University of Hong Kong and Shanghai Jiao-tong University. Co-chairs Education and China Councils of FOR.",
      yearsExperience: 30,
      publications: 30,
      awards: ["Nobel Biocare LEAD"],
      forConnection: true,
      nobelBiocareRelation: "LEAD"
    },
    address: { value: "1901-1903 The Center, 99 Queen's Road Central, Hong Kong SAR", confidence: "confirmed" },
    phone: { value: "+852 2851 4888", confidence: "confirmed" },
    email: { value: "james.chow@disc-hk.com", confidence: "confirmed" },
    website: { value: "http://www.aboc.com.hk", confidence: "confirmed" },
    coordinates: { lat: 22.2855, lng: 114.1577 },
    established: { value: 2001, confidence: "confirmed" },
    implantBrands: [
      { brand: "Nobel Biocare", isPrimary: true, confidence: "confirmed", notes: "Dr. Chow is Nobel Biocare LEAD" }
    ],
    socialMedia: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/james-chow/", confidence: "likely" }
    ],
    news: [
      { title: "Nobel Biocare LEAD Program", summary: "Dr. James Chow is part of Nobel Biocare's LEAD (Leadership, Education, Advocacy, Development) program" }
    ],
    specializations: ["Immediate loading", "Zygomatic implants", "Guided surgery", "Hong Kong Bridge Protocol"],
    certifications: ["ABOC Certified", "ZAGA Center", "Nobel Biocare LEAD"],
    keyHighlights: [
      "Nobel Biocare LEAD - Key Opinion Leader",
      "FOR.org Education & China Council Co-Chair",
      "Founded ABOC Hong Kong & Shanghai",
      "30+ publications, Hong Kong Bridge Protocol developer"
    ],
    competitiveNotes: "STRONG Nobel Biocare relationship - LEAD member",
    nobelBiocareOpportunity: "Already a Nobel Biocare LEAD. Strategic partner for Asia expansion. FOR.org connection.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "shanghai-china",
    name: "Brånemark Osseointegration Center Shanghai (ABOCS)",
    location: "Shanghai, China",
    country: "China",
    continent: "Asia",
    director: {
      name: { value: "Dr. James Chow (Co-director with Hong Kong)", confidence: "likely", source: "ABOC website" },
      background: "Joint venture between Dental Implants and Maxillofacial Centre (Hong Kong) and Tokushinkai Dental Group (Shanghai).",
      forConnection: true,
      nobelBiocareRelation: "user"
    },
    address: { value: "Room 303, Main Building of East Asian Bank Building, No 66 Shiqiao Road, Pudong New Area, Shanghai", confidence: "confirmed", source: "shanghai.gov.cn" },
    phone: { value: "+86 021-6289-8101", confidence: "confirmed" },
    email: { value: "info@abocs.cn", confidence: "confirmed" },
    coordinates: { lat: 31.2304, lng: 121.4737 },
    implantBrands: [
      { brand: "Nobel Biocare", isPrimary: true, confidence: "confirmed", notes: "Explicitly listed on website" }
    ],
    facilities: ["Sirona C8+ and C4+ dental units", "NewTom VGi Cone Beam Scanner", "KLS Martin marLED operating light", "SimPlant Crystal simulation software"],
    specializations: ["Immediate function", "HongKong Bridge protocol", "Tissue engineering", "Implant navigation"],
    certifications: ["ABOC Certified"],
    keyHighlights: [
      "Uses Nobel Biocare implants (confirmed)",
      "Joint venture with Hong Kong ABOC",
      "Advanced technology: Cone Beam CT, SimPlant",
      "Developed HongKong Bridge Protocol for immediate loading"
    ],
    competitiveNotes: "Nobel Biocare user - confirmed",
    nobelBiocareOpportunity: "Already using Nobel Biocare. Expand relationship through Dr. Chow's LEAD status.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "manchester-uk",
    name: "New Life Teeth - Manchester",
    location: "Manchester, UK",
    country: "United Kingdom",
    continent: "Europe",
    director: {
      name: { value: "Dr. Stuart Lutton", confidence: "confirmed", source: "newlifeteeth.co.uk" },
      title: "Founder, Full Mouth Implant Specialist",
      background: "Over 25 years of full mouth dental implant experience. Recognized as one of the most highly skilled surgeons in UK and Ireland.",
      yearsExperience: 25,
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "Suite 2 ground floor, Parkway 5, Parkway business centre, Princess road, Manchester, M14 7HR", confidence: "confirmed" },
    phone: { value: "+44 800 048 8894", confidence: "confirmed" },
    email: { value: "manchester@newlifeteeth.co.uk", confidence: "confirmed" },
    website: { value: "https://www.newlifeteeth.co.uk", confidence: "confirmed" },
    coordinates: { lat: 53.4808, lng: -2.2426 },
    established: { value: 2012, confidence: "confirmed" },
    implantBrands: [
      { brand: "Prettau Zirconia (prosthetics)", isPrimary: true, confidence: "confirmed", notes: "Teeth Forever Bridge with Prettau Zirconia" }
    ],
    specializations: ["Full mouth rehabilitation", "All-on-4", "Zirconia Teeth Forever Bridge"],
    certifications: ["ABOC Certified - Only one in UK & Ireland"],
    keyHighlights: [
      "Only ABOC member in UK & Ireland",
      "Founded 2012, rapid growth to 4 clinics",
      "15-year warranty on Zirconia bridges",
      "Part of global ABOC network (16 clinics worldwide)"
    ],
    competitiveNotes: "Implant brand not clearly identified - uses Prettau Zirconia for prosthetics",
    nobelBiocareOpportunity: "Opportunity to establish Nobel Biocare as implant supplier for growing UK/Ireland network",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "dublin-ireland",
    name: "New Life Teeth - Dublin",
    location: "Dublin, Ireland",
    country: "Ireland",
    continent: "Europe",
    director: {
      name: { value: "Dr. Stuart Lutton (Group Founder)", confidence: "confirmed" },
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "Unit 13, Block 2, Northwood Court, Santry, Dublin, D09 FK28", confidence: "confirmed" },
    phone: { value: "+353 1906 1436", confidence: "confirmed" },
    email: { value: "dublin@newlifeteeth.ie", confidence: "confirmed" },
    website: { value: "https://www.newlifeteeth.ie", confidence: "confirmed" },
    coordinates: { lat: 53.3498, lng: -6.2603 },
    specializations: ["Full mouth rehabilitation", "All-on-4", "Zirconia Teeth Forever Bridge"],
    certifications: ["ABOC Certified"],
    keyHighlights: [
      "Part of New Life Teeth network",
      "Only ABOC presence in Ireland",
      "Expanding network"
    ],
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "edinburgh-uk",
    name: "New Life Teeth - Edinburgh",
    location: "Edinburgh, UK",
    country: "United Kingdom",
    continent: "Europe",
    director: {
      name: { value: "Dr. Stuart Lutton (Group Founder)", confidence: "confirmed" },
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "Canal Point, 22 West Tollcross, Edinburgh, EH3 9QW", confidence: "confirmed" },
    phone: { value: "+44 800 048 8894", confidence: "confirmed" },
    email: { value: "edinburgh@newlifeteeth.co.uk", confidence: "confirmed" },
    website: { value: "https://www.newlifeteeth.co.uk", confidence: "confirmed" },
    coordinates: { lat: 55.9533, lng: -3.1883 },
    certifications: ["ABOC Certified"],
    keyHighlights: ["Part of New Life Teeth network"],
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "belfast-uk",
    name: "New Life Teeth - Belfast",
    location: "Belfast, UK",
    country: "United Kingdom",
    continent: "Europe",
    director: {
      name: { value: "Dr. Stuart Lutton (Group Founder)", confidence: "confirmed" },
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "743 - 745 Lisburn Road, Belfast, BT9 7GW", confidence: "confirmed" },
    phone: { value: "+44 800 048 8894", confidence: "confirmed" },
    email: { value: "belfast@newlifeteeth.co.uk", confidence: "confirmed" },
    website: { value: "https://www.newlifeteeth.co.uk", confidence: "confirmed" },
    coordinates: { lat: 54.5973, lng: -5.9301 },
    certifications: ["ABOC Certified"],
    keyHighlights: ["Part of New Life Teeth network"],
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "marseille-france",
    name: "BOC Marseille - Centre d'Ostéointegration Brånemark",
    location: "Marseille, France",
    country: "France",
    continent: "Europe",
    director: {
      name: { value: "Dr. Patrick Palacci", confidence: "confirmed", source: "bocmarseille.com" },
      title: "Periodontist, Implantologist",
      background: "Graduated University of Marseille 1975. Postgraduate in periodontology at Boston University (1977-1981). Visiting/Consultant Professor at Boston University since 1982. Worked in tight relationship with Prof. P-I Brånemark. One of first to place dental implants in France.",
      yearsExperience: 50,
      awards: ["NobelPharma Award 1995 - Most important advances in surgery over 30 years", "Associate Professor - University of Santiago de Chile (2004)", "Associate Professor - University of Buenos Aires (2006)"],
      forConnection: true,
      nobelBiocareRelation: "partner"
    },
    address: { value: "8-10 Rue Forgès, 13008 Marseille, France", confidence: "confirmed" },
    phone: { value: "+33 (0) 4 91 57 03 03", confidence: "confirmed" },
    email: { value: "patrick@palacci.com", confidence: "confirmed" },
    website: { value: "https://bocmarseille.com/", confidence: "confirmed" },
    coordinates: { lat: 43.2965, lng: 5.3698 },
    socialMedia: [
      { platform: "linkedin", url: "https://www.for.org/en/user/patrick-palacci", confidence: "confirmed" }
    ],
    news: [
      { title: "Palacci Flap Technique", summary: "Developed rotated pedicle flap technique for papilla regeneration - now widely used worldwide" }
    ],
    specializations: ["Papilla regeneration (Palacci Flap)", "Plastic surgery techniques", "Soft tissue management", "Esthetic implant dentistry"],
    certifications: ["ABOC Certified", "One of 12 BOC centers worldwide"],
    keyHighlights: [
      "NobelPharma Award 1995",
      "Developer of 'Palacci Flap' technique",
      "FOR.org member",
      "Author of 3 textbooks (translated into 9 languages)",
      "Pioneer: One of first to place implants in France"
    ],
    competitiveNotes: "Historical Nobel Biocare/NobelPharma relationship - received NobelPharma Award 1995",
    nobelBiocareOpportunity: "Historical Nobel Biocare partner. FOR.org connection. Key educator in Europe.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "athens-greece",
    name: "Brånemark Osseointegration Center Greece (BOCG)",
    location: "Athens, Greece",
    country: "Greece",
    continent: "Europe",
    director: {
      name: { value: "Dr. Nikos Krompas", confidence: "confirmed", source: "krompas.gr" },
      title: "Dentist, Implantologist",
      background: "Graduated Dental Faculty of Aristotle University of Thessaloniki (1983). Working as dentist since 1994. Founded ABOC Greece in 2013 with certification from Prof. P-I Brånemark.",
      yearsExperience: 35,
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "Kifissias Ave 355, gr14564 Athens, Greece", confidence: "confirmed" },
    phone: { value: "+30-2108001303", confidence: "confirmed" },
    email: { value: "nikro@otenet.gr", confidence: "confirmed" },
    website: { value: "https://www.krompas.gr", confidence: "confirmed" },
    coordinates: { lat: 37.9838, lng: 23.7275 },
    established: { value: 2013, confidence: "confirmed", source: "ABOC Greece certified by Prof. Brånemark" },
    specializations: ["Immediate loading", "All-ceramic crowns", "Porcelain veneers", "Complex case treatment planning"],
    certifications: ["ABOC Certified - one of only 10 Brånemark Centers worldwide (2013)"],
    facilities: ["Dental Place Clinic in Kifissia, Athens"],
    keyHighlights: [
      "Certified by Prof. P-I Brånemark personally (2013)",
      "One of only 10 ABOC centers at time of certification",
      "35+ years experience",
      "Research focus: peri-implant bone maintenance"
    ],
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "karnataka-india",
    name: "Brånemark Osseointegration Center India",
    location: "Bengaluru, Karnataka, India",
    country: "India",
    continent: "Asia",
    director: {
      name: { value: "Dr. Ramesh Chowdhary", confidence: "confirmed", source: "LinkedIn, ResearchGate" },
      title: "Professor, PhD, Chief of BOC India",
      background: "PhD in Prosthodontics from Malmö University, Sweden. Professor and Head of Prosthodontics and R&D at Rajarajeshwari Dental Hospital, Bangalore. Visiting Research Scholar faculty to Malmö University. Trained in Sweden and Germany.",
      yearsExperience: 23,
      publications: 50,
      awards: ["TC White visiting scholar award - Royal College of Physicians and Surgeons, Glasgow", "4 patents", "Chief Editor - International Journal of Prosthodontics and Restorative Dentistry"],
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "No 3, 21st main, Siddeshwarnagar, Vijaynagar, Bengaluru 560040, Karnataka, India", confidence: "confirmed" },
    phone: { value: "+91 984 5206 898", confidence: "confirmed" },
    email: { value: "drramc@yahoo.com", confidence: "confirmed" },
    coordinates: { lat: 12.9716, lng: 77.5946 },
    specializations: ["Dental implant rehabilitation", "Maxillofacial prosthodontics", "Implant surface technology research", "Osseointegration enhancement research"],
    certifications: ["ABOC Certified"],
    keyHighlights: [
      "PhD from Malmö University, Sweden",
      "4 patents in implant technology",
      "Chief Editor of international journal",
      "TC White Scholar Award - Royal College Glasgow"
    ],
    nobelBiocareOpportunity: "Strong academic credentials. Research focus could align with Nobel Biocare R&D.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "tokyo-japan",
    name: "Brånemark Osseointegration Center Tokyo",
    location: "Tokyo, Japan",
    country: "Japan",
    continent: "Asia",
    director: {
      name: { value: "Dr. Yataro Komiyama", confidence: "likely", source: "ABOC website" },
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "Tokyo Kaishindo 4F, 27 Ichibancho, Chiyoda-ku, Tokyo 102-0082, Japan", confidence: "confirmed" },
    phone: { value: "+81 (3) 5275 5766", confidence: "confirmed" },
    email: { value: "yataro@teabreak.jp", confidence: "likely" },
    website: { value: "http://branemark.jp", confidence: "confirmed" },
    coordinates: { lat: 35.6762, lng: 139.6503 },
    certifications: ["ABOC Certified"],
    keyHighlights: [
      "ABOC presence in Japan",
      "Located in central Tokyo (Chiyoda-ku)"
    ],
    researchNotes: "Limited information available. Needs further research.",
    overallConfidence: "likely",
    lastResearched: "2025-01-06"
  },
  {
    id: "lisbon-portugal",
    name: "Implantology Institute",
    location: "Lisbon, Portugal",
    country: "Portugal",
    continent: "Europe",
    director: {
      name: { value: "Prof. Dr. João Caramês", confidence: "confirmed", source: "Straumann, institutodeimplantologia.pt" },
      title: "Dean of Faculty of Dental Medicine, University of Lisbon",
      background: "Founded Implantology Institute in 1996. Over 30 years experience. 50,000+ implants placed. Director and Coordinator of postgraduate courses in Oral Surgery and Implantology at University of Lisbon. Visiting Professor and International Director in Portugal of NYU College of Dentistry.",
      yearsExperience: 30,
      awards: ["Caramês Classification (international standard)"],
      forConnection: false,
      nobelBiocareRelation: "none"
    },
    address: { value: "Avenida Columbano Bordalo Pinheiro 50, 1070-064 Lisbon, Portugal", confidence: "confirmed" },
    phone: { value: "(+351) 217 210 980", confidence: "confirmed" },
    email: { value: "md@institutodeimplantologia.pt", confidence: "confirmed" },
    website: { value: "https://www.implantologyinstitute.com", confidence: "confirmed" },
    coordinates: { lat: 38.7223, lng: -9.1393 },
    established: { value: 1996, confidence: "confirmed" },
    implantBrands: [
      { brand: "Straumann", isPrimary: true, confidence: "confirmed", notes: "Hosts Straumann Pro Arch Clinical Experiences courses" },
      { brand: "Straumann BLX Implant System", isPrimary: true, confidence: "confirmed" }
    ],
    socialMedia: [
      { platform: "linkedin", url: "https://www.researchgate.net/profile/Joao-Carames", confidence: "confirmed" }
    ],
    specializations: ["Pro Arch full rehabilitation", "Caramês Classification system", "Oral surgery", "Dental implants"],
    certifications: ["Straumann Partner"],
    keyHighlights: [
      "COMPETITOR ALERT: Uses Straumann implants",
      "50,000+ implants placed",
      "Caramês Classification - international standard",
      "Dean of Faculty of Dental Medicine, University of Lisbon"
    ],
    competitiveNotes: "USES STRAUMANN - Key competitor relationship. Prof. Caramês is major Straumann partner and educator.",
    nobelBiocareOpportunity: "Currently Straumann partner - would require significant effort to convert. High-profile target.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "barcelona-spain",
    name: "Brånemark Osseointegration Center Barcelona",
    location: "Barcelona, Spain",
    country: "Spain",
    continent: "Europe",
    director: {
      name: { value: "Dr. Joan Pi Urgell", confidence: "confirmed", source: "drpiimplants.com, gidedental.com" },
      title: "Specialist in Odontology and Stomatology",
      background: "35+ years experience. M.D. in Medicine and Surgery from University of Barcelona (1977). D.D.S. from University of Barcelona (1979). Postgraduate at USC LA (1981). Certificate in Osseointegration from University of Lund, Sweden (1985). Training at UCLA (1985). Founded BOC Barcelona in 1991.",
      yearsExperience: 35,
      awards: ["Founding member and ex-president of European Association for Osseointegration (EAO)"],
      forConnection: false,
      nobelBiocareRelation: "partner"
    },
    address: { value: "Paseo De La Bonanova, 42. Bajos 4, 08017 Barcelona, Spain", confidence: "confirmed" },
    phone: { value: "+34 (93) 434 2100", confidence: "confirmed" },
    email: { value: "consulta@drpiurgell.com", confidence: "confirmed" },
    website: { value: "https://drpiimplants.com", confidence: "confirmed" },
    coordinates: { lat: 41.3851, lng: 2.1734 },
    established: { value: 1991, confidence: "confirmed" },
    socialMedia: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/joan-pi-urgell-6b342b40/", confidence: "confirmed" }
    ],
    specializations: ["Zygomatic implants (pioneer in Spain)", "Bone reconstruction", "Immediate loading", "Pterygoid implants"],
    certifications: ["ABOC Certified", "EAO Founding Member"],
    keyHighlights: [
      "Pioneer: First zygomatic implants in Spain",
      "Founding member & ex-president of EAO",
      "Trained at University of Lund (Sweden) and UCLA",
      "BOC Barcelona founded 1991"
    ],
    nobelBiocareOpportunity: "Historical Brånemark connection through Swedish training. Key educator in Spain.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "las-palmas-spain",
    name: "Brånemark Center Las Palmas",
    location: "Las Palmas de Gran Canaria, Spain",
    country: "Spain",
    continent: "Europe",
    director: {
      name: { value: "Dr. José Manuel Navarro Alonso", confidence: "confirmed", source: "centrobranemarklaspalmas.com, FOR.org" },
      title: "Periodontist, Prosthodontist, Implantologist",
      background: "Started implant career in 1981. First dentist in Spain to place and publish single implants (1987). Certificate in Periodontology and Implant Dentistry from NYU. Master of Science in Biomaterials from NYU.",
      yearsExperience: 43,
      awards: ["Best Presentation Award - Academy of Osseointegration (2007)", "Research Award - European Academy of Esthetic Dentistry"],
      forConnection: true,
      nobelBiocareRelation: "partner"
    },
    address: { value: "C/ 1o de Mayo, 37 bis, 35002 Las Palmas de Gran Canaria, Spain", confidence: "confirmed" },
    phone: { value: "+34 (928) 38 3121", confidence: "confirmed" },
    email: { value: "jmnavarro@branemark.es", confidence: "confirmed" },
    website: { value: "https://www.centrobranemarklaspalmas.com", confidence: "confirmed" },
    coordinates: { lat: 28.1248, lng: -15.4300 },
    established: { value: 1981, confidence: "confirmed" },
    socialMedia: [
      { platform: "instagram", url: "https://www.instagram.com/branemarklaspalmas/", confidence: "confirmed" },
      { platform: "website", url: "https://www.for.org/en/user/jose-m-navarro", confidence: "confirmed" }
    ],
    facilities: ["3D surgical planning", "Advanced digital workflow"],
    specializations: ["Periodontics", "Prosthodontics", "Implant dentistry", "Biomaterials research"],
    certifications: ["ABOC Certified", "Member of BQDC (Best Quality Dental Centers)"],
    keyHighlights: [
      "Pioneer: First single implants in Spain (1987)",
      "40+ years of excellence",
      "FOR.org member",
      "NYU trained (Periodontology + Biomaterials MSc)"
    ],
    nobelBiocareOpportunity: "FOR.org connection. Pioneer status in Spain. Key historical figure.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "madrid-spain",
    name: "Brånemark Osseointegration Center Madrid",
    location: "Madrid, Spain",
    country: "Spain",
    continent: "Europe",
    director: {
      name: { value: "Dr. Ramón Martínez Corriá", confidence: "confirmed", source: "branemarkmadrid.com, LinkedIn" },
      title: "Specialist in Oral and Maxillofacial Surgery, Medical Director",
      background: "Graduate in Medicine and Surgery. Specialist in Stomatology. Certificate in Osseointegration from University of Gothenburg (Brånemark's institution). Director of BOC Madrid since 1992. Guest Professor at European University of Madrid. Research member at Complutense University of Madrid.",
      yearsExperience: 32,
      forConnection: false,
      nobelBiocareRelation: "partner"
    },
    address: { value: "C/Velázquez, 92 1º dcha, E-28006 Madrid, Spain", confidence: "confirmed" },
    phone: { value: "+34 (91) 576 1719", confidence: "confirmed" },
    email: { value: "bocmadrid@telefonica.net", confidence: "confirmed" },
    coordinates: { lat: 40.4168, lng: -3.7038 },
    established: { value: 1992, confidence: "confirmed" },
    socialMedia: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/ramon-mart%C3%ADnez-corria-40349b202/", confidence: "confirmed" }
    ],
    specializations: ["Oral and maxillofacial surgery", "Implantology", "Tissue engineering research"],
    certifications: ["ABOC Certified", "University of Gothenburg certified"],
    keyHighlights: [
      "Trained at University of Gothenburg (Brånemark's home)",
      "Director since 1992 - 32 years",
      "Academic: Guest Professor + Research member",
      "Research focus: Tissue engineering"
    ],
    nobelBiocareOpportunity: "Trained at Brånemark's own institution (Gothenburg). Strong academic connections.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "falun-sweden",
    name: "Holmgatans Tandläkarmottagning",
    location: "Falun, Sweden",
    country: "Sweden",
    continent: "Europe",
    director: {
      name: { value: "Dr. Pär-Olov Östman", confidence: "likely", source: "ABOC website" },
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "Holmgatan 24, 791 71 Falun, Sweden", confidence: "confirmed" },
    email: { value: "po@holmgatan.se", confidence: "confirmed" },
    coordinates: { lat: 60.6065, lng: 15.6355 },
    certifications: ["ABOC Certified"],
    keyHighlights: [
      "ABOC presence in Sweden (birthplace of osseointegration)"
    ],
    researchNotes: "Limited information available. Needs further research.",
    overallConfidence: "likely",
    lastResearched: "2025-01-06"
  },
  {
    id: "gothenburg-sweden",
    name: "Brånemark Center Göteborg",
    location: "Gothenburg, Sweden",
    country: "Sweden",
    continent: "Europe",
    director: {
      name: { value: "Dr. Felicia Suska", confidence: "confirmed", source: "branemarkcenter.se" },
      title: "Specialist in Oral Surgery, Licensed Physician, Docent",
      background: "Specialist exam and medical degree at Gothenburg University. Started researching early at Department of Biomaterials Science. Doctorate in 2004. Docent in subject. Working clinically with oral surgery since 2007.",
      yearsExperience: 17,
      forConnection: false,
      nobelBiocareRelation: "partner"
    },
    address: { value: "Vera Sandbergs Allé 5A, 411 33 Göteborg, Sweden", confidence: "confirmed" },
    phone: { value: "+46 (0) 31 778 25 50", confidence: "confirmed" },
    email: { value: "kontakt@branemarkcenter.se", confidence: "confirmed" },
    website: { value: "https://www.branemarkcenter.se", confidence: "confirmed" },
    coordinates: { lat: 57.7089, lng: 11.9746 },
    established: { value: 1989, confidence: "confirmed", source: "Founded by Prof. Per-Ingvar Brånemark" },
    facilities: ["Multidisciplinary clinic at Chalmers Institute of Technology", "Oral & Maxillofacial surgeons", "Prosthodontists", "Endodontists", "Periodontists", "Radiologist", "Anesthesiologist access", "Branch in Strömstad (near Norway)"],
    specializations: ["Full range of implant dentistry", "Oral surgery", "Prosthodontics", "Periodontics"],
    certifications: ["ORIGINAL BOC - Founded by Prof. Brånemark 1989"],
    keyHighlights: [
      "ORIGINAL: Founded by Prof. Brånemark in 1989",
      "The birthplace of modern osseointegration",
      "Located at Chalmers Institute of Technology",
      "Full multidisciplinary team"
    ],
    competitiveNotes: "The original BOC - historically connected to Nobel Biocare origins",
    nobelBiocareOpportunity: "The original center - symbolic importance for Nobel Biocare heritage.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "changhua-city-taiwan",
    name: "Sense & Beauty Dental Center",
    location: "Changhua City, Taiwan",
    country: "Taiwan",
    continent: "Asia",
    director: {
      name: { value: "Unknown", confidence: "unconfirmed" },
      forConnection: false,
      nobelBiocareRelation: "unknown"
    },
    address: { value: "60-62, Dong-Min St., Changhua, Taiwan 50075", confidence: "confirmed" },
    phone: { value: "+886-4-7203-666", confidence: "confirmed" },
    email: { value: "info@sbdc.com.tw", confidence: "confirmed" },
    website: { value: "http://www.sbdc.com.tw", confidence: "confirmed" },
    coordinates: { lat: 24.0518, lng: 120.5161 },
    established: { value: 2005, confidence: "confirmed", source: "Official website" },
    news: [
      { title: "Joined ABOC in 2018", date: "2018-07", summary: "Officially joined BOC world-class team, honored as highest level in dentistry" },
      { title: "Asia Dental Alliance", date: "2013", summary: "Organized Asia Dental Alliance with high-end dental centers from Singapore, Hong Kong, Shanghai, and Manila" }
    ],
    facilities: ["World-class medical center (2013)", "3D x-ray scan", "Dental washer disinfector", "Biopure purification system", "3D printing for surgical guides", "Dental education center/auditorium"],
    specializations: ["Dental implants with 3D printing guides", "Comprehensive dental services", "Dental education"],
    certifications: ["ABOC Certified (2018)"],
    keyHighlights: [
      "Joined ABOC in 2018",
      "10,000+ patients annually",
      "Founded Asia Dental Alliance (2013)",
      "Advanced 3D printing for implant guides"
    ],
    nobelBiocareOpportunity: "Growing center with Asia Dental Alliance leadership. Digital workflow focus.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "istanbul-turkey",
    name: "Brånemark Osseointegration Center Istanbul (BOCIT)",
    location: "Istanbul, Turkey",
    country: "Turkey",
    continent: "Europe",
    director: {
      name: { value: "Dr. Serdar Soyturk", confidence: "confirmed", source: "bocit.org, vitalfulya.com" },
      title: "Dentist, ICOI Fellow and Diplomat",
      background: "Mentored by the Brånemark team. One of the first to place dental implants in Turkey over 30 years ago. ICOI Fellow (1991) and Diplomat (1993). Leads team including Dr. Burak and Dr. Hande.",
      yearsExperience: 30,
      awards: ["ICOI Fellow (1991)", "ICOI Diplomat (1993)"],
      forConnection: false,
      nobelBiocareRelation: "partner"
    },
    address: { value: "Hakki Yeten St. 23, Vital Fulya Plaza 7/22, 34365 Sisli/Istanbul, Turkey", confidence: "confirmed" },
    phone: { value: "+90(212) 709 77 70", confidence: "confirmed" },
    email: { value: "info@bocit.org", confidence: "confirmed" },
    website: { value: "http://www.bocit.org", confidence: "confirmed" },
    coordinates: { lat: 41.0082, lng: 28.9784 },
    certifications: ["ABOC Certified", "ICOI Fellow", "ICOI Diplomat"],
    keyHighlights: [
      "Pioneer: First dental implants in Turkey (30+ years ago)",
      "Mentored by Brånemark team directly",
      "ICOI Fellow and Diplomat credentials",
      "Established BOC in Turkey"
    ],
    nobelBiocareOpportunity: "Direct Brånemark mentorship. Pioneer in Turkish market.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  },
  {
    id: "dubai-uae",
    name: "SameDay Dental Implants Dubai",
    location: "Dubai, UAE",
    country: "UAE",
    continent: "Asia",
    director: {
      name: { value: "Dr. Costa Nicolopoulos & Dr. Petros Yuvanoglu", confidence: "confirmed", source: "samedayme.com" },
      title: "Oral & Maxillofacial Surgeon (Nicolopoulos) / Prosthodontist (Yuvanoglu)",
      background: "Dr. Nicolopoulos: BDS cum laude from University of Witwatersrand (1984), ranked #1 in class with Gold Medal. FFD(SA) MFOS in Maxillofacial & Oral Surgery (1990). 30,000+ implants placed. Co-founded first SameDay Dental Clinic in Dubai. Regular keynote speaker globally.",
      yearsExperience: 35,
      awards: ["Gold Medal - Dental Association of South Africa (most outstanding graduate)", "Only ABOC in Middle East", "Only ZAGA Center in UAE"],
      forConnection: false,
      nobelBiocareRelation: "user"
    },
    address: { value: "Villa 733, Umm Suqeim 2, Jumeirah Beach Road, P.O. Box 413873, Dubai, UAE", confidence: "confirmed" },
    phone: { value: "+971 (0) 4315 8300", confidence: "confirmed" },
    email: { value: "Info@samedayme.com", confidence: "confirmed" },
    website: { value: "https://www.samedayme.com", confidence: "confirmed" },
    coordinates: { lat: 25.2048, lng: 55.2708 },
    established: { value: 2012, confidence: "confirmed" },
    socialMedia: [
      { platform: "linkedin", url: "https://www.linkedin.com/in/kostas-nikolopoulos-31235869/", confidence: "confirmed" }
    ],
    news: [
      { title: "Certified Autism Center", summary: "SameDay Dental Clinic became a Certified Autism Center" },
      { title: "Grand Opening of New Clinic", source: "PR Newswire", summary: "SameDay Dental Implants celebrates grand opening of new clinic" }
    ],
    facilities: ["Onsite state-of-the-art dental lab", "Master technicians for same-day treatments"],
    specializations: ["Same-day implants", "Immediate loading", "Zygomatic implants (ZAGA)", "Full mouth rehabilitation"],
    certifications: ["ABOC Certified - Only one in Middle East", "ZAGA Center - Only one in UAE", "Certified Autism Center"],
    keyHighlights: [
      "Only ABOC in Middle East",
      "Only ZAGA Center in UAE",
      "35,000+ implant patients treated",
      "30,000+ implants placed by Dr. Nicolopoulos",
      "Awarded BOC status by Prof. Brånemark personally"
    ],
    competitiveNotes: "Strategic location - only ABOC in Middle East region",
    nobelBiocareOpportunity: "Only ABOC in Middle East - strategic importance for regional expansion.",
    overallConfidence: "confirmed",
    lastResearched: "2025-01-06"
  }
];
