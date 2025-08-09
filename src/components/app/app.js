import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import "./app.css";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                { name: "John D.", salary: 800, increase: false, rise: true, id: 1 },
                { name: "Alex E", salary: 300, increase: false, rise:false, id: 2 },
                { name: "Piece D.", salary: 1400, increase: true, rise: false, id: 3 },
            ],
            term: '',
            filter: 'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({data})=> {
            return {
                data: data.filter(item => item.id !== id)
            }
            
        })
    }

   
    addEmployee = ( name, salary) => {
        if(!name || !salary)return;

        const {data} = this.state;

        const maxId = data.length > 0 ? Math.max(...data.map(item => item.id)) : 0;

        const newEmployee = {
            name,
            salary,
            id: maxId + 1,
            increase: false,
            rise: false
        }

        this.setState(({data})=>{
            const newArr = [...data, newEmployee];
            return{
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) =>{
  

        this.setState(({data})=>({
            data: data.map(item => {
                if(item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
        
    }

    searchEmp = (items, term) => {
        if(term.length === 0){
            return items
        }

        return items.filter(item => {
            return item.name.toLowerCase().includes(term.toLowerCase())
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }
   
    filterPost = (items, filter) => {
        switch(filter) { 
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;        
        }
    }

    onSalaryChange = (id, newSalary) => {
        this.setState(({data}) => {
            const updatedData = data.map(emp => {
                if(emp.id === id){
                    return {...emp, salary:newSalary}
                }
                return emp;
            })
            return{
                data: updatedData
            }
        })
    }

    render() {
        const {data, term, filter } = this.state
        const visibleData = this.filterPost(this.searchEmp(data, term), filter);
 
        return (

            <div className="app">
                <AppInfo 
                totalEmployees={this.state.data.length} 
                increased={this.state.data.filter(item => item.increase).length}/>
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployeesList
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    onSalaryChange={this.onSalaryChange}
                     />
                <EmployeesAddForm 
                    
                    onAdd={this.addEmployee}/>
            </div>
        );
    }
}

export default App;