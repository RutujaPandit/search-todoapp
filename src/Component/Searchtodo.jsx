import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './SearchTodo.css';


const Searchtodo = () => {

    const [todoData, setTodoData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [order, setOrder] = useState('ASC')

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setTodoData(json))
        console.log('TODO DATA', todoData);

    }, [])


    const handleUserData = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then(data => setUserData(data))
            .catch((err) => console.log(err.message))
    }
    console.log("userData Is:" + JSON.stringify(userData))

    const sorting = (col) => {
        if (order === 'ASC') {
            const sorted = [...todoData].sort((a, b) => (a.id < b.id ? -1 : 1))
            setTodoData(sorted)
            setOrder('DSC')
        }
        if (order === 'DSC') {
            const sorted = [...todoData].sort((a, b) => (a.id > b.id ? -1 : 1))
            setTodoData(sorted)
            setOrder('ASC')
        }
    }
    return (
        <>
            <div className="container-fluid" style={{ height: '100vh' }}>
                <div className="row" >
                    <div className="col-lg-6" >
                        <div className="card" style={{ border: '3px solid black' }}>
                            <div className="card-title">
                                <h1>ToDos</h1>
                                
                                <input type="text" placeholder="Search Todos..." value={searchData} onChange={(e) => { setSearchData(e.target.value) }}></input>
                                </div>
                            <div className="card-body">
                                <div className="divbtn" >
                                    <table className="table table-bordered">
                                        <thead className="bg-dark text-white">
                                            <tr>
                                                <td onClick={() => { sorting("id") }}>Todo ID</td>
                                                <td>Title</td>
                                                <td>Status</td>
                                                <td>Action</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                todoData.length > 0 &&
                                                todoData.filter((value) => {
                                                    if (searchData === "") {
                                                        return value;
                                                    } else if (
                                                        value.title.toLowerCase().includes(searchData.toLowerCase())
                                                    ) {
                                                        return value;
                                                    }
                                                })
                                                    .map((item, index) => {
                                                        return (
                                                            <tr key={item.id}>
                                                                <td>{item.id}</td>
                                                                <td>{item.title}</td>
                                                                <td>{item.completed ? 'true' : 'false'}</td>
                                                                <td ><button type="button" className="btn btn-outline-dark" onClick={() => handleUserData(item.id)}>View User</button></td>
                                                            </tr>)
                                                    })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6" >
                        <div id='users'>
                            <div className="col-lg-6" style={{ border: '2px solid black' }}>
                                <div className="container" >
                                    <div className="card row" style={{ "textAlign": "center" }}>
                                        <div className="card-title">
                                            <h2 style={{ backgroundColor: 'pink' }}>User Details</h2>
                                        </div>
                                        <div className="card-body"></div>
                                        <div>
                                            {<>
                                                <label style={{ backgroundColor: 'pink', fontWeight: 'bold' }}>User Id :-</label>
                                                <h4>{userData.id}</h4>
                                                <label style={{ backgroundColor: 'pink', fontWeight: 'bold' }}>User Name :-</label>
                                                <h4>{userData.name}</h4>
                                                <label style={{ backgroundColor: 'pink', fontWeight: 'bold' }}>User Email :-</label>
                                                <h4>{userData.email}</h4>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Searchtodo;
