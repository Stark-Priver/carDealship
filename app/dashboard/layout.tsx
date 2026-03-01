import DashboardSidebar from "@components/layout/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='pt-[68px] min-h-screen bg-surface-base'>
      <DashboardSidebar />
      <div className='lg:ml-[260px] transition-all duration-200'>
        <div className='p-6 sm:p-8 max-w-[1400px] mx-auto'>
          {children}
        </div>
      </div>
    </div>
  );
}
