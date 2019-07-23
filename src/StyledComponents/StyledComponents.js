import React, { Fragment } from "react"
import Styled from "styled-components"

// Styled Components
const Button = Styled.a`
  ${({ primary }) => primary && `
    background: white;
    color: palevioletred;
  `}
`

export default () => (
  <Fragment>
    <Button
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </Button>
    <Button href="/docs" prefetch>
      Documentation
    </Button>
  </Fragment>
  )