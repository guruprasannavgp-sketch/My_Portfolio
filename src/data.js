import { Zap, Car, Flag, Factory, Wind, Wrench } from 'lucide-react';

export const SKILLS = {
  cad: ['SOLIDWORKS', 'CATIA V5', 'SIEMENS NX', 'AUTO CAD', 'MODELON IMPACT', 'BRICSCAD', 'ANSYS', 'HYPERMESH', 'CREO'],
  core: ['Geometric Dimensioning and Tolerancing (GD&T)', 'Engineering Graphics',],
  soft: ['Team Leadership', 'Solution Maker', 'Good Communicator', 'Creative Thinking']
};

export const PROJECTS = [
  {
    id: 'sae-baja',
    slug: 'sae-baja',
    title: 'SAE_BAJA_OFFROAD',
    role: 'Design Head & Pilot Batch',
    team: 'Team Dirt Demon Racing',
    icon: Car,
    description: 'Spearheaded the design of rugged off-road vehicles capable of withstanding extreme dynamic loads and harsh terrains.',
    fullDescription: 'Participating in SAE BAJA was a test of endurance and engineering precision. We designed two prototypes: one powered by an internal combustion engine and another electric. The project demanded rigorous testing of the roll cage for impact safety and the suspension system for off-road reliability. Being part of the Pilot Batch for SAE INDIA BAJA Electric was a significant milestone, allowing us to implement cutting-edge battery management systems in an off-road context.',
    highlights: ['Built IC BAJA prototype within an aggressive 13-day timeline', 'Built ELECTRIC BAJA prototype within 13 days', 'Pilot Batch member of SAE INDIA BAJA'],
    tags: ['Suspension', 'Roll Cage', 'Vehicle Dynamics'],
    gallery: [],
    videos: [
      { url: '/Videos/SAE BAJA/Acceleration test.mp4', title: 'Acceleration Test' },
      { url: '/Videos/SAE BAJA/climb test.mp4', title: 'Climb Test' },
      { url: '/Videos/SAE BAJA/Bump Test.mp4', title: 'Bump Test' },
      { url: '/Videos/SAE BAJA/Flat Pad.mp4', title: 'Flat Pad' },
      { url: '/Videos/SAE BAJA/Four Post.mp4', title: 'Four Post Test' },
      { url: '/Videos/SAE BAJA/Clossedloop driver.mp4', title: 'Closed Loop Driver' },
      { url: '/docs/PROTO TYPE BAJA/E BAJA/WhatsApp Video 2026-05-12 at 10.46.33 PM.mp4', title: 'Electric Prototype Test' },
      { url: '/docs/PROTO TYPE BAJA/M BAJA/WhatsApp Video 2026-05-12 at 10.46.33 PM (1).mp4', title: 'M-Baja Prototype Test' },
    ],
    simulations: [
      {
        category: 'Acceleration',
        images: [
          "/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.05.06 PM (1).jpeg",
          "/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.05.06 PM (2).jpeg",
          "/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.16.46 PM (1).jpeg",
          "/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.16.46 PM (2).jpeg",
          "/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.16.46 PM (3).jpeg",
          "/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.16.46 PM.jpeg"
        ]
      }
    ],
    specs: [
      { label: 'Engine', value: 'Briggs & Stratton(IC) / 6kW Motor(E)' },
      { label: 'Wheelbase', value: '52 inches' },
      { label: 'Ground Clearance', value: '12 inches' },
      { label: 'Traction', value: 'Locked Differential' }
    ],
    documents: [
      { title: 'Baja Prototype Design Archive', url: '/docs/PROTO TYPE BAJA/M BAJA/M Baja Prototype/M Baja PrototypeDesign.rar', type: 'RAR' }
    ]
  },
  {
    id: 'go-kart',
    slug: 'go-kart',
    title: 'GO KART',
    role: 'Design Head',
    team: 'Team Sparkers',
    icon: Flag,
    description: 'Engineered high-agility karting platforms optimizing for track cornering, weight distribution, and driver ergonomics.',
    fullDescription: 'In this project, we explored the limits of go-kart design, focusing on low center of gravity and high lateral grip. The Mega Karting Championship provided a platform to showcase our static design excellence. We optimized the steering geometry for minimal Ackermann error and used chromoly steel for the frame to achieve high torsional stiffness. The transition from IC to Electric karting involved rethinking the weight distribution to accommodate battery packs without compromising the kart\'s nimble handling.',
    highlights: ['Won overall static 1st prize in Mega Karting Championship', 'Awarded ₹10,000 Cash Prize'],
    tags: ['Motorsport', 'Ergonomics', 'Steering Geometry'],
    gallery: [
      '/images/Go-Kart/WhatsApp Image 2026-03-10 at 1.15.19 PM.jpeg',
      '/images/Go-Kart/WhatsApp Image 2026-03-10 at 1.15.20 PM.jpeg',
      '/images/Go-Kart/WhatsApp Image 2026-03-10 at 1.15.21 PM.jpeg',
      '/images/Go-Kart/WhatsApp Image 2026-03-10 at 1.15.52 PM.jpeg',
      '/images/Go-Kart/WhatsApp Image 2026-03-10 at 1.15.53 PM.jpeg',
      '/images/Go-Kart/WhatsApp Image 2026-03-10 at 1.15.55 PM.jpeg',
    ],
    specs: [
      { label: 'Frame', value: 'AISI 4130 Chromoly' },
      { label: 'Braking', value: 'Hydraulic Disc' },
      { label: 'Tires', value: 'Racing Slicks' },
      { label: 'Weight Reduction', value: '15% vs base' }
    ],
    documents: [
      { title: 'Overall Go-Kart Design PPT', url: '/docs/GO KART/AUTO SPORTS/OVERALL GO KART PPT DR1.pptx', type: 'PPTX' },
      { title: 'Technical Design Report', url: '/docs/GO KART/AUTO SPORTS/DOC-20250327-WA0042..pptx', type: 'PPTX' }
    ],
    certificates: [
      { title: 'Academy of Indigenous Motor Sports', url: '/CERTIFICATIONS/GO KART FORMULA RACING CERTIFICATES/Academy of indigenous motor sports/DocScanner 13 May 2026 12-06 pm.pdf' },
      { title: 'Mega Karting Championship', url: '/CERTIFICATIONS/GO KART FORMULA RACING CERTIFICATES/Mega karting championship (AUTOSPORTS)/DocScanner 13 May 2026 12-07 pm.pdf' },
      { title: 'Hindustan Formula Karting Championship', url: '/CERTIFICATIONS/GO KART FORMULA RACING CERTIFICATES/HINDUSTAN FORMULA KARTING CHAMPIONSHIP/DocScanner 13 May 2026 12-07 pm(1).pdf' },
      { title: 'Engine Kart Vehicle Championship', url: '/CERTIFICATIONS/GO KART FORMULA RACING CERTIFICATES/ENGINE KART VECHICLE CHAMPIONSHIP/DocScanner 13 May 2026 12-14 pm.pdf' }
    ]
  },
  {
    id: 'electric-four-wheeler',
    slug: 'electric-four-wheeler',
    title: 'ELECTRIC FOUR WHEEL',
    role: 'Design Head',
    team: 'Team Denji Squad (E-CAR)',
    icon: Zap,
    description: 'Led the design and engineering of a high-performance electric four-wheeler, focusing on aerodynamic efficiency, weight reduction, and optimal power delivery.',
    fullDescription: 'This ambitious project involved the complete design and fabrication of an electric vehicle from scratch. As the Design Head, I managed the integration of the powertrain, chassis, and bodywork. We focused heavily on CAD modeling and FEA (Finite Element Analysis) to ensure structural integrity while minimizing weight. The vehicle was built to compete in the SAE Electric Four-Wheeler Design Challenge, where our attention to detail in the steering geometry and suspension dynamics earned us high marks from the judges.',
    highlights: ['Won overall 3rd prize in SAE Electric Four-Wheeler Design Challenge', 'Awarded ₹25,000 Cash Prize'],
    tags: ['EV', 'Aerodynamics', 'Chassis Design'],
    gallery: [
      '/images/Electric four wheeler/WhatsApp Image 2026-03-13 at 6.21.46 PM.jpeg',
      '/images/Electric four wheeler/WhatsApp Image 2026-03-13 at 6.21.46 PM (1).jpeg',
      '/images/Electric four wheeler/WhatsApp Image 2026-03-13 at 6.21.47 PM.jpeg',
      '/images/Electric four wheeler/WhatsApp Image 2026-03-13 at 6.21.47 PM (1).jpeg',
    ],
    specs: [
      { label: 'Top Speed', value: '65 km/h' },
      { label: 'Range', value: '80 km' },
      { label: 'Weight', value: '180 kg' },
      { label: 'Acceleration', value: '0-40 km/h in 4.5s' }
    ],
    documents: [
      { title: 'Denji Squad SAE PPT', url: '/docs/ELECTRIC FOUR WHEELER/denji-squad PPT.pdf', type: 'PDF' },
      { title: 'DR-1 Presentation', url: '/docs/ELECTRIC FOUR WHEELER/DR-1.pptx', type: 'PPTX' },
      { title: 'Denji Squad PPT (Source)', url: '/docs/ELECTRIC FOUR WHEELER/denji-squad PPT  SAE (1).pptx', type: 'PPTX' }
    ],
    certificates: [
      { title: 'SAE Workshop Certificate', url: '/CERTIFICATIONS/ELECTRIC FOUR WHEELER SAE CERTIFICATES/WORKSHOP/sae-workshop.pdf' },
      { title: 'SAE Event Certificate', url: '/CERTIFICATIONS/ELECTRIC FOUR WHEELER SAE CERTIFICATES/EVENT/sae-event-1.pdf' },
      { title: 'SAE Additional Event Certificate', url: '/CERTIFICATIONS/ELECTRIC FOUR WHEELER SAE CERTIFICATES/EVENT/sae-event-2.pdf' }
    ]
  },
  {
    id: 'dirt-demon-racing-baja',
    slug: 'dirt-demon-racing-baja',
    title: 'DIRT DEMON RACING BAJA',
    role: 'Team Captain & Lead Engineer',
    team: 'Team Dirt Demon Racing',
    icon: Wrench,
    description: 'Specialized vehicle division focused on extreme off-road endurance, custom suspension tuning, and high-impact roll cage engineering.',
    fullDescription: 'Dirt Demon Racing represents the pinnacle of our off-road engineering efforts. This project specifically focuses on the iterative refinement of our BAJA platform, where we pushed the boundaries of suspension travel and chassis stiffness. We implemented advanced data logging to analyze real-world strain on the frame during high-speed jumps and technical crawls. The result is a machine that not only meets SAE standards but excels in the most punishing environments.',
    highlights: ['Optimized roll cage for 30% higher torsional rigidity', 'Custom suspension geometry for maximum articulation'],
    tags: ['Off-Road', 'Endurance', 'Chassis Tuning'],
    gallery: [
      '/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.05.06 PM (1).jpeg',
      '/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.05.06 PM (2).jpeg',
      '/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.16.46 PM (1).jpeg',
      '/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.16.46 PM (2).jpeg',
      '/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.16.46 PM (3).jpeg',
      '/images/SAE BAJA/Modelon Simulation/acceleration/WhatsApp Image 2026-02-14 at 12.16.46 PM.jpeg'
    ],
    specs: [
      { label: 'Suspension', value: 'Double Wishbone / Trailing Arm' },
      { label: 'Material', value: 'Chromoly Steel' },
      { label: 'Tires', value: '23" All-Terrain' },
      { label: 'Weight', value: '210 kg' }
    ],
    documents: [
      { title: '2D Engineering Layout', url: '/docs/DIRT DEMON RACING BAJA/2d.pdf', type: 'PDF' },
      { title: '3D CAD Overview', url: '/docs/DIRT DEMON RACING BAJA/3d.pdf', type: 'PDF' },
      { title: 'Bill of Materials (BOM)', url: '/docs/DIRT DEMON RACING BAJA/BOM ( DIRT DEMON RACING).pdf', type: 'PDF' },
      { title: 'Design Assumptions & Justification', url: '/docs/DIRT DEMON RACING BAJA/DR1 Design Assumptions and justification.pdf', type: 'PDF' },
      { title: 'Modelon System Analysis', url: '/docs/DIRT DEMON RACING BAJA/MODELON.pdf', type: 'PDF' },
      { title: 'Full Assembly STEP File', url: '/docs/DIRT DEMON RACING BAJA/Dirt Demon Racing.STEP', type: 'CAD' }
    ]
  },
  {
    id: 'map-make-a-product',
    slug: 'map-make-a-product',
    title: 'PORTABLE PLANT CUTTING MACHINE',
    role: 'Product Developer',
    team: 'KIOT Engineering',
    icon: Factory,
    description: 'A comprehensive product development project focusing on conceptualizing, designing, and manufacturing market-ready engineering solutions.',
    fullDescription: 'The "Make a Product" (MAP) initiative was a transition from academic theory to commercial application. I led the development of several utility products, focusing on design for manufacturability (DFM) and cost-efficiency. This involved market research, material selection, and rigorous prototyping. We developed machines such as a specialized Metal Dust Collector and an industrial-grade Paper Shredder, ensuring they met both performance targets and safety regulations for small-scale industrial use.',
    highlights: ['Developed end-to-end manufacturing workflows', 'Focused on Design for Manufacturability (DFM)'],
    tags: ['Manufacturing', 'Product Design', 'Innovation'],
    gallery: [
      '/docs/MAP/WhatsApp Image 2026-05-02 at 10.29.53 AM (1).jpeg',
      '/docs/MAP/WhatsApp Image 2026-05-02 at 10.29.54 AM (1).jpeg',
      '/docs/MAP/WhatsApp Image 2026-05-05 at 9.13.43 AM.jpeg',
      '/docs/MAP/WhatsApp Image 2026-05-05 at 9.13.46 AM.jpeg',
    ],
    specs: [
      { label: 'Focus', value: 'Product Lifecycle' },
      { label: 'Process', value: 'DFM / DFA' },
      { label: 'Category', value: 'Industrial Utility' },
      { label: 'Outcome', value: 'Functional Prototype' }
    ],
    documents: [
      { title: 'MAP Project Report', url: '/docs/MAP/MAP_Bonafide_and_Template report.docx', type: 'DOCX' },
      { title: 'Review 4 Presentation', url: '/docs/MAP/MAP_Review_4.fpptx - Copy.pptx', type: 'PPTX' },
      { title: 'Final One Page Report', url: '/docs/MAP/ONE PAGE REPORT KARTHI VS .FNLL.docx', type: 'DOCX' }
    ]
  }
];

