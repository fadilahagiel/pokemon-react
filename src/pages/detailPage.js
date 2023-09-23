import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { capitalizeWords, formattedId, formattedNameStat } from "../helpers/formatWord"
import PokemonHeader from "../components/PokemonHeader"
import { cmToFeetAndInch } from "../helpers/measurement"
import { useEffect, useState } from "react"
import axios from "axios"

export default function DetailPage() {
    const {id} = useParams()
    const {pokemons} = useSelector(state => state)
    const { pokemon } = useSelector(state => state)
    // const pokemon = pokemons.find(el => el.id == id)
    const [detailPage, setDetailPage] = useState('about')
    const dispatch = useDispatch()
    const changeDetailPage = (page) => {
        setDetailPage(page)
    }
    useEffect(() => {
        fetchPokemon()
    }, [])
    const fetchPokemon = async () => {
        const {data} = await axios({
            url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        })
        let {id:pokemonid, name, abilities, height, weight, species, sprites, types, stats} = data
        const resSp = await axios({
            url: species.url
        })
        types = types.map(el => el.type.name)
        const pokemon =  {
            pokemonid, 
            name : capitalizeWords(name),
            abilities: abilities.map(el=> capitalizeWords(el.ability.name)).join(', '),
            height,
            weight,
            image: sprites.other.home.front_default,
            types,
            type: types[0],
            stats,
            species:resSp.data.genera.find(el => el.language.name == 'en').genus.split(' ')[0],
        }
        dispatch({
            type: 'POKEMON/FETCHONESUCCESS',
            payload: pokemon
        })
    }
    if(pokemon.name){
        return (
            <div className={`pokemon-detail ${pokemon.type == 'fire' ? "fire" : pokemon.type == 'water' ? 'water' : pokemon.type == 'grass' ? 'grass': pokemon.type == 'bug' ? 'bug' : ""}`} >
               <PokemonHeader pokemon={pokemon} />
                <div className="pokemon-detail-body">
                    <ul className="navbar-detail">
                        <Link onClick={() => changeDetailPage('about')} className={detailPage == 'about' ? 'active-page' : ''} >About</Link>
                        <Link onClick={() => changeDetailPage('stats')} className={detailPage == 'stats' ? 'active-page' : ''} >Base Stats</Link>
                        <Link onClick={() => changeDetailPage('evolution')} className={detailPage == 'evolution' ? 'active-page' : ''}>Evolution</Link>
                        <Link onClick={() => changeDetailPage('moves')} className={detailPage == 'moves' ? 'active-page' : ''}>Moves</Link>
                    </ul>
                    {detailPage == 'about' ? 
                           <table className="about">
                            <tr>
                                <td>Species</td>
                                <td>{pokemon.species}</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>{cmToFeetAndInch(pokemon.height*10)} ({pokemon.height})</td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td>{pokemon.weight} </td>
                            </tr>
                            <tr>
                                <td>Abilites</td>
                                <td>{pokemon.abilities}</td>
                            </tr>
                       </table>
                     : detailPage == 'stats' ? 
                     <table className="about">
                        {pokemon.stats.map((stat, id) => {
                            return (
                                <tr>
                                    <td>{formattedNameStat(stat.stat.name)}</td>
                                    <td style={{width:'30px'}}>{stat.base_stat}</td>
                                    <td>
                                    <div className="stat-bar">
                                        <div className="bar-container">
                                            <div className={`bar ${stat.base_stat > 50 ? 'green' : 'red'}`} style={{width: `${stat.base_stat}%`}}></div>
                                        </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </table> : <h1> {detailPage} </h1>  }
                 
                </div>
            </div>
        )
    }
}