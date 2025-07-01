// constantes de selectores, dorpdowns
const generalStatuses = ["Active", "Inactive"];
const requestsStatuses = ["Accepted", "Contacted", "Received", "Discarded"];
const projectsStatuses = ["Completed", "Started", "In Progress"];
const contactInfoDepartments = [
  "Advisors",
  "Marketing",
  "Product",
  "Cross-Border Services",
  "Other",
];
const requestsTravelApproaches = [
  "Beach",
  "Cultural",
  "Events",
  "Gastronomic",
  "Luxury",
  "Nature",
  "Sports",
  "Wellness",
];
const travelLength = [
  "One day experience",
  "3 - 4 nights",
  "5 - 6 nights",
  "Other"
];
export const countries = [
  "Argentina",
  "Bahamas",
  "Barbados",
  "Belize",
  "Bolivia",
  "Brazil",
  "Canada",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Dominican Republic",
  "Ecuador",
  "El Salvador",
  "Grenada",
  "Guatemala",
  "Guyana",
  "Haiti",
  "Honduras",
  "Jamaica",
  "Mexico",
  "Nicaragua",
  "Panama",
  "Paraguay",
  "Peru",
  "United States",
  "Uruguay",
  "Venezuela",
];
export const services = [
  "Host",
  "Flight",
  "Accommodation",
  "Transportation",
  "Restaurant / Food",
  "Tour",
  "Photography and Video",
  "Entertainment",
  "Wellness and Spa",
  "Insurance and Assistance",
  "Technology and Comunication",
  "Logistics",
  "Others",
];
export const itinerarios = [
  {
    nombre: "Aventura en Costa Rica",
    dias: [
      {
        dia: 1,
        descripcion:
          "Llegada a San José, check-in en el hotel y paseo por el centro histórico.",
      },
      {
        dia: 2,
        descripcion:
          "Excursión al Volcán Arenal y aguas termales en La Fortuna.",
      },
      { dia: 3, descripcion: "Tirolesa y senderismo en Monteverde." },
      {
        dia: 4,
        descripcion:
          "Safari flotante en Río Peñas Blancas y visita a una finca local.",
      },
      { dia: 5, descripcion: "Regreso a San José y salida." },
    ],
  },
  {
    nombre: "Cultura y gastronomía en México",
    dias: [
      {
        dia: 1,
        descripcion:
          "Llegada a Ciudad de México, tour por el Centro Histórico.",
      },
      {
        dia: 2,
        descripcion:
          "Visita a Teotihuacán y degustación de comida tradicional.",
      },
      { dia: 3, descripcion: "Museo Frida Kahlo y recorrido por Coyoacán." },
      {
        dia: 4,
        descripcion: "Mercado de San Juan y clase de cocina mexicana.",
      },
      { dia: 5, descripcion: "Brunch en la Roma y vuelo de regreso." },
    ],
  },
  {
    nombre: "Explorando Patagonia Argentina",
    dias: [
      {
        dia: 1,
        descripcion: "Arribo a El Calafate y descanso con vista al lago.",
      },
      {
        dia: 2,
        descripcion:
          "Visita al Glaciar Perito Moreno y navegación entre los témpanos.",
      },
      { dia: 3, descripcion: "Trekking en el Parque Nacional Los Glaciares." },
      {
        dia: 4,
        descripcion:
          "Día libre para actividades opcionales como kayak o cabalgatas.",
      },
      { dia: 5, descripcion: "Regreso a Buenos Aires." },
    ],
  },
  {
    nombre: "Encanto caribeño en Cartagena, Colombia",
    dias: [
      {
        dia: 1,
        descripcion:
          "Llegada, traslado al hotel en el centro histórico y paseo nocturno.",
      },
      {
        dia: 2,
        descripcion:
          "Tour por la ciudad amurallada y visita al Castillo de San Felipe.",
      },
      { dia: 3, descripcion: "Excursión a las Islas del Rosario y snorkel." },
      {
        dia: 4,
        descripcion: "Día libre para compras, relax en la playa o spa.",
      },
      { dia: 5, descripcion: "Último desayuno en la terraza y regreso." },
    ],
  },
];

