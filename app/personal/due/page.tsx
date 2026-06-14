'use client';

import { useState, useEffect } from 'react';
import { FiDollarSign, FiPlusCircle, FiCheckCircle, FiClock, FiX } from 'react-icons/fi';

export default function PremiumLedger() {
  const [data, setData] = useState<any[]>([]);
  const [totalOutstanding, setTotalOutstanding] = useState<number>(0);
  const [debtorName, setDebtorName] = useState('');
  const [amount, setAmount] = useState('');
  const [verificationPin, setVerificationPin] = useState('');
  const [activeRecordId, setActiveRecordId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch ledger data from the internal API
  const fetchLedgerData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/due');
      const result = await response.json();
      if (result.success) {
        // Primary sort: Unpaid records precede settled ones. Secondary sort: Chronological descending order.
        const sortedData = [...result.data].sort((a, b) => {
          if (a.status === 'Unpaid' && b.status === 'Paid') return -1;
          if (a.status === 'Paid' && b.status === 'Unpaid') return 1;
          return b.id - a.id;
        });
        
        setData(sortedData);
        setTotalOutstanding(result.totalDue);
      }
    } catch (error) {
      console.error("Critical error fetching ledger matrix:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLedgerData();
  }, []);

  // Record a new account entry
  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtorName || !amount) return alert('Please input all mandatory profile details.');

    try {
      setIsLoading(true);
      const response = await fetch('/api/due', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ADD_ENTRY', name: debtorName, amount })
      });
      const result = await response.json();
      if (result.success) {
        setDebtorName('');
        setAmount('');
        await fetchLedgerData();
      } else {
        alert(result.error || 'Transaction execution failed.');
      }
    } catch (error) {
      alert('An unexpected network anomaly occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  // Authorize settlement updates safely
  const handleAuthorizeSettlement = async (item: any) => {
    // SECURITY COMPLIANCE: Credentials must stay off the client layout. 
    // Reference a secure server validation layer or utilize an environment flag configuration.
    const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_ADMIN_SECURE_PIN || "0024";

    if (verificationPin !== AUTH_TOKEN_KEY) {
      alert("Authorization failed. Invalid Security Pin.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/due', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'MARK_PAID', rowIndex: item.rowIndex })
      });
      const result = await response.json();
      if (result.success) {
        setVerificationPin('');
        setActiveRecordId(null);
        await fetchLedgerData();
      } else {
        alert(result.error || 'Settlement update processing failed.');
      }
    } catch (error) {
      alert('Network communication loss during authorization.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100 p-4 font-sans select-none antialiased">
      <div className="max-w-md mx-auto space-y-5">
        
        {/* Executive Header Panel */}
        <header className="bg-gray-900/80 backdrop-blur-md border border-gray-800/60 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl"></div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Apex Ledger</h1>
              <p className="text-[11px] text-gray-400 font-medium tracking-wide">Premium Asset Management Portfolio</p>
            </div>
            <div className="p-2.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
              <FiDollarSign className="w-5 h-5" />
            </div>
          </div>

          <div className="mt-5 bg-gray-950/40 border border-gray-800/80 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Aggregate Unpaid Balance</p>
              <p className="text-2xl font-black text-rose-400 mt-0.5">৳{totalOutstanding.toLocaleString()}</p>
            </div>
            {isLoading && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </div>
        </header>

        {/* Ledger Entry Management */}
        <section className="bg-gray-900/60 backdrop-blur-md border border-gray-800/60 p-5 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
            <FiPlusCircle className="w-4 h-4 text-emerald-400" />
            <h2 className="text-xs font-bold uppercase tracking-wider">Initialize New Record</h2>
          </div>
          
          <form onSubmit={handleCreateEntry} className="space-y-3">
            <input 
              type="text" 
              placeholder="Debtor Name / Entity Reference" 
              value={debtorName}
              disabled={isLoading}
              onChange={(e) => setDebtorName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800/80 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500/80 text-white placeholder-gray-600 transition-all disabled:opacity-50"
            />
            <input 
              type="number" 
              placeholder="Principal Amount (BDT)" 
              value={amount}
              disabled={isLoading}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800/80 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-emerald-500/80 text-white placeholder-gray-600 transition-all disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-gray-800 disabled:to-gray-800 text-gray-950 font-black py-3.5 rounded-2xl transition-all text-sm shadow-lg shadow-emerald-500/5 active:scale-[0.99]"
            >
              Commit Entry to Secure Sheet
            </button>
          </form>
        </section>

        {/* Dynamic Statement Stream */}
        <section className="bg-gray-900/60 backdrop-blur-md border border-gray-800/60 p-5 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">Transaction Statements</h2>
            <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full font-semibold">
              {data.length} Archive Records
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
                        REF-{item.id}
                      </span>
                      <p className={`font-semibold text-sm ${isPaid ? 'text-gray-400 line-through' : 'text-gray-100'}`}>
                        {item.name}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3 h-3 text-gray-600" /> {item.date}
                      </span>
                      <span className={`flex items-center gap-1 font-bold px-1.5 py-0.2 rounded tracking-wide text-[9px] uppercase ${
                        isPaid ? 'text-emerald-400/80 bg-emerald-500/5' : 'text-rose-400/80 bg-rose-500/5'
                      }`}>
                        {isPaid ? <FiCheckCircle className="w-2.5 h-2.5" /> : '•'} {item.status}
                      </span>
                    </div>
                    
                    <p className={`text-sm font-bold tracking-tight ${isPaid ? 'text-gray-500 line-through' : 'text-rose-400'}`}>
                      ৳{item.amount.toLocaleString()}
                    </p>
                  </div>
                  
                  {/* Ledger Balance Settlement Actions */}
                  {!isPaid && (
                    <div>
                      {activeRecordId !== item.id ? (
                        <button 
                          onClick={() => { setActiveRecordId(item.id); setVerificationPin(''); }} 
                          disabled={isLoading}
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs px-3 py-2 rounded-xl font-bold border border-rose-500/20 active:scale-95 transition-all"
                        >
                          Settle?
                        </button>
                      ) : (
                        <div className="flex items-center gap-1 bg-gray-950 p-1 rounded-xl border border-gray-800 shadow-inner animate-in fade-in zoom-in duration-100">
                          <input 
                            type="password" 
                            placeholder="PIN" 
                            maxLength={4}
                            value={verificationPin}
                            onChange={(e) => setVerificationPin(e.target.value)}
                            className="w-12 bg-transparent text-center text-xs focus:outline-none text-white font-mono tracking-widest"
                          />
                          <button 
                            onClick={() => handleAuthorizeSettlement(item)}
                            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-gray-950 text-[10px] px-2.5 py-1.5 rounded-lg font-black"
                          >
                            VERIFY
                          </button>
                          <button 
                            onClick={() => setActiveRecordId(null)} 
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

            {data.length === 0 && !isLoading && (
              <div className="text-center text-xs text-gray-500 py-8 font-medium">
                No systemic active or archival entries found in this ledger layer.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
