describe('End to End', () => {
    it('Fazer Login com credenciais incorretas', () => {
        cy.visit('https://tcc-quiz-motor.web.app');
        cy.login('admin', '12345');
    
        expect(cy.get('.error-message').should('contain', 'Usuário ou senha incorretos')).to.exist;
    })

    it('Fazer Login com sucesso', () => {
        cy.visit('https://tcc-quiz-motor.web.app');
        cy.login('admin', '1234');

        expect(cy.get('.text-5xl').should('contain', 'Manuais Disponíveis')).to.exist;
    })

})