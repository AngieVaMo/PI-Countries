import { React, useEffect, useState } from "react";
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
import SearchBar from "../SearchBar/SearchBar"
import { Link } from "react-router-dom";


export default function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.country);
    //const activity = useSelector((state) => state.activity);
    const [currentPage, setCurrentPage] = useState(1);
    const [countryPerPage] = useState(10);
    const [setInOrder] = useState('');



    const indexOfLastCountry = currentPage * countryPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countryPerPage;
    const CountriesOnCurrentPage = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);



    function paging(pageNum){
        setCurrentPage(pageNum);
    }

    useEffect(() => {
        dispatch(getCountry());
        dispatch(getActivity());
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getCountry());
        window.location.reload();
    }

    function handleFilterByContinent(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByContinent(e.target.value));
    }

    function handleSortCountry(e) {
        e.preventDefault();
        dispatch(orderByCountry(e.target.value));
        setCurrentPage(1);
        setInOrder(`Ordenado ${e.target.value}`);
    }

    function handleSortPopulation(e) {
        e.preventDefault();
        dispatch(orderByPopulation());
        setCurrentPage(1);
        setInOrder(`Ordenado ${e.target.value}`)
    }

    function handleCountryByActivity(e) {
        e.preventDefault();
        dispatch(countryByActivity(e.target.value))
        setCurrentPage(1);
        setInOrder(`Ordenado ${e.target.value}`)
    }



    return(
        <div>
            <SearchBar setCurrentPage = {setCurrentPage} />

            <div todos los filtros>
                <div TITULO>
                    <h3>Busqueda por:</h3>
                </div>
                <div ORDEN ALFABETICO>
                    <select onChange = {e => handleSortCountry(e)}>
                        <option>Alphabet order</option>
                        <option value= "asc">A-Z</option>
                        <option value= "desc">Z-A</option>
                    </select>
                </div>
                <div CONTINENTE>
                    <select onChange={e => handleFilterByContinent(e)}>
                     <option>Continent</option>
                     <option value='Africa'>África</option>
                     <option value='Americas'>América</option>
                     <option value='Antarctic'>Antártica</option>
                     <option value='Asia'>Asia</option>
                     <option value='Europe'>Europa</option>
                     <option value='Oceania'>Oceanía</option>    
                    </select>
                </div>
                <div ORDEN DE POBLACION>
                    <select onChange={e => handleSortPopulation(e)}>
                     <option>Population</option>
                     <option value='low'>smallest to largest population</option>
                     <option value='high'>largest to smallest population</option>
                    </select>
                </div>
                <div PAISESxACTIVIDAD>
                    <select onChange={e => handleCountryByActivity(e)}>
                        <option value={"All"}>Actividad</option>

                        <Link to="/createActivity">
                            <p>No hay actividades disponibles. ¿Crear?</p>
                        </Link>
                        {(act => <option key={act} value={act}>{act}</option>)}
                    </select>
                </div>
                <div LIMPIAR FILTRO>
                    <button onClick={e => handleClick(e)}>Limpiar filtro</button>
                </div>
            </div>

            <div CARDS>
                {
                    CountriesOnCurrentPage?.map(c => {
                        return(
                            <Card 
                            name={c.name} 
                            continent={c.continent} 
                            flag={c.flag} id={c.id} 
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