import {FaPencilAlt, FaCheck} from "react-icons/fa"

type EditButtonProps = {
    isEditing: boolean
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
    updateTodo: () => void // passed in from TodoItem
}

const EditButton = ({isEditing, updateTodo, setIsEditing}: EditButtonProps) => {
    
    const handleEditButton = () => {    
        setIsEditing(!isEditing)
    }
    
    return (
        <>
            {
                isEditing ? 
                <FaCheck onClick={handleEditButton} className="cursor-pointer text-green-500 mr-2 hover:stroke-[24] hover:stroke-green-600" /> 
                :
                <FaPencilAlt onClick={handleEditButton} className="cursor-pointer mr-2 hover:stroke-[20] hover:stroke-green-600" />
            }
        </>

    )
}

export default EditButton