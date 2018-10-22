import React,{Component} from 'react';
import axios from 'axios';

class One extends Component{
  constructor(props){
    super(props)
    this.state={
      institutes:[]
    }
  }

  componentDidMount(){
    const id=this.props.match.params.id;
    console.log("ID",id);
    axios.get('/api/resume/one/'+id)
    .then(res =>{
      console.log("Get all response",res.data);
      this.setState({
        institutes:[res.data]
      })
    })
    .catch(err =>{
      console.log("Get All error",err);
    });
  }

  render(){
  return(
      <div className="main">
        {
          this.state.institutes.map((institute)=>{
            return(
            <div className="institute" id={institute._id} >
            <div className="col-xs-12 gap" >
              <div className="col-xs-12 col-sm-2 labele">
                <label >Name : </label>
              </div>
              <div className="col-xs-12 col-sm-10">
                <input className="gap" disabled value={institute.name} />
              </div>
          </div>
            <div className="col-xs-12 gap" >
              <div className="col-xs-12 col-sm-2 labele">
                <label >Email : </label>
              </div>
              <div className="col-xs-12 col-sm-10">
                <input className="gap" disabled value={institute.email} />
              </div>
            </div>

            <div className="col-xs-12 gap">
              <div className="col-xs-12 col-sm-2 labele">
                <label >Address : </label>
              </div>
              <div className="col-xs-12 col-sm-10">
                <input className="gap" disabled value={institute.addressline1}/>
                <input className="gap" disabled value={institute.addressline2} />
                <div className="col-xs-12 col-sm-6 padl">
                  <input className="gap" disabled value={institute.city} />
                </div>
                <div className="col-xs-12 col-sm-6 padr">
                  <input className="gap" value={institute.state} />
                </div>
                <div className="col-xs-12 col-sm-6 padl">
                  <input className="gap" disabled value={institute.locality} />
                </div>
                <div className="col-xs-12 col-sm-6 padr">
                  <input className="gap" disabled value={institute.pincode} />
                </div>
              </div>
            </div>
            <div className="col-xs-12 gap">
              <div className="col-xs-12 col-sm-2 labele">
                <label >Contact : </label>
              </div>
              <div className="col-xs-12 col-sm-10">
              {
                institute.contactdetails.map((contact)=>{
                  return(
                    <input className="gap" disabled value={contact.phntype +" : "+ contact.number}/>
                  )
                })
              }
              </div>
            </div>
            </div>
            )
          })
        }

      </div>
    )
  }
}
export default One;