// Funciones de transformación de Fechas 
function getRandomDateLast30Days() {
  const today = new Date();
  const pastDate = new Date();
  pastDate.setDate(today.getDate() - 30);

  const randomTime = pastDate.getTime() + Math.random() * (today.getTime() - pastDate.getTime());
  const randomDate = new Date(randomTime);

  const day = String(randomDate.getDate()).padStart(2, '0');
  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const year = randomDate.getFullYear();

  return `${year}-${month}-${day}`;
};

function getTodayFormatted() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  return `${year}-${month}-${day}`;
};

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Datos Creados manualmente para pruebas
export const testVendor = {
  id: "98",
  name: "Sydney Express Transfers",
  location: "Sidney, Australia",
  services: "Transportation",
  email: "mrios@k2con.com",
  createdAt: "30/06/2025",
  status: "Active",
  phone: "+81368684007",
  website: "https://apt-fold.name",
};

export const testHost = {
  id: "97",
  name: "Harbour Luxe All Inclusive Resort",
  location: "Sidney, Australia",
  services: "Host",
  email: "mrios@k2con.com",
  createdAt: "30/06/2025",
  status: "Active",
  phone: "+573137906289",
  website: "https://qualified-possession.org",
};

export const testTripUser = {
  id: "7",
  name: "Michael Rodriguez",
  email: "mrios@k2con.com",
  identification: "1053859544",
  address: "Carrera 34 - 98A38",
  country: "Colombia",
  phone: "+573137906289",
  birthDate: "20/05/2025",
};

export const testExperience = {
  id: "17",
  name: "Tokyo Elite: A Luxury Cultural Escape",
  status: "Active",
  createdAt: "03/04/2025",
  featured: "true",
  signature: "false",
  destination: "Japan",
  duration: "5 - 6",
  packages: "1 - 5",
  startingAt: "$22,000.00",
};

export const testRequest = {
  id: `${Math.floor(Math.random() * 4) + 1}`,
  createdAt: "30/06/2025",
  requestChannel: "Platform",
  type: "Xperiences",
  experience: "Wild Australia Event Experience",
  departure: "Colombia",
  destination: "Sidney, Australia",
  packages: "4",
  lenght: "Staycation",
  meals: "All-inclusive",
  approach: "Gastronomic",
  budget: "20000",
  department: "Product",
  contactName: "Michael Rodriguez",
  email: "qa_test_email@k2con.com",
  phone: "+573137906289",
  status: "Accepted",
};

export const contactInfo = {
  department:
    contactInfoDepartments[
      Math.floor(Math.random() * contactInfoDepartments.length)
    ],
  email: "qa_test_email@k2con.com",
  phone: "+573137906289",
  name: "QA Automation Test Area",
};

export const testProject = {
  id: "54",
  createdAt: "30/06/2025",
  pmName: "Michael Rodriguez",
  type: "Client",
  projectName: "Adventure Awaits: Disney Edition",
  experience: "Adventure Awaits: Disney Edition",
  departure: "Colombia",
  destination: "Orlando, Florida, United States",
  packages: "2",
  lenght: "5 - 6",
  meals: "All-inclusive",
  approach: "Gastronomic",
  budget: "20000",
  department: "Product",
  contactName: "Michael Rodriguez",
  mcPerson: "mrios@k2con.com",
  phone: "+573137906289",
  poQuantity: "1",
  status: "Completed",
};

// Datos para creación de Formularios
export const requestCreationTestData = {
  contactInfo: contactInfo,
  status: "Received",
  request_channel: "Direct",
  type: "Xperiences",
  travel_approach: requestsTravelApproaches[Math.floor(Math.random() * requestsTravelApproaches.length)],
  departure_country: countries[Math.floor(Math.random() * countries.length)],
  destination_country: countries[Math.floor(Math.random() * countries.length)],
  estimate_start_date: getRandomDateLast30Days(),
  estimate_end_date: getTodayFormatted(),
  packages: `${Math.floor(Math.random() * 9) + 1}`,
  length: travelLength[Math.floor(Math.random() * travelLength.length)],
  meals: "All-inclusive",
  budget: escapeRegExp("$15000 - $20000"),
  special_request: "Hola esta es una Request de Prueba creada automaticamente por la suite de Playwright, es usada para validar flujos de Creación y edición."
};


