import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AssetDashboard = ({ username }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/assets?userId=${username}`);
        setAssets(res.data);
      } catch (err) {
        console.error("Error fetching assets:", err);
      }
    };
    fetchAssets();
  }, [username]);

  const totalValue = (asset) => asset.amount * asset.currentPrice;

  const pieData = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        data: assets.map((a) => totalValue(a)),
        backgroundColor: ["#60a5fa", "#34d399", "#f87171", "#facc15", "#a78bfa"],
      },
    ],
  };

  const barData = {
    labels: assets.map((a) => a.name),
    datasets: [
      {
        label: "Value ($)",
        data: assets.map((a) => totalValue(a)),
        backgroundColor: "#60a5fa",
      },
    ],
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
  {/* Pie Chart */}
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
    <h3 className="text-lg font-semibold mb-4 self-start">📊 Asset Distribution</h3>
    <div className="w-full h-64">
      <Pie
        data={pieData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  </div>

  {/* Bar Chart */}
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
    <h3 className="text-lg font-semibold mb-4 self-start">📈 Asset Value</h3>
    <div className="w-full h-64">
      <Bar
        data={barData}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  </div>
</div>

  );
};

export default AssetDashboard;
