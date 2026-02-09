Cypress.Commands.add("fillConsultancyForm", (form) => {


    cy.get('#name').type(form.name)

    cy.get('#email').type(form.email)

    cy.get('#phone').type(form.phone)
    //.should('have.value', '(11) 99999-1000')//confirma o valor 

    cy.get('#consultancyType').select(form.consultancyType)//select usado para caixas de option

    if (form.personType == 'cpf') {
        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()
            .should('be.checked')//garante que foi marcado

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')//garante que não foi marcado

        cy.get('#document')//cpf
            .type(form.document)
            .should('have.value', '346.795.940-71')//checa se a máscara do campo está funcionando pelo value
    }

    if (form.personType == 'cnpj') {
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .check()
            .should('be.checked')//garante que foi marcado

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .should('be.not.checked')//garante que não foi marcado

        cy.get('#document')//cpf
            .type(form.document)
            .should('have.value', '73.742.625/0001-00')//checa se a máscara do campo está funcionando pelo value
    }


    form.discoveryChannels.forEach((channel) => {//marca cada um e checa se foi marcaddo
        cy.contains('label', channel)
            .find('input')
            .check()
            .should('be.checked')
    })

    cy.get('input[type="file"]')//encontra o campo de upar documento, mesmo que escondido
        .selectFile(form.file, { force: true })//seleciona o arquivo da pasta fixtures do projeto e força o upload pq ele ta hidden no html

    cy.get('#details')//campo de texto maior apenas
        .type(form.description)


    form.techs.forEach((tech) => {//pra cada uma ele escreve a tecnologia e aperta o enter do teclado
        cy.get('#technologies')
            .type(tech)
            .type('{enter}')

        cy.contains('label', 'Tecnologias')//checa se a tag apareceu
            .parent()
            .contains('span', tech)
            .should('be.visible')
    })

    if (form.terms == true) {

        cy.contains('label', 'termos de uso')//marca os termos de uso
            .find('input')
            .check()
            .should('be.checked')
    }
})

Cypress.Commands.add("submitConsultancyForm", () => {
    cy.contains('button', 'Enviar formulário')//aperta o botão de enviar formulario
        .click()
})

Cypress.Commands.add("validateConsultancyForm", () => {
    cy.get('.modal', { timeout: 7000 })//timeout explícito
        .should('be.visible')

    cy.contains('Sucesso!')//checa se um elemento da janela de confimação apareceu
        .should('be.visible')

    cy.contains('button', 'Fechar')//fecha a janela de confirmação
        .should('be.visible')
        .click()

    cy.contains('h1', 'Consultoria')//checa se voltou para a página desejada pelo h1 do formulário de consultorias
        .should('be.visible')
})