// ...
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
// import Login from "./components/Register";
import Register from "./components/Register";
import Login from "./components/Login";
import Verification from "./components/Verification";
import Home from "./components/Home";
import Profile from "./Profile/Profile";
// ...
function App(){

  const httpLink = createHttpLink({
    uri: 'http://localhost:8080/query'
  })

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({})
  })

  return (
    
      <Router>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Verification/:id" element={<Verification/>}/>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/Profile/:id" element={<Profile/>}/>
          </Routes>
        </ApolloProvider>
      </Router>
    
  )
}

export default App