# 🚗 BINGWA MAGARI — Frontend Design Agent Prompt
> Paste this entire prompt into your VS Code AI agent (Copilot, Cursor, Cline, etc.)

---

## AGENT INSTRUCTIONS

You are a senior frontend engineer and UI designer. Your task is to **fully design and build the frontend for Bingwa Magari** — a Tanzanian automotive dealership & marketplace platform — based on the CarHub design system described below, with the branding updated to **Bingwa Magari**.

Do not ask clarifying questions. Read all sections carefully and implement everything described. Work file by file, component by component, until the entire frontend is complete.

---

## 1. BRANDING UPDATE RULE

The original design was called **CarHub**. You must:

- Replace every instance of `CarHub` → `Bingwa Magari`
- Replace every instance of `carhub` → `bingwa-magari` (in class names, IDs, routes, file names)
- Keep the **CarHub logo shape/icon** exactly as-is — only update the text label next to it to read **"Bingwa Magari"**
- Keep all original colors, fonts, spacing, and component styles from CarHub — only the name changes

---

## 2. TECH STACK

Build using the following — do not deviate:

```
Framework:     Next.js 14 (App Router)
Language:      TypeScript
Styling:       Tailwind CSS
Components:    Shadcn/UI
Icons:         Lucide React
Fonts:         Google Fonts (see Section 4)
Animations:    Tailwind transitions + Framer Motion for page transitions
State:         React useState / useContext (no Redux)
Forms:         React Hook Form + Zod
HTTP:          fetch() with Next.js server actions where applicable
```

---

## 3. COLOR SYSTEM

Use these exact CSS variables in `globals.css`. Apply them consistently across all components:

```css
:root {
  /* Primary Brand */
  --brand-primary:     #1E3A5F;   /* Deep navy blue — main brand color */
  --brand-accent:      #2563EB;   /* Bright blue — CTAs, links, highlights */
  --brand-accent-hover:#1D4ED8;   /* CTA hover state */

  /* Backgrounds */
  --bg-base:           #F9FAFB;   /* Page background */
  --bg-surface:        #FFFFFF;   /* Cards, modals, panels */
  --bg-muted:          #F3F4F6;   /* Subtle section backgrounds */
  --bg-dark:           #111827;   /* Dark sections, footer */

  /* Text */
  --text-primary:      #111827;   /* Headings */
  --text-secondary:    #374151;   /* Body text */
  --text-muted:        #6B7280;   /* Captions, labels */
  --text-inverse:      #FFFFFF;   /* On dark backgrounds */

  /* Status Colors */
  --status-available:  #059669;   /* Green — vehicle available */
  --status-reserved:   #D97706;   /* Amber — reserved */
  --status-sold:       #DC2626;   /* Red — sold */

  /* Borders */
  --border-default:    #E5E7EB;
  --border-focus:      #2563EB;

  /* WhatsApp */
  --whatsapp:          #25D366;
  --whatsapp-hover:    #128C7E;
}
```

---

## 4. TYPOGRAPHY

Use these Google Fonts — import them in `layout.tsx`:

```
Display / Headings:  "DM Serif Display" — for hero titles, section headings, vehicle names
Body / UI:           "DM Sans" — for all body text, labels, buttons, nav
Monospace:           "JetBrains Mono" — for stock numbers, prices, spec values
```

Apply in `tailwind.config.ts`:
```ts
fontFamily: {
  display: ['"DM Serif Display"', 'serif'],
  sans:    ['"DM Sans"', 'sans-serif'],
  mono:    ['"JetBrains Mono"', 'monospace'],
}
```

---

## 5. FILE & FOLDER STRUCTURE TO BUILD

Create the following structure exactly:

