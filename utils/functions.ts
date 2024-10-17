import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { query } from 'express';

dotenv.config();

// Supabase connection
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

// export async function addUser(documentId: string, name: string, lastName: string, phone: string, birthDate: Date) {
//   const { data, error } = await supabase
//     .from('Users')
//     .insert([{ document_id: documentId, name: name, lastname: lastName, phone: phone, birth_date: birthDate }]);
  
//   if (error) console.log('Error:', error);
//   else console.log('User added:', data);
// }
  
// Función para obtener un usuario por su document_id
// export async function fetchUser(documentId: string) {
//   const { data, error } = await supabase
//     .from('Users')
//     .select('*')
//     .eq('document_id', documentId)
//     .single();

//   if (error) {
//     return null;
//   }
//   return data;
// }


export async function puntosFisicos(query: string){
    return "sede medellin calle 48 a sur, sede poblado diagonl 48 las palmas"
}

// Esta función está adaptada para trabajar con el archivo migrationAgent.ts
// baños: number, habitaciones: number,
export async function fetchUser(cedula: number,) {
  console.log("entre a la funcion", cedula );
  
  
    const { data , error } = await supabase
      .from('mecanicos')
      .select('*')
      .lte('cedula', cedula )
      // .gte('precio', precio )
      // .gte('baños', baños)
      // .gte('habitaciones', habitaciones)
      // .ilike( 'ubicacion', `%${ubicacion}%`)
      // .range(0,20)
      // .eq('precio', precio)
      // .gt('baños', baños)
      // .gt('habitaciones', habitaciones)
      // .eq('ubicacion', ubicacion)
      .single();


      

    if (error) {
      console.error('Error fetching debts:', error);
      return "No se pudo recuperar la información de deudas.";
    }

    if (!data) {
      return "No se encontraron deudas para este documento.";
    }

    // const userData = await fetchUser(documentId);
    console.log("consulte esto: ", data);
    
    const createNewDataDebts = {
      // titulo: data.titulo,
      // created_at: data.created_at,
      // amount: data.amount,
      // description: data.description,
      // due_date: data.due_date,
      // interest: data.interest,
      // name: userData.name,
      // lastname: userData.lastname,
      // phone: userData.phone,
      // birth_date: userData.birth_date,
      // email: userData.email
    };

    if (!createNewDataDebts) {
      return "Parece que no tienes deudas pendientes. Puedes validar tu número de documento e intentar nuevamente.";
    }

    console.log('Debts:', createNewDataDebts);
    return JSON.stringify(data); 
}

export async function fetchPrize(puntos: number,) {
  console.log("entre a la funcion", puntos );
  
  
    const { data , error } = await supabase
      .from('premios')
      .select('*')
      .lte('puntos', puntos )
      // .gte('precio', precio )
      // .gte('baños', baños)
      // .gte('habitaciones', habitaciones)
      // .ilike( 'ubicacion', `%${ubicacion}%`)
      // .range(0,20)
      // .eq('precio', precio)
      // .gt('baños', baños)
      // .gt('habitaciones', habitaciones)
      // .eq('ubicacion', ubicacion)
      // .single();


      

    if (error) {
      console.error('Error fetching debts:', error);
      return "No se pudo recuperar la información los premios.";
    }

    if (!data) {
      return "No se encontraron premios por la cantidad de puntos que tienes";
    }

    // const userData = await fetchUser(documentId);
    console.log("consulte esto: ", data);
    
    const createNewDataDebts = {
      // titulo: data.titulo,
      // created_at: data.created_at,
      // amount: data.amount,
      // description: data.description,
      // due_date: data.due_date,
      // interest: data.interest,
      // name: userData.name,
      // lastname: userData.lastname,
      // phone: userData.phone,
      // birth_date: userData.birth_date,
      // email: userData.email
    };

    // if (!createNewDataDebts) {
    //   return "debes acumular mas puntos para poder redimirlos";
    // }

    // console.log('Debts:', createNewDataDebts);
    return JSON.stringify(data); 
}

// export function calculatePaymentPlan (totalDebt: number, days: number) {
//   const interestRate = 0.01; // 1% de interés diario, ajusta según las políticas de Coltefinanciera
//   const totalInterest = totalDebt * interestRate * days;
//   const totalAmount = totalDebt + totalInterest;
//   const dailyPayment = totalAmount / days;

//   const paymentPlan = {
//     totalAmount: totalAmount.toFixed(2),
//     dailyPayment: dailyPayment.toFixed(2),
//     days: days
//   };

//   return JSON.stringify(paymentPlan);
// }

// export function generatePaymentOptions (totalDebt: number) {
//   const options = [5, 15, 30].map(days => calculatePaymentPlan(totalDebt, days));
//   return JSON.stringify(options);
// }

// Crear resúmen con condiciones de pago sobre la opción de pago seleccionada
// export function summarizePaymentOption (selectedOption: string) {
//   const parsedOption = JSON.parse(selectedOption);
//   const summary = `El deudor se compromete a pagar $${parsedOption.dailyPayment} diarios, hasta completar un total de $${parsedOption.totalAmount}. El acuerdo de pago tiene una duración de ${parsedOption.days} días. ¿Desea confirmar este acuerdo?`;
//   return summary;
// }

// Enviar correo electrónico con el acuerdo de pago
export async function sendEmailWithPaymentArrengement(placa: string, modelo: string, marca: string, descripcion: string,  cedula: number) {

  // if (!email) {
  //   return "El correo electrónico es requerido para poder enviarte el acuerdo.";
  // }

  const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
    });
  const mailOptions = {
    from: '"Importadoras Asociadas" <alejandro.b@ultimmarketing.com>',
    to: "daniel.a@ultimmarketing.com",
    subject: 'Nuevo pedido',
    html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .container {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin: 0 auto;
        }
        h1 {
          color: #333333;
          font-size: 24px;
          text-align: center;
        }
        p {
          color: #666666;
          line-height: 1.6;
          font-size: 16px;
        }
        .highlight {
          color: #000000;
          font-weight: bold;
        }
        .payment-channels {
          margin-top: 20px;
        }
        .payment-channels h2 {
          color: #333333;
          font-size: 20px;
          text-align: center;
        }
        .payment-channels p {
          color: #666666;
          font-size: 16px;
        }
        .payment-channels .section-title {
          font-weight: bold;
          color: #333333;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p> placa ${placa}</p>
        <p> modelo ${modelo}</p>
        <p> marca ${marca}</p>
        <p> descripcion ${descripcion}</p>
        <p> cedula ${cedula}</p>
      </div>
    </body>
    </html>
  `
  };
  
  try {
      // Envía el correo electrónico
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info);
      return `las especificaciones del pedido fueron enviadas a un acesor, peudes llamar o dirigirte a nuestras oficinas`;
    } catch (error) {
      console.error('Error al enviar el correo: ', error);
      return "Error al enviar el correo.";
  }
}