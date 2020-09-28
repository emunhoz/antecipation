import HTTP_CLIENT from './'

export async function sendDataSimulation({ amount, installments, mdr }) {
  return HTTP_CLIENT.post('', { amount, installments, mdr })
}