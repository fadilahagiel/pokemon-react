import {Link, useParams} from 'react-router-dom'
import { capitalizeWords } from '../helpers/formatWord'

export default function PokemonCard({pokemon}) {
    return (
        <Link to={`/about/${pokemon.id}`} >
         <div className={`card ${pokemon.type == 'fire' ? "fire" : pokemon.type == 'water' ? 'water' : pokemon.type == 'grass' ? 'grass': pokemon.type == 'bug' ? 'bug' : ""}`}>
                <div className="title-card">
                    <h3>
                        {pokemon.name}
                    </h3>
                </div>
                <div className="body-card">
                    <div>
                        {pokemon.types.map((el, id) => {
                            return (
                                <div className="badge-types">
                                        <h6>
                                            {capitalizeWords(el)}                                    
                                        </h6>
                                </div>
                            )
                        })}
                    </div>
                    <div className="pokemon-img">
                        <img  src={pokemon.image} alt={pokemon.name} height={95} width={95} />
                    </div>
                    <div className="pokeball-home">
                        <img width={160} height={105} src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Free-Download.png" alt="" />
                    </div>
                </div>
        </div>
        </Link>
     
       
    )
}