```
src/
├── app/
│   ├── layout.tsx                        # Root layout with navbar + footer
│   ├── globals.css                       # All CSS variables + base styles
│   ├── page.tsx                          # Homepage
│   ├── vehicles/
│   │   ├── page.tsx                      # Vehicle listing / search page
│   │   └── [id]/
│   │       └── page.tsx                  # Vehicle detail page
│   ├── sell-your-car/
│   │   └── page.tsx                      # Sell your car form page
│   ├── about/
│   │   └── page.tsx                      # About Bingwa Magari
│   ├── contact/
│   │   └── page.tsx                      # Contact page
│   └── dashboard/
│       ├── layout.tsx                    # Dashboard layout (sidebar + topbar)
│       ├── page.tsx                      # Dashboard overview
│       ├── vehicles/
│       │   ├── page.tsx                  # Vehicle inventory table
│       │   ├── new/page.tsx              # Add vehicle form
│       │   └── [id]/edit/page.tsx        # Edit vehicle form
│       ├── inquiries/
│       │   └── page.tsx                  # Lead management
│       ├── sell-requests/
│       │   └── page.tsx                  # Sell request queue
│       ├── inspections/
│       │   └── page.tsx                  # Inspection management
│       ├── branches/
│       │   └── page.tsx                  # Branch management
│       ├── staff/
│       │   └── page.tsx                  # Staff management
│       └── reports/
│           └── page.tsx                  # Analytics & reports
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── DashboardSidebar.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FeaturedVehicles.tsx
│   │   ├── StatsSection.tsx
│   │   ├── WhyBingwa.tsx
│   │   ├── SellYourCarBanner.tsx
│   │   └── BranchesSection.tsx
│   ├── vehicles/
│   │   ├── VehicleCard.tsx
│   │   ├── VehicleGrid.tsx
│   │   ├── VehicleFilters.tsx
│   │   ├── VehicleImageGallery.tsx
│   │   ├── VehicleSpecsTable.tsx
│   │   ├── VehicleStatusBadge.tsx
│   │   ├── InstallmentCalculator.tsx
│   │   └── WhatsAppButton.tsx
│   ├── dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── RecentInquiries.tsx
│   │   ├── InventoryChart.tsx
│   │   └── SalesChart.tsx
│   └── ui/                               # Shadcn components (auto-generated)
└── lib/
    └── utils.ts
```

---

## 6. PUBLIC PAGES — DETAILED SPECS

---

### 6.1 NAVBAR (`components/layout/Navbar.tsx`)

**Layout:** Fixed top, full width, height 68px
**Background:** White with `backdrop-blur` and subtle bottom border on scroll
**Left:** Bingwa Magari logo (CarHub icon shape + "Bingwa Magari" text in `font-display`)
**Center:** Navigation links — Home, Vehicles, Sell Your Car, About, Contact
**Right:** Language toggle (EN | SW) + "List Your Car" CTA button (brand-accent)
**Mobile:** Hamburger menu → full-screen slide-down menu
**Active link:** Underline with `--brand-accent` color
**Scroll behavior:** Slight shadow appears on scroll

---

### 6.2 HOMEPAGE (`app/page.tsx`)

Build the full homepage with these sections **in order:**

#### HERO SECTION
- Full-viewport height (100vh)
- Background: Dark overlay gradient on a high-quality car image (use a placeholder `/images/hero.jpg`)
- Headline: `"Tanzania's Most Trusted Car Marketplace"` — use `font-display`, large (text-5xl md:text-7xl), white
- Sub-headline: `"Find verified vehicles, sell your car, or book an inspection — all in one place."` — text-xl, text-white/80
- Two CTA buttons: `"Browse Vehicles"` (solid brand-accent) + `"Sell Your Car"` (outline white)
- Floating stats bar at bottom of hero: `1,200+ Vehicles Sold | 4 Branches | 98% Verified | Since 2015`

#### SEARCH BAR SECTION
- Full-width white card, `-mt-8` to overlap hero
- Horizontal filters: Make | Model | Year | Max Price (TZS) | Branch
- `"Search Vehicles"` button — full brand-accent
- Below filters: popular quick-tags: `Toyota | Nissan | Honda | Suzuki | Mercedes`

#### FEATURED VEHICLES SECTION
- Heading: `"Featured Vehicles"` with `"View All →"` link
- Horizontal scroll on mobile, 3-column grid on desktop
- Use `<VehicleCard />` component (see Section 6.5)

#### WHY BINGWA MAGARI SECTION
- 4 feature cards in a 2x2 or 4-column grid
- Cards: `Verified Inspections` | `Multi-Branch Network` | `WhatsApp Support` | `Installment Options`
- Each card: icon (Lucide) + title + 2-line description
- Background: `--bg-muted`

