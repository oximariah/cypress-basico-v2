///  <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => {
        cy.visit('./src/index.html')
         })

    it('verifica o título da aplicação', function() {            
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')      
    })
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'pode ajudar mesmo? real oficial, tem certeza?'

        cy.get('#firstName').type('Oxi')
        cy.get('#lastName').type('Maria')
        cy.get('#email').type('oxi@oxi.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('.button').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        
        cy.get('#firstName').type('Oxi')
        cy.get('#lastName').type('Maria')
        cy.get('#email').type('oxi@oxi')
        cy.get('#open-text-area').type('pode ajudar mesmo? real oficial, tem certeza?')
        cy.get('.button').click()

        cy.get('.error').should('be.visible')

    })

    it('valida telefone com numero nao numerico', function() {
        const longText = 'pode ajudar mesmo? real oficial, tem certeza?'

        cy.get('#phone').type('nanana')
            .should('be.empty')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longText = 'pode ajudar mesmo? real oficial, tem certeza?'

        cy.get('#firstName').type('Oxi')
        cy.get('#lastName').type('Maria')
        cy.get('#phone').type('nanana')
            .should('be.empty')
        cy.get('#email').type('oxi@oxi.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

   it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName')
            .type('Oxi')
                .should('have.value', 'Oxi')
            .clear()
                .should('be.empty')

        cy.get('#lastName')
            .type('Maria')
                .should('have.value', 'Maria')
            .clear()
                .should('be.empty')

        cy.get('#phone')
            .type('41985300123')
                .should('have.value', '41985300123')
            .clear()
                .should('be.empty')

        cy.get('#email')
            .type('oxi@oxi.com')                
                .should('have.value', 'oxi@oxi.com')
            .clear()
                .should('be.empty')
       
    }) 

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('.button').click()

        cy.get('.error').should('be.visible')
            
    })

    it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')

    })

    it('identificar elementos clicaveis', function() {
        cy.contains('button', 'Enviar').click()
        //cy.get('.button').click()

        cy.get('.error').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('select').select('youtube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product').select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product').select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check()
            .should('be.checked')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()
                .last()
                    .uncheck()
                    .should('not.be.checked')
    })

})