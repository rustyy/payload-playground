# Role system

## run
- run ```yarn``` to install dependencies
- run ```yarn dev``` to start in dev mode (be aware database is dropped on every code change)

## generated data

### Groups
 
- Admin (admin) 
- Group A (a)
- Group B (b)
- User (user)

### Users

- admin@example.com , role: admin
- a1@example.com , role: a
- a2@example.com , role: a
- b@example.com , role: b
- user@example.com , role: user 
  
all user do have the same password: **test**

### Collection

- Users
- Collection A -> accessible by Group A
- Collection B -> accessible by Group B
