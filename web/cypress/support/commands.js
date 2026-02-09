// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-real-events'
import './actions/consultancy.actions'
import { obterDataHoje } from './utils'

Cypress.Commands.add('iniciar', ()=>{
    cy.visit('/')
})

Cypress.Commands.add('submeterLogin', (email, senha)=>{//novo comando para fazer coisas que mais de uma função de teste fazem
    cy.get('#email').type(email)
    cy.get('#password').type(senha)

    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('goTo', (buttonName, pageTitle)=>{//navegação nas seções do site
    cy.contains('button', buttonName)
            .should('be.visible')
            .click()

        cy.contains('h1', pageTitle)
            .should('be.visible')
})

Cypress.Commands.add('login', (ui = false)=>{//helper geral
    if(ui === true){
        cy.iniciar()
        cy.submeterLogin('papito@webdojo.com', 'katana123')
    } else{
        const token = 'e1033d63a53fe66c0fd3451c7fd8f617'
        const loginDate = obterDataHoje()

        cy.setCookie('login_date', loginDate)

        cy.visit('/dashboard', {
            onBeforeLoad(win){
                win.localStorage.setItem('token', token)
            }
        })
    }
        
})