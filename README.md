# Project EventEasy
![eventeasy](https://alacritas.cis.utas.edu.au/~mingked/kit301/PNGs/logo.png)
## Frontend
- start frontend: npm/yarn start
- Entry:Home: 
  - Dashboard/Corporate
    - Services   Login/profile   Sign-up/sign-out    
      - Dashoboard: Service     User    Bookings    
  - Search:     Result      Inbox   Trolley     Location    Bookings
  - Item:   Overview    Review
  - Profile:    Overview    past-events

- react loop array:
  ```javascript
  results.map((ele,index)=>{<tag key={index}>{ele.attribute}</tag>})
  ```

- { Expression ? : Link->routes }

- react-redux-> store stay over all route from <Outlet/>
  - reducer executes common actions and receiving signal from dispatch
  - dispatch class  
  - const mapStateToProps=(store)=>({userState:store.user})
  - const mapDispatchToProps=(dispatch)=>({dispatch})
  - export default connect(mapStateToProps,mapDispatchToProps)(User)

- relative value, responsive css use number% or @medium screen and(){  }
- Use <Outlet/> same page sub routing
    - first use <Outlet/> occupy a position, and use <Link/>  routing page
    - configure routing path by <Route> <Route/> </Route>
- if the path not exit, * could be used to response 404
- npm install @mui/material @emotion/react @emotion/styled
- npm install @date-io/date-fns date component
- npm install @chatscope/chat-ui-kit-react

## Backend
- 1. proxy configuration
  - [proxy configure ](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
- 2. When start front-end
  - Proxy created with a specific port
  - if change port proxy at backend, then need to refresh frontend
- 3. start backend
  - nodemon index.js
- nodemon
 - npm install nodemon -g --save
 - [backend source](https://github.com/Mingke1999/backend-dashboard)