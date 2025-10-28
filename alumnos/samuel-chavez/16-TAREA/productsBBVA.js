export const productosBBVA = [
  {
    id: 1,
    tipo: "cuenta",
    nombre: "Cuenta de Ahorro Digital BBVA",
    descripcion: "Ahorra y gestiona tu dinero 100% online con total seguridad.",
    beneficios: [
      "Apertura gratuita y sin monto mínimo.",
      "Transferencias y retiros sin costo en BBVA.",
      "Tarjeta virtual lista para usar desde la app.",
      "Sin costo de mantenimiento mensual.",
    ],
    linkAfp: "Fecha de solicitud y desembolso de tu AFP",
    banner: {
      textoPromocional: "Tu cuenta 100% digital en minutos.",
      descripcionBanner:"Sí, leíste bien. Solo por ahorrar en tu Cuenta Ganadora, puedes llevarte el premio más grande del año.",
    },
    imagen:
      "https://www.bbva.pe/content/dam/library/micros/add-credit-card-glass.im1744216866463im.png?imwidth=1176",
  },

  {
    id: 2,
    tipo: "tarjeta",
    nombre: "Tarjeta de Crédito al Toque",
    descripcion:
      "Solicita tu tarjeta 100% online y disfruta tus compras de inmediato.",
    resumen: {
      lineaMaxima: "Accede a una amplia línea de crédito con flexibilidad de pago y respaldo BBVA.",
      tasaInteres: "TCEA desde 35%",
      tipoTarjeta: ["Clásica", "Oro", "Signature"],
    },
    beneficios: [
      "Aprobación inmediata según tu historial.",
      "Usa tu tarjeta virtual mientras esperas la física.",
      "Controla tus gastos desde la app BBVA.",
      "Pagos sin contacto y descuentos exclusivos.",
    ],
    requisitos: [
      "Mayor de 21 años.",
      "Ingresos mínimos mensuales de S/1,000.",
      "DNI vigente y sin deudas morosas.",
    ],
    pasosParaSolicitar: [
      {
        titulo: "Afíliate a la Banca por Internet",
        descripcion:
          "Si aún no lo has hecho, puedes hacerlo en minutos desde la app o web.",
        enlace:
          "https://www.bbva.pe/personas/servicios/banca-por-internet.html",
      },
      {
        titulo: "Solicita tu Tarjeta de Crédito",
        descripcion:
          "Ingresa a la app BBVA y completa tu solicitud en menos de 3 minutos.",
        enlace: "https://www.bbva.pe/personas/productos/tarjetas.html",
      },
      {
        titulo: "Coordina la entrega",
        descripcion:
          "Recíbela en tu domicilio o recógela en una agencia cercana.",
        enlace: "https://www.bbva.pe/personas/servicios/envio-tarjetas.html",
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: "¿Puedo usar mi tarjeta virtual antes de recibir la física?",
        respuesta:
          "Sí, podrás comprar online desde el momento en que se apruebe tu solicitud.",
      },
      {
        pregunta: "¿Cuánto demora la entrega?",
        respuesta: "Entre 3 y 5 días hábiles en Lima, y hasta 7 en provincias.",
      },
    ],
    imagen:
      "https://www.bbva.pe/content/dam/library/micros/add-credit-card-glass.im1744216866463im.png?imwidth=1176",
  },

  {
    id: 3,
    tipo: "servicio",
    nombre: "BBVA T-Cambio",
    descripcion: "Tu cambio de divisas rápido, seguro y con tipo preferencial.",
    caracteristicas: {
      disponibilidad: "24/7, incluso feriados",
      montoMaximo: "USD 10,000 por día",
      comision: "Sin comisión adicional",
    },
    beneficios: [
      "Tipo de cambio competitivo en todo momento.",
      "Opera desde la app o banca por Internet.",
      "Transfiere entre tus cuentas en segundos.",
    ],
    simulador: {
      ejemplo: {
        de: "USD 1,000",
        a: "S/ 3,820",
        tipoCambio: "3.82",
      },
      enlace: "https://www.bbva.pe/personas/productos/t-cambio.html",
    },
    imagen:
      "https://www.bbva.pe/content/dam/library/micros/move-money-dollar-glass.im1746214637227im.png?imwidth=1176",
  },

  {
    id: 4,
    tipo: "prestamo",
    nombre: "Préstamo al Toque BBVA",
    descripcion:
      "Obtén dinero al instante con tasas preferenciales según tu perfil.",
    tasa: "TCEA desde 15%",
    montoMaximo: "S/ 20,000",
    plazoMaximoMeses: 48,
    beneficios: [
      "Desembolso inmediato a tu cuenta BBVA.",
      "Sin papeleo ni avales.",
      "Pagos anticipados sin penalidad.",
      "Aprobación en línea en minutos.",
    ],
    requisitos: {
      cliente: "Debes ser cliente BBVA.",
      historial: "Contar con línea preaprobada disponible.",
      documento: "DNI vigente.",
    },
    simuladorPrestamo: {
      ejemplo: {
        monto: "S/ 10,000",
        cuotas: 24,
        cuotaMensual: "S/ 490",
        tasa: "16% TCEA",
      },
      enlace: "https://www.bbva.pe/personas/productos/prestamos.html",
    },
    imagen:
      "https://www.bbva.pe/content/dam/library/micros/relocation-loan-dollar-glass.im1746463654931im.png?imwidth=1176",
  },

  {
    id: 5,
    tipo: "seguro",
    nombre: "Seguro Vida Renta BBVA",
    descripcion:
      "Protege a los que más quieres con una cobertura de hasta US$100,000.",
    cobertura: {
      monto: "US$100,000",
      incluyeCovid: true,
      beneficiarios: "Hasta 3 beneficiarios registrados",
    },
    beneficios: [
      "Cobertura desde el primer día.",
      "Pago mensual desde S/20.",
      "Contratación rápida y sin exámenes médicos.",
    ],
    casosCubiertos: [
      "Fallecimiento natural o accidental.",
      "Fallecimiento por Covid-19.",
      "Cobertura mundial 24/7.",
    ],
    preguntasFrecuentes: [
      {
        pregunta: "¿Desde cuándo tengo cobertura?",
        respuesta:
          "Desde el momento en que confirmas el pago de tu primera prima.",
      },
      {
        pregunta: "¿Puedo cambiar de beneficiarios?",
        respuesta:
          "Sí, puedes hacerlo desde la app o en cualquier agencia BBVA.",
      },
    ],
    enlaceCotizar: "https://www.bbva.pe/personas/seguros.html",
    imagen:
      "https://www.bbva.pe/content/dam/public-web/peru/images/microillustrations/pregnant_insurance_dark.im1638817361425im.png?imwidth=320",
  },

  {
    id: 6,
    tipo: "anticipo",
    nombre: "Adelanto de Sueldo BBVA",
    descripcion: "Recibe hasta S/2,500 antes que llegue tu fecha de pago.",
    condiciones: {
      maximo: "S/2,500",
      sinGarantias: true,
      tasa: "Desde 0.5% mensual",
      modalidadPago: "Se descuenta automáticamente con tu próximo sueldo",
    },
    beneficios: [
      "Desembolso inmediato en tu cuenta.",
      "Disponible las 24 horas.",
      "No necesitas presentar documentos.",
      "Sin afectar tu historial crediticio.",
    ],
    pasos: [
      "Ingresa a la app BBVA.",
      "Selecciona ‘Adelanto de Sueldo’.",
      "Elige el monto y confirma.",
      "Recibe el dinero al instante.",
    ],
    imagen:
      "https://www.bbva.pe/content/dam/library/micros/relocation-loan-dollar-glass.im1746463654931im.png?imwidth=1176",
  },
];