export const INTERNSHIPS = [
  { company: 'ANAAMALAIS - TOYOTA Service', location: 'Salem, TN', field: 'Automotive Service & Mechanics', cert: '/CERTIFICATIONS/INTERNSHIP CERTIFICATES/TOYOTA/toyota-internship.pdf' },
  { company: 'MODELON', location: 'Tiruchirappalli, TN', field: 'Systems Engineering / Modeling', cert: '/CERTIFICATIONS/INTERNSHIP CERTIFICATES/MODELON/modelon-internship.pdf' },
  { company: 'AAVIN (Dairy Industry)', location: 'Salem, TN', field: 'Industrial Plant Operations', cert: '/CERTIFICATIONS/INTERNSHIP CERTIFICATES/AAVIN/aavin-internship.pdf' },
];

export const ACHIEVEMENTS = [
  "Won overall 3rd prize in ELECTRIC FOUR-WHEELER DESIGN CHALLENGE (SAE) - ₹25,000",
  "Won overall static 1st prize in Mega karting championship (Auto sports) - ₹10,000",
  "Won 3rd prize in National level event ('MR PROFFESOR') at Nandha Engineering college - ₹1,000",
  "Participated in Hindustan Formula Karting Championship (HFKC), Bhopal",
  "Presented research on 'Innovation in Go Karts', 'Industry 4.0', and 'Smart Technology in EV'",
  "Volunteer in ADMMS 2K26 International Conference SAE India"
];