#### STATS COUNTER SECTION
- Dark background (`--bg-dark`)
- 4 animated counters: `1,200+ Cars Sold` | `4,500+ Happy Clients` | `4 Branches` | `10+ Years`
- Counters animate up when section enters viewport (use Intersection Observer)

#### SELL YOUR CAR BANNER
- Split layout: left = text + CTA, right = image
- Headline: `"Want to sell your car? We'll buy it."`
- CTA: `"Get a Free Valuation"` → links to `/sell-your-car`
- Background: brand-primary (navy)

#### BRANCHES SECTION
- Heading: `"Our Branches Across Tanzania"`
- 4 branch cards: Dar es Salaam | Mwanza | Arusha | Dodoma
- Each card: branch name, city, address, phone, `"Get Directions"` link

#### FOOTER
- Dark background (`--bg-dark`), 4 columns
- Col 1: Logo + tagline + social icons
- Col 2: Quick Links (Home, Vehicles, Sell, About, Contact)
- Col 3: Vehicles (Browse All, Featured, By Make, By Branch)
- Col 4: Contact (phone, email, address, WhatsApp button)
- Bottom bar: `© 2026 Bingwa Magari. All rights reserved.`

---

### 6.3 VEHICLE LISTING PAGE (`app/vehicles/page.tsx`)

**Layout:** Left sidebar filters (280px) + right content grid
**Mobile:** Filters collapse into a bottom sheet / drawer

**Sidebar Filters:**
- Search by keyword
- Make (checkbox list: Toyota, Nissan, Honda, Suzuki, Mercedes, BMW, etc.)
- Price range slider (TZS 0 – 200,000,000)
- Year range (2000 – 2026)
- Fuel Type (Petrol, Diesel, Hybrid, Electric)
- Transmission (Automatic, Manual)
- Body Type (Sedan, SUV, Pickup, Van, Hatchback)
- Branch (Dar es Salaam, Mwanza, Arusha, Dodoma)
- Status (Available, Reserved)
- `"Clear All Filters"` link

**Vehicle Grid:**
- Top bar: result count + sort dropdown (Newest, Price Low-High, Price High-Low, Most Viewed)
- Grid/List view toggle
- Grid: 3 columns desktop, 2 tablet, 1 mobile
- Pagination: 20 per page with page numbers

---

### 6.4 VEHICLE DETAIL PAGE (`app/vehicles/[id]/page.tsx`)

**Layout:** Two-column (image left 55%, details right 45%) on desktop, stacked on mobile

**Left Column:**
- Main image (large, rounded, shadow)
- Thumbnail strip below (up to 20 images, horizontal scroll)
- Click thumbnail → update main image
- Image count badge (`"1 / 12"`)

**Right Column:**
- Stock number badge: `#BW-001234` (monospace font)
- Status badge: Available / Reserved / Sold (colored)
- Vehicle name: `"2021 Toyota Land Cruiser Prado"` (font-display, large)
- Price: `"TZS 95,000,000"` (large, brand-accent, monospace)
- WhatsApp button (green, full width): `"Inquire on WhatsApp"`
- Test Drive button (outline): `"Book a Test Drive"`
- Divider
- Quick specs grid (2 columns):
  - Year | Make | Model | Mileage | Fuel | Transmission | Color | Engine | Body Type | Import Country | Previous Owners | Accident History | Service History
- Divider
- Installment Calculator (collapsible)
- Branch info card (branch name, address, phone)

**Below fold:**
- Full description tab (EN / SW toggle)
- Inspection Report card (if inspection exists): score badge + system ratings
- Similar Vehicles section (4 cards)

---

### 6.5 VEHICLE CARD COMPONENT (`components/vehicles/VehicleCard.tsx`)

```tsx
// Props:
interface VehicleCardProps {
  id: string
  stockNumber: string
  make: string
  model: string
  year: number
  price: number           // in TZS
  mileage: number
  fuelType: string
  transmission: string
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD'
  primaryImage: string
  branch: string
  isFeatured?: boolean
}
```

