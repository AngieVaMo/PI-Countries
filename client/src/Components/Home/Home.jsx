import { React } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import{
    getCountry,
    orderByCountry,
    filterByContinent,
    orderByPopulation,
    getActivity,
    countryByActivity
} from "../../Redux/actions/index.js";
import Card from "../Card/Card.jsx";
import Pages from "../Pages/Pages.jsx";
import SearchBar from "../SearchBar/SearchBar.jsx"
import { Link } from "react-router-dom";


export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.allCountries);
    const allActivities = useSelector(state => state.activity);
    const activityName = allActivities?.map(a => a.name);
    const [currentPage, setCurrentPage] = useState(1);
    const [countryPerPage, setCountryPerPage] = useState(9);
    const [,setInOrder] = useState('');



    const indexOfLastCountry = currentPage * countryPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countryPerPage;
    const CountriesOnCurrentPage = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);



    function paging(pageNum){
        setCurrentPage(pageNum);
        if(pageNum === 1){
            setCountryPerPage(9);
            
        } else{
            setCountryPerPage(10);
        }
    }

    useEffect(() => {
        dispatch(getCountry());
        dispatch(getActivity());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountry());
        dispatch(getActivity())
        window.location.reload();
    }

    function handleFilterByContinent(e) {
        e.preventDefault();
        dispatch(filterByContinent(e.target.value));
        setCurrentPage(1);
        
    }

    function handleSortCountry(e) {
        e.preventDefault();
        dispatch(orderByCountry(e.target.value));
        setCurrentPage(1);
        setInOrder(`Ordered by the alphabeth ${e.target.value}`);
    }

    function handleSortPopulation(e) {
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setInOrder(`Ordered by population ${e.target.value}`)
    }

    function handleCountryByActivity(e) {
        e.preventDefault();
        dispatch(countryByActivity(e.target.value))
        setCurrentPage(1);
        setInOrder(`Ordered by activity ${e.target.value}`)
    }



    return(
        <div>
            <div>
              <SearchBar/>
            </div>
            

            <div >
                <div >
                    <h3>Busqueda por:</h3>
                </div>
                <div >
                    <select onChange = {e => handleSortCountry(e)}>
                        <option>Alphabet order</option>
                        <option value= "asc">A-Z</option>
                        <option value= "desc">Z-A</option>
                    </select>
                </div>

                <div >
                    <select onChange={e => handleSortPopulation(e)}>
                     <option>Population</option>
                     <option value='low'>smallest to largest population</option>
                     <option value='high'>largest to smallest population</option>
                    </select>
                </div>

                <div >
                    <select onChange={e => handleFilterByContinent(e)}>
                     <option value='All'>Continent</option>
                     <option value='Africa'>Africa</option>
                     <option value='Americas'>America</option>
                     <option value='Antarctic'>Antartic</option>
                     <option value='Asia'>Asia</option>
                     <option value='Europe'>Europe</option>
                     <option value='Oceania'>Oceania</option>    
                    </select>
                </div>

                <div >
                 {
                 activityName?.length === 0 ?
                 <Link to="/createActivity">
                    <p>Create activities</p>
                 </Link>
                  : <select onChange={e => handleCountryByActivity(e)}>
                    <option value='All'>Activities</option>
                  {activityName?.map(e => {
                    return (
                      <option key={e} value={e}>{e}</option>
                    )
                  })}
                  </select>
                }
                </div>

                <div>
                 <Link to="/createActivity">
                    <p>Create an activity</p>
                 </Link>
                </div>

                <div >
                    <button onClick={e => handleClick(e)}>Limpiar filtro</button>
                </div>
                
            </div>

            <div >
                {
                    CountriesOnCurrentPage?.map(c => {
                        return(
                            <Card 
                            name={c.name} 
                            continent={c.continent} 
                            flag={c.flag} 
                            id={c.id} 
                            key={c.id}/>
                        )
                    })
                
                }
            </div>

            <Pages
            countryPerPage={countryPerPage}
            allCountries={allCountries.length}
            paging={paging}
            />
        </div>
    )
}