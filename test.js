 query ViewerQuery {
  		user(login:"myogeshverma"){
    		name
        login
        iconImage:avatarUrl(size:20)
        profileImage:avatarUrl(size:50)
        bioHTML
        companyHTML
        email
        location
    		repository(name:"Blog-with-php") {
           object(expression: "master:blog") {
     		... on Blob{
          text
        }
        ... on Tree{
        entries{
          name
          type
          mode
        }
      }
    }
      
  				name
      		description
      		descriptionHTML
      		resourcePath
      		viewerHasStarred
      		isFork
      		
      		
    		}
    		repositories(first:50) {
    		  edges {
    		    node {
              id
              description
              name
              url
              project(number:1){
                body
              }
              stargazers(first:1){
                 edges {
                  node {
                    id
                    name
                  }
                }
              }
              languages(first:1) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
              
    		    }
    		  }
    		}
       
    		
  		}
}


https://developer.github.com/v4/explorer/
https://dev-blog.apollodata.com/the-new-github-graphql-api-811b005d1b6e
https://react-bootstrap.github.io/components/navbar/