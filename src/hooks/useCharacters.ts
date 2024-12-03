import { useEffect, useRef } from "react"
import { ReplaySubject } from "rxjs"

const baseUrl = 'http://10.244.27.28:3001'

export interface CharacterInterface {
    name: string
    species?: string[]
    job?: string[]
    maxHeight?: number
    height?: number
    minHeight?: number
    bodyType?: string[]
    shortDescription: string
    description: string
  }

interface UseCharacterReturn {
    characterNameSubject: ReplaySubject<string[]>
    getCharacter: (characterId: string) => Promise<CharacterInterface>
    setCharacter: (characterId: string, character: CharacterInterface) => Promise<string>
}

const useCharacters: () => UseCharacterReturn = () => {
    const characterNamesRef = useRef<string[]>([]);
    const characterNameSubject = new ReplaySubject<string[]>(1);

    const getCharacter = (characterId: string) => {
        return new Promise<CharacterInterface>((resolve) => {
            fetch(`${baseUrl}/characters/${characterId}`).then((response) => response.json()).then((val: CharacterInterface) => {
                resolve(val);
            })
        })
    }

    const setCharacter = (characterId: string, character: CharacterInterface) => {
        return new Promise<string>((resolve) => {
            fetch(`${baseUrl}/characters/${characterId}`,
                {method: 'POST', body: JSON.stringify(character)})
                    .then((response) => response.json()).then((val: string) => {
                        resolve(val);
            })
        })
    }

    useEffect(() => {
        characterNameSubject.next([]);
        const sub = characterNameSubject.subscribe((charNames) => {
            if (!charNames.length) {
                fetch(`${baseUrl}/characters`).then((response) => response.json()).then((val: string[]) => {
                    console.log(val);
                    characterNamesRef.current = val;
                    characterNameSubject.next(val)
                })   
            }
        })
        return () => sub.unsubscribe();
    }, [])

    return {characterNameSubject, getCharacter, setCharacter}
}

export default useCharacters;

