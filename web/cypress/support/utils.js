export function obterDataHoje() {
  const data = new Date();
  // 'pt-BR' força o padrão brasileiro (dia/mês/ano)
  return data.toLocaleDateString('pt-BR');
}