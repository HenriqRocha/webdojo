import { obterDataHoje } from "../support/utils"

describe('Login', ()=>{ //agrupamento de testes sobre logins

  it.only('Deve logar com sucesso', ()=>{ //uma função de teste com o nome de logar com sucesso
    cy.viewport('iphone-xr')//proporção da tela, tem predefinições com os nomes dos dispositivos
    cy.visit('http://localhost:3000')//visita a página 

    cy.get('#email').type('papito@webdojo.com')//pega o item clicado no app com o get e digita o que está no type
    cy.get('#password').type('katana123')

    //usando um recurso que funciona como um xpath para encontrar um elemento sem id específico
    cy.contains('button', 'Entrar').click()//função para clicar no botão

    cy.get('[data-cy="user-name"]')//aproveita da boa pratica do dev pra pegar o elemento de maneira mais simples
    .should('be.visible')//o elemento do get deve estar sendo visivel na tela (assert)
    .and('have.text', 'Fernando Papito')//verifica o conteúdo do elemento do get

    cy.get('[data-cy="welcome-message"]').should('be.visible').and(
      'have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.getCookie('login_date').should('exist')

    cy.getCookie('login_date').should((cookie)=>{
      expect(cookie.value).to.eq(obterDataHoje())
    })

    cy.window().then((win)=>{
      const token = win.localStorage.getItem('token')
      expect(token).to.match(/^[a-fA-F0-9]{32}$/)
    })
  })

  it('Não deve logar com senha inválida', ()=>{
    cy.iniciar()
    cy.submeterLogin('papito@webdojo.com', 'katana12')

    cy.contains('Acesso negado! Tente novamente.')//busca texto já
      .should('be.visible')
  })

  it('Não deve logar com email não cadastrado', ()=>{
    cy.iniciar()
    cy.submeterLogin('errado@webdojo.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')//busca texto já
      .should('be.visible')
  })
})