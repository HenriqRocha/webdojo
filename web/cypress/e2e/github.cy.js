describe('Gerenciamento de perfis no GitHub', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo("Tabela", 'Perfis do GitHub')
    })

    it('Deve poder cdastrar um novo perfil do GitHub', () => {

        cy.get('#name').type('Henrique Rocha')

        cy.get('#username').type('henriqRocha')

        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        //validar valores em tabelas dessa forma permite você encontrar as linhas que contém
        // o indentificador único de cada linha e então verificar outros elementos nessa mesma linha da tabela
        // sem correr o risco de validar um valor de outra parte da página
        cy.contains('table tbody tr', 'henriqRocha')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('td', 'Henrique Rocha')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')
    })

    it('Deve poder remover um perfil do GitHub', ()=>{
        const profile = {
            name: 'Fernando Papito',
            username: 'papito123',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)

        cy.get('#username').type(profile.username)

        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('button[title="Remover perfil"]')
            .click()

        cy.contains('table tbody', profile.username)//o corpo da tabela não pode ter nenhum registro referente a essa profile no DOM
            .should('not.exist')


    })

    it('Deve validar o link gitHub', ()=>{
        const profile = {
            name: 'Henrique Rocha',
            username: 'henriqRocha',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)

        cy.get('#username').type(profile.username)

        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .find('a')
            .should('have.attr', 'href', "https://github.com/" + profile.username)//validando link externo
            .and('have.attr', 'target', '_blank')


    })
})