# 🧪 Webdojo - Automação de Testes com Cypress

Este projeto contém a suíte de testes automatizados para a aplicação **Webdojo**. O objetivo é garantir a qualidade das funcionalidades principais, desde fluxos de login até interações complexas como Iframe, Kanban e manipulação de arquivos.

## 🚀 Tecnologias Utilizadas

* **Framework:** [Cypress](https://www.cypress.io/) (v14.1.0)
* **Linguagem:** JavaScript
* **Plugins:** `cypress-real-events` (v1.15.0) para interações nativas.
* **Gerenciador de Pacotes:** Yarn (v1.22.22)

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)

---

## 🛠️ Instalação e Execução

### 1. Instalar dependências
No diretório raiz do projeto, execute:
```bash
yarn install
```

### 2. Executar a Aplicação Webdojo
A aplicação precisa estar rodando para que os testes sejam executados:
```bash
npm run dev
```
> A aplicação será servida via `serve` na porta 3000.

### 3. Executar os Testes

**Interface do Cypress (Modo Interativo):**
```bash
npx cypress open
```

**Modo Headless (Todos os testes):**
```bash
yarn test
```

---

## 🔍 Scripts de Teste Disponíveis

Os scripts abaixo permitem a execução isolada de cada módulo:

| Comando | Script Cypress |
| :--- | :--- |
| `yarn test-login` | `cypress/e2e/login.cy.js` |
| `yarn test-cep` | `cypress/e2e/cep.cy.js` |
| `yarn test-kanban` | `cypress/e2e/kanban.cy.js` |
| `yarn test-consultancy` | `cypress/e2e/consultancy.cy.js` |
| `yarn test-alerts` | `cypress/e2e/alerts.cy.js` |
| `yarn test-iframe` | `cypress/e2e/iFrame.cy.js` |
| `yarn test-github` | `cypress/e2e/github.cy.js` |
| `yarn test-hover` | `cypress/e2e/hover.cy.js` |
| `yarn test-links` | `cypress/e2e/links.cy.js` |

---

## 📁 Estrutura do Projeto

A organização segue o padrão de **Actions** para melhor manutenção:

```text
cypress/
├── e2e/                # Especificações de teste (.cy.js)
├── fixtures/           # Massas de dados e arquivos
│   ├── cep.json
│   ├── consultancy.json
│   └── documentTest.pdf
└── support/            # Comandos e utilitários
    ├── actions/        # Encapsulamento de ações (ex: consultancy.actions.js)
    ├── commands.js     # Custom Commands
    ├── e2e.js          # Configuração global
    └── utils.js        # Funções auxiliares
```

---

## 💡 Destaques Técnicos

* **Data-Driven Testing:** Uso intensivo de `fixtures` para isolar dados de teste da lógica.
* **Custom Actions:** Lógica de interface centralizada na pasta `actions`.
* **Real Events:** Implementação do `cypress-real-events` para simular interações de mouse de alta fidelidade.
