"use client";

import React, { useState, useEffect } from "react";

// Google Apps Script Deploy korar por URL ta ekhane boshaba
const APPS_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";

interface LedgerEntry {
  id: string;
  name: string;
  amount: number;
  status: "Paid" | "Unpaid";
  date: string;
}

export default function LedgerDashboard() {
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP Modal states
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");

  // System hardcoded Secure Admin PIN (Jeta diye verify hobe)
  // Apne chaile text gateway add na kore direct ei static secret security handle use korte paren
  const CORRECT_OTP = "1234"; 

  // Google Sheet theke data get korar logic
  const fetchEntries = async () => {
    setLoading(true);
    try {
      const res = await fetch(APPS_SCRIPT_URL);
      const data = await res.json();
      setEntries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (APPS_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
      fetchEntries();
    } else {
      // Dummy baseline data jate link na boshalei interface check kora jay
      setEntries([
        { id: "1", name: "Tanvir Ahmed", amount: 1500, status: "Unpaid", date: "2026-06-10" },
        { id: "2", name: "Siam Hossain", amount: 4500, status: "Unpaid", date: "2026-06-12" },
        { id: "3", name: "Nabil Khan", amount: 300, status: "Paid", date: "2026-06-13" },
      ]);
    }
  }, []);

  // New Record append entry handle logic
  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return alert("Please fill up all fields");

    setLoading(true);
    const newRecord = {
      action: "add",
      name,
      amount: parseFloat(amount),
    };

    try {
      if (APPS_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
        // UI locally immediate append backup block fallback
        setEntries([
          ...entries,
          {
            id: Math.random().toString(),
            name,
            amount: parseFloat(amount),
            status: "Unpaid",
            date: new Date().toLocaleDateString(),
          },
        ]);
      } else {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(newRecord),
        });
        fetchEntries(); // Refetch cloud sync state
      }
      setName("");
      setAmount("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // OTP Validation system modal validation action triggerer
  const openOtpVerification = (id: string) => {
    setSelectedEntryId(id);
    setOtpInput("");
    setOtpError("");
    setShowOtpModal(true);
    
    // Protip: Apne dynamic sms gateway custom execute korte chaile API code call logic ekhane run korben.
    console.log("OTP Sent payload triggered target to admin profile contact pointer.");
  };

  const handleVerifyAndPay = async () => {
    if (otpInput !== CORRECT_OTP) {
      setOtpError("Invalid OTP! Clear checking mechanism required.");
      return;
    }

    if (!selectedEntryId) return;
    setLoading(true);
    setShowOtpModal(false);

    try {
      if (APPS_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL") {
        // Local mockup state update validation map
        setEntries(
          entries.map((item) =>
            item.id === selectedEntryId ? { ...item, status: "Paid" } : item
          )
        );
      } else {
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify({ action: "markPaid", id: selectedEntryId }),
        });
        fetchEntries();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Calculations aggregate
  const totalUnpaid = entries
    .filter((e) => e.status === "Unpaid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Block UI design */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-teal-400 tracking-tight">Taka Tracker Engine</h1>
            <p className="text-slate-400 mt-1">Easily trace logs, payments via cloud synced ecosystem layout.</p>
          </div>
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/10 border border-red-500/40 px-6 py-3 rounded-xl">
            <span className="text-xs uppercase font-semibold text-slate-400 block tracking-wider">Total Due Payable</span>
            <span className="text-2xl font-black text-red-400">{totalUnpaid.toLocaleString()} BDT</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Log form inputs configuration layout wrapper */}
          <div className="bg-slate-800/60 backdrop-blur border border-slate-700/60 rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              ➕ Add New Due Entry
            </h2>
            <form onSubmit={handleAddEntry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Debtor / Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rohim Bhai"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 text-slate-100 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Amount (BDT)</label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 text-slate-100 transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-slate-700 text-slate-950 font-bold transition-all px-4 py-3 rounded-xl shadow-lg shadow-teal-500/10 mt-2"
              >
                {loading ? "Syncing..." : "Inject Record"}
              </button>
            </form>
          </div>

          {/* Right Column: Dynamic Data table monitoring block views setup */}
          <div className="lg:col-span-2 bg-slate-800/40 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-slate-800/50 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-200">Ledger Database Stream</h2>
              {APPS_SCRIPT_URL !== "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL" && (
                <button 
                  onClick={fetchEntries} 
                  className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors font-medium"
                >
                  🔄 Reload
                </button>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-900/40">
                    <th className="py-4 px-6">Name</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {entries.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-500 text-sm">No record stream pipeline linked.</td>
                    </tr>
                  ) : (
                    entries.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-4 px-6 font-medium text-slate-200">{item.name}</td>
                        <td className="py-4 px-6 font-bold text-slate-300">{item.amount.toLocaleString()} ৳</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            item.status === "Paid" 
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {item.status === "Unpaid" ? (
                            <button
                              onClick={() => openOtpVerification(item.id)}
                              className="bg-slate-700 hover:bg-teal-500 hover:text-slate-950 px-4 py-1.5 rounded-xl text-xs font-bold transition-all"
                            >
                              Mark Paid
                            </button>
                          ) : (
                            <span className="text-xs text-slate-500 italic px-4">Settled Contract</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Dynamic Verification Flow Modal overlay screen container wrapper popup */}
        {showOtpModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-800 border border-slate-700 w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <h3 className="text-lg font-bold text-slate-100 mb-2">🔒 Admin Signature Verification</h3>
              <p className="text-xs text-slate-400 mb-4">
                Enter your security administrative passcode mapping verification authorization layer. (Default Mock Bypass: <span className="text-teal-400 font-bold">1234</span>)
              </p>
              
              <div className="space-y-4">
                <input
                  type="password"
                  maxLength={4}
                  placeholder="• • • •"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full text-center tracking-widest bg-slate-900 border border-slate-700 rounded-xl py-3 text-xl font-bold focus:outline-none focus:border-teal-500 text-slate-100"
                />
                
                {otpError && (
                  <p className="text-xs text-red-400 font-medium text-center">{otpError}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowOtpModal(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Cancel Action
                  </button>
                  <button
                    onClick={handleVerifyAndPay}
                    className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    Confirm Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
