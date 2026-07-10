import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || '1eUwFSLK9l5YUFYKBVH7yMHmcK2xn7RMKX8ZaNQKNfBQ';
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || 'sheets-connector@my-money-tracker-499316.iam.gserviceaccount.com';
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

const ADMIN_SECURE_PIN = "0024"; // Authentication PIN

// Google Auth Initialize function
function getAuth() {
  return new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

// ১. GET Request: Google Sheet theke data read kora
export async function GET() {
  try {
    const auth = getAuth();
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Ledger_Database'] || doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const listItems: any[] = [];
    let totalUnpaid = 0;

    rows.forEach((row, index) => {
      const idVal = row.get('ID');
      const nameVal = row.get('Name');
      const amountVal = Number(row.get('Amount')) || 0;
      const statusVal = row.get('Status');
      const dateVal = row.get('Date');
      const typeVal = row.get('Type') || (amountVal < 0 ? 'YOU_GIVE' : 'YOU_GET'); // Fallback check

      if (nameVal && nameVal.includes('Total Due')) return;

      if (idVal) {
        listItems.push({
          rowIndex: index, // Row tracking index for updates
          id: Number(idVal),
          name: nameVal,
          amount: amountVal,
          status: statusVal,
          date: dateVal,
          type: typeVal
        });

        // Dynamic unpaid calculation logic base update
        if (statusVal === 'Unpaid' && typeVal !== 'YOU_GIVE') {
          totalUnpaid += amountVal;
        }
      }
    });

    return NextResponse.json({ success: true, data: listItems, totalDue: totalUnpaid });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ২. POST Request: Add Data, Full Payment or Partial Payment (Kisti)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, name, amount, type, rowIndex, pin, reduceAmount } = body;

    const auth = getAuth();
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Ledger_Database'] || doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // ক) নতুন এন্ট্রি অ্যাড করার লজিক (Plus/Minus Dynamic Type Control)
    if (action === 'ADD_ENTRY') {
      const validRows = rows.filter(r => r.get('ID') && !r.get('Name')?.includes('Total Due'));
      const nextId = validRows.length > 0 ? Math.max(...validRows.map(r => Number(r.get('ID')))) + 1 : 1;
      const today = new Date().toISOString().split('T')[0];

      const totalDueRowIndex = rows.findIndex(r => r.get('Name')?.includes('Total Due'));
      
      const newRowData = {
        ID: nextId,
        Name: name,
        Amount: Number(amount), // Signed Value directly tracking (- for give, + for get)
        Status: 'Unpaid',
        Date: today,
        Type: type || (Number(amount) < 0 ? 'YOU_GIVE' : 'YOU_GET') // Dynamic tracking field
      };

      if (totalDueRowIndex !== -1) {
        await sheet.addRow(newRowData, { insert: true });
      } else {
        await sheet.addRow(newRowData);
      }
      return NextResponse.json({ success: true, message: 'Entry Added Successfully!' });
    }

    // খ) সিকিউর পিন ভ্যালিডেশন ব্লকিং চেক (For Settlements)
    if (action === 'MARK_PAID' || action === 'PARTIAL_PAYMENT') {
      if (pin !== ADMIN_SECURE_PIN) {
        return NextResponse.json({ success: false, error: 'Access Denied: Invalid Authentication PIN!' }, { status: 401 });
      }

      if (rowIndex === undefined || rowIndex === null) {
        return NextResponse.json({ success: false, error: 'Missing target row index' }, { status: 400 });
      }

      const rowToUpdate = rows[rowIndex];
      if (!rowToUpdate) {
        return NextResponse.json({ success: false, error: 'Target record row not found' }, { status: 404 });
      }

      // ১. সম্পূর্ণ পরিশোধ বা সেটেলমেন্ট লজিক
      if (action === 'MARK_PAID') {
        rowToUpdate.set('Status', 'Paid');
        await rowToUpdate.save();
        return NextResponse.json({ success: true, message: 'Marked as Fully Settled!' });
      }

      // ২. আংশিক বা কিস্তি পরিশোধের লজিক (Partial Payment Solution)
      if (action === 'PARTIAL_PAYMENT') {
        if (!reduceAmount || isNaN(Number(reduceAmount))) {
          return NextResponse.json({ success: false, error: 'Invalid partial reduction amount input' }, { status: 400 });
        }

        const currentAmount = Number(rowToUpdate.get('Amount')) || 0;
        const inputReduce = Math.abs(Number(reduceAmount));
        let newAmount = 0;

        if (currentAmount < 0) {
          // If negative (You Give), adding payment reduces the liability towards 0
          newAmount = currentAmount + inputReduce;
          if (newAmount > 0) newAmount = 0; // Boundary safety check
        } else {
          // If positive (You Get), receiving payment reduces the outstanding asset towards 0
          newAmount = currentAmount - inputReduce;
          if (newAmount < 0) newAmount = 0; // Boundary safety check
        }

        rowToUpdate.set('Amount', newAmount);

        // Dynamic status mapping based on total valuation calculation metrics 
        if (newAmount === 0) {
          rowToUpdate.set('Status', 'Paid');
        }

        await rowToUpdate.save();
        return NextResponse.json({ success: true, message: 'Partial transaction adjustment processed!' });
      }
    }

    return NextResponse.json({ success: false, error: 'Invalid Operational Action Specified' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