export const CERTIFICATIONS = {
  software: [
    { title: 'Solidworks Essentials', url: '/CERTIFICATIONS/SOFTWARE CERTIFICATES/SOLIDWORKS/Essential_in_Solidworks_52805_13_5_2026_11_26_05_AM.pdf' },
    { title: 'CATIA V5 Design', url: '/CERTIFICATIONS/SOFTWARE CERTIFICATES/CATIA V5/catia-v5.pdf' }
  ],
  internship: [
    { title: 'Modelon Systems Engineering', url: '/CERTIFICATIONS/INTERNSHIP CERTIFICATES/MODELON/modelon-internship.pdf' },
    { title: 'KONE Industry (Offer Letter)', url: '/CERTIFICATIONS/INTERNSHIP CERTIFICATES/kone-offer-letter.pdf', status: 'ongoing' },
    { title: 'Toyota Service Internship', url: '/CERTIFICATIONS/INTERNSHIP CERTIFICATES/TOYOTA/toyota-internship.pdf' },
    { title: 'AAVIN Industrial Plant', url: '/CERTIFICATIONS/INTERNSHIP CERTIFICATES/AAVIN/aavin-internship.pdf' }
  ],
  gokart: [
    { title: 'Academy of Indigenous Motor Sports', url: '/CERTIFICATIONS/GO KART FORMULA RACING CERTIFICATES/Academy of indigenous motor sports/academy-motorsports.pdf' },
    { title: 'Mega Karting Championship', url: '/CERTIFICATIONS/GO KART FORMULA RACING CERTIFICATES/Mega karting championship (AUTOSPORTS)/mega-kart.pdf' },
    { title: 'Hindustan Formula Karting Championship', url: '/CERTIFICATIONS/GO KART FORMULA RACING CERTIFICATES/HINDUSTAN FORMULA KARTING CHAMPIONSHIP/hindustan-kart.pdf' },
    { title: 'Engine Kart Vehicle Championship', url: '/CERTIFICATIONS/GO KART FORMULA RACING CERTIFICATES/ENGINE KART VECHICLE CHAMPIONSHIP/engine-kart.pdf' }
  ],
  electric: [
    { title: 'SAE Workshop Certificate', url: '/CERTIFICATIONS/ELECTRIC FOUR WHEELER SAE CERTIFICATES/WORKSHOP/sae-workshop.pdf' },
    { title: 'SAE Event Certificate', url: '/CERTIFICATIONS/ELECTRIC FOUR WHEELER SAE CERTIFICATES/EVENT/sae-event-1.pdf' }
  ]
};
