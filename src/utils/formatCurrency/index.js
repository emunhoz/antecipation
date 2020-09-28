export function maskCurrency(number) {
  if (Number.isNaN(parseFloat(number)) && Number.isNaN(number - 0)) return '';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(number);
}

export function formatCurrency (value) {
  const val = +value.replace(/\D+/g, '') / 100;

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(val);
};
