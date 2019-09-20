import React from 'react'

import { Helmet } from 'react-helmet'

export const delimiter = "|"
export const appTitle = "4C Member Lookup"

export default function Title(props) {
   return (
      <Helmet>
         <title>{props.name} {delimiter} {appTitle}</title>
      </Helmet>
   )
}