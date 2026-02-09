describe('Simulando Mouseover', ()=>{
    beforeEach(()=>{
        cy.login()
    })

    it('Deve mostrar texto ao passar o mouse em cima do @ do Instagram', ()=>{
        cy.contains('Isso é Mouseover!').should('not.exist')//verifica se não está no DOM, o not.be.visible não funciona aqui não sei porque
        cy.get('[data-cy="instagram-link"]')
            .scrollIntoView()
            .realHover()
        cy.contains('Isso é Mouseover!').should('be.visible')//da pra usar .exist, não sei exatamente a diferença ainda
    })
})