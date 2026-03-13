import { requireAnyRole } from "@lib/auth";
import { createClient } from "@lib/supabase/server";

type BranchItem = {
  id: string;
  name: string;
  address: string;
  phone: string;
};

type VehicleMetricItem = {
  branch_id: string;
  status: "AVAILABLE" | "RESERVED" | "SOLD";
};

type StaffMetricItem = {
  id: string;
  branch_id: string | null;
  role: "ADMIN" | "STAFF";
};

export default async function BranchesPage() {
  await requireAnyRole(["ADMIN", "STAFF"]);
  const supabase = createClient();

  const { data: branches } = await supabase.from("branches").select("*").order("name", { ascending: true });
  const { data: vehicles } = await supabase.from("vehicles").select("branch_id, status");
  const { data: staff } = await supabase.from("profiles").select("id, branch_id, role").in("role", ["ADMIN", "STAFF"]);

  const branchList = (branches ?? []) as BranchItem[];
  const vehicleList = (vehicles ?? []) as VehicleMetricItem[];
  const staffList = (staff ?? []) as StaffMetricItem[];

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Branches</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {branchList.map((branch) => {
          const branchVehicles = vehicleList.filter((v) => v.branch_id === branch.id);
          const available = branchVehicles.filter((v) => v.status === "AVAILABLE").length;
          const reserved = branchVehicles.filter((v) => v.status === "RESERVED").length;
          const sold = branchVehicles.filter((v) => v.status === "SOLD").length;
          const branchStaff = staffList.filter((person) => person.branch_id === branch.id).length;

          return (
            <div key={branch.id} className='dashboard-card'>
              <h3 className='font-semibold text-lg text-text-brand-primary'>{branch.name}</h3>
              <p className='text-sm text-text-brand-muted mt-1'>{branch.address}</p>
              <p className='text-sm text-text-brand-muted'>{branch.phone}</p>

              <div className='grid grid-cols-2 gap-3 mt-4'>
                <div className='bg-surface-muted rounded-lg p-3'>
                  <p className='text-xs text-text-brand-muted'>Staff</p>
                  <p className='text-xl font-mono font-bold'>{branchStaff}</p>
                </div>
                <div className='bg-surface-muted rounded-lg p-3'>
                  <p className='text-xs text-text-brand-muted'>Available</p>
                  <p className='text-xl font-mono font-bold text-brand-accent'>{available}</p>
                </div>
                <div className='bg-surface-muted rounded-lg p-3'>
                  <p className='text-xs text-text-brand-muted'>Reserved</p>
                  <p className='text-xl font-mono font-bold text-status-warning'>{reserved}</p>
                </div>
                <div className='bg-surface-muted rounded-lg p-3'>
                  <p className='text-xs text-text-brand-muted'>Sold</p>
                  <p className='text-xl font-mono font-bold text-status-success'>{sold}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
