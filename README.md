1. proxy configuration: https://create-react-app.dev/docs/proxying-api-requests-in-development/

2. when tarn start front-end Proxy created with a specific port. if change port proxy at backend, then refresh frontend

3. start frontend: npm/yarn start
4. start backend: nodemon index.js
5. Entry->
    Home: Dashboard/Corporate   Services   Login/profile   Sign-up/sign-out    
    Dashoboard: Service     User    Bookings    
    Search:     Result      Inbox   Trolley     Location    Bookings
    Item:   Overview    Review
    Profile:    Overview    past-events
6.  results.map((ele,index)=>{
    <tag key={index}>{ele.attribute}</tag>
})
7. Expression ? : Link->routes
8. backend-> npm install nodemon -g --save
9. backend references to "https://github.com/Mingke1999/backend-dashboard"
10. react-redux-> store stay over all route from <Outlet/>
    reducer executes common actions and receiving signal from dispatch
    dispatch class  
    const mapStateToProps=(store)=>({userState:store.user})
    const mapDispatchToProps=(dispatch)=>({dispatch})
    export default connect(mapStateToProps,mapDispatchToProps)(User)
11. relative value, responsive css use number% or @medium screen and(){  }