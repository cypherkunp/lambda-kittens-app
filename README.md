# lambda-kittens-app

Sample CRUD app deployed on AWS lamdba using serverless

### Service Information

-   service: lambda-kittens-app
-   stage: dev
-   region: us-east-1
-   stack: lambda-kittens-app-dev
-   resources: 33
-   api keys:
    None

### endpoints:

-   POST - https://sr5virhyek.execute-api.us-east-1.amazonaws.com/dev/v1/kitten
-   GET - https://sr5virhyek.execute-api.us-east-1.amazonaws.com/dev/v1/kitten
-   GET - https://sr5virhyek.execute-api.us-east-1.amazonaws.com/dev/v1/kitten/{name}
-   PATCH - https://sr5virhyek.execute-api.us-east-1.amazonaws.com/dev/v1/kitten/{name}
-   DELETE - https://sr5virhyek.execute-api.us-east-1.amazonaws.com/dev/v1/kitten/{name}

### functions:

-   create: lambda-kittens-app-dev-create
-   list: lambda-kittens-app-dev-list
-   get: lambda-kittens-app-dev-get
-   update: lambda-kittens-app-dev-update
-   delete: lambda-kittens-app-dev-delete

### layers:

    None
