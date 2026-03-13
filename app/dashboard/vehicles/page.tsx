import Link from "next/link";

import { requireAnyRole } from "@lib/auth";
import { getVehicles } from "@lib/data";
import VehicleStatusBadge from "@components/vehicles/VehicleStatusBadge";
import { formatMileage, formatStock, formatTZS } from "@utils";

interface DashboardVehiclesPageProps {
  searchParams: {
    q?: string;
    status?: string;
    success?: string;
  };
}

export default async function DashboardVehiclesPage({ searchParams }: DashboardVehiclesPageProps) {
  await requireAnyRole(["ADMIN", "STAFF"]);
  const vehicles = await getVehicles();

  const filtered = vehicles.filter((v) => {
    const q = (searchParams.q || "").toLowerCase();
    const matchesQ =
      !q ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.stockNumber.toLowerCase().includes(q);
    const matchesStatus = !searchParams.status || searchParams.status === "ALL" || v.status === searchParams.status;
    return matchesQ && matchesStatus;
  });

  return (
    <div>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
        <h1 className='text-2xl font-bold text-text-brand-primary'>Vehicles Inventory</h1>
        <Link href='/dashboard/vehicles/add' className='bg-brand-accent text-white px-5 py-2.5 rounded-xl font-medium'>
          Add Vehicle
        </Link>
      </div>

      {searchParams.success && (
        <p className='mb-4 rounded-lg bg-green-50 text-green-700 px-4 py-2 text-sm'>{searchParams.success}</p>
      )}

      <form className='dashboard-card mb-6 grid grid-cols-1 sm:grid-cols-[1fr_220px_auto] gap-3'>
        <input name='q' defaultValue={searchParams.q || ""} className='form-input' placeholder='Search vehicles' />
        <select name='status' defaultValue={searchParams.status || "ALL"} className='form-select'>
          <option value='ALL'>All Status</option>
          <option value='AVAILABLE'>Available</option>
          <option value='RESERVED'>Reserved</option>
          <option value='SOLD'>Sold</option>
        </select>
        <button type='submit' className='px-4 py-2 rounded-lg border border-[var(--border-default)]'>Apply</button>
      </form>

      <div className='dashboard-card overflow-x-auto'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Stock #</th>
              <th>Vehicle</th>
              <th>Price</th>
              <th>Mileage</th>
              <th>Branch</th>
              <th>Status</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((v) => (
              <tr key={v.id}>
                <td className='font-mono text-xs'>{formatStock(v.stockNumber)}</td>
                <td className='font-medium'>{v.year} {v.make} {v.model}</td>
                <td className='font-mono text-sm'>{formatTZS(v.price)}</td>
                <td>{formatMileage(v.mileage)}</td>
                <td>{v.branch}</td>
                <td><VehicleStatusBadge status={v.status} /></td>
                <td><Link href={`/vehicles/${v.id}`} className='text-brand-accent hover:underline'>Open</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
