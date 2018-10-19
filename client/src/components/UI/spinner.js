import React from 'react'
import spinner from '../../assets/images/spinner.gif';

const Spinner = props => {
    return (
   <div>
       <img src={spinner} alt="loading..."
       style={{
           display:"block",
           margin:"auto",
           width:200
       }}
       />
   </div>
    )
}
export default Spinner