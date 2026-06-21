# Recife Saúde - Backend

Backend feito com Node.js + Express. Ele guarda a relação entre a
localização do usuário e a unidade de saúde que ele consultou no app
(repositório `recife-saude-app`).

Os dados são salvos em um arquivo `dados.json` (criado automaticamente),
sem precisar instalar nenhum banco de dados.

## Rotas

| Método | Rota       | O que faz                                  |
| ------ | ---------- | ------------------------------------------- |
| GET    | `/`        | Testa se o servidor está rodando             |
| POST   | `/checkins`| Salva um novo check-in                       |
| GET    | `/checkins`| Lista todos os check-ins salvos              |

### Exemplo de POST

```json
{
  "unidadeNome": "UBS Tejipió",
  "bairro": "Tejipió",
  "unidadeLatitude": -8.0975,
  "unidadeLongitude": -34.9445,
  "userLatitude": -8.0980,
  "userLongitude": -34.9450
}
```

## Como rodar localmente

Pré-requisito: ter o **Node.js** instalado (eu testei com a versão 18).

1. Clonar o repositório e entrar na pasta:

```bash
git clone https://github.com/SEU_USUARIO/recife-saude-backend.git
cd recife-saude-backend
```

2. Instalar as dependências:

```bash
npm install
```

3. Rodar o servidor:

```bash
npm start
```

Se der tudo certo, vai aparecer no terminal:

```
Servidor rodando em http://localhost:3000
```

4. Para testar, pode abrir `http://localhost:3000` no navegador (deve
   aparecer uma mensagem de que o backend está rodando) ou testar as rotas
   com o curl:

```bash
curl http://localhost:3000/checkins
```

## Para o app conseguir acessar o backend

Se for testar o app no Expo Go, em um celular de verdade, o app **não**
consegue acessar `localhost`. É preciso usar o IP do computador na rede
Wi-Fi. Para descobrir o IP:

- Windows: abrir o `cmd` e digitar `ipconfig`
- Mac/Linux: abrir o terminal e digitar `ifconfig` ou `ip a`

Depois é só colocar esse IP no arquivo `api.js` do app (veja o README do
app para mais detalhes).

## Autor

Nome completo: _[preencher]_
