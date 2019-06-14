import React, { Fragment } from "react"
import { css } from 'emotion'

const Button = ({primary, ...rest}) => <a
  className={css(primary ? {
    background: 'white',
    color: 'palevioletred'
  } : {})}
  {...rest}
/>

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