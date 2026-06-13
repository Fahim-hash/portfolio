'use client';

import { useState, useEffect } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || '1eUwFSLK9l5YUFYKBVH7yMHmcK2xn7RMKX8ZaNQKNfBQ';
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || 'sheets-connector@my-money-tracker-499316.iam.gserviceaccount.com';
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

export default function MoneyTracker() {
  const [data, setData] = useState<any[]>([]);
  const [totalDue, setTotalDue] = useState<number>(0);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Google Sheet theke data read kora
  const fetchData = async () => {
    try {
      setLoading(true);
      const serviceAccountAuth = new JWT({
        email: GOOGLE_CLIENT_EMAIL,
        key: GOOGLE_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
      await doc.loadInfo();
      
      const sheet = doc.sheetsByTitle['Ledger_Database'] || doc.sheetsByIndex[0];
      const rows = await sheet.getRows();

      const listItems: any[] = [];
      let calculatedTotal = 0;

      rows.forEach((row) => {
        const idVal = row.get('ID');
        const nameVal = row.get('Name');
        const amountVal = Number(row.get('Amount')) || 0;
        const statusVal = row.get('Status');
        const dateVal = row.get('Date');

        // Total Due er static row skip korbo regular list theke
        if (nameVal && nameVal.includes('Total Due')) {
          return; 
        }

        if (idVal) {
          listItems.push({
            _rawRow: row, // reference to update status later
            id: Number(idVal),
            name: nameVal,
            amount: amountVal,
            status: statusVal,
            date: dateVal,
          });

          if (statusVal === 'Unpaid') {
            calculatedTotal += amountVal;
          }
        }
      });

      setData(listItems);
      setTotalDue(calculatedTotal);
    } catch (err) {
      console.error("Data load e error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Total Due line er thik upore dynamic row add kora
  const handleAddEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !amount) return alert('Sob details dao!');

    try {
      setLoading(true);
      const serviceAccountAuth = new JWT({
        email: GOOGLE_CLIENT_EMAIL,
        key: GOOGLE_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
      await doc.loadInfo();
      const sheet = doc.sheetsByTitle['Ledger_Database'] || doc.sheetsByIndex[0];
      const rows = await sheet.getRows();

      // Find highest ID currently in the sheet
      const nextId = data.length > 0 ? Math.max(...data.map(d => d.id)) + 1 : 1;
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

      // Total Due row er indices match kore thik tar upore add korbo
      const totalDueRowIndex = rows.findIndex(r => r.get('Name')?.includes('Total Due'));
      
      const newRowData = {
        ID: nextId,
        Name: name,
        Amount: Number(amount),
        Status: 'Unpaid',
        Date: today
      };

      if (totalDueRowIndex !== -1) {
        // Total Due row er thik upore insert korbe
        await sheet.addRow(newRowData, { insert: true });
      } else {
        await sheet.addRow(newRowData);
      }

      setName('');
      setAmount('');
      await fetchData(); // Refresh Dashboard
      alert('Entry successfully saved to Google Sheet!');
    } catch (err) {
      alert('Error saving entry');
    } finally {
      setLoading(false);
    }
  };

  // 3. Secure PIN Verification & Status Update
  const handleVerifyAndPaid = async (item: any) => {
    const ADMIN_SECURE_PIN = "0024"; // Tomar master validation code

    if (pin !== ADMIN_SECURE_PIN) {
      alert("Wrong Secure PIN!");
      return;
    }

    try {
      setLoading(true);
      const rowToUpdate = item._rawRow;
      rowToUpdate.set('Status', 'Paid');
      await rowToUpdate.save();

      setPin('');
      setActiveId(null);
      await fetchData(); // UI refresh
      alert(`Marked ${item.name} as Paid!`);
    } catch (err) {
      alert("Status update fail hoyeche");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 font-sans select-none">
      <div className="max-w-md mx-auto space-y-6">
        
        {/* Header with Total Counter */}
        <header className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl"></div>
          <h1 className="text-xl font-bold tracking-tight text-teal-400">💰 Taka Tracker Dashboard</h1>
          <div className="mt-4 bg-gray-950/60 border border-gray-800 rounded-xl py-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Total Unpaid Due</p>
            <p className="text-2xl font-black text-rose-400 mt-1">৳{totalDue.toLocaleString()}</p>
          </div>
        </header>

        {/* Dynamic Loader */}
        {loading && (
          <div className="text-center text-xs text-teal-400 animate-pulse bg-teal-500/5 py-2 rounded-lg border border-teal-500/20">
            Syncing with Google Sheet...
          </div>
        )}

        {/* Input Form */}
        <section className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-lg">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">Notun Entry Add Koro</h2>
          <form onSubmit={handleAddEntry} className="space-y-3">
            <input 
              type="text" 
              placeholder="Kar kach theke paba (Name)" 
              value={name}
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-white disabled:opacity-50"
            />
            <input 
              type="number" 
              placeholder="Takar Poriman (Amount)" 
              value={amount}
              disabled={loading}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-white disabled:opacity-50"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-gray-800 text-gray-950 font-bold py-3 rounded-xl transition text-sm shadow-md"
            >
              + Save to Sheet
            </button>
          </form>
        </section>

        {/* Due List */}
        <section className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-lg">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">Baki/Paid Taka-r List</h2>
          
          <div className="divide-y divide-gray-800 max-h-[40vh] overflow-y-auto pr-1">
            {data.map((item) => (
              <div key={item.id} className="py-3.5 flex justify-between items-center group">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded font-mono">#{item.id}</span>
                    <p className="font-medium text-gray-200 text-sm">{item.name}</p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${item.status === 'Paid' ? 'bg-teal-500/10 text-teal-400' : 'bg-rose-500/10 text-rose-400'}`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5 font-mono">Date: {item.date}</p>
                  <p className={`text-xs font-bold mt-1 ${item.status === 'Paid' ? 'text-gray-500 line-through' : 'text-rose-400'}`}>
                    ৳{item.amount.toLocaleString()}
                  </p>
                </div>
                
                {item.status === 'Unpaid' && (
                  <div>
                    {activeId !== item.id ? (
                      <button 
                        onClick={() => { setActiveId(item.id); setPin(''); }} 
                        disabled={loading}
                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs px-3 py-2 rounded-xl font-bold border border-rose-500/20 transition"
                      >
                        Paid?
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-gray-950 p-1 rounded-xl border border-gray-800 animate-in fade-in zoom-in duration-150">
                        <input 
                          type="password" 
                          placeholder="PIN" 
                          maxLength={4}
                          value={pin}
                          onChange={(e) => setPin(e.target.value)}
                          className="w-14 bg-transparent text-center text-xs focus:outline-none text-white font-mono tracking-widest"
                        />
                        <button 
                          onClick={() => handleVerifyAndPaid(item)}
                          className="bg-teal-500 text-gray-950 text-[11px] px-2.5 py-1 rounded-lg font-black"
                        >
                          OK
                        </button>
                        <button onClick={() => setActiveId(null)} className="text-gray-400 text-xs px-1 hover:text-white">✕</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {data.length === 0 && !loading && (
              <p className="text-center text-xs text-gray-500 py-6">Kono data paowa jayni!</p>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
