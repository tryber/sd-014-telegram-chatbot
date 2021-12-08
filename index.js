import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Lendo arquivo .env
dotenv.config();

// Acessando variável TOKEN definida no arquivo .env
const TOKEN = process.env.TOKEN;
const API_URL = `https://api.telegram.org/bot${TOKEN}`;

/**
 * Envia uma mensagem para um chat do Telegram
 * @param {number} chatId ID do chat para o qual enviar a mensagem
 * @param {string} text Texto para ser enviado
 */
async function sendMessage(chatId, text) {
  return fetch(`${API_URL}/sendMessage?chat_id=${chatId}&text=${text}`, {
    method: 'POST',
  });
}

/**
 * Processa um update e reage a ele
 * @param {object} update Update recebido da API do Telegram
 */
async function processUpdate(update) {
  console.log(`Processando update ${update.update_id}`);

  // Caso o update não tenha uma mensagem ou tenha uma mensagem sem texto
  // ele deve ser ignorado
  if (!update.message || !update.message.text) {
    console.log(
      `Ignorando update ${update.update_id} pois não é uma mensagem de texto`
    );
  }

  const { text, from, chat } = update.message;

  // Se a mensagem começa com /start, enviamos uma mensagem de "oi"
  if (text.startsWith('/start')) {
    return sendMessage(chat.id, `Olá ${from.first_name}! Tudo bem?`);
  }

  // Caso a mensagem não comece com /start, informamos que
  // esse é o único comando suportado por enquanto
  return sendMessage(
    chat.id,
    'Poxa vida. Eu só entendo o comando /start por enquanto!'
  );
}

/**
 * Inicia um loop que pergunta ao Telegram, de um em um segundo,
 * se existem novos updates a serem processados
 * @param {number} offset ID do próximo update a ser processado
 */
async function getUpdates(offset) {
  console.log('Buscando novas mensagens');

  // Busca novos updates na API do Telegram
  const response = await fetch(`${API_URL}/getUpdates?offset=${offset}`);

  // Escreve um erro no console e encerra a execução
  // caso a request para a API do Telegram falhe
  if (!response.ok) {
    console.error(
      'Response não tá ok :(',
      response.status,
      response.statusText
    );

    console.error(await response.text());

    return;
  }

  const { ok, result } = await response.json();

  console.log({ ok, result });

  // Escreve um erro no console e encerra a execução
  // caso o Telegram responda dizendo que houve uma falha
  if (!ok) {
    console.error('Telegram não tá OK :(');
    return;
  }

  // Caso haja updates para serem processados
  if (result.length) {
    // Processamos cada update individualmente
    result.forEach(processUpdate);

    // Obtemos o último update que foi processado
    const lastUpdate = result[result.length - 1];

    // Enviamos uma nova request para obter updates,
    // dessa vez, informando um offset, que marca os updates antigos como processados.
    return setTimeout(() => getUpdates(lastUpdate.update_id + 1), 1000);
  }

  // Caso não haja nenhum update para ser processado,
  // aguardamos um segundo e verificamos novamente
  setTimeout(getUpdates, 1000);
}

// Inicia o loop que busca por updates
getUpdates();
