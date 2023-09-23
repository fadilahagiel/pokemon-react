import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PokemonCard from "../components/PokemonCard"
import { capitalizeWords } from "../helpers/formatWord"


export default function HomePage() {
    const { pokemons } = useSelector(state => state)
    // const {pokemons} = useSelector(state => state)
    const dispatch = useDispatch()
    useEffect(() => {
        fetchPokemons()
    }, [])
    const fetchPokemons = async () => {
        let pokemonsArr = []
        const {data} = await axios({
            url: `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0`,
        })
        for (let i = 0; i < data.results.length; i++) {
            const el = data.results[i];
            const res = await axios({
                url: el.url
            })
            let {id, name, abilities, height, weight, species, sprites, types, stats} = res.data
            const resSp = await axios({
                url: species.url
            })
            types = types.map(el => el.type.name)
            const pokemon =  {
                id, 
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
            pokemonsArr.push(pokemon)
        }
        dispatch({
            type: 'POKEMON/FETCHSUCCESS',
            payload: pokemonsArr
        })
    }
    return (
        <section className="home-screen">
            <div className="header-home">
            <h1>Pokedex</h1>
            </div>
            <div className="cards">
                {pokemons.map((pokemon, id) => {
                    return <PokemonCard pokemon={pokemon} key={id}/>
                })}
            </div>
            <img className="home-background" width={700} src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Free-Download.png" alt="" />
        </section>
    )
}