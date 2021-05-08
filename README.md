## Job App

#### Backend:

1. TypeGraphql + Apollo Server with Express.js + Typescript
2. Typorm as ORM (PostgreSQL)
3. lint-staged/husky/prettier/eslint to maitain clean code
4. Authentication with JWT (refresh-token in cookie, access-token)
5. Password reset and email confirmation with sendgrid and jwt
6. Saving images and cvs in datebase (postgre's bytea) - grapql-upload

---

#### Frontend

1. React + Apollo GraphQl + Typescript
2. Styled Compontents
3. Auth with apollo-link-token-refresh
4. Pagination with React Waypoint
5. Sending filies to server via apollo-upload-client
6. Displaying images from base64
7. Fully responsive

---

#### Example .env:

SENDGRID_API_KEY=
secret_2 =
secret =
email =
baseurl = http://localhost:3000
TYPEORM_CONNECTION = postgres
TYPEORM_HOST = localhost
TYPEORM_USERNAME = postgres
TYPEORM_PASSWORD = postgres
TYPEORM_DATABASE = postgres
TYPEORM_PORT = 5432
TYPEORM_SYNCHRONIZE = true
TYPEORM_ENTITIES = 'src/entity/\*'
TYPEORM_MIGRATIONS = 'src/migration/\*'
TYPEORM_MIGRATIONS_RUN = src/migration
TYPEORM_MIGRATIONS_DIR = src/migration
