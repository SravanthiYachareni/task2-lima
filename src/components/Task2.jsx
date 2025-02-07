import React from 'react'
import './task2.css'
import { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";

function Task2() {
    const [modelIsopen, setModelIsOpen] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [list, setList] = useState([])
    const [editId, setEditId] = useState(null)
    const [addExperience, setExperience] = useState([])
    const [employee, setEmployee] = useState({
        id: Date.now(),
        empId: "",
        firstname: "",
        lastname: "",
        email: "",
        gender: "",
        role: ""

    })
    const openModel = () => {
        setModelIsOpen(true)
    }
    const closeModel = () => {
        setModelIsOpen(false)
    }
    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: [e.target.value] })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        if (editId) {
            const updatedList = list.map((item) =>
                item.id === editId ? { ...employee, id: editId } : item)
            setList(updatedList)
            setEditId(null)
        }
        else {
            const array = { ...employee, id: Date.now() };
            setList([...list, array]);
        }
        setEmployee(
            {
                empId: "",
                firstname: "",
                lastname: "",
                email: "",
                gender: "",
                select: ""
            }
        )
        closeModel()
    }
    const handleEdit = (row) => {
        setEmployee(row);
        setEditId(row.id)
        openModel();
    }
    //addExperience               
    const addEmployee = () => {
        const addEmp = [...addExperience, { company: '', experience: '', startDate: '', endDate: '' }]
        setExperience(addEmp)
    }
    const handleExperience = (e, i) => {
        const { name, value } = e.target
        const updateExperience = [...addExperience]
        updateExperience[i] = { ...updateExperience[i], [name]: [value] }
        setExperience(updateExperience)

    }
    console.log(addExperience)
    return (
        <div>
            <div><h2 style={{ color: "green", paddingTop: "7px", paddingBottom: '5px' }}>Welcome
                <img src='https://www.lima.ai/assets/images/lima-logo.svg' style={{ width: "5%" }} alt='lima' />
            </h2>

                <h5>Please register by clicking add employee button</h5>
            </div>
            <div className='add-button'><button id='add' onClick={openModel}>AddEmployee</button>
            </div>
            <div className='table-wrapper'>
                <table>
                    <thead>
                        <tr>
                            <td>Emp id</td>
                            <td>Firstname</td>
                            <td>Lastname</td>
                            <td>Email</td>
                            <td>Gender</td>
                            <td>Role</td>
                            <td style={{ textAlign: "center" }}>Update</td>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{row.empId}</td>
                                    <td>{row.firstname}</td>
                                    <td>{row.lastname}</td>
                                    <td>{row.email}</td>
                                    <td>{row.gender}</td>
                                    <td>{row.role}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <button id='edit-btn'
                                            onClick={() => { handleEdit(row) }}>Edit<MdModeEdit style={{ width: '30%' }} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {modelIsopen && (<div className='model-wrapper'>
                <div className='model'>
                    <button id='x' onClick={closeModel} >x</button>
                    <form onSubmit={handleSubmit} >
                        <div>
                            <div id='title'><h4>Employee details</h4>
                                <span onClick={() => setIsVisible(!isVisible)}>
                                    <MdExpandMore style={{
                                        width: '130%', height: '70%', paddingRight: '7px'
                                    }} /></span></div>
                            {isVisible && <div>
                                <div className='form'>
                                    <label>Emp Id</label>
                                    <input type='text' name='empId' value={employee.empId} required
                                        autoComplete='off' onChange={handleChange} />
                                </div>
                                <div className='form'>
                                    <label>First Name</label>
                                    <input type='text' name='firstname' value={employee.firstname}
                                        autoComplete='off' onChange={handleChange} />
                                </div>

                                <div className='form'>
                                    <label>Last Name</label>
                                    <input type='text' name='lastname' value={employee.lastname}
                                        autoComplete='off' onChange={handleChange} />
                                </div>

                                <div className='form'>
                                    <label>Email</label>
                                    <input type='text' name='email' value={employee.email} required
                                        autoComplete='off' onChange={handleChange} />
                                </div>

                                <div className='form'>
                                    <label>Select your Gender</label>
                                    <input type='radio' name='gender' value="Male" onChange={handleChange} /> Male
                                    <input type='radio' name='gender' value="Female" onChange={handleChange} />Female
                                    <input type='radio' name='gender' value="Others" onChange={handleChange} />Others
                                </div>
                                <div className='form' >
                                    <label> Select Role</label>
                                    <select name="role" onChange={handleChange}>
                                        <option>Java developer</option>
                                        <option>Python Developer</option>
                                        <option>UI developer</option>
                                    </select>
                                </div>
                            </div>
                            }
                        </div>
                        <div className='accordion-wrapper'>
                            <div >
                                <div className='title1'><h4>Add Experience </h4>
                                    <span onClick={addEmployee}><IoMdAdd style={{ width: '100%', height: '100%', paddingRight: '7px' }} />
                                    </span>
                                </div>{
                                    addExperience.map((data, i) => {
                                        return (

                                            <div className='experience'>
                                                <div className='company' >
                                                    <label>Company
                                                        <input type='text' name="company" value={data.company}
                                                            style={{ height: '40%', width: '70%' }}
                                                            onChange={(e) => { handleExperience(e, i) }} />
                                                    </label>
                                                    <label>experience
                                                        <select className='acccordion' name="experience" value={data.experience}
                                                            style={{ width: '100%' }}
                                                            onChange={(e) => { handleExperience(e, i) }}>
                                                            <option>Fresher</option>
                                                            <option>1 year</option>
                                                            <option>2+ years</option>
                                                            <option>3 years</option>
                                                            <option>4+ years</option>
                                                        </select>
                                                    </label>
                                                </div>
                                                <div className='company'>
                                                    <lable>Start Date
                                                        <input type='date' name="startDate" value={data.startDate}
                                                            className='acccordion' style={{ width: '80%', height: '40%' }}
                                                            onChange={(e) => { handleExperience(e, i) }} />
                                                    </lable>

                                                    <label>End Date
                                                        <input type='date' name='endDate' value={data.endDate}
                                                            className='acccordion' style={{ width: '80%', height: '40%' }}
                                                            onChange={(e) => { handleExperience(e, i) }} />
                                                    </label>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <button className='btn' type='submit'>Submit</button>
                    </form>
                </div>
            </div>)}
        </div>
    )
}

export default Task2

