## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoint

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

<table>
API Endpoints
Module	Method	Path	Description
Products	POST	/products	Create a new product
Products	GET	/products	Get all products
Products	GET	/products/:id	Get a single product by ID
Products	PATCH	/products/:id	Update a product by ID
Products	PUT	/products/:id	Replace a product by ID
Products	DELETE	/products/:id	Delete a product by ID
Products	GET	/products/export	Export all products to a CSV file
User	POST	/user/register	Register a new user
User	GET	/user/profile	Get the profile of the logged-in user
Email	POST	/email/send	Add an email job to the queue
Email	GET	/email/status/:id	Get the status of an email job by ID
Email	GET	/email/log-all-jobs	Log all email jobs
Orders	POST	/orders	Create a new order
Orders	GET	/orders	Get all orders
Auth	POST	/auth/login	Login a user
Auth	POST	/auth/register	Register a new user
Auth	GET	/auth/logout	Logout the logged-in user
Auth	GET	/auth/refresh	Refresh access and refresh tokens
Auth	GET	/auth/profile	Get the profile of the logged-in user

<table>
    <thead>
        <tr>
            <th>Module</th>
            <th>Method</th>
            <th>Path</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Products</td>
            <td>POST</td>
            <td>/products</td>
            <td>Create a new product</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>GET</td>
            <td>/products</td>
            <td>Get all products</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>GET</td>
            <td>/products/:id</td>
            <td>Get a single product by ID</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>PATCH</td>
            <td>/products/:id</td>
            <td>Update a product by ID</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>PUT</td>
            <td>/products/:id</td>
            <td>Replace a product by ID</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>DELETE</td>
            <td>/products/:id</td>
            <td>Delete a product by ID</td>
        </tr>
        <tr>
            <td>Products</td>
            <td>GET</td>
            <td>/products/export</td>
            <td>Export all products to a CSV file</td>
        </tr>
        <tr>
            <td>User</td>
            <td>POST</td>
            <td>/user/register</td>
            <td>Register a new user</td>
        </tr>
        <tr>
            <td>User</td>
            <td>GET</td>
            <td>/user/profile</td>
            <td>Get the profile of the logged-in user</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>POST</td>
            <td>/email/send</td>
            <td>Add an email job to the queue</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>GET</td>
            <td>/email/status/:id</td>
            <td>Get the status of an email job by ID</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>GET</td>
            <td>/email/log-all-jobs</td>
            <td>Log all email jobs</td>
        </tr>
        <tr>
            <td>Orders</td>
            <td>POST</td>
            <td>/orders</td>
            <td>Create a new order</td>
        </tr>
        <tr>
            <td>Orders</td>
            <td>GET</td>
            <td>/orders</td>
            <td>Get all orders</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>POST</td>
            <td>/auth/login</td>
            <td>Login a user</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>POST</td>
            <td>/auth/register</td>
            <td>Register a new user</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>GET</td>
            <td>/auth/logout</td>
            <td>Logout the logged-in user</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>GET</td>
            <td>/auth/refresh</td>
            <td>Refresh access and refresh tokens</td>
        </tr>
        <tr>
            <td>Auth</td>
            <td>GET</td>
            <td>/auth/profile</td>
            <td>Get the profile of the logged-in user</td>
        </tr>
    </tbody>
</table>