**Design:**
- White card, rounded-2xl, subtle shadow, hover: shadow-lg + translateY(-2px)
- Image top (aspect-ratio 16/9, object-cover)
- Featured badge (top-left, brand-accent): `"Featured"`
- Status badge (top-right): colored dot + text
- Body: Year + Make + Model (font-display), Price (large, monospace, brand-accent)
- Specs row: icons + values for Mileage | Fuel | Transmission
- Footer: Branch tag (left) + `"View Details"` link (right, brand-accent)

---

### 6.6 SELL YOUR CAR PAGE (`app/sell-your-car/page.tsx`)

**Layout:** Centered, max-w-3xl, card with white background

**Step 1 — Your Details:**
- Full Name, Phone Number, Email (optional)

**Step 2 — Vehicle Details:**
- Make, Model, Year, Mileage, Fuel Type, Transmission, Body Type, Color
- Asking Price (TZS), Condition (Excellent/Good/Fair/Poor), Description

**Step 3 — Upload Photos:**
- Drag & drop or click to upload (up to 10 images)
- Preview thumbnails with remove button

**Step 4 — Review & Submit:**
- Summary of all entered info
- Submit button: `"Submit for Valuation"`
- Success message: `"Thank you! Our team will contact you within 24 hours."`

Use a stepper component at the top showing progress (Step 1 of 4).

---

## 7. DASHBOARD PAGES — DETAILED SPECS

All dashboard pages live under `/dashboard`. The dashboard uses a **sidebar layout**.

---

### 7.1 DASHBOARD LAYOUT (`app/dashboard/layout.tsx`)

**Sidebar (260px, fixed left):**
- Top: Bingwa Magari logo
- Navigation sections:
  - Overview: Dashboard
  - Inventory: Vehicles, Add Vehicle
  - Sales: Inquiries, Sell Requests
  - Operations: Inspections, Branches, Staff
  - Reports: Analytics
- Bottom: User avatar + name + role + Logout button
- Collapsed state on mobile (icon-only sidebar)
- Active item: brand-accent background, white text

**Topbar (right of sidebar):**
- Page title (dynamic)
- Breadcrumb
- Notification bell icon
- User avatar dropdown (Profile, Settings, Logout)

---

### 7.2 DASHBOARD OVERVIEW (`app/dashboard/page.tsx`)

**Stats Cards Row (4 cards):**
- Total Vehicles | Available | Inquiries This Month | Pending Sell Requests
- Each card: icon + number (large) + label + trend indicator (+12% vs last month)

**Row 2 — Charts:**
- Left (60%): Bar chart — Monthly Sales (last 6 months) using Recharts
- Right (40%): Doughnut chart — Inventory by Status

**Row 3 — Tables:**
- Left: Recent Inquiries (last 5) — customer name, vehicle, status, date, agent
- Right: Recent Sell Requests (last 5) — seller, car, asking price, status

---

### 7.3 VEHICLE INVENTORY (`app/dashboard/vehicles/page.tsx`)

**Top bar:**
- Search input + filters (Status, Branch, Make)
- `"+ Add Vehicle"` button (brand-accent)
- Export CSV button

**Table columns:**
- Image thumbnail | Stock # | Make/Model/Year | Price (TZS) | Status badge | Branch | Views | Actions

**Actions per row:**
- Edit (pencil icon) | Change Status dropdown | Delete (trash, with confirm modal)

**Status quick-change:**
- Inline dropdown: Available → Reserved → Sold

---

### 7.4 ADD / EDIT VEHICLE FORM (`app/dashboard/vehicles/new/page.tsx`)

Multi-section form in a single page (no steps):

**Section 1 — Basic Info:**
- Stock Number (auto-generated, editable), Make, Model, Year, Variant, Color, Body Type

**Section 2 — Technical Specs:**
- Fuel Type, Transmission, Engine Size, Mileage

**Section 3 — Pricing & Status:**
- Price (TZS), Status, Featured toggle, Branch (select)

**Section 4 — History:**
- Import Country, Previous Owners (number), Accident History (toggle), Service History (toggle)

**Section 5 — Descriptions:**
- Two tabs: English | Swahili — each a rich textarea

