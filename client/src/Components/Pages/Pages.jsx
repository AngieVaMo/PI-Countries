import React from "react";
import "./Pages.css";


export default function Pages({countryPerPage, allCountries, paging, next, prev}) {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(allCountries/countryPerPage); i++){
        pageNumbers.push(i);
    }

    return(
        <nav >
            <ul className="ulpaging">
                {pageNumbers &&
                  pageNumbers.map(num => {
                    return( <button className="pagingbutton"
                    key={num} onClick={() => paging(num)}>{num}
                    </button>    
                    )
                  })
                }

            </ul>

            {/*<button onClick={prev}>Prev</button>
            <button onClick={next}>next</button>*/}
        </nav>

        
    )
}