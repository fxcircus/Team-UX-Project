import './ProjectCollaborators.css';
import ProjectCollaborator from '../ProjectCollaborator/ProjectCollaborator.jsx';
import { useState, useEffect } from 'react';

export default function ProjectCollaborators({project, user}){
    const [collaborators, setCollaborators] = useState([]);

    const getCollaborators = () => {
        setCollaborators(project.collaborators.map((collaborator, idx) => {
            return (
                <ProjectCollaborator key={idx} collaborator={collaborator} />
            )
        }))
    }

    useEffect(() => {
        getCollaborators();
    },[project])

    const loaded = () => {
        return (
            <div>
                {collaborators}
            </div>
        )
    }

    const loading = () => {
        return
    }
    return collaborators.length ? loaded() : loading()
}