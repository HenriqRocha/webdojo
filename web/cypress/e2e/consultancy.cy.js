import { personal, company } from '../fixtures/consultancy.json'

describe('Formulário de Consultoria', () => {
    beforeEach(() => {//nome já diz, como aqui é pra testar uma área que não é do login, separo o que os testes realmente devem fazer
        cy.login()
        cy.goTo('Formulários', 'Consultoria')//função criada pra navegar nas páginas
    })

    it('Deve solicitar consultoria individual', () => {

        cy.fillConsultancyForm(personal)

        cy.submitConsultancyForm()

        cy.validateConsultancyForm()

    })

    it('Deve solicitar consultoria In Company', () => {

        cy.fillConsultancyForm(company)

        cy.submitConsultancyForm()

        cy.validateConsultancyForm()

    })

    it('Deve verificar os campos obrigatórios', () => {

        cy.submitConsultancyForm()

        const requiredFields = [
            { label: 'Nome Completo', message: "Campo obrigatório" },
            { label: 'Email', message: "Campo obrigatório" },
            { label: 'termos de uso', message: "Você precisa aceitar os termos de uso" }
        ]

        requiredFields.forEach(({label, message}) => {
            cy.contains('label', label)
                .parent()
                .contains('p', message)
                .should('be.visible')
                .and('have.class', 'text-red-400')//garantindo a validação do estilo pela classe
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })
    })
})