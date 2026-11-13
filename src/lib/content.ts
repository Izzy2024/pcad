export const BRANDS = [
  { slug: 'autodesk', name: 'Autodesk' },
  { slug: 'bentley-systems', name: 'Bentley Systems' },
  { slug: 'oracle-construction-and-engineering', name: 'Oracle' },
  { slug: 'adobe', name: 'Adobe' },
  { slug: 'csi-software', name: 'CSI Software' },
  { slug: 'sketchup', name: 'SketchUp' },
  { slug: 'chaos', name: 'Chaos' },
  { slug: 'microsoft-365', name: 'Microsoft 365' },
  { slug: 'bluebeam-revu', name: 'Bluebeam' },
  { slug: 'corel-draw-graphics-suite', name: 'Corel' },
  { slug: 'rhinoceros-3d', name: 'Rhinoceros 3D' },
  { slug: 'rib-presto', name: 'RIB Presto' },
  { slug: 'transoft-solutions', name: 'Transoft Solutions' },
  { slug: 'twinmotion', name: 'Twinmotion' },
  { slug: 'esri', name: 'Esri' },
];

export const SITE = {
  name: 'PCCAD',
  claim: 'Soluciones tecnológicas para la industria AEC',
  since: 1992,
  email: 'ventas@pccadla.com',
  emailInfo: 'info@pccadla.com',
  phone: '+507 236-0370',
  compliance: 'compliance@pccadla.com',
  compliancePhone: '+507 236-3937',
  address: ['Altos del Chase N° 46-F', 'Ave. de La Amistad', 'El Dorado, Panamá'],
  social: {
    linkedin: 'https://www.linkedin.com/company/pccadla/',
    instagram: 'https://www.instagram.com/pccadla',
    facebook: 'https://www.facebook.com/pccadla',
  },
};

export const NAV = [
  { label: 'Software', href: '/software' },
  { label: 'Hardware', href: '/hardware' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Certificaciones', href: '/certificaciones' },
  { label: 'Nosotros', href: '/nosotros' },
];

export const PILLARS = [
  {
    n: '01',
    title: 'Software',
    body: 'Catálogo especializado por fabricante: Autodesk, Bentley, Oracle, Adobe, CSI, SketchUp, Chaos y más.',
    href: '/software',
    image: '/img/skyline.jpg',
  },
  {
    n: '02',
    title: 'Hardware',
    body: 'Plotters HP de gran formato y laptops MSI para creación de contenido, con asesoría de rendimiento por proyecto.',
    href: '/hardware',
    image: '/img/pillar-management.png',
  },
  {
    n: '03',
    title: 'Capacitación',
    body: 'Centro de Entrenamiento Autorizado. Cursos presenciales dictados por instructores certificados.',
    href: '/cursos',
    image: '/img/pillar-training.png',
  },
  {
    n: '04',
    title: 'Consultoría BIM',
    body: 'Implementación BIM alineada a ISO 19650, nube de puntos y gestión documental para proyectos AEC.',
    href: '/servicios',
    image: '/img/pillar-bim.png',
  },
];
