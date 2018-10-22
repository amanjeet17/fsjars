import React,{Component} from 'react';
import Institute from './eachinstitute';
import axios from 'axios';
let array;
let array1;
let pageLimit;
let pagearr;
let newinstitute;
class All extends Component{
  constructor(props){
    super(props)
    this.state={
      institutes:[],
      page:0
    }
  }
  Delete = (e) => {
    var x = e.target.id;
    let obj={};
    obj.x = x;
    axios.post('/api/resume/delete', obj)
      .then(res =>'hi')
      .catch(err =>{
        console.log("post error",err);
      });
      newinstitute =this.state.institutes.filter((element) => element.name !== x);
      console.log("newinstitute",newinstitute);
      this.setState({
        institutes:newinstitute
      });
  }

  firstPage = (e) =>{
    console.log("firstPage called");
  let p= this.state.page;
  let item = this.state.institutes.length;
  // console.log(p,item);
  pageLimit = Math.ceil(item/5);
   pagearr = Array.from(new Array(pageLimit), () => 0);
  let offset = ((p+1)*5);
  array1 = this.state.institutes;
   array = array1.slice((p*5),offset );

}

changePage = (e) =>{
  let x=e.target.id;
  let p=parseInt(x);
  let item = this.state.institutes.length;
  pageLimit = Math.ceil(item/5);
  let offset = ((p+1)*5);
  array1 = this.state.institutes;
   array = array1.slice((p*5),offset );
  this.setState({
    page: p
  })

}

  componentDidMount(){
     axios.get('/api/resume/all')
    .then(res =>{
      console.log("Get all response",res.data);
      this.setState({
        institutes:res.data
      })
    })
    .catch(err =>{
      console.log("Get All error",err);
    });
  }


  render(){
    this.firstPage();
  return(
      <div className="main">
      <div className="table-responsive" style={{width: "100%"}}>
         <table className="table table-hover">
           <thead>
             <tr>
               <th>S.No</th>
               <th>Patient Name</th>
               <th>City</th>
               <th>Contact</th>
               <th> View</th>
               <th> Erase</th>
             </tr>
           </thead>
           <tbody>
           {
             array.map((institute,index)=>{
               return(
                 <Institute key={index.toString()} institute={institute} index={index} Delete={this.Delete}/>
               )
             })
           }
           </tbody>
         </table>
              <div id="game">
                  <ul className="pagination" onClick={this.changePage}>
                  {
                    pagearr.map((obj,i) =>{
                      return(
                      <li key={i.toString()} id={i}><a id={i}>{i+1}</a></li>
                      )
                    })
                  }
                  </ul>
              </div>
            </div>
      </div>
    )
  }
}
export default All;
