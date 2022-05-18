import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { statesList, artistRoles } from '../../utilities/list-items/list-items'
import ImageUploads from '../ImageUploads/ImageUploads'
import './CreateProjectForm.css'

export default function CreateProjectForm({ user, setUser }) {

    const [ image, setImage ] = useState('')
    const [ formData, setFormData ] = useState({
        projectName: '',
        country: 'United States',
        usState: '',
        zipCode: '',
        isRemote: false,
        projectDescription: '',
        lookingForItems: [],
        lookingForTags: [],
        dateStartEnd: [],
        datesMultiple: [],
        isRange: true,
        imageUrl: ''
    })

    let navigate = useNavigate()


    const handleChange = (event) => {
        if (event.target.name==='lookingForTags') {
            const val = event.target.value.replace(/^\s+|\s+$/gm,'') // remove spaces from input using regex
            const arr = [val.split(',')]
            setFormData({ ...formData, lookingForTags: arr[0] })
        } else {
            setFormData({ ...formData, [event.target.name]: event.target.value })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            // alert(JSON.stringify(formData)) // print sign up state var to the screen
            navigate('/')
        } catch (error) {
            console.log(error)
        }        
    }

    const addRole = (e, aRole) => {
        const roleArr = formData.lookingForItems
        if (e.target.checked) {
            roleArr.push(aRole)
            setFormData({ ...formData, lookingForItems: roleArr })
        } else {
            const indexToDelete = roleArr.indexOf(aRole)
            roleArr.splice(indexToDelete, 1)
            setFormData({ ...formData, lookingForItems: roleArr })
        }
    }

    const addDate = (event, isStart) => {

        const newDate = event.target.value

        if(event.target.name === 'dateStartEnd') {

            const dateArr = formData.dateStartEnd
            if (formData.isRange &&  isStart) {
                dateArr[0] = newDate
                setFormData({ ...formData, dateStartEnd: dateArr })
            } else if (formData.isRange &&  !isStart) {
                dateArr[1] = newDate
                setFormData({ ...formData, dateStartEnd: dateArr })
            } 
        } else if(event.target.name === 'datesMultiple') {

            const multDateArr = formData.datesMultiple
            multDateArr.push(newDate)
            setFormData({ ...formData, datesMultiple: multDateArr })
        }
    }

    useEffect(() => {
        if (image) {
            console.log(`loading ${image}`)
            setFormData({...formData, imageUrl: image})
        }
    }, [image])

    return (
        <form onSubmit={handleSubmit} className='create-project-form'>
            <h2>Create Project</h2>
            <label>Project Name:*
            <input type="text" name="projectName" value={formData.projectName} onChange={handleChange} required /></label>
            
            <label>Location*
                <select name="country" value={formData.country} onChange={handleChange} required >
                    <option value="United States" >United States</option>   
                
                </select>
                <select name="usState" value={formData.usState} onChange={handleChange} required >
                    {statesList.map((usState, index) => (
                        <option value={usState.value} key={index} >{usState.label}</option>
                    ))}
                </select>

                <label> And/Or  <input type="checkbox" name="isRemote" value={formData.isRemote} onChange={(e) => setFormData({...formData, isRemote: !formData.isRemote})}/>Remote</label>
            </label>
            
            <label>Project Description*
            <textarea name="projectDescription" value={formData.projectDescription} onChange={handleChange} required /></label>
            <br/>

            {
                artistRoles.map((theRole, index) => {
                    return(
                        <label key={index} >
                            <input type="checkbox" name="lookingForItems" value={theRole.role} onChange={(e) => addRole(e, theRole.role)}/>
                        {theRole.role}</label>
                    )
                })
            }
            <br/>

            <label>Other: 
            <input type='text' name='lookingForTags' value={formData.lookingForTags} onChange={handleChange} /></label>
            <br/>

            {
                formData.isRange ?
                <div className='date-range-select'>
                    <p>Date Range:</p>
                    <label>Start: <input type="date" name="dateStartEnd" onChange={(e) => {addDate(e, true)}}/></label>
                    <label>End: <input type="date" name="dateStartEnd" onChange={(e) => {addDate(e, false)}}/></label>
                </div>
                :
                <div className='date-multi-select'>
                    <p>Enteer Specific Date(s):</p>
                    <label>Date: <input type="date" name="datesMultiple" onChange={(e) => {addDate(e)}}/></label>
                </div>
            }

            <button onClick={(e) => {setFormData({ ...formData, isRange: !formData.isRange})}}>{ formData.isRange? 'Or slect dates' : 'Or select range' }</button>

            <p>Choose a cover image (optional): </p>

            <ImageUploads image={image} setImage={setImage}/>

            <button type="submit">Finish</button>

            
        </form>
    )
}