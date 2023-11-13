describe('Test page A Propos', () => {
    it('Visits the initial project page', () => {
      cy.visit('/apropos')
      cy.contains('A-Propos')
      cy.contains('thés')
      cy.contains('TheTipTop')
      cy.contains('tombola')
      cy.contains('entreprise')
    })
  })
  
  
  
  