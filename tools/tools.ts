import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { searchVectors } from "../utils/retrievers";
import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import * as cheerio from 'cheerio';
import { 
    // fetchUser, 
    fetchUser, 
    fetchPrize,
    puntosFisicos,
    // generatePaymentOptions, 
    // calculatePaymentPlan,
    // summarizePaymentOption,
    sendEmailWithPaymentArrengement,
    getSitesCitiesList,
    filterSitesCities,
} from "../utils/functions";


export const retrieverTool = tool(
  async ({ query }: { query: string }) => {
    const results = await searchVectors(query);
    return results;
  },
  {
    name: "retriever",
    description: "Eres una herramienta de consulta de productos de PlomeríaGarcia. Tu tarea es buscar y extraer solo la información relevante de la base de datos, respondiendo a las consultas de los clientes. Debes: Traer solo el producto solicitado o uno muy similar, sin incluir información irrelevante. Proporcionar detalles clave como nombre, descripción, precio, disponibilidad y especificaciones técnicas. Filtrar información innecesaria, enfocándote en responder de manera precisa y útil a la consulta del cliente. Es importante que si no hay un producto que pide el cliente le sugieras uno similar. Siempre entrega el resultado bien formateado para que sea facil de leer. si te preguntan por dos productos diferentes lista dos de cada uno",    
    schema: z.object({
      query: z.string(),
    }),
  }
);

export const puntosFisicosToll = tool(
    async () => {
       const sites = await getSitesCitiesList();
        return sites;
    },
    {
      name: "entrga_en_tienda",
      description: 'Detecta si el mensaje del cliente indica que quiere conocer en qué ciudades tiene presencia Plomería García. Si es así, responde con la lista de ciudades donde se encuentran las tiendas físicas de la empresa. Considera variaciones en la forma en que el cliente podría expresar este deseo, como "en qué ciudades están", "dónde tienen tiendas", "en qué lugares puedo encontrarlos", entre otros. Ejemplo de entrada del cliente: "Hola, me gustaría saber en qué ciudades tienen tiendas físicas." Respuesta esperada del LLM: "Tenemos tiendas en Monterrey, Durango, Juárez, etc. ¿En qué ciudades te encuentras para darte el detalle con las direcciones?',
      schema: z.object({
        query: z.string(),
      }),
    }
);

export const direccionesPorCiudad = tool(
  async ({ ciudad }: { ciudad: string }) => {
    const results = await filterSitesCities(ciudad);
    return results;
  },
  {
    name: "direcciones_por_ciudad",
    description: 'Detecta si el mensaje del cliente indica que quiere conocer las direcciones de las tiendas de Plomería García en una ciudad específica. Si es así, responde con las direcciones de las tiendas en esa ciudad. Considera variaciones en la forma en que el cliente podría expresar este deseo, como "en qué dirección están", "dónde queda la tienda en", "cuál es la dirección de la tienda en", entre otros. Ejemplo de entrada del cliente: "Hola, me gustaría saber la dirección de la tienda en Monterrey." Respuesta esperada del LLM: "Tenemos tiendas en Monterrey en las siguientes direcciones: dirección 1, dirección 2, dirección 3."',
    schema: z.object({
      ciudad: z.string(),
    }),
  }
);


// export const puntosFisicosToll = tool(
//     async () => {
//        return "sede medellin calle 48 a sur, sede poblado diagonl 48 las palmas, recuerda llevar a la tienda tu codigo de mecanico para acumular puntos"
//     },
//     {
//       name: "entrga_en_tienda",
//       description: 'Detecta si el mensaje del cliente indica un deseo de recoger su pedido en una tienda física. Si es así, responde con las direcciones específicas de las tiendas. Considera variaciones en la forma en que el cliente podría expresar este deseo, como "quiero recoger", "prefiero ir a la tienda", "deseo pasar por", entre otros. Ejemplo de entrada del cliente: "Hola, estaba pensando en pasar por una de sus tiendas para recoger mi pedido, ¿es posible?"  Respuesta esperada del LLM: "Sede Medellín calle 48 A sur, sede Poblado diagonal 48 Las Palmas, recuerda llevar a la tienda tu código de mecánico para acumular puntos."Solo activa la respuesta si el mensaje del cliente claramente expresa el deseo de recoger el pedido en tienda.Ignora cualquier otra solicitud o pregunta que no esté relacionada con la recogida en tienda.Responde únicamente con el texto proporcionado para las direcciones y la instrucción del código de mecánico.',
//       schema: z.object({
//         query: z.string(),
//       }),
//     }
// );

