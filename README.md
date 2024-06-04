<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>

<h1 align="center">
  Medusa + NextJS
</h1>

<p align="center">
Hosted on Vercel <br>
Storefront: https://project-medusa-storefront.vercel.app/ <br>
Admin Panel: https://project-medusa-backend.vercel.app/
</p>


# How to run locally

### Clone the repo
Start by cloning [this repo](https://github.com/DEF4LT-303/Project-Medusa/tree/starter "this repo")
```shell
git clone -b starter https://github.com/DEF4LT-303/Project-Medusa.git
```

# Setting up the Backend
### Setting up the environment variables
Navigate to the backend directory and set up environment variables:
```shell
cd medusa-backend/
cp .env.template .env
```

- Add [Supabase](https://supabase.com "Supabase") postgresql connection URI

### Install dependencies
Install the required dependencies
```shell
npm install
```

### Seed the database
To access the admin panel, the db needs to be seeded with dummy data
```shell
npm run seed
```
[!] It takes a while to seed, if the admin user in the db doesn't show up, please try seeding again.

### Start the server
Start the medusa backend + admin panel
```shell
npm run dev
```

### The server is now running

The backend is now running at http://localhost:9000 and
The admin panel is now running at http://localhost:7001!

The admin login credential is <br>
`email: admin@medusa-test.com` <br>
`password: supersecret`

# Setting up the Storefront
### Setting up the environment variables

Once backend is running, navigate to the storefront and add environment variables:

```shell
cd medusa-storefront/
cp .env.template .env.local
```

### Install dependencies
Install the required dependencies
```shell
npm install
```

### Start the client
Start the storefront
```shell
npm run dev
```

### The client is now running

Your site is now running at http://localhost:8000!

