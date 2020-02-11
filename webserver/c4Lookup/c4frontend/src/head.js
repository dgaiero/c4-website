import { Helmet } from 'react-helmet'
import React from 'react'

export const delimiter = "|"
export const appTitle = "4C Collaborator Lookup"

export default function Title(props) {
   return (
      <Helmet>
         <title>{props.name} {delimiter} {appTitle}</title>
      </Helmet>
   )
}