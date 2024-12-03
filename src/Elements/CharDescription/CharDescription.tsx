import { useEffect, useState } from "react"
import useCharacters, { CharacterInterface } from "../../hooks/useCharacters";

interface CharDescriptionInterface {
    characterId: string
    disableEdit?: boolean
}

const CharDescription = ({characterId}: CharDescriptionInterface) => {
    const [editMode, setEditMode] = useState(false);
    const {getCharacter, setCharacter: setOnlineCharacter} = useCharacters();
    const [character, setCharacter] = useState<CharacterInterface>();

    useEffect(() => {
        getCharacter(characterId).then(setCharacter)
    }, [characterId])

    return (
        <div>
            {character && Object.keys(character).map((key) => {
                if (character[key as keyof CharacterInterface]
                    && Array.isArray(character[key as keyof CharacterInterface])) {
                        return (
                            <div>{key} : {(character[key as keyof CharacterInterface] as string[]).join(', ')}</div>
                        );
                    }
                else 
                return (
                    <div>{key} : {character[key as keyof CharacterInterface]}</div>
                );
            })}
        </div>
    )
}

export default CharDescription