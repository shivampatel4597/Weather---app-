import React, { Component } from 'react';

class DataFetch extends  Component{
constructor(props){
    super(props)

    this.state={users:null, location:""};
 }

 componentDidUpdate(prevProps, prevState){
    // Only fetch new data if the location state has changed
    if (prevState.location !== this.state.location ) {
        this.fetching(this.state.location);
      }

 }

 fetching = async (city)=>{
    try{

        const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=c2a623add98448cfa4272716240806&q=${city}&aqi=no`)
        const response = await data.json();
       //  console.log(response)
        this.setState({users:response }, () => {
            // This callback runs after the state has been updated
            console.log("users are", this.state.users);
          })
       
        
    }

    catch(error){
        console.log(error)
    }
}


 render(){

    return(


<>

   <input placeholder='enter your city' onChange={(e)=>this.setState({location:e.target.value})}/>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">country</th>
            <th scope="col">name</th>
            <th scope="col">Temperature</th>
            <th scope="col">Humidity</th>
            <th scope="col">windspeed</th>
          </tr>
        </thead>
        <tbody>
            {
 this.state.users &&this.state.users.location && this.state.users.current && (
    
    <tr>
    <th scope="row">{1}</th>
    <td>{this.state.users.location.country}</td>
    <td>{this.state.users.location.name}</td>
    <td>{this.state.users.current.temp_c}</td>
    <td>{this.state.users.current.humidity}</td>
    <td>{this.state.users.current.wind_kph}</td>
</tr>
    )
  }
   
    
      
        </tbody>
      </table>
      </>
    )
 }

}

export default DataFetch;