import DestinationList from "./destination/destination-list";
import "./index.css";


export default function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Moje Cestovatelská Aplikace</h2>
      <DestinationList />
    </div>
  );
}
