import { statusColor, statusDotColor, statusLabel } from "@utils";

interface VehicleStatusBadgeProps {
  status: string;
}

const VehicleStatusBadge = ({ status }: VehicleStatusBadgeProps) => {
  return (
    <span className={`status-badge ${statusColor(status)}`}>
      <span className={`w-2 h-2 rounded-full ${statusDotColor(status)}`} />
      {statusLabel(status)}
    </span>
  );
};

export default VehicleStatusBadge;
