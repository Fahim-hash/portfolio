'use client';

import { useState, useEffect } from 'react';
import { FiDollarSign, FiPlusCircle, FiCheckCircle, FiClock, FiX } from 'react-icons/fi';

export default function MoneyTracker() {
  const [data, setData] = useState<any[]>([]);
  const [totalDue, setTotalDue] = useState<number>(0);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // API theke data fetch kora
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/due');
      const result = await res.json();
      if (result.success) {
        // Unpaid upore ebong Paid niche thakar sorting logic
        const sortedData = [...result.data].sort((a, b) => {
          if (a.status === 'Unpaid' && b.status === 'Paid') return -1;
          if (a.status === 'Paid' && b.status === 'Unpaid') return 1;
          return b.id - a.id; // Id diye descending order (notun gulo upore)
        });
        
        setData(sortedData);
        setTotalDue(result.totalDue);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // New Data Add
  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return alert('Sob details dao!');

    try {
      setLoading(true);
      const res = await fetch('/api/due', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ADD_ENTRY', name, amount })
      });
      const result = await res.json();
      if (result.success) {
        setName('');
        setAmount('');
        await loadDashboardData();
      } else {
        alert(result.error || 'Failed to save');
      }
    } catch (err) {
      alert('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Status Change Request
  const handleVerifyAndPaid = async (item: any) => {
    const ADMIN_SECURE_PIN = "0024";

    if (pin !== ADMIN_SECURE_PIN) {
      alert("Wrong Secure PIN!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('/api/due', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'MARK_PAID', rowIndex: item.rowIndex })
      });
      const result = await res.json();
      if (result.success) {
        setPin('');
        setActiveId(null);
        await loadDashboardData();
      } else {
        alert(result.error || 'Failed to update');
      }
    } catch (err) {
      alert('Network error during status update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 font-sans select-none antialiased">
      <div className="max-w-md mx-auto space-y-5">
        
        {/* Header Dashboard Card */}
        <header className="bg-gray-900/80 backdrop-blur-md border border-gray-800/60 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Taka Tracker</h1>
              <p className="text-[11px] text-gray-400 font-medium">Smart Ledger Manager</p>
            </div>
            <div className="p-2.5 bg-teal-500/10 rounded-2xl border border-teal-500/20 text-teal-400">
              <FiDollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-5 bg-gray-950/40 border border-gray-800/80 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Total Unpaid Due</p>
              <p className="text-2xl font-black text-rose-400 mt-0.5">৳{totalDue.toLocaleString()}</p>
            </div>
            {loading && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
            )}
          </div>
        </header>

        {/* Input Form */}
        <section className="bg-gray-900/60 backdrop-blur-md border border-gray-800/60 p-5 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
            <FiPlusCircle className="w-4 h-4 text-teal-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Notun Entry Add Koro</h2>
          </div>
          
          <form onSubmit={handleAddEntry} className="space-y-3">
            <input 
              type="text" 
              placeholder="Kar kach theke paba (Name)" 
              value={name}
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800/80 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal-500/80 text-white placeholder-gray-600 transition-all disabled:opacity-50"
            />
            <input 
              type="number" 
              placeholder="Takar Poriman (Amount)" 
              value={amount}
              disabled={loading}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800/80 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-teal-500/80 text-white placeholder-gray-600 transition-all disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 disabled:from-gray-800 disabled:to-gray-800 text-gray-950 font-black py-3.5 rounded-2xl transition-all text-sm shadow-lg shadow-teal-500/5 active:scale-[0.99]"
            >
              Save to Google Sheet
            </button>
          </form>
        </section>

        {/* Dynamic List */}
        <section className="bg-gray-900/60 backdrop-blur-md border border-gray-800/60 p-5 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Transaction History</h2>
            <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full font-semibold">
              {data.length} Entries
            </span>
          </div>
          
          <div className="divide-y divide-gray-800/60 max-h-[45vh] overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
            {data.map((item) => {
              const isPaid = item.status === 'Paid';
              return (
                <div 
                  key={item.id} 
                  className={`p-3.5 rounded-2xl flex justify-between items-center transition-all ${
                    isPaid 
                      ? 'bg-gray-950/20 opacity-60 border border-transparent' 
                      : 'bg-gray-950/60 border border-gray-800/40 hover:border-gray-700/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-md">
                        #{item.id}
                      </span>
                      <p className={`font-semibold text-sm ${isPaid ? 'text-gray-400 line-through' : 'text-gray-100'}`}>
                        {item.name}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3 h-3 text-gray-600" /> {item.date}
                      </span>
                      <span className={`flex items-center gap-1 font-bold px-1.5 py-0.2 rounded ${
                        isPaid ? 'text-teal-400/80 bg-teal-500/5' : 'text-rose-400/80 bg-rose-500/5'
                      }`}>
                        {isPaid ? <FiCheckCircle className="w-2.5 h-2.5" /> : '•'} {item.status}
                      </span>
                    </div>
                    
                    <p className={`text-sm font-bold tracking-tight ${isPaid ? 'text-gray-500 line-through' : 'text-rose-400'}`}>
                      ৳{item.amount.toLocaleString()}
                    </p>
                  </div>
                  
                  {/* Paid Action Trigger */}
                  {!isPaid && (
                    <div>
                      {activeId !== item.id ? (
                        <button 
                          onClick={() => { setActiveId(item.id); setPin(''); }} 
                          disabled={loading}
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs px-3 py-2 rounded-xl font-bold border border-rose-500/20 active:scale-95 transition-all"
                        >
                          Paid?
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 bg-gray-950 p-1 rounded-xl border border-gray-800 shadow-inner animate-in fade-in zoom-in duration-100">
                          <input 
                            type="password" 
                            placeholder="PIN" 
                            maxLength={4}
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="w-12 bg-transparent text-center text-xs focus:outline-none text-white font-mono tracking-widest"
                          />
                          <button 
                            onClick={() => handleVerifyAndPaid(item)}
                            className="bg-gradient-to-r from-teal-500 to-emerald-500 text-gray-950 text-[10px] px-2.5 py-1.5 rounded-lg font-black"
                          >
                            OK
                          </button>
                          <button 
                            onClick={() => setActiveId(null)} 
                            className="text-gray-500 p-1 hover:text-white transition-colors"
                          >
                            <FiX className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {data.length === 0 && !loading && (
              <div className="text-center text-xs text-gray-500 py-8 font-medium">
                No transactions found in this sheet!
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
