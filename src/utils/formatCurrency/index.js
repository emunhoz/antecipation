export default function formatCurrency (value) {
  const val = +value.replace(/\D+/g, '') / 100;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(val);
};

