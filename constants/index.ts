export const manufacturers = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroen",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Subaru",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export const yearsOfProduction = [
  { title: "Year", value: "" },
  { title: "2015", value: "2015" },
  { title: "2016", value: "2016" },
  { title: "2017", value: "2017" },
  { title: "2018", value: "2018" },
  { title: "2019", value: "2019" },
  { title: "2020", value: "2020" },
  { title: "2021", value: "2021" },
  { title: "2022", value: "2022" },
  { title: "2023", value: "2023" },
  { title: "2024", value: "2024" },
  { title: "2025", value: "2025" },
  { title: "2026", value: "2026" },
];

export const fuels = [
  { title: "Fuel", value: "" },
  { title: "Petrol", value: "Petrol" },
  { title: "Diesel", value: "Diesel" },
  { title: "Hybrid", value: "Hybrid" },
  { title: "Electric", value: "Electric" },
];

export const transmissions = [
  { title: "Transmission", value: "" },
  { title: "Automatic", value: "Automatic" },
  { title: "Manual", value: "Manual" },
];

export const bodyTypes = [
  { title: "Body Type", value: "" },
  { title: "Sedan", value: "Sedan" },
  { title: "SUV", value: "SUV" },
  { title: "Pickup", value: "Pickup" },
  { title: "Van", value: "Van" },
  { title: "Hatchback", value: "Hatchback" },
];

export const conditions = [
  { title: "Excellent", value: "Excellent" },
  { title: "Good", value: "Good" },
  { title: "Fair", value: "Fair" },
  { title: "Poor", value: "Poor" },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/vehicles" },
  { label: "Import", href: "/import" },
  { label: "Sell Your Car", href: "/sell-your-car" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { title: "Home", url: "/" },
      { title: "Vehicles", url: "/vehicles" },
      { title: "Import a Car", url: "/import" },
      { title: "Sell Your Car", url: "/sell-your-car" },
      { title: "About Us", url: "/about" },
      { title: "Contact", url: "/contact" },
    ],
  },
  {
    title: "Vehicles",
    links: [
      { title: "Browse All", url: "/vehicles" },
      { title: "Featured", url: "/vehicles?featured=true" },
      { title: "By Make", url: "/vehicles" },
      { title: "By Branch", url: "/vehicles" },
    ],
  },
  {
    title: "Contact",
    links: [
      { title: "+255 711 398 600", url: "tel:+255711398600" },
      { title: "info@bingwamagari.co.tz", url: "mailto:info@bingwamagari.co.tz" },
      { title: "Magomeni, Dar es Salaam", url: "#" },
      { title: "WhatsApp Us", url: "https://wa.me/255711398600" },
      { title: "WhatsApp Channel", url: "https://whatsapp.com/channel/0029VaGSRhdDeOMxgJBw9E3t" },
    ],
  },
];

export const popularMakes = ["Toyota", "Nissan", "Honda", "Suzuki", "Mercedes-Benz", "BMW"];

export const dashboardNavItems = [
  { section: "Overview", items: [{ label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" }] },
  {
    section: "Inventory",
    items: [
      { label: "Vehicles", href: "/dashboard/vehicles", icon: "Car" },
      { label: "Add Vehicle", href: "/dashboard/vehicles/new", icon: "Plus" },
    ],
  },
  {
    section: "Sales",
    items: [
      { label: "Inquiries", href: "/dashboard/inquiries", icon: "MessageSquare" },
      { label: "Sell Requests", href: "/dashboard/sell-requests", icon: "HandCoins" },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Inspections", href: "/dashboard/inspections", icon: "ClipboardCheck" },
      { label: "Branches", href: "/dashboard/branches", icon: "MapPin" },
      { label: "Staff", href: "/dashboard/staff", icon: "Users" },
    ],
  },
  {
    section: "Reports",
    items: [{ label: "Analytics", href: "/dashboard/reports", icon: "BarChart3" }],
  },
];
