import React from 'react';
import axios from 'axios';
import { Gpu } from '../types';

function GpuList({ gpus, loading, error, fetchGpus }: { gpus: Gpu[], loading: boolean, error: string, fetchGpus: () => void }) {

  const placeBid = async (gpuId: string, amount: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5004/api/gpus/${gpuId}/bid`,
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGpus(); // Trigger re-fetch of GPU list
    } catch (err: any) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {gpus.map((gpu) => (
        <div key={gpu._id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{gpu.model}</h3>
          <p className="text-gray-600 mb-4">{gpu.description}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">
              Current Bid: ${gpu.currentBid?.amount || gpu.startingPrice}
            </span>
          </div>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Bid amount"
              className="flex-1 p-2 border rounded"
              min={gpu.currentBid?.amount ? gpu.currentBid.amount + 1 : gpu.startingPrice}
              onChange={(e) => {
                if (e.target.value && Number(e.target.value) > 0) {
                  placeBid(gpu._id, Number(e.target.value));
                }
              }}
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => {
                const amount = gpu.currentBid?.amount
                  ? gpu.currentBid.amount + 1
                  : gpu.startingPrice;
                placeBid(gpu._id, amount);
              }}
            >
              Place Bid
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GpuList;