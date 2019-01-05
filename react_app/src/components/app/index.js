import React from "react";
import Table from "./table/index";
import View from "./view/index";
import Form from"./form/index";
//import Incrementer from "./incrementer/index";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,

} from 'react-router-dom'



// const tableValues = [
//     ['101','Tony Stark','Iron Man','Avengers'],
//     ['102','Peter Parker','Spider Man','Avengers'],
//     ['103','Bruce Wayne','Bat Man','Justice League']
// ];

const tableHeaders = ['Id','Name','Alias','Team'];



class App extends React.Component {
    state = {
        // selectedId : -1,
        // selectedRecord : {}
        // tableValues : [
        //         ['101','Tony Stark','Iron Man','Avengers'],
        //         ['102','Peter Parker','Spider Man','Avengers'],
        //         ['103','Bruce Wayne','Bat Man','Justice League']
        //     ]
            
        tableValues : [ ]
            
    }

    // constructor(props)  {
    //     super(props)
    //     this.onViewClick = this.onViewClick.bind(this)
    // }

    // onViewClick(id) {
    //     console.log(id)
    //     const data=tableValues.find(val => val[0] === id)
    //     const newRecord = {
    //         name:data[1],
    //         alias:data[2],
    //         team:data[3]
    //     }
    //     this.setState({
    //         selectedId : id,
    //         selectedRecord : newRecord
        
    //     })
    // }


    constructor(props) {
        super(props);
        this.createRecord = this.createRecord.bind(this);
    }

    fetchList() {              //Api call
        let self = this;
        const request = new Request('/heroes',{method: 'GET' , headers: {"Content-Type" : "application/json"}});
        fetch(request)
        .then(res => res.json())
        .then(function(data) {
            self.setState({'tableValues' : data})
        });

    }

    componentDidMount() {
        // let self = this;
        // const request = new Request('/heroes',{method: 'GET' , headers: {"Content-Type" : "application/json"}});
        // fetch(request)
        // .then(res => res.json())
        // .then(function(data) {
        //     self.setState({'tableValues' : data})
        // });
        this.fetchList();
    }




    createRecord(name,alias,team) {
        const self = this;
        //console.log(name,alias,team)
        // const ID = Math.ceil((Math.random() * 100)).toString()
        // const newRecord = [ID,name,alias,team]
        // const newTableValues = [...this.state.tableValues]
        // newTableValues.push(newRecord)
        // this.setState({tableValues : newTableValues})
        var body = {
            name : name,
            alias : alias,
            team : team
        };
        var request = new Request('/heroes', {
            method: 'POST' , 
            body : JSON.stringify(body),
            headers : {
              'Content-Type' : 'application/json'
            }
        });
        fetch(request)
        //.then(res => res.json())
        .then(function(){
            self.fetchList()
        })
    }


    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/list" render={(props) => {
                        return <Table 
                            values = {this.state.tableValues} 
                            headers = {tableHeaders} 
                            history = {props.history}/>
                            //onViewClick={this.onViewClick}/>
                    }}/>
                    <Route exact path="/create" render={(props) => {
                        return<Form 
                        formSubmitCallBack={this.createRecord}
                        history={props.history}/>
                        // console.log(props)
                        // const data=tableValues.find(val => val[0] === props.match.params.id)
                        // const newRecord = {
                        //         name:data[1],
                        //         alias:data[2],
                        //         team:data[3]
                        //     }
                         
                    }}/>
                    <Route exact path ="/view/:id" component = {View} />
                    {/* <Route exact path="/view/:id" component = {View} />
                    //render={(props) => {
                    //     console.log(props)
                    //     const data=this.state.tableValues.find(val => val[0] === props.match.params.id)
                    //     const newRecord = {
                    //             name:data[1],
                    //             alias:data[2],
                    //             team:data[3]
                    //         }
                    // return <View selectedRecord = {newRecord} 
                    //             name={newRecord.name} 
                    //             alias={newRecord.alias}
                    //             team={newRecord.team}/>
                    // }}/> */}
                    <Redirect to="/list" />
                    
                </Switch>
                
                
            </Router>
        );
    }

}
    
      

export default App;