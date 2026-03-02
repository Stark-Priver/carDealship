import {
  HeroSection,
  HomeSearchBar,
  FeaturedVehicles,
  WhyBingwa,
  StatsSection,
  KuagizaBanner,
  SellYourCarBanner,
  BranchesSection,
  SocialReels,
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

      {/* Kuagiza - Import Banner */}
      <KuagizaBanner />

      {/* Why Bingwa Magari */}
      <WhyBingwa />

      {/* Stats Counter */}
      <StatsSection />

      {/* Social Media Reels */}
      <SocialReels />

      {/* Sell Your Car Banner */}
      <SellYourCarBanner />

      {/* Branches */}
      <BranchesSection />
    </main>
  );
}
