# JSON Web Token Authentication and Authorization API
<p align="justify">
This repository provides the source code for a Node.js Web API implementing JWT-based authentication and authorization.
The implementation utilizes Express.js as the foundation for a fast and scalable web server, and MongoDB for persistent data storage. More about JSON Web Tokens can be found at <a href="https://github.com/mkokor/jwt-auth-dotnet-6-api#readme">https://github.com/mkokor/jwt-auth-dotnet-6-api#readme</a>.
</p>

## Key Features

- **Registration** <p align="justify">Users can register a new user account by providing required data.</p>
- **Authentication** <p align="justify">Users can authenticate themselves using their usernames and passwords. Upon successful authentication, access token and refresh token are generated. Access token, which grants access to protected resources, is stored in http response body. Refresh token, which enables the user to refresh access token without going through auntentication process again, is securely stored in HttpOnly cookie.</p>
- **Authorization** <p align="justify">The API supports defining different roles and permissions for users. This enables fine-grained control over access to various parts of the application based on user roles.</p>
- **Refresh Token Rotation** <p align="justify">To enhance security, the API implements a refresh token rotation mechanism. After each request to refresh the access token, a new refresh token is used, minimizing the exposure time to potential threats.</p>  
