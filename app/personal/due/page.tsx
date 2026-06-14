'use client';

import { useState, useEffect } from 'react';
import { 
  FiArrowUpRight, FiLayers, FiCheck, FiCalendar, FiArrowLeft, 
  FiSearch, FiFilter, FiActivity, FiCheckCircle, FiTrendingUp 
} from 'react-icons/fi';

export default function LuxuryLedger() {
  const [data, setData] = useState<any[]>([]);
  const [totalOutstanding, setTotalOutstanding] = useState<number>(0);
  const [totalSettled, setTotalSettled] = useState<number>(0);
  const [recoveryRate, setRecoveryRate] = useState<number>(0);
  
  // Form and Interaction States
  const [debtorName, setDebtorName] = useState('');
  const [amount, setAmount] = useState('');
  const [verificationPin, setVerificationPin] = useState('');
  const [activeRecordId, setActiveRecordId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'All' | 'Unpaid' | 'Paid'>('All');

  // Fetch Matrix
  const fetchLedgerMatrix = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/due');
      const result = await response.json();
      if (result.success) {
        // Unpaid upore ebong Paid niche thakar sorting logic
        const sortedData = [...result.data].sort((a, b) => {
          if (a.status === 'Unpaid' && b.status === 'Paid') return -1;
          if (a.status === 'Paid' && b.status === 'Unpaid') return 1;
          return b.id - a.id;
        });
        
        setData(sortedData);
        setTotalOutstanding(result.totalDue);

        // Advance Analytics Calculation
        const paidSum = result.data
          .filter((item: any) => item.status === 'Paid')
          .reduce((sum: number, item: any) => sum + item.amount, 0);
        
        setTotalSettled(paidSum);

        const totalVolume = result.totalDue + paidSum;
        const rate = totalVolume > 0 ? (paidSum / totalVolume) * 100 : 0;
        setRecoveryRate(Math.round(rate));
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

  // Submit Handler
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
      } else {
        alert(result.error || 'Submission failed');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Settle Handler
  const handleClearBalance = async (item: any) => {
    if (!verificationPin) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/due', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'MARK_PAID', 
          rowIndex: item.rowIndex,
          pin: verificationPin 
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setVerificationPin('');
        setActiveRecordId(null);
        await fetchLedgerMatrix();
      } else {
        alert(result.error || 'Access Denied: Invalid Authentication Token');
        setVerificationPin('');
      }
    } catch (error) {
      console.error(error);
      alert('Network transmission failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Live Filtering Mechanism
  const filteredData = data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = filterTab === 'All' ? true : item.status === filterTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 md:p-6 font-sans tracking-tight antialiased select-none">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Minimalist Editorial Header */}
        <header className="pt-4 border-b border-zinc-900 pb-5 flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400/70'}`}></span>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">Statement Index</p>
            </div>
            <h1 className="text-xl font-light tracking-wide text-zinc-200">VALOIS <span className="font-serif italic text-zinc-400">Ledger</span></h1>
          </div>
          
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-medium">Registry Status</p>
            <p className="text-xs font-mono font-light text-zinc-400 mt-1">
              {isLoading ? 'Syncing...' : 'Encrypted Connection'}
            </p>
          </div>
        </header>

        {/* Executive Dashboard Metrics Grid */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-[#0e0e11] border border-zinc-900 rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-1 text-zinc-500">
              <FiActivity className="w-3 h-3 text-rose-500/70" />
              <p className="text-[8px] uppercase tracking-wider font-medium">Outstanding</p>
            </div>
            <p className="text-xs font-mono font-medium text-rose-400">৳{totalOutstanding.toLocaleString()}</p>
          </div>

          <div className="bg-[#0e0e11] border border-zinc-900 rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-1 text-zinc-500">
              <FiCheckCircle className="w-3 h-3 text-emerald-500/70" />
              <p className="text-[8px] uppercase tracking-wider font-medium">Settled Sum</p>
            </div>
            <p className="text-xs font-mono font-medium text-emerald-400">৳{totalSettled.toLocaleString()}</p>
          </div>

          <div className="bg-[#0e0e11] border border-zinc-900 rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-1 text-zinc-500">
              <FiTrendingUp className="w-3 h-3 text-amber-500/70" />
              <p className="text-[8px] uppercase tracking-wider font-medium">Recovery</p>
            </div>
            <p className="text-xs font-mono font-medium text-amber-400">{recoveryRate}%</p>
          </div>
        </div>

        {/* Form Panel - Clean Border Box */}
        <section className="bg-[#0e0e11] border border-zinc-900 rounded-xl p-5 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-400">
            <FiLayers className="w-3.5 h-3.5 text-zinc-500" />
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">Record Entry</h2>
          </div>
          
          <form onSubmit={handleCommitRecord} className="space-y-3">
            <input 
              type="text" 
              placeholder="Entity / Client Identifier" 
              value={debtorName}
              disabled={isLoading}
              onChange={(e) => setDebtorName(e.target.value)}
              className="w-full bg-[#050507] border border-zinc-900 rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-zinc-700 text-zinc-200 placeholder-zinc-800 transition-colors disabled:opacity-40"
            />
            <input 
              type="number" 
              placeholder="Principal Value (BDT)" 
              value={amount}
              disabled={isLoading}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-[#050507] border border-zinc-900 rounded-lg px-4 py-3 text-xs focus:outline-none focus:border-zinc-700 text-zinc-200 placeholder-zinc-800 transition-colors disabled:opacity-40 font-mono"
            />
            <button 
              type="submit" 
              disabled={isLoading || !debtorName || !amount}
              className="w-full bg-zinc-100 hover:bg-white disabled:bg-zinc-900 text-zinc-950 disabled:text-zinc-700 font-medium py-3 rounded-lg transition-all text-xs tracking-wider uppercase shadow-sm flex items-center justify-center gap-1.5"
            >
              Commit Statement <FiArrowUpRight className="w-3 h-3" />
            </button>
          </form>
        </section>

        {/* Live Filter Control Module */}
        <div className="space-y-2.5">
          {/* Minimalist Search Bar */}
          <div className="relative flex items-center">
            <FiSearch className="absolute left-3.5 text-zinc-600 w-3.5 h-3.5" />
            <input 
              type="text"
              placeholder="Search active statement registries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0e0e11] border border-zinc-900 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-zinc-800 text-zinc-200 placeholder-zinc-700 transition-colors"
            />
          </div>

          {/* Tab Filter System */}
          <div className="flex gap-1.5 bg-[#0e0e11]/50 border border-zinc-900 p-1 rounded-lg">
            {(['All', 'Unpaid', 'Paid'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`flex-1 text-center py-1.5 text-[10px] uppercase font-medium tracking-wider rounded-md transition-all ${
                  filterTab === tab 
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Statement Records Stream */}
        <section className="space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500">Activity Registry</h2>
            <span className="text-[9px] font-mono text-zinc-600 bg-zinc-950 border border-zinc-900 px-2 py-0.5 rounded-md">
              {filteredData.length} Fields Match
            </span>
          </div>
          
          <div className="space-y-2 max-h-[38vh] overflow-y-auto pr-1 custom-scrollbar">
            {filteredData.map((item) => {
              const isPaid = item.status === 'Paid';
              return (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-xl border transition-all duration-300 flex justify-between items-center ${
                    isPaid 
                      ? 'bg-transparent border-dashed border-zinc-900 opacity-25' 
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
                            className="text-[10px] text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 px-2.5 py-1 rounded border border-zinc-800 transition-all font-medium uppercase tracking-wider"
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
                              disabled={isLoading}
                              onChange={(e) => setVerificationPin(e.target.value)}
                              className="w-10 bg-transparent text-center text-xs focus:outline-none text-zinc-200 font-mono tracking-widest placeholder-zinc-800 disabled:opacity-40"
                            />
                            <button 
                              onClick={() => handleClearBalance(item)}
                              disabled={isLoading || verificationPin.length < 4}
                              className="text-zinc-400 hover:text-emerald-400 p-1 disabled:opacity-30"
                              title="Confirm"
                            >
                              <FiCheck className="w-3 h-3" />
                            </button>
                            <button 
                              onClick={() => setActiveRecordId(null)} 
                              disabled={isLoading}
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

            {filteredData.length === 0 && !isLoading && (
              <div className="text-center text-[10px] uppercase tracking-widest text-zinc-600 py-10 font-medium">
                No matching archival statements found.
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
