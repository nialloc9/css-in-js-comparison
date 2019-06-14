import React, { Fragment } from "react"
import {styled} from "styletron-react";

const Button = styled("a", props => props.primary ? {background: "white", color: "palevioletred"} : {});

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