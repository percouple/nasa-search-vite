import React from "react";
import styled from "styled-components";

const StyledLoadingScreen = styled.div`
    box-sizing: border-box;
    z-index: 1000;
    position: absolute;
    background-color: black;
    color: white;
    width: 100%;
    height: 100%;
    /* text-align: center;
    animation: fade-out 2s normal;
    animation-delay: 2s;
    animation-iteration-count: 1;

    @keyframes fade-out {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    } */
`;

export default function LoadingScreen () {

    return <StyledLoadingScreen>
            FETCHING
        </StyledLoadingScreen>
}