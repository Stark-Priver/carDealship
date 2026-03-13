import DashboardSidebar from "@components/layout/DashboardSidebar";
import { requireAppSession } from "@lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireAppSession();

  return (
    <div className='pt-[68px] min-h-screen bg-surface-base'>
      <DashboardSidebar role={session.role} fullName={session.fullName} />
      <div className='lg:ml-[260px] transition-all duration-200'>
        <div className='p-6 sm:p-8 max-w-[1400px] mx-auto'>
          {children}
        </div>
      </div>
    </div>
  );
}
