import { createBranch, updateBranch } from "@app/actions";
import { requireAnyRole } from "@lib/auth";
import { createClient } from "@lib/supabase/server";

type BranchItem = {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  upcoming: boolean;
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

      <form action={createBranch} className='dashboard-card mb-6'>
        <h3 className='font-semibold text-text-brand-primary mb-3'>Add Branch</h3>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3'>
          <input name='name' required className='form-input' placeholder='Name' />
          <input name='city' required className='form-input' placeholder='City' />
          <input name='address' required className='form-input' placeholder='Address' />
          <input name='phone' required className='form-input' placeholder='Phone' />
          <label className='flex items-center gap-2 text-sm'>
            <input type='checkbox' name='upcoming' />
            Upcoming
          </label>
        </div>
        <button type='submit' className='mt-3 px-4 py-2 rounded-lg bg-brand-accent text-white text-sm'>
          Create Branch
        </button>
      </form>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {branchList.map((branch) => {
          const branchVehicles = vehicleList.filter((v) => v.branch_id === branch.id);
          const available = branchVehicles.filter((v) => v.status === "AVAILABLE").length;
          const reserved = branchVehicles.filter((v) => v.status === "RESERVED").length;
          const sold = branchVehicles.filter((v) => v.status === "SOLD").length;
          const branchStaff = staffList.filter((person) => person.branch_id === branch.id).length;

          return (
            <div key={branch.id} className='dashboard-card'>
              <form action={updateBranch} className='space-y-2'>
                <input type='hidden' name='id' value={branch.id} />
                <input name='name' defaultValue={branch.name} className='form-input' />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                  <input name='city' defaultValue={branch.city} className='form-input' />
                  <input name='phone' defaultValue={branch.phone} className='form-input' />
                </div>
                <input name='address' defaultValue={branch.address} className='form-input' />
                <label className='flex items-center gap-2 text-sm'>
                  <input type='checkbox' name='upcoming' defaultChecked={branch.upcoming} />
                  Upcoming
                </label>
                <button type='submit' className='px-3 py-2 rounded-lg border border-[var(--border-default)] text-sm'>
                  Save Branch
                </button>
              </form>

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
