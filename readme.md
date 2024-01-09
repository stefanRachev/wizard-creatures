1. Init project and structure
2. Setup developer environment
3. Install express and nodemon
    - configure body-parser
    - configure static middleware (public)
    - configure routs
4. Add images and css in public directory    
5. Add html in views directory
6. install express-handlebars
    - configure view engine
    - add main layout
    - fix public styles hyperlink 
    - render home page in hbs
7. Convert all html views to handlebars views
    - Group views by meaning
8. Add home controller
9. Add data base
    - install mongoose
    - connect to da
10. Prepare user functionality
    - user controller
    - add controller to routes
    - fix navigation in the nav bar(login ,register,logout)  
    - render login page 
    - render register page 
11. Add User model
    - simple validation in Schema
    - add method for register  
    - create first User record in the db
    - validate password miss match  
    - validate email already exists
12. Hash password
    - install bcrypt
    - hash password
13. Login
    - find user by email
    - validate password with hash
14. Generate jsonwebtoken
    - install jsonwebtoken
    - promisify jsonwebtoken
    - generate secret
    - generate token in service login
15. Return token in cookie   
    - install cookie-parser
    - configure cookie-parser
    - set cookie withe the token
16. Implement logout
17. Authentication middleware
    - create middleware directory
    - add auth middleware and import it in express configuration below cookieParser
    - decode the token    
    - handle invalid token
    - provide authorization
18. Dynamic navigation
    - conditional option in navigation  
    - add data to res.locals for hbs templates
19. Error handling
    - add 404 page
    - redirect missing rout to 404
    - add global error handled (option)
    - add error message util
20. Show error notification        