// export const fetchUserTool = tool(
//     async ({ documentId }: { documentId: string }) => {
//       const user = await fetchUser(documentId);
//       return user;
//     },
//     {
//       name: "fetch_user",
//       description: "Pide el número de documento de un cliente para conocer su nombre y correo.",
//       schema: z.object({
//         documentId: z.string(),
//       }),
//     }
// );

// export const fetchUserTool = tool(
//   // baños , habitaciones, ubicacion    habitaciones: number, ubicacion: string 
//   async ({ cedula }: {  cedula: number}) => {
//     console.log("entre a la tool que necesito", cedula,);
    
//     const debts = await fetchUser(cedula);
//     return debts;
//   },
//   {
//     name: "fetch_debts",
//     description: "obeter la cantidad de puntos o kilometros que tiene un usuario con base a la cedula y mostrar que ",
//     schema: z.object({
//     cedula: z.number(),
//     }),
//   }
// );

// export const fetchPrizeTool = tool(
//   // baños , habitaciones, ubicacion    habitaciones: number, ubicacion: string 
//   async ({ puntos }: {  puntos: number}) => {
//     console.log("entre a la tool que necesito", puntos,);
    
//     const Prize = await fetchPrize(puntos);
//     return Prize + "si quieres ver mas premiso entra a https://www.importadorasasociadas.com/";
//   },
//   {
//     name: "fetch_Prize",
//     description: "mira que premios puede redimir el usuario con la cantidad de puntos que tiene ",
//     schema: z.object({
//     puntos: z.number(),
//     }),
//   }
// );



// export const calculatePaymentPlanTool = tool(
//     async ({ totalDebt, days }: { totalDebt: number, days: number }) => {
//       const paymentPlan = calculatePaymentPlan(totalDebt, days);
//       return paymentPlan;
//     },
//     {
//       name: "calculate_payment_plan",
//       description: "Calcula un plan de pagos.",
//       schema: z.object({
//         totalDebt: z.number(),
//         days: z.number(),
//       }),
//     }
// );

// export const generatePaymentOptionsTool = tool(
//     async ({ totalDebt }: { totalDebt: number }) => {
//       const paymentOptions = generatePaymentOptions(totalDebt);
//       return paymentOptions;
//     },
//     {
//       name: "generate_payment_options",
//       description: "Genera opciones de pago.",
//       schema: z.object({
//         totalDebt: z.number(),
//       }),
//     }
// );

// export const summarizePaymentOptionTool = tool(
//     async ({ selectedOption }: { selectedOption: string }) => {
//       const result = summarizePaymentOption(selectedOption);
//       return result;
//     },
//     {
//       name: "summarize_payment_option",
//       description: "Genera un mensaje con los detalles del acuerdo del acuerdo de pago seleccionado.",
//       schema: z.object({
//         selectedOption: z.string()
//       }),
//     }
// );

// export const sendEmailWithPaymentArrengementTool = tool(
//     async ({ cedula, placa, modelo, marca, descripcion }: { cedula: number, placa: string, modelo: string, marca: string, descripcion: string}) => {
//       const result = await sendEmailWithPaymentArrengement(placa, modelo, marca, descripcion, cedula);
//       return result;
//     },
//     {
//       name: "send_email_domicilio",
//       description: 'Cuando un cliente indica que desea un servicio de domicilio para un repuesto, es esencial recopilar toda la información necesaria antes de proceder. Debes asegurarte de obtener los siguientes datos sin excepción: la cédula del mecánico, la placa del carro, la marca, el modelo y una descripción detallada del repuesto. No avances en la conversación ni en el proceso de pedido hasta que no tengas todos estos detalles. Ejemplo de entrada del cliente: "Quiero que me envíen un repuesto a domicilio." Respuesta esperada de Laura: " necesito algunos detalles importantes. Por favor, dime la cédula de tu mecánico, la placa de tu carro, la marca, el modelo y una descripción del repuesto que necesitas." Identifica cuando un cliente solicita un domicilio de repuesto.Solicita explícitamente cada uno de los datos requeridos: cédula del mecánico, placa del carro, marca, modelo y descripción del repuesto.No procedas con la conversación hasta que no recibas toda la información necesaria.',
//       schema: z.object({
//         placa: z.string(),
//         modelo: z.string(),
//         marca: z.string(),
//         descripcion: z.string(),
//         cedula: z.number(),
//       }),
//     }
// );