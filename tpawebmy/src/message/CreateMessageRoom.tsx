import { useMutation, useQuery } from '@apollo/client'
import React,{useState} from 'react'
import { UseCurrentUser } from '../Context/UserContext'
import { QUERY_ADD_ROOM, QUERY_GET_ROOM, QUERY_ROOM_MESSAGES } from '../getquery'
import { QUERY_GET_CONNECTIONS } from '../queris'
import "./message.scss"
import RoomComponent from './RoomComponent'
const CreateMessageRoom = () => {
    const {getUser} = UseCurrentUser()
    const {loading: loadingCon, error: errorCon, data: dataCon, refetch: ConRefetch} = useQuery(QUERY_GET_CONNECTIONS, {variables : {id: getUser().id},})
    const [inputText, setInputText] = useState('')
    const [functionAddRoom]=useMutation(QUERY_ADD_ROOM)
    const {loading: loadingGR, error: errorGR, data: dataGR, refetch: GRRefetch} = useQuery(QUERY_GET_ROOM, {
        variables:{userId: getUser().id}
    })
    if(loadingCon || loadingGR){
        return <h1>Fetching...</h1>
    }
    // console.log(dataCon.user.Connections)
    // console.log(dataGR)
    const handleAddRoom=(e:any)=>{
        // console.log(e)
        functionAddRoom({
            variables:{
                userId1: getUser().id,
                userId2: e.id
            }
        }).then(()=>{
            GRRefetch()
        })
    }
    
  return (
    <div className="search-people-connect">
        <input onChange={(e)=>{setInputText(e.target.value)}} type="text" name="" id="" />
        {   
            inputText === 's' ? 
            null:
            dataCon.user.Connections.map((e:any)=>{
                return (
                    
                    e.user1.id === getUser().id?
                    (
                        e.user2.name.toLowerCase().includes(inputText.toLowerCase()) === true ?
                        <div className="searchView" onClick={()=>{handleAddRoom(e.user2)}}>
                            <img className='searchView-pp' src={e.user2.profilePicture} alt="" />
                            <span>{e.user2.name}</span>
                        </div>
                        :
                        null
                    )
                    :
                    (
                        e.user1.name.toLowerCase().includes(inputText.toLowerCase()) === true ?
                        <div className="searchView" onClick={()=>{handleAddRoom(e.user1)}}>
                            <img className='searchView-pp' src={e.user1.profilePicture} alt="" />
                            <span>{e.user1.name}</span>
                        </div>
                        :
                        null
                    )
                )
            })
        }
        <h2>Rooms Chat</h2>
        {
            dataGR.rooms.map((e:any)=>{
                return <RoomComponent props={e}/>
            })
        }
    </div>
  )
}

export default CreateMessageRoom