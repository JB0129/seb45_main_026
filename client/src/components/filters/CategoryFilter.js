import React from "react";
import styled from "styled-components";
import tokens from "../../styles/tokens.json";
import CategoryButton from "./CategoryButton";

const globalTokens = tokens.global;

const FilterContainer = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    gap: ${globalTokens.Spacing8.value}px;
`

export default function CategoryFilter() {
    const filters = [
      {
        name: "category",
        initialText: "카테고리",
        actionName: "setCategory",
        options: [
          { text: "카테고리", value: "" },
          { text: "React", value: "React" },
          { text: "Redux", value: "Redux" },
          { text: "phython", value: "phython" },
          { text: "JS", value: "JS" },
          { text: "AWS", value: "AWS" },
        ],
      },
      {
        name: "isPurchased",
        initialText: "구매여부",
        actionName: "setIsPurchased",
        options: [
          { text: "구매여부", value: "" },
          { text: "구매됨", value: "true" },
          { text: "구매전", value: "false" },
        ],
      },
      {
        name: "sortBy",
        initialText: "정렬",
        actionName: "setSort",
        options: [
          { text: "최신순", value: "created-date" },
          { text: "조회순", value: "view" },
          { text: "별점순", value: "star" },
        ],
      },
    ];
    return (
        <FilterContainer>
            {filters.map((el,idx)=><CategoryButton key={idx} filter={el} />)}
        </FilterContainer>
    )
}