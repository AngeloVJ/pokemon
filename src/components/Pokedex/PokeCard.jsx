import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/pokecard.css'

const PokeCard = ({ pokemon }) => {

    const [poke, setPoke] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(pokemon.url)
            .then(res => setPoke(res.data))
            .catch(err => onsole.log(err))
    }, [])

    const handleClick = () => {
        navigate(`/pokedex/${poke.id}`)
    }


    return (
        <article onClick={handleClick} className={`card border-${poke?.types[0].type.name}`}>
            <header className={`card__header bg-${poke?.types[0].type.name}`}>
                <div className='card__avatar-bg'>
                    <img className='card__avatar' src={`https://play.pokemonshowdown.com/sprites/xyani/${poke?.name}.gif`} alt="" />
                    {/* <img className='card__avatar' src={poke?.sprites.other['official-artwork'].front_default}  alt="" /> */}
                </div>
            </header>
            <div className='card__body'>
            <h2 className={`card__name color-${poke?.types[0].type.name}`}>{poke?.name}</h2>
            <ul className='card__type-list'>
                {
                    poke?.types.map(type => (
                        <li className='card__type-item' key={type.type.name}>{type.type.name}</li>
                    ))
                }
            </ul>
            <hr className='card__hr' />
            <ul className='card__stat-list'>
                {
                    poke?.stats.map(stat => (
                        <li className='card__stat-item' key={stat.stat.url}>
                            <span className='card__stat-name'>{stat.stat.name}</span>
                            <span className={`card__stat-number color-${poke?.types[0].type.name}`}>{stat.base_stat}</span>
                        </li>
                    ))
                }
            </ul>
            </div>
        </article>
    )
}

export default PokeCard