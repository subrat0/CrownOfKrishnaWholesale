import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
//this route.js help to send data to the google sheets
    // Service Account Authentication with JWT
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    doc.auth = serviceAccountAuth;
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    for (const item of body.items) {
      await sheet.addRow({
        Timestamp: body.timestamp,
        Sku: item.sku,
        OrderID: Date.now(),
        Product: item.title,
        Size: item.size != null ? item.size : 'N/A',
        Quantity: item.quantity,
        TotalPrice: (item.price * item.quantity).toFixed(2),
        CustomerName: body.customerName,
        Phone: body.phone,
        Address: body.address,
        Note: body.messageNote || 'N/A',
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // console.error('Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
