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
  services: "Transportation, Restaurant / Food",
  email: "testEmail@k2con.com",
  createdAt: "09/04/2025",
  status: "Active",
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
  status: "Active",
  createdAt: "02/04/2025",
  featured: "true",
  signature: "false",
  destination: "Argentina",
  duration:"3 - 4",
  packages: "1 - 5",
  startingAt: "$12,500.00",
};

export const itinerarios = [
  {
    nombre: "Aventura en Costa Rica",
    dias: [
      { dia: 1, descripcion: "Llegada a San José, check-in en el hotel y paseo por el centro histórico." },
      { dia: 2, descripcion: "Excursión al Volcán Arenal y aguas termales en La Fortuna." },
      { dia: 3, descripcion: "Tirolesa y senderismo en Monteverde." },
      { dia: 4, descripcion: "Safari flotante en Río Peñas Blancas y visita a una finca local." },
      { dia: 5, descripcion: "Regreso a San José y salida." }
    ]
  },
  {
    nombre: "Cultura y gastronomía en México",
    dias: [
      { dia: 1, descripcion: "Llegada a Ciudad de México, tour por el Centro Histórico." },
      { dia: 2, descripcion: "Visita a Teotihuacán y degustación de comida tradicional." },
      { dia: 3, descripcion: "Museo Frida Kahlo y recorrido por Coyoacán." },
      { dia: 4, descripcion: "Mercado de San Juan y clase de cocina mexicana." },
      { dia: 5, descripcion: "Brunch en la Roma y vuelo de regreso." }
    ]
  },
  {
    nombre: "Explorando Patagonia Argentina",
    dias: [
      { dia: 1, descripcion: "Arribo a El Calafate y descanso con vista al lago." },
      { dia: 2, descripcion: "Visita al Glaciar Perito Moreno y navegación entre los témpanos." },
      { dia: 3, descripcion: "Trekking en el Parque Nacional Los Glaciares." },
      { dia: 4, descripcion: "Día libre para actividades opcionales como kayak o cabalgatas." },
      { dia: 5, descripcion: "Regreso a Buenos Aires." }
    ]
  },
  {
    nombre: "Encanto caribeño en Cartagena, Colombia",
    dias: [
      { dia: 1, descripcion: "Llegada, traslado al hotel en el centro histórico y paseo nocturno." },
      { dia: 2, descripcion: "Tour por la ciudad amurallada y visita al Castillo de San Felipe." },
      { dia: 3, descripcion: "Excursión a las Islas del Rosario y snorkel." },
      { dia: 4, descripcion: "Día libre para compras, relax en la playa o spa." },
      { dia: 5, descripcion: "Último desayuno en la terraza y regreso." }
    ]
  }
];

export const testRequest = {
  id: `${Math.floor(Math.random() * 41) + 1}`,
  createdAt: "07/02/2025",
  requestChannel: "Platform",
  type: "Client",
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
  status: "Accepted",
}
