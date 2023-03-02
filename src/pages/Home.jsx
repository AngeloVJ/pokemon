import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {setNameTrainer} from '../store/slices/trainerName.slice'
import './styles/home.css'

const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(setNameTrainer(e.target.name.value.trim()))
        e.target.name.value = ''
        navigate('/pokedex')
    }

    return (
        <div className='home'>
            <img className='home__img' src="/images/pokedex.png" alt="" />
            <h1 className='home__title'>Welcome Pokemon Trainer</h1>
            <p className='home__description'>To start this pokedex gime your name</p>
            <form className='home__form' onSubmit={handleSubmit}>
                <input className='home__input' placeholder='Enter your name here' id='name' type="text" />
                <button className='home__btn '></button>
            </form>
            <img className='home__diglett' src="https://media.tenor.com/LVCvXY_SEq8AAAAi/diglett-pokemon.gif" alt="" />
        </div>
    )
}

export default Home