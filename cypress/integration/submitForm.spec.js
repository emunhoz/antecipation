/// <reference types="cypress" />

context('get info about antecipations value', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('Fill all inputs to submit form', () => {
    cy.get('input#informe-o-valor-da-venda', { includeShadowDom: true }).type(100000)
    cy.get('input#em-quantas-parcelas', { includeShadowDom: true }).type(2, { force: true })
    cy.get('input#informe-o-percentual-de-mdr', { includeShadowDom: true }).type(2, { force: true })

    expect(cy.get('.boxs', { includeShadowDom: true }).click())

    expect(cy.get('.message', { includeShadowDom: true }).should('be.visible'))
  })
})
