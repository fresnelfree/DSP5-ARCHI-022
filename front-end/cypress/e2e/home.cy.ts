describe('Test page Home', () => {
    it('Visits the initial project page', () => {
      cy.visit('/')
      cy.contains('Home')
      cy.contains('Thés')
      cy.contains('Thé')
      cy.contains('TheTipTop')
      cy.contains('types')
      cy.contains('Jeu')
      cy.contains('saveurs')
      cy.contains('bio')
      cy.contains('BIO')
      cy.contains('noir')
      cy.contains('vert')
    })
  })
  
  
  
  