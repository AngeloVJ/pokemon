import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PokeCard from '../components/Pokedex/PokeCard'
import SelectTypes from '../components/Pokedex/SelectTypes'
import Header from '../components/shared/Header'
import Paginate from './Paginate'
import './styles/pokedex.css'

const Pokedex = () => {

  const { nameTrainer } = useSelector((state) => state)
  const [pokemons, setPokemons] = useState()
  const [selectValue, setSelectValue] = useState('allpokemons')
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedValue, setSelectedValue] = useState(6);

  useEffect(() => {
    if (selectValue === 'allpokemons') {
      const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
      axios.get(url)
        .then(res => setPokemons(res.data))
        .catch(err => console.log(err))
    } else {
      axios.get(selectValue)
        .then(res => {
          const results = res.data.pokemon.map(e => e.pokemon)
          setPokemons({ results })
        })
        .catch(err => console.log(err))
    }
  }, [selectValue]);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    e.target.pokemon.value.trim()
    navigate(`/pokedex/${e.target.pokemon.value.trim().toLowerCase()}`)
    e.target.pokemon.value = ''
  }

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }

  return (
    <div className='pokedex'>
      <Header />
      <h1 className='pokedex__title'>
        <span className='pokedex__title-name'>Hi {nameTrainer}</span>, find here your favorite pokemons
      </h1>

      <div className='pokedex__container'>

        <div className='pokedex__nav'>
          <form className='pokedex__form' onSubmit={handleSubmit}>
            <input className='pokedex__form-input' placeholder='  Search a pokemon' id='pokemon' type="text" />
            <button className='pokedex__form-button'>Search</button>
          </form>

          <div className='pokedex__nav-buttons'>
            <SelectTypes setSelectValue={setSelectValue} />
            <select onChange={handleChange} >
              <option selected disabled>Pagination</option>"
              <option value="6">6</option>
              <option value="8">8</option>
              <option value="12">12</option>
              <option value="16">16</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>

        <Paginate pokemons={pokemons} setCurrentItems={setCurrentItems} selectedValue={selectedValue}/>
        <div className='pokedex__container-pokemon'>
          {currentItems?.map((pokemon) => (
            <PokeCard key={pokemon.url} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </div >
  )
}

export default Pokedex