**Section 6 — Images:**
- Drag-and-drop multi-upload (max 20)
- Reorderable thumbnail grid
- Click to set as primary image (star icon)

**Submit bar:** Fixed at bottom — Cancel + Save Draft + Publish Vehicle

---

### 7.5 INQUIRIES PAGE (`app/dashboard/inquiries/page.tsx`)

**Kanban board layout with 5 columns:**
- NEW | CONTACTED | NEGOTIATING | CLOSED WON | CLOSED LOST
- Each card: customer name, phone, vehicle name, date received
- Drag cards between columns to update status
- Click card → side drawer with full details + notes field + assign agent dropdown

---

### 7.6 SELL REQUESTS PAGE (`app/dashboard/sell-requests/page.tsx`)

**Table view with columns:**
- Seller Name | Phone | Car (Make/Model/Year) | Asking Price | Status | Date | Actions

**Status badges:** PENDING (gray) | INSPECTION_ASSIGNED (blue) | INSPECTED (purple) | APPROVED (green) | REJECTED (red)

**Actions:**
- View Details → full modal with seller info, vehicle details, submitted images
- Assign Inspector → dropdown modal
- Approve → converts to vehicle inventory (confirmation modal)
- Reject → with reason input

---

### 7.7 INSPECTIONS PAGE (`app/dashboard/inspections/page.tsx`)

**For Inspectors:**
- My Assigned Inspections table
- Click → Inspection Form modal with 7 system ratings (EXCELLENT/GOOD/FAIR/POOR):
  - Engine | Transmission | Suspension | Chassis | Interior | Exterior | Electrical
- Overall Score: auto-calculated (shown as a large circular progress indicator, 0–100)
- Score color: 0-49 = red | 50-69 = amber | 70-100 = green
- Recommendation text area
- Submit Report button

---

### 7.8 REPORTS PAGE (`app/dashboard/reports/page.tsx`)

**Date range picker at top**

**4 report cards:**
1. Sales Report — line chart, total revenue, avg sale price, vehicles sold count
2. Lead Conversion — funnel chart, conversion rate, avg time to close
3. Inventory Report — bar chart, stock age, most viewed vehicles table
4. Branch Comparison — multi-bar chart comparing all branches side by side

Export to CSV button on each card.

---

## 8. SHARED COMPONENTS TO BUILD

### InstallmentCalculator (`components/vehicles/InstallmentCalculator.tsx`)
- Inputs: Down Payment % (slider, 10–50%), Loan Duration (12/24/36/48/60 months)
- Display: Down Payment amount (TZS), Monthly Payment (TZS), Total Cost (TZS)
- TZS formatting: use `toLocaleString('sw-TZ')` for all prices
- Interest rate: fixed 18% annually

