import React from 'react'

const Filter = (props:any) => {
    // console.log(props.setState)
    // console.log('akakjak')
  return (
    <div className="button-filter">
        <button onClick={()=>{console.log('aaw');props.setState('all')}}>
            All
        </button>
        <button onClick={()=>{console.log('aaww');props.setState('users')}}>
            Users
        </button>
        <button onClick={()=>{console.log('aasdtrghw');props.setState('posts')}}>
            Posts
        </button>
    </div>
  )
}

export default Filter