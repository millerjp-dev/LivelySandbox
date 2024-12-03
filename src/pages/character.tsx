import { useEffect, useState } from "react"
import useCharacters from "../hooks/useCharacters";
import Dropdown from "../Elements/Dropdown/Dropdown";
import CharDescription from "../Elements/CharDescription/CharDescription";
import styled from "styled-components";

const CharacterContainer = styled.div`
    background-color:rgba(255,255,255,0.75);
    border: 2px solid grey;
    border-radius: 5px;
    width: 40vw;
    padding: 10px;
`

const CharacterPage = () => {
    const [characterName, setCharacterName] = useState<string>("")
    const [characterNames, setCharacterNames] = useState<string[]>([]);
    const {characterNameSubject} = useCharacters();

    useEffect(() => {
        const sub = characterNameSubject.subscribe(val => {
            console.log(val);
            setCharacterNames(val)
            setCharacterName(val[0])
        })
        return () => sub.unsubscribe()
    }, []);

    return (
        <CharacterContainer>
            <Dropdown
                options={characterNames.map((val) =>({value: val, label: val}))}
                onChange={(event) => {setCharacterName(event.target.value)}}
                value={characterName} 
            />
            {characterName && <CharDescription characterId={characterName} />}
        </CharacterContainer>
    )
}

export default CharacterPage