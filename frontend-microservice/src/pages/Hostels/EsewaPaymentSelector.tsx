import React, { useState, useEffect } from 'react';

const months = [
  { name: 'January', value: 1 },
  { name: 'February', value: 2 },
  { name: 'March', value: 3 },
  { name: 'April', value: 4 },
  { name: 'May', value: 5 },
  { name: 'June', value: 6 },
  { name: 'July', value: 7 },
  { name: 'August', value: 8 },
  { name: 'September', value: 9 },
  { name: 'October', value: 10 },
  { name: 'November', value: 11 },
  { name: 'December', value: 12 },
];

const EsewaPaymentSelector = () => {
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [customPrice, setCustomPrice] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

  // Use useEffect to calculate total whenever selectedMonths or customPrice changes
  useEffect(() => {
    const monthlyRate = parseFloat(customPrice) || 0;
    const total = selectedMonths.length * monthlyRate;
    setTotalAmount(total);
  }, [selectedMonths, customPrice]);

  const handleMonthToggle = (month) => {
    setSelectedMonths(
      (prev) =>
        prev.includes(month)
          ? prev.filter((m) => m !== month) // Remove month if already selected
          : [...prev, month] // Add month if not selected
    );
  };

  const handlePayWithEsewa = () => {
    // Here you would integrate actual ESewa payment gateway
    if (totalAmount > 0) {
      alert(`Proceeding to pay NPR ${totalAmount.toFixed(2)} via ESewa`);
      // Implement actual ESewa payment integration
    } else {
      alert('Please select months and set a price');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        ESewa Payment Selector
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          Monthly Price (NPR)
        </label>
        <input
          type="number"
          value={customPrice}
          onChange={(e) => setCustomPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter monthly price"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Select Months</h3>
        <div className="grid grid-cols-3 gap-2">
          {months.map((month) => (
            <button
              key={month.name}
              onClick={() => handleMonthToggle(month.name)}
              className={`py-2 px-3 rounded-lg transition-colors ${
                selectedMonths.includes(month.name)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-green-100'
              }`}
            >
              {month.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 text-center">
        <p className="text-xl font-bold">
          Selected Months: {selectedMonths.length}
        </p>
        <p className="text-xl font-bold text-green-600">
          Total Amount: NPR {totalAmount.toFixed(2)}
        </p>
      </div>

      <button
        onClick={handlePayWithEsewa}
        className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-bold"
      >
        Pay with ESewa
      </button>
    </div>
  );
};

export default EsewaPaymentSelector;
