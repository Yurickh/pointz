import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

export const Brand = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "brand.png" }) {
        childImageSharp {
          fixed(height: 30) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Img
      loading="eager"
      fixed={data.placeholderImage.childImageSharp.fixed}
      alt="Pointz brand"
    />
  )
}
