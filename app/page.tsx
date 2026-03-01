import {
  HeroSection,
  HomeSearchBar,
  FeaturedVehicles,
  WhyBingwa,
  StatsSection,
  SellYourCarBanner,
  BranchesSection,
} from "@components";

export default function Home() {
  return (
    <main className='overflow-hidden'>
      {/* Hero Section - Full viewport */}
      <HeroSection />

      {/* Search Bar overlapping hero */}
      <HomeSearchBar />

      {/* Featured Vehicles */}
      <FeaturedVehicles />

      {/* Why Bingwa Magari */}
      <WhyBingwa />

      {/* Stats Counter */}
      <StatsSection />

      {/* Sell Your Car Banner */}
      <SellYourCarBanner />

      {/* Branches */}
      <BranchesSection />
    </main>
  );
}
