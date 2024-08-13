import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/page'
import React from 'react'
 
describe('Page', () => {
  it('should render the main element', () => {
    render(<Page />)
 
    const main = screen.getByTestId("main")
 
    expect(main).toBeInTheDocument()
  })
})