import React from "react";

import Tbody from"./tbody";
import Thead from "./thead";
 class Table extends React.Component {

    constructor(props) {
        super(props)
        this.onViewClick = this.onViewClick.bind(this)
    }
     onViewClick(id) {
         this.props.history.push(`/view/${id}`)
     }
   
    render() {
        return (
            <table id="myTable">
                <Thead values={this.props.headers}/>
                <Tbody values={this.props.values} onViewClick = {this.onViewClick}/>
  
            </table>
        )
    }
 }

 export default Table;