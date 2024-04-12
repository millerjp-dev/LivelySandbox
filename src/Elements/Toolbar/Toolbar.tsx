import React from "react";
import styled from "styled-components";
import IconButton from "../IconButton/IconButton";

const Wrapper = styled.div<{show?: boolean}>
`
    width: 30px;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    transition: width 1s;
    &:hover {
        width: 200px;
    }
    z-index:20;
`;

const Toolbar = () => {
    return (
        <Wrapper>

        </Wrapper>
    )
};

export default Toolbar;