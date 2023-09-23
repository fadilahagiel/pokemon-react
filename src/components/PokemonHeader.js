import { capitalizeWords, formattedId } from "../helpers/formatWord"

export default function PokemonHeader({pokemon}) { 

    return (
        <section>
            <div className="pokemon-detail-header">
            <div>
                <h2>
                    {pokemon.name}
                </h2>
                <div>
                        {pokemon.types.map((el, id) => {
                            return (
                                <div className="badge-types" style={{display: 'inline-block', padding: '10px 15px', marginTop: '20px'}}>
                                        <h4>
                                            {capitalizeWords(el)}                              
                                        </h4>
                                </div>
                            )
                        })}
                </div>
                </div>
            <div style={{marginTop: '15px'}}>
                <h3>{formattedId(pokemon.id)}</h3>
            </div>
            </div>
             <div className="pokemon-detail-img">
                <img src={pokemon.image} width={300} alt={pokemon.name} className="big-pokemon" />
                <img width={460} src="https://www.pngall.com/wp-content/uploads/4/Pokeball-PNG-Free-Download.png" alt="" className="pokeball" />
            </div>
        </section>
        )
}