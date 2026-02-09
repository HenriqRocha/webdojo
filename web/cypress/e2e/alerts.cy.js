describe('Validações de alertas em JavaScript', ()=>{
    beforeEach(()=>{
        cy.login()
        cy.goTo('Alertas JS', 'JavaScript Alerts')
    })

    it('Deve validar a mensagem de alerta', ()=>{

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Olá QA, eu sou um Alert Box!')//cria um listener para quando  alerta a parecer no navegador
        })
        cy.contains('button', 'Mostrar Alert').click()
    })

    it('Deve confirmar um diálogo e validar a resposta positiva', ()=>{
        cy.on('window:confirm', (msg)=>{
            expect(msg).to.equal('Aperte um botão!')//mesma coisa com o window confirm
            return true //ok
        })

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Você clicou em Ok!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it('Deve cancelar um diálogo e validar a resposta negativa', ()=>{
        cy.on('window:confirm', (msg)=>{
            expect(msg).to.equal('Aperte um botão!')
            return false//cancelar
        })

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Você cancelou!')
        })

        cy.contains('button', 'Mostrar Confirm').click()
    })

    it("Deve interagir com um prompt, inserir um texto e validar a mensagem", ()=>{
        cy.window().then((win)=>{
            cy.stub(win, 'prompt').returns('kike')//esse aqui para preencher o prompt de alerta
        })

        cy.on('window:alert', (msg)=>{
            expect(msg).to.equal('Olá kike! Boas-vindas ao WebDojo!')
        })

        cy.contains('button', 'Mostrar Prompt').click()
    })
})