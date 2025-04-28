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
  "Adventure",
  "Art",
  "Beach",
  "Cultural",
  "Educational",
  "Eco-Tourism",
  "Event",
  "Gastronomic",
  "Luxury",
  "Nature",
  "Sports",
  "Urban",
  "Wellness",
];
const travelLength = [
  "One day experience",
  "3 - 4 nights",
  "5 - 6 nights",
  "Other"
];

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

export const testVendor = {
  id: "5",
  name: "Vendor Test - Edit created Vendor",
  location: "Colombia",
  services: "Photography and Video",
  email: "testEmail@k2con.com",
  createdAt: "09/04/2025",
  status: generalStatuses[Math.floor(Math.random() * generalStatuses.length)],
  phone: "+573137985652",
  website: "https://cumbersome-petticoat.name",
};

export const testTripUser = {
  id: "8",
  name: "Lisseth Moreno",
  email: "lisshahimor_09@hotmail.com",
  identification: "AD939498",
  address: "cra 23 122 89",
  country: "Colombia",
  phone: "+573168293576",
  birthDate: "07/01/2020",
};

export const testExperience = {
  id: "64",
  name: "Experiencia de Prueba para pruebas Automatizadas",
  status: generalStatuses[Math.floor(Math.random() * generalStatuses.length)],
  createdAt: "02/04/2025",
  featured: "true",
  signature: "false",
  destination: "Argentina",
  duration: "3 - 4",
  packages: "1 - 5",
  startingAt: "$12,500.00",
};

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

export const testRequest = {
  id: `${Math.floor(Math.random() * 41) + 1}`,
  createdAt: "07/02/2025",
  requestChannel: "Platform",
  type: "	Xperiences",
  experience: "Madrid Experience: Art, Wine & Soccer Passion",
  departure: "Colombia",
  destination: "Madrid, Spain",
  packages: "5",
  lenght: "2 - 3",
  meals: "All-inclusive",
  approach: "Cultural",
  budget: "10000",
  department: "Marketing",
  contactName: "Dunn and Clay LLC",
  email: "Andres.villarreta@k2con.com",
  phone: "+573163926785",
  status: requestsStatuses[Math.floor(Math.random() * requestsStatuses.length)],
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

export const testProject = {
  id: "39",
  createdAt: "12/03/2025",
  pmName: "Lisseth",
  type: "Client",
  projectName: "Ejemplo Proyecto",
  experience: "Viva Las Vegas: A Sin City Spectacle for All",
  departure: "Brazil",
  destination: "Madrid, Spain",
  packages: "8",
  lenght: "5 - 6",
  meals: "Breakfast",
  approach: "Beach",
  budget: "20000",
  department: "Marketing",
  contactName: "Lisseth Moreno",
  mcPerson: "lisseth@k2con.com",
  phone: "+573163926785",
  poQuantity: "2",
  status: projectsStatuses[Math.floor(Math.random() * projectsStatuses.length)],
};
