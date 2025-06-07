describe('End to End', () => {
    it('Fazer Login com credenciais incorretas', () => {
        cy.login('admin', '12345');
    
        expect(cy.get('.error-message').should('contain', 'Usuário ou senha incorretos')).to.exist;
    })

    it('Fazer Login com sucesso', () => {
        cy.login('admin', '1234');

        expect(cy.get('.text-5xl').should('contain', 'Manuais Disponíveis')).to.exist;
    })

    it('Responder o quiz na ordem incorreta', () => {
        cy.visit('https://tcc-quiz-motor.web.app/QuizMotor');
        cy.get('.bg-blue-600').click();

        cy.get('[style="left: 61%; top: 85%; transform: translate(-50%, -50%); width: 170px; height: 80px;"]').click();
        expect(cy.get('.text-lg').should('contain', 'Game Over')).to.exist;
    })
    
    it('Responder caixa 1 com resposta incorreta', () => {
        cy.visit('https://tcc-quiz-motor.web.app/QuizMotor');
        cy.get('.bg-blue-600').click();

        cy.get('[style="left: 61%; top: 31%; transform: translate(-50%, -50%); width: 160px; height: 80px;"]').click();
        cy.get('.border').type("0.5")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('contain', 'Game Over')).to.exist;
    })

    it('Responder caixa 1 com resposta correta (0.07)', () => {
        cy.visit('https://tcc-quiz-motor.web.app/QuizMotor');
        cy.get('.bg-blue-600').click();

        cy.get('[style="left: 61%; top: 31%; transform: translate(-50%, -50%); width: 160px; height: 80px;"]').click();
        cy.get('.border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('not.exist')).to.exist;
    })

    it('Responder caixa 2 com resposta incorreta', () => {
        cy.get('.bg-blue-500').click();
        cy.get('.bg-white > .border').type("0.5")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('contain', 'Game Over')).to.exist;
    })

    it('Responder caixa 2 com resposta correta (0.07)', () => {
        cy.contains('Reiniciar Quiz').click()

        cy.get('[style="left: 61%; top: 31%; transform: translate(-50%, -50%); width: 160px; height: 80px;"]').click();
        cy.get('.border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        cy.get('.bg-blue-500').click();
        cy.get('.bg-white > .border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('not.exist')).to.exist;
    })

    it('Responder caixa 3 com resposta incorreta', () => {
        cy.get('.justify-between > .bg-blue-600').click();
        cy.get('[style="left: 36%; top: 39%; transform: translate(-50%, -50%); width: 150px; height: 80px;"]').click();
        cy.get('.border').type("0.5")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('contain', 'Game Over')).to.exist;
    })

    it('Responder caixa 3 com resposta correta (0.07)', () => {
        cy.contains('Reiniciar Quiz').click()

        cy.get('[style="left: 61%; top: 31%; transform: translate(-50%, -50%); width: 160px; height: 80px;"]').click();
        cy.get('.border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        cy.get('.bg-blue-500').click();
        cy.get('.bg-white > .border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        cy.get('.justify-between > .bg-blue-600').click();
        
        cy.get('[style="left: 36%; top: 39%; transform: translate(-50%, -50%); width: 150px; height: 80px;"]').click();
        cy.get('.border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('not.exist')).to.exist;
    })

    it('Responder caixa 4 com resposta incorreta', () => {
        cy.get('.bg-blue-500').click();
        cy.get('.bg-white > .border').type("0.5")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('contain', 'Game Over')).to.exist;
    })

    it('Responder caixa 4 com resposta correta (0.07)', () => {
        cy.contains('Reiniciar Quiz').click()

        cy.get('[style="left: 61%; top: 31%; transform: translate(-50%, -50%); width: 160px; height: 80px;"]').click();
        cy.get('.border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        cy.get('.bg-blue-500').click();
        cy.get('.bg-white > .border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        cy.get('.justify-between > .bg-blue-600').click();
        
        cy.get('[style="left: 36%; top: 39%; transform: translate(-50%, -50%); width: 150px; height: 80px;"]').click();
        cy.get('.border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();

        cy.get('.bg-blue-500').click();
        cy.get('.bg-white > .border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('not.exist')).to.exist;
    })

    it('Responder caixa 5 com resposta incorreta', () => {
        cy.get('.justify-between > :nth-child(3)').click();
        cy.get('[style="left: 33%; top: 40%; transform: translate(-50%, -50%); width: 220px; height: 80px;"]').click();
        cy.get('.border').type("0.5")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('contain', 'Game Over')).to.exist;
    })

    it('Responder caixa 5 com resposta correta (0.07)', () => {
        cy.contains('Reiniciar Quiz').click()

        cy.get('[style="left: 61%; top: 31%; transform: translate(-50%, -50%); width: 160px; height: 80px;"]').click();
        cy.get('.border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        cy.get('.bg-blue-500').click();
        cy.get('.bg-white > .border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        cy.get('.justify-between > .bg-blue-600').click();
        
        cy.get('[style="left: 36%; top: 39%; transform: translate(-50%, -50%); width: 150px; height: 80px;"]').click();
        cy.get('.border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();

        cy.get('.bg-blue-500').click();
        cy.get('.bg-white > .border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('not.exist')).to.exist;

        cy.get('.justify-between > :nth-child(3)').click();
        cy.get('[style="left: 33%; top: 40%; transform: translate(-50%, -50%); width: 220px; height: 80px;"]').click();
        cy.get('.border').type("0.07")
        cy.get('.justify-between > .flex > .px-4').click();
        expect(cy.get('.text-lg').should('not.exist')).to.exist;
    })
})