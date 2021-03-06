Chatbot de hello world do Telegram
---

Chatbot desenvolvido num fechamento com a Turma 14 para demonstrar o uso de NodeJS para comunicação com a API do Telegram.

## Pré requisitos

Para executar o código, você vai precisar do **NodeJS na versão 16 ou superior**.

## Executando

- Instale as dependências com `npm install`
- Crie um token falando com o [BotFather no Telegram](https://t.me/botfather).
- Copie o arquivo [.env.sample](.env.sample) para um novo arquivo com o nome `.env`
- Preencha o token no local indicado no arquivo `.env` que acabou de criar
- Execute o bot com `npm start`

## ⚠️ Atenção ⚠️

Não adicione o arquivo `.env` com seu token ao git **em hipótese alguma**.
O token é sua "chave" para acesso ao bot e deve ser sempre **muito** bem guardado e mantido em segredo.

## Links úteis

- [Documentação da API do Telegram](https://core.telegram.org/bots/api)
- [Telegram - Introdução a Bots](https://core.telegram.org/bots)
- [FAQ de Bots do Telegram](https://core.telegram.org/bots/faq)
- [Bilioteca NodeJS para criar bots do Telegram](https://www.npmjs.com/package/telegraf)