### WhatsAppButton (`components/vehicles/WhatsAppButton.tsx`)
- Props: vehicleId, stockNumber, make, model, year
- Pre-fills message: `"Habari! Nina nia na [Year] [Make] [Model] — Stock #[stockNumber]. Tafadhali nipe maelezo zaidi."`
- Opens `https://wa.me/255XXXXXXXXX?text=...` in new tab
- Style: full-width, green (#25D366), white text, WhatsApp icon

### VehicleStatusBadge (`components/vehicles/VehicleStatusBadge.tsx`)
- AVAILABLE → green dot + "Available"
- RESERVED → amber dot + "Reserved"
- SOLD → red dot + "Sold"

### LanguageToggle
- Toggle between EN and SW stored in localStorage
- Minimal pill toggle in navbar

---

## 9. RESPONSIVE BREAKPOINTS

Follow these breakpoints strictly using Tailwind:

| Breakpoint | Width     | Layout Changes |
|------------|-----------|----------------|
| mobile     | < 640px   | Single column, hamburger nav, bottom CTAs |
| tablet     | 640–1024px| 2-column grids, collapsed sidebar |
| desktop    | > 1024px  | Full layouts as described above |

---

## 10. PLACEHOLDER DATA

Use this mock data for UI development (replace with real API calls later):

```ts
// lib/mockData.ts
export const mockVehicles = [
  { id: "1", stockNumber: "BW-001", make: "Toyota", model: "Land Cruiser Prado",
    year: 2021, price: 95000000, mileage: 42000, fuelType: "Diesel",
    transmission: "Automatic", status: "AVAILABLE", branch: "Dar es Salaam",
    primaryImage: "/images/vehicles/prado.jpg", isFeatured: true },
  { id: "2", stockNumber: "BW-002", make: "Nissan", model: "X-Trail",
    year: 2020, price: 48000000, mileage: 61000, fuelType: "Petrol",
    transmission: "Automatic", status: "AVAILABLE", branch: "Arusha",
    primaryImage: "/images/vehicles/xtrail.jpg", isFeatured: false },
  { id: "3", stockNumber: "BW-003", make: "Toyota", model: "Hilux",
    year: 2022, price: 87000000, mileage: 18000, fuelType: "Diesel",
    transmission: "Manual", status: "RESERVED", branch: "Mwanza",
    primaryImage: "/images/vehicles/hilux.jpg", isFeatured: true },
]

export const mockBranches = [
  { id: "1", name: "Dar es Salaam", city: "Dar es Salaam", address: "Kariakoo, Dar es Salaam", phone: "+255 22 123 4567" },
  { id: "2", name: "Mwanza",        city: "Mwanza",        address: "Pamba Road, Mwanza",       phone: "+255 28 123 4567" },
  { id: "3", name: "Arusha",        city: "Arusha",        address: "Sokoine Road, Arusha",      phone: "+255 27 123 4567" },
  { id: "4", name: "Dodoma",        city: "Dodoma",        address: "Nyerere Road, Dodoma",      phone: "+255 26 123 4567" },
]
```

---

## 11. FORMATTING UTILITIES

Add these to `lib/utils.ts` and use them everywhere:

```ts
// Format TZS currency
export function formatTZS(amount: number): string {
  return `TZS ${amount.toLocaleString('en-TZ')}`
}

// Format mileage
export function formatMileage(km: number): string {
  return `${km.toLocaleString()} km`
}

// Format stock number
export function formatStock(stock: string): string {
  return `#${stock}`
}

// Get status color classes
export function statusColor(status: string): string {
  const map = {
    AVAILABLE: 'bg-green-100 text-green-800',
    RESERVED:  'bg-amber-100 text-amber-800',
    SOLD:      'bg-red-100 text-red-800',
  }
  return map[status] ?? 'bg-gray-100 text-gray-800'
}
```

---

## 12. EXECUTION ORDER

Build in this exact order so the project is always in a runnable state:

1. `globals.css` — CSS variables and base styles
2. `tailwind.config.ts` — fonts and extended theme
3. `layout.tsx` — root layout with Navbar + Footer
4. `components/layout/Navbar.tsx`
5. `components/layout/Footer.tsx`
6. `app/page.tsx` + all home section components
7. `components/vehicles/VehicleCard.tsx`
8. `app/vehicles/page.tsx` — listing page
9. `app/vehicles/[id]/page.tsx` — detail page
10. `app/sell-your-car/page.tsx`
11. `app/dashboard/layout.tsx` + `DashboardSidebar.tsx`
12. `app/dashboard/page.tsx` — overview
13. All remaining dashboard pages
14. Shared components (InstallmentCalculator, WhatsAppButton, etc.)
15. `lib/utils.ts` + `lib/mockData.ts`

---

## 13. QUALITY RULES

Follow these rules on every file you create:

- No `any` types — use proper TypeScript interfaces
- All images use `next/image` with width/height props
- All internal links use `next/link`
- All forms use React Hook Form + Zod validation
- All prices displayed using `formatTZS()` utility
- Mobile-first responsive on every component
- Loading states on all async actions (Skeleton loaders)
- Error boundaries on all data-fetching components
- Accessible: all buttons have `aria-label`, images have `alt`, forms have `label`
- No hardcoded colors — use CSS variables or Tailwind config tokens

---

## START NOW

Begin with Step 1: Create `src/app/globals.css` with all CSS variables and base styles, then `tailwind.config.ts` with the custom fonts and theme. Proceed through the execution order above without stopping until the entire frontend is complete.
