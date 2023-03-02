import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RadarInfo from '../components/PokeInfo/RadarInfo'
import Header from '../components/shared/Header'
import './styles/pokeinfo.css'


const PokeInfo = () => {

    const [hasError, setHasError] = useState(false)
    const { id } = useParams()
    const [poke, setPoke] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        axios.get(url)
            .then(res => {
                setPoke(res.data)
                setHasError(false)
            })
            .catch(err => {
                setHasError(true)
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }, [id])

    if (hasError) {
        return <div className='error' >
            <h1>The pokemon "{id}" not found </h1>
            <img src="/public/images/duck1.png" alt="" />
        </div>
    } else {
        return (
            <div className='info'>
                {isLoading ?
                    <div className='loading'>
                        <h1>Loading...</h1>
                        <img src="/public/images/run1.gif" alt="" />
                    </div>
                    :
                    <>
                        <Header className="header" />
                        <div className='container'></div>

                        <div className='info__card'>
                            <div className={`info__card-l bg-${poke?.types[0].type.name}`}>
                                <img src={poke?.sprites.other['official-artwork'].front_default} alt="" />
                                <hr />
                                <h1 className='title name'>{poke?.name}</h1>
                                <h1 className='subtitle'>{`Weight ${poke?.weight} - Heigth ${poke?.height}`}</h1>
                            </div>

                            <div className='info__card-r'>
                                <h1 className='title'>Stats</h1>
                                <RadarInfo className='radar' poke={poke} />
                                <div className='info__item'>
                                    <div className='info__types'>
                                        <h1 className='title'>Tipo</h1>
                                        <ul className='type subtitle'>
                                            {
                                                poke?.types.map(type => (
                                                    <li className={`type_ability bg2-${poke?.types[0].type.name}`} key={type.type.name}>{type.type.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className='info__abilities'>
                                        <h1 className='title'>Habilidades</h1>
                                        <ul className='ability subtitle'>
                                            {
                                                poke?.abilities.map(ability => (
                                                    <li className={`type_ability bg2-${poke?.types[0].type.name}`} key={ability.ability.name}>{ability.ability.name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='info__movements'>
                            <h1 className='title'>Movements</h1>
                            <ul className='info__movement'>
                                {
                                    poke?.moves.map(move => (
                                        <li className={`movement bg2-${poke?.types[0].type.name}`} key={move.move.name}>{move.move.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                }
            </div>
        )
    }
}
export default PokeInfo