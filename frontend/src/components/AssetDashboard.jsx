//AssetDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
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
import Navbar from "./components/Navbar";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AssetDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Step 1: Check token in URL and save to localStorage
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("jwt_token", token);
      const decoded = jwt_decode(token);
      setUserEmail(decoded.email || "");
    } else {
      const saved = localStorage.getItem("jwt_token");
      if (saved) {
        const decoded = jwt_decode(saved);
        setUserEmail(decoded.email || "");
      }
    }
  }, []);

  useEffect(() => {
    const fetchAssets = async () => {
      const token = localStorage.getItem("jwt_token");
      if (!token || !userEmail) return;

      try {
        const res = await axios.get(`http://localhost:8080/api/assets?email=${userEmail}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssets(res.data);
      } catch (err) {
        console.error("Error fetching assets:", err);
      }
    };

    fetchAssets();
  }, [userEmail]);

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
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-10 space-y-10 font-sans">
        <h2 className="text-3xl font-bold text-gray-800">
          🎉 Welcome, <span className="text-blue-600">{userEmail}</span>!
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">📊 Asset Distribution</h3>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                Add
              </button>
            </div>
            <div className="flex justify-center">
              <div className="w-[300px] md:w-[400px]">
                <Pie data={pieData} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">📈 Asset Value</h3>
              <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
                Export
              </button>
            </div>
            <div className="w-full h-[300px]">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">📋 Asset Details</h3>
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
              Refresh
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 font-medium">Type</th>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Amount</th>
                  <th className="p-3 font-medium">Price</th>
                  <th className="p-3 font-medium">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((a) => (
                  <tr key={a.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{a.type}</td>
                    <td className="p-3">{a.name}</td>
                    <td className="p-3">{a.amount}</td>
                    <td className="p-3">${a.currentPrice.toFixed(2)}</td>
                    <td className="p-3">${totalValue(a).toFixed(2)}</td>
                  </tr>
                ))}
                {assets.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">
                      No assets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssetDashboard;
