export const statusTranslate = (status: string | undefined) => {
  if (!status) return;
  let state = '';
  switch (status) {
    case 'Pending':
      state = 'Pendente';
      break;

    case 'pending':
      state = 'Pendente';
      break;

    case 'Scheduled':
      state = 'Agendado';
      break;

    case 'In_Progress':
      state = 'Processando';
      break;

    case 'awaiting_payment':
      state = 'Esperando pagamento';
      break;

    case 'payment_received':
      state = 'Pagamento recebido';
      break;

    case 'completed':
      state = 'Completo';
      break;

    case 'cancelled':
      state = 'Cancelado';
      break;

    case 'expired':
      state = 'Expirado';
      break;

    case 'open_dispute':
      state = 'Contestação aberta';
      break;
  }
  return state;
};
