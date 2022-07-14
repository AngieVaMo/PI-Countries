import React from "react";
import "./Pages.css";


export default function Pages({countryPerPage, allCountries, paging}) {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(allCountries/countryPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav >
            <ul className="ul">
                {pageNumbers &&
                  pageNumbers.map(num => {
                    return( <button className="pagingbutton"
                    key={num} onClick={() => paging(num)}>{num}
                    </button>    
                    )
                  })
                }

            </ul>
        </nav>
    )
}