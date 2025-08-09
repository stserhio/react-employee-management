import { Component } from 'react';

import './employee-add-form.scss';

class EmployeesAddForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault(); // 💥 предотвращаем обновление страницы
        const { name, salary } = this.state;

        if (!name || !salary) return;

        this.props.onAdd(name, salary); // вызываем метод из App.js
        this.setState({ name: '', salary: '' }); // очищаем форму
    }

    

    render() {
        const {name, salary} = this.state
        return (
        <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <form
                className="add-form d-flex" onSubmit={this.onSubmit}>
                    
                <input type="text"
                    className="form-control new-post-label"
                    placeholder="Как его зовут?" 
                    name="name"
                    value={name}
                    onChange={this.onValueChange}/>
                <input type="number"
                    className="form-control new-post-label"
                    placeholder="З/П в $?" 
                    name="salary"
                    value={salary}
                    onChange={this.onValueChange}/>
                    

                <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
    )
    }
    
}

export default EmployeesAddForm;