import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import PostsList from "../components/PostsList"
import Wrapper from "../components/Wrapper"
import SEO from "../components/SEO"
import PageTitle from "../components/PageTitle"
import ContentWrapper from "../components/ContentWrapper"

class Tags extends React.Component {
  render() {
    const posts = this.props.data.posts.edges

    return (
      <Layout location={this.props.location}>
        <SEO title={`Top blog posts on ${this.props.pageContext.tag}`} />
        <Wrapper>
          <ContentWrapper>
            <PageTitle>Posts tagged as #{this.props.pageContext.tag}</PageTitle>
            <PostsList posts={posts} />
          </ContentWrapper>
        </Wrapper>
      </Layout>
    )
  }
}

export default Tags

export const pageQuery = graphql`
  query PostsByTag($tag: String!) {
    posts: allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          tags: { eq: $tag }
          published: { ne: false }
          unlisted: { ne: true }
        }
      }
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            language
            slug
          }
        }
      }
    }
  }
`
