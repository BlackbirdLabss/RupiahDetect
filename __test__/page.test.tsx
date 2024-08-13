import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Main from '../src/app/main'
import React from 'react'
 
describe('Page', () => {
  it('should render the main element', () => {
    render(<Main />)
 
    const main = screen.getByTestId("main")
 
    expect(main).toBeInTheDocument()
  })
})