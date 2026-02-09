describe('Links abrindo nova guia/janela', ()=>{

    beforeEach(()=>{
        cy.login()
    })

    it('Validando o atributo do link do Instagram', ()=>{//quando o link é de outra aplicação: validar os atributos do link
        cy.get('[data-cy="instagram-link"]')
            .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
            .and('have.attr', 'target', '_blank')
    })

    it('Acessa link de termos de uso removendo o target: _blank', ()=>{//quando é um link da mesma aplicação mas abre outra aba, remover 
                                                                            // o  atributo para abrir na mesma e garantir o caminho correto
        cy.contains('Formulários').click()
        cy.contains('a', 'termos de uso')
            .invoke('removeAttr', 'target')//chama uma função JS
            .click()

        cy.contains('h1', 'Termos de Uso').should('be.visible')
    })
})