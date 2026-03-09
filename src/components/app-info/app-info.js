import './app-info.css';


const AppInfo = ({totalEmployees, increased}) =>{
    return (
        <div className="app-info">
            <h1>Company Employee Records</h1>
            <h2>Total number of employees: {totalEmployees}</h2>
            <h2>Bonus recipients: {increased}</h2>
        </div>
    )
}

export default AppInfo;