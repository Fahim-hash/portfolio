'use client';

import { useState, useEffect } from 'react';
import { 
  FiArrowUpRight, FiLayers, FiCheck, FiCalendar, FiArrowLeft, 
  FiSearch, FiFilter, FiActivity, FiCheckCircle, FiTrendingUp,
  FiPlusCircle, FiMinusCircle
} from 'react-icons/fi';

export default function LuxuryLedger() {
  const [data, setData] = useState<any[]>([]);
  const [totalOutstanding, setTotalOutstanding] = useState<number>(0); // Taka pabo
  const [totalPayable, setTotalPayable] = useState<number>(0);     // Taka dibo
  const [totalSettled, setTotalSettled] = useState<number>(0);
  const [recoveryRate, setRecoveryRate] = useState<number>(0);

  // Form and Interaction States
  const [debtorName, setDebtorName] = useState('');
  const [amount, setAmount] = useState('');
  const [ledgerType, setLedgerType] = useState<'YOU_GET' | 'YOU_GIVE'>('YOU_GET'); // Plus/Minus Selection
  
  // Partial Payment State
  const [partialAmount, setPartialAmount] = useState('');
  const [verificationPin, setVerificationPin] = useState('');
  const [activeRecordId, setActiveRecordId] = useState<number | null>(null);
  const [settleMode, setSettleMode] = useState<'CHOOSE' | 'PARTIAL' | 'FULL'>('CHOOSE');
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
        // Sorting logic: Unpaid first, then Paid
        const sortedData = [...result.data].sort((a, b) => {
          if (a.status === 'Unpaid' && b.status === 'Paid') return -1;
          if (a.status === 'Paid' && b.status === 'Unpaid') return 1;
          return b.id - a.id;
        });

        setData(sortedData);

        // Calculate custom fields dynamically if not fully done by API
        let outstanding = 0; // Apni paben
        let payable = 0;     // Apni diben
        let settled = 0;

        result.data.forEach((item: any) => {
          if (item.status === 'Paid') {
            settled += item.amount;
          } else {
            // types can be checked based on your backend convention (e.g., type or positive/negative)
            if (item.type === 'YOU_GIVE' || item.amount < 0) {
              payable += Math.abs(item.amount);
            } else {
              outstanding += item.amount;
            }
          }
        });

        setTotalOutstanding(outstanding);
        setTotalPayable(payable);
        setTotalSettled(settled);

        const totalVolume = outstanding + settled;
        const rate = totalVolume > 0 ? (settled / totalVolume) * 100 : 0;
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
      const numericAmount = parseFloat(amount);
      const finalAmount = ledgerType === 'YOU_GIVE' ? -Math.abs(numericAmount) : Math.abs(numericAmount);

      const response = await fetch('/api/due', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'ADD_ENTRY', 
          name: debtorName, 
          amount: finalAmount,
          type: ledgerType // Backend can use this to differentiate
        })
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

  // Settle/Update Handler (Full or Partial)
  const handleUpdateBalance = async (item: any) => {
    if (!verificationPin) return;

    try {
      setIsLoading(true);
      
      const isPartial = settleMode === 'PARTIAL';
      const payload = {
        action: isPartial ? 'PARTIAL_PAYMENT' : 'MARK_PAID',
        rowIndex: item.rowIndex,
        pin: verificationPin,
        // partial amount track korar jonno payload
        reduceAmount: isPartial ? parseFloat(partialAmount) : undefined 
      };

      const response = await fetch('/api/due', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        setVerificationPin('');
        setPartialAmount('');
        setActiveRecordId(null);
        setSettleMode('CHOOSE');
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
        <div className="grid grid-cols-4 gap-1.5">
          <div className="bg-[#0e0e11] border border-zinc-900 rounded-xl p-2.5 space-y-1">
            <p className="text-[8px] uppercase tracking-wider text-zinc-500 font-medium">You Get</p>
            <p className="text-xs font-mono font-medium text-emerald-400">৳{totalOutstanding.toLocaleString()}</p>
          </div>

          <div className="bg-[#0e0e11] border border-zinc-900 rounded-xl p-2.5 space-y-1">
            <p className="text-[8px] uppercase tracking-wider text-zinc-500 font-medium">You Give</p>
            <p className="text-xs font-mono font-medium text-rose-400">৳{totalPayable.toLocaleString()}</p>
          </div>

          <div className="bg-[#0e0e11] border border-zinc-900 rounded-xl p-2.5 space-y-1">
            <p className="text-[8px] uppercase tracking-wider text-zinc-500 font-medium">Settled</p>
            <p className="text-xs font-mono font-medium text-zinc-400">৳{totalSettled.toLocaleString()}</p>
          </div>

          <div className="bg-[#0e0e11] border border-zinc-900 rounded-xl p-2.5 space-y-1">
            <p className="text-[8px] uppercase tracking-wider text-zinc-500 font-medium">Recovery</p>
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
            {/* Plus / Minus selector option toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#050507] border border-zinc-900 rounded-lg">
              <button
                type="button"
                onClick={() => setLedgerType('YOU_GET')}
                className={`flex items-center justify-center gap-1.5 py-2 text-[10px] uppercase font-medium tracking-wider rounded-md transition-all ${
                  ledgerType === 'YOU_GET' 
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/50' 
                    : 'text-zinc-500 hover:text-zinc-400'
                }`}
              >
                <FiPlusCircle className="w-3 h-3" /> Ami Pabo (+)
              </button>
              <button
                type="button"
                onClick={() => setLedgerType('YOU_GIVE')}
                className={`flex items-center justify-center gap-1.5 py-2 text-[10px] uppercase font-medium tracking-wider rounded-md transition-all ${
                  ledgerType === 'YOU_GIVE' 
                    ? 'bg-rose-950/40 text-rose-400 border border-rose-900/50' 
                    : 'text-zinc-500 hover:text-zinc-400'
                }`}
              >
                <FiMinusCircle className="w-3 h-3" /> Ami Dibo (-)
              </button>
            </div>

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
              Commit Statement {ledgerType === 'YOU_GET' ? '(+)' : '(-)'} <FiArrowUpRight className="w-3 h-3" />
            </button>
          </form>
        </section>

        {/* Live Filter Control Module */}
        <div className="space-y-2.5">
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
              const isGive = item.type === 'YOU_GIVE' || item.amount < 0; 
              
              return (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-xl border transition-all duration-300 flex flex-col gap-3 ${
                    isPaid 
                      ? 'bg-transparent border-dashed border-zinc-900 opacity-25' 
                      : 'bg-[#0e0e11] border-zinc-900/80 hover:border-zinc-800'
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono text-zinc-600">
                          [{String(item.id).padStart(3, '0')}]
                        </span>
                        <p className={`text-xs font-medium tracking-wide ${isPaid ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}>
                          {item.name}
                        </p>
                        <span className={`text-[8px] px-1.5 py-0.5 rounded uppercase font-mono ${
                          isGive ? 'bg-rose-950/40 text-rose-400' : 'bg-emerald-950/40 text-emerald-400'
                        }`}>
                          {isGive ? 'Ami Dibo' : 'Pabo'}
                        </span>
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

                    <div className="text-right flex items-center gap-3">
                      <p className={`text-xs font-mono font-medium ${
                        isPaid ? 'text-zinc-600 line-through' : isGive ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {isGive ? '-' : ''}৳{Math.abs(item.amount).toLocaleString()}
                      </p>

                      {!isPaid && activeRecordId !== item.id && (
                        <button 
                          onClick={() => { 
                            setActiveRecordId(item.id); 
                            setVerificationPin(''); 
                            setSettleMode('CHOOSE');
                          }} 
                          disabled={isLoading}
                          className="text-[10px] text-zinc-400 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 px-2.5 py-1 rounded border border-zinc-800 transition-all font-medium uppercase tracking-wider"
                        >
                          Settle
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Dynamic Action Overlay (Partial or Full Settlement UI) */}
                  {!isPaid && activeRecordId === item.id && (
                    <div className="bg-[#050507] p-3 rounded-lg border border-zinc-900 space-y-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
                      {settleMode === 'CHOOSE' && (
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => setSettleMode('PARTIAL')}
                            className="text-[10px] text-zinc-400 hover:text-zinc-200 bg-zinc-900 px-3 py-1 rounded border border-zinc-800"
                          >
                            Partial (Kisti)
                          </button>
                          <button 
                            onClick={() => setSettleMode('FULL')}
                            className="text-[10px] text-zinc-200 hover:text-emerald-400 bg-zinc-900 px-3 py-1 rounded border border-zinc-800"
                          >
                            Full Settle
                          </button>
                          <button onClick={() => setActiveRecordId(null)} className="text-zinc-600 p-1">
                            <FiArrowLeft className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      {settleMode !== 'CHOOSE' && (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                              {settleMode === 'PARTIAL' ? 'Enter Partial Payment' : 'Confirm Full Settlement'}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {settleMode === 'PARTIAL' && (
                              <input 
                                type="number" 
                                placeholder="Amount" 
                                value={partialAmount}
                                disabled={isLoading}
                                onChange={(e) => setPartialAmount(e.target.value)}
                                className="w-24 bg-[#0e0e11] border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-zinc-700"
                              />
                            )}
                            <input 
                              type="password" 
                              placeholder="PIN" 
                              maxLength={4}
                              value={verificationPin}
                              disabled={isLoading}
                              onChange={(e) => setVerificationPin(e.target.value)}
                              className="w-16 bg-[#0e0e11] border border-zinc-800 text-center rounded px-2 py-1 text-xs text-zinc-200 font-mono tracking-widest focus:outline-none focus:border-zinc-700"
                            />
                            
                            <button 
                              onClick={() => handleUpdateBalance(item)}
                              disabled={isLoading || verificationPin.length < 4 || (settleMode === 'PARTIAL' && !partialAmount)}
                              className="bg-zinc-800 hover:bg-zinc-700 text-emerald-400 p-1.5 rounded border border-zinc-700 disabled:opacity-30"
                            >
                              <FiCheck className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => setSettleMode('CHOOSE')} 
                              className="text-zinc-600 hover:text-zinc-400 p-1"
                            >
                              <FiArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

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