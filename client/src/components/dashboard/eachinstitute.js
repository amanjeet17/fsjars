import React,{Component} from 'react';
import axios from 'axios';

const Institute = (props) =>{

  return(
    <tr  id={props.institute._id} >
      <td>{props.index+1}</td>
      <td>{props.institute.name} </td>
      <td>{props.institute.city}</td>
      <td>{props.institute.contactdetails[0].number}</td>

      <td><a href={`/one/${props.institute._id}`} ><button type="button" className="btn btn-success">View</button></a></td>
      <td><button type="button" id={props.institute.name} className="btn btn-danger" onClick={props.Delete}>Delete</button></td>
    </tr>
  )
}
export default Institute;
