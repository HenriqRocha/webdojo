describe('Kanban board', ()=>{

    it('Deve mover uma tarefa de To Do para Done e atualizar o Board', ()=>{
        cy.login()
        cy.goTo('Kanban', 'Kanban')
        
        const dataTransfer = new DataTransfer() //objeto para fazer a transferência de html para outras partes do documento

        cy.contains('div[draggable=true]', 'Documentar API')
            .trigger('dragstart', {dataTransfer})//simula o clique + segurar com o mouse do objeto encontrado

        cy.get('.column-done')//encontra onde dropar o objeto
            .trigger('drop', {dataTransfer})//de fato solta o objeto na área desejada
            .find('h3')
            //.should('have.text', 'Done')//verificação dupla de atualização da interface
            .parent()
            .should('include.text','Documentar API')
    })
})