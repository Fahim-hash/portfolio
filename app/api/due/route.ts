import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID || '1eUwFSLK9l5YUFYKBVH7yMHmcK2xn7RMKX8ZaNQKNfBQ';
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || 'sheets-connector@my-money-tracker-499316.iam.gserviceaccount.com';
const GOOGLE_PRIVATE_KEY = (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n');

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

      if (nameVal && nameVal.includes('Total Due')) return;

      if (idVal) {
        listItems.push({
          rowIndex: index, // Row tracking index for updates
          id: Number(idVal),
          name: nameVal,
          amount: amountVal,
          status: statusVal,
          date: dateVal,
        });

        if (statusVal === 'Unpaid') {
          totalUnpaid += amountVal;
        }
      }
    });

    return NextResponse.json({ success: true, data: listItems, totalDue: totalUnpaid });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// ২. POST Request: Data Add kora ebong Status 'Paid' mark kora (With PIN Validation)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, name, amount, rowIndex, pin } = body; // UI theke pin field rcv kora holo

    const auth = getAuth();
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
    await doc.loadInfo();
    const sheet = doc.sheetsByTitle['Ledger_Database'] || doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // ক) নতুন এন্ট্রি অ্যাড করার লজিক
    if (action === 'ADD_ENTRY') {
      const validRows = rows.filter(r => r.get('ID') && !r.get('Name')?.includes('Total Due'));
      const nextId = validRows.length > 0 ? Math.max(...validRows.map(r => Number(r.get('ID')))) + 1 : 1;
      const today = new Date().toISOString().split('T')[0];

      const totalDueRowIndex = rows.findIndex(r => r.get('Name')?.includes('Total Due'));
      const newRowData = {
        ID: nextId,
        Name: name,
        Amount: Number(amount),
        Status: 'Unpaid',
        Date: today
      };

      if (totalDueRowIndex !== -1) {
        await sheet.addRow(newRowData, { insert: true });
      } else {
        await sheet.addRow(newRowData);
      }
      return NextResponse.json({ success: true, message: 'Entry Added!' });
    }

    // খ) স্ট্যাটাস 'Paid' মার্ক করার লজিক (Secure Check)
    if (action === 'MARK_PAID') {
      // ১. Secure PIN Verification
      const ADMIN_SECURE_PIN = "0024"; // Ekhane pin secure vabe backende thakbe
      if (pin !== ADMIN_SECURE_PIN) {
        return NextResponse.json({ success: false, error: 'Access Denied: Invalid Authentication PIN!' }, { status: 401 });
      }

      // ২. Index Verification
      if (rowIndex === undefined || rowIndex === null) {
        return NextResponse.json({ success: false, error: 'Missing row index' }, { status: 400 });
      }
      
      const rowToUpdate = rows[rowIndex];
      if (!rowToUpdate) {
        return NextResponse.json({ success: false, error: 'Target record row not found' }, { status: 404 });
      }

      rowToUpdate.set('Status', 'Paid');
      await rowToUpdate.save();
      return NextResponse.json({ success: true, message: 'Marked as Paid!' });
    }

    return NextResponse.json({ success: false, error: 'Invalid Action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
