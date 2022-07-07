import React from "react";


export default function Pages({countryPerPage, allCountries, paging}) {
    const pageNumbers = [];

    for(let i=1; i<Math.ceil(allCountries/countryPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
                {pageNumbers &&
                pageNumbers.map(num => {
                    <li key={num}>
                        <a onClick={() => paging(number)}>{num}</a>
                    </li>
                    
                })}

            </ul>
        </nav>
    )
}