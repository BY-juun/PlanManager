import React from 'react';
import styled from "styled-components";

const Title = styled.h1`
    text-align : center;
`;

const TopLayout = () => {
    return(
        <>
            <Title style = {{marginTop : "150px"}}><a href = "/">PlanManager</a></Title>
        </>
    );
};

export default TopLayout;