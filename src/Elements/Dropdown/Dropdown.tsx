import { useEffect, useMemo } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
    /* Reset Select */
    appearance: none;
    outline: 10px red;
    border: 0;
    box-shadow: none;
    /* Personalize */
    flex: 1;
    padding: 0 1em;
    color: #fff;
    background-color: var(--darkgray);
    background-image: none;
    cursor: pointer;
`;

const SelectContainer = styled.div`
  position: relative;
  display: flex;
  width: 20em;
  height: 3em;
  border-radius: .25em;
  overflow: hidden;
    &::after {
    content: '\\25BC';
    position: absolute;
    top: 0;
    right: 0;
    padding: 1em;
    background-color: #34495e;
    transition: .25s all ease;
    pointer-events: none;
    }

    &:hover::after {
    color: #f39c12;
    }
`

interface DropdownProps {
    options: {value: string; label: string}[]
    onChange: React.ChangeEventHandler<HTMLSelectElement>
    value: string
}

const Dropdown = ({options, onChange, value = ''}: DropdownProps) => {

    const internalOptions = useMemo(() => {
        console.log(options)
        return options;
    }, [options.length])

    return (
        <SelectContainer>
            <StyledSelect value={value} onChange={onChange}>
                {internalOptions.map(opt => (
                    <option value={opt.value} label={opt.label} />
                ))}
            </StyledSelect>
        </SelectContainer>
    )
}

export default Dropdown;