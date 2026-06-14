'use client';

import { useState, useEffect } from 'react';
import { FiArrowUpRight, FiLayers, FiCheck, FiLock, FiCalendar, FiArrowLeft } from 'react-icons/fi';

export default function LuxuryLedger() {
  const [data, setData] = useState<any[]>([]);
  const [totalOutstanding, setTotalOutstanding] = useState<number>(0);
  const [debtorName, setDebtorName] = useState('');
  const [amount, setAmount] = useState('');
  const [verificationPin, setVerificationPin] = useState('');
  const [activeRecordId, setActiveRecordId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLedgerMatrix = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/due');
      const result = await response.json();
      if (result.success) {
        const sortedData = [...result.data].sort((a, b) => {
          if (a.status === 'Unpaid' && b.status === 'Paid') return -1;
          if (a.status === 'Paid' && b.status === 'Unpaid') return 1;
          return b.id - a.id;
        });
        
        setData(sortedData);
        setTotalOutstanding(result.totalDue);
      }
    } catch (error) {
      console.error("Systemic archival retrieval exception:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLedgerMatrix();
  }, []);

  const handleCommitRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!debtorName || !amount) return;

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
        await fetchLedgerMatrix();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearBalance = async (item: any) => {
    const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_ADMIN_SECURE_PIN || "0024";

    if (verificationPin !== AUTH_TOKEN_KEY) {
      setVerificationPin('');
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
        await fetchLedgerMatrix();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 font-sans tracking-tight antialiased select-none">
      <div className="max-w-md mx-auto space-y-8">
        
        {/* Minimalist Editorial Header */}
        <header className="pt-4 border-b border-zinc-900 pb-6 flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70"></span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">Statement Index</p>
            </div>
            <h1 className="text-xl font-light tracking-wide text-zinc-200">VALOIS <span className="font-serif italic text-zinc-400">Ledger</span></h1>
          </div>
          
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-medium">Outstanding Aggregate</p>
            <p className="text-xl font-light text-zinc-100 font-mono mt-0.5">
              ৳{totalOutstanding.toLocaleString()}
            </p>
          </div>
        </header>

        {/* Form Panel - Clean Border Box */}
        <section className="bg-[#0e0e11] border border-zinc-900 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-400">
            <FiLayers className="w-3.5 h-3.5 text-zinc-500" />
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Record Entry</h2>
          </div>
          
          <form onSubmit={handleCommitRecord} className="space-y-3">
            <div className="space-y-1">
              <input 
                type="text" 
                placeholder="Entity / Client Identifier" 
                value={debtorName}
                disabled={isLoading}
                onChange={(e) => setDebtorName(e.target.value)}
                className="w-full bg-[#050507] border border-zinc-900 rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-zinc-700 text-zinc-200 placeholder-zinc-700 transition-colors disabled:opacity-40"
              />
            </div>
            <div className="space-y-1">
              <input 
                type="number" 
                placeholder="Principal Value (BDT)" 
                value={amount}
                disabled={isLoading}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-[#050507] border border-zinc-900 rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-zinc-700 text-zinc-200 placeholder-zinc-700 transition-colors disabled:opacity-40 font-mono"
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading || !debtorName || !amount}
              className="w-full bg-zinc-100 hover:bg-white disabled:bg-zinc-900 text-zinc-950 disabled:text-zinc-700 font-medium py-3 rounded-lg transition-all text-xs tracking-wider uppercase shadow-sm flex items-center justify-center gap-1.5"
            >
              Commit Statement <FiArrowUpRight className="w-3 h-3" />
            </button>
          </form>
        </section>

        {/* Statement Records Stream */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Activity Registry</h2>
            <span className="text-[9px] font-mono text-zinc-600 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded-md">
              {data.length} Fields
            </span>
          </div>
          
          <div className="space-y-2 max-h-[42vh] overflow-y-auto pr-1 custom-scrollbar">
            {data.map((item) => {
              const isPaid = item.status === 'Paid';
              return (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-xl border transition-all duration-300 flex justify-between items-center ${
                    isPaid 
                      ? 'bg-transparent border-dashed border-zinc-900 opacity-40' 
                      : 'bg-[#0e0e11] border-zinc-900/80 hover:border-zinc-800'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono text-zinc-600">
                        [{String(item.id).padStart(3, '0')}]
                      </span>
                      <p className={`text-xs font-medium tracking-wide ${isPaid ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}>
                        {item.name}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 font-normal">
                      <span className="flex items-center gap-1 font-mono text-[9px] text-zinc-600">
                        <FiCalendar className="w-2.5 h-2.5" /> {item.date}
                      </span>
                      <span className={`text-[9px] uppercase tracking-wider font-semibold ${
                        isPaid ? 'text-zinc-600' : 'text-amber-400/70'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex items-center gap-4">
                    <p className={`text-xs font-mono font-medium ${isPaid ? 'text-zinc-600 line-through' : 'text-zinc-200'}`}>
                      ৳{item.amount.toLocaleString()}
                    </p>
                    
                    {!isPaid && (
                      <div className="h-6 flex items-center">
                        {activeRecordId !== item.id ? (
                          <button 
                            onClick={() => { setActiveRecordId(item.id); setVerificationPin(''); }} 
                            disabled={isLoading}
                            className="text-[10px] text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-850 px-2.5 py-1 rounded border border-zinc-800 transition-all font-medium uppercase tracking-wider"
                          >
                            Settle
                          </button>
                        ) : (
                          <div className="flex items-center bg-[#050507] px-1.5 py-0.5 rounded-md border border-zinc-800 animate-in fade-in slide-in-from-right-2 duration-200">
                            <input 
                              type="password" 
                              placeholder="••••" 
                              maxLength={4}
                              value={verificationPin}
                              onChange={(e) => setVerificationPin(e.target.value)}
                              className="w-10 bg-transparent text-center text-xs focus:outline-none text-zinc-200 font-mono tracking-widest placeholder-zinc-800"
                            />
                            <button 
                              onClick={() => handleClearBalance(item)}
                              className="text-zinc-400 hover:text-emerald-400 p-1"
                              title="Confirm"
                            >
                              <FiCheck className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={() => setActiveRecordId(null)} 
                              className="text-zinc-600 hover:text-zinc-400 p-1"
                            >
                              <FiArrowLeft className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {data.length === 0 && !isLoading && (
              <div className="text-center text-[10px] uppercase tracking-widest text-zinc-600 py-10 font-medium">
                No ledger balance sheets recorded.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
