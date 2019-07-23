import React from 'react'
import injectSheet from 'react-jss'

// React Jss
const styles = {
    background: 'white',
    color: 'palevioletred',
}

const Button = ({classes, children}) => (
  <a className={classes.button}>
        {children}
  </a>
)

const StyledButton = injectSheet(styles)(Button)


export default () => (
  <Fragment>
    <StyledButton
      href="https://github.com/styled-components/styled-components"
      target="_blank"
      rel="noopener"
      primary
    >
      GitHub
    </StyledButton>
    <StyledButton href="/docs" prefetch>
      Documentation
    </StyledButton>
  </Fragment>
  )