# Project EventEasy
- start frontend: 
>npm/yarn start

| Page               | isFinished | Function                                            |
| ---                | ---        | ---                                                 |
| Home               | T          | Components:navbar, service filters, service display       |
| Navbar    | T   | Register, Login, Profile, Dashboard, Shopping Cart, Home Shortcut |
| Login              | T          | Login users and merchants    |
| Register           | T          | User 5, Merchant 3, If succeed -> get user logged in| 
| Dashboard.Service  | T          | Service create, view, update, delete access 3, 5    |
| Dashboard.User     | T          | Admin access only create, update, delete user, search record by name       |
| Dashboard.Event    | T          | Merchant accept or reject, admin operates on 7 status    |
| Event              | T          | Events are created by users                         |
| Result             | T          | Fetch service details and reviews  |
| Profile.History    | T          | Display get paid User events     |
| Profile.Details    | T          | DisPlay and Edit User Basic Details                 |
| Checkout           | T          | Make Payment by sum of all services of an event     |
| ShoppingCart.Event | T          | Get event by UserId, send request, cancel           |
| Cart.Service       | T          | Get Services by EventId from eventServices, remove  |
| Profile.MakeReview | T          | User makes reviews to one or all services  |
| NotFound | T          |Avoid mistake URLs response 404 page with home page button |

- react loop array:
  ```javascript
  results.map((ele,index)=>{<tag key={index}>{ele.attribute}</tag>})
  ```
- to write switch inside of map render
  ```javascript
  const switchFunction(parameter)
  {
    switch(parameter){
      case value:return ; break;
      default; break;
    }
  }

  variable.map((element)=>{
    switchFunction(element);
  })
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
- > npm install antd
- > npm install @mui/material @emotion/react @emotion/styled
- > npm install @date-io/date-fns date component
- > npm install @chatscope/chat-ui-kit-react
- > npm install react-router-dom
- > npm install axios
- > npm install redux-thunk
- > npm install react-promise-tracker --save
- > npm install react-loader-spinner --save
- > npm install @paypal/react-paypal-js
## Thanks for watching
![The End](https://media.istockphoto.com/vectors/the-final-screen-of-the-movie-the-end-vector-id491725918?k=6&m=491725918&s=170667a&w=0&h=80QAVJqPbkBHwxgxdb5SVYKNn5cUPeJ8rQjyg1EnFMg=)