// ...
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink, ApolloLink } from '@apollo/client';
// import Login from "./components/Register";
import Register from "./components/Register";
import Login from "./components/Login";
import Verification from "./components/Verification";
import Home from "./components/Home/Home";
import Profile from "./Profile/Profile";
import { UseCurrentUser } from "./Context/UserContext";
import MainPage from "./MainPageRoute";
import ForgotPassword from "./components/ForgotPassword";
import ResPas from "./resPas/ResPas";
import ResetPassword from "./components/ResetPassword";

// ...

function App(){
  const {getUser, setUserToLocalStorage, getToken} = UseCurrentUser()
  // console.log(getUser().token);1

  const backendUrl = 'http://localhost:8080/query'
  const apolloLink = new ApolloLink((operation, forward) => {
    // console.log(getToken())
    const token = getToken()
    // console.log(getUser());
    
    // console.log(token);
    
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
    return forward(operation);
  });
  const httpLink = createHttpLink({ uri: backendUrl })
  const client = new ApolloClient({
    link: apolloLink.concat(httpLink),
    cache: new InMemoryCache({})
  });

  return (
    
      <Router>
        <ApolloProvider client={client}>
          <Routes> 
            <Route path="/" element={<Register />} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/ResetPassword" element={<ResPas/>}/>
            <Route path="/ResetPassword/:id" element={<ResetPassword/>}/>
            <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
            <Route path="/MainPage/*" element={<MainPage/>}/>
            <Route path="/Verification/:id" element={<Verification/>}/>
            {/* <Route path="/Home" element={<Home/>}/> */}
            {/* <Route path="/Profile/:id" element={<Profile/>}/> */}
          </Routes>
        </ApolloProvider>
      </Router>
    
  )
}

export default App