describe('iFrame', ()=>{

    it('Deve poder tocar o video de exemplo', ()=>{//video dentro de um iframe 
        cy.login()
        cy.goTo('Video', 'Video')

        cy.get('iframe[title="Video Player"]')//encontra o iFrame com algum atributo dele
            .should('exist')
            .its('0.contentDocument.body')//navega dentro do document html do iFrame, no body dele onde tem o video
            .then(cy.wrap)//pelo que eu entendi isso transforma o conteúdo encontrado no body como um elemento utilizável no cypress
            .as('iFramePlayer')//apelido

        cy.get('@iFramePlayer')//pega o elemento
            .find('.play-button')//encontra o botão de play pela classe css
            .click()

        cy.get('@iFramePlayer')//mesma coisa para o botão de pause que aparece depois que o video está rodando
            .find('.pause-button')
            .should('be.visible')
    })
})