# Project EventEasy
![eventeasy](https://hsfnotes.com/cybersecurity/wp-content/uploads/sites/33/2020/02/TMT-GettyImages-956353730-1024x534.jpg)
## Frontend
- start frontend: 
>npm/yarn start

| Page               | isFinished | Function                                            |
|  |  |
| Home               | F          | Entry to: profile, Login, Register, Dashboard       |
| Login              | T          | Login user                                          |
| Register           | T          | Register User 5, Merchant 3                         | 
| Dashboard          | F          | Manage user Service                                 |
| Dashboard.User     | F          | Admin create, update, delete user                   |
| Dashboard.Merchant | F          | Merchant create, update, delete events and service  |
| Event              | F          | Give correspoding event result                      |
| Result             | F          | Fetch related service for same event                |
| Profile            | F          |   to show user info or bookings                     |
| Checkout           | F          | Make Payment                                        |
| NavEvent           | T          | containing Inbox, trolley, location, Home, username |
| Inbox              | F          | Provide user with chat function                     |
| Trolley            | F          | check all user selected services                    |

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
> npm install @mui/material @emotion/react @emotion/styled
> npm install @date-io/date-fns date component
> npm install @chatscope/chat-ui-kit-react

## Backend
- 1. proxy configuration
  - [proxy configure ](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
- 2. When start front-end
  - Proxy created with a specific port
  - if change port proxy at backend, then need to refresh frontend
- 3. start backend
> nodemon index.js
- nodemon
> npm install nodemon -g --save
 - [backend source](https://github.com/Mingke1999/backend-dashboard)

