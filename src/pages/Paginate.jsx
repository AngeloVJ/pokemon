import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import './styles/pokedex.css'

const Paginate = ({ pokemons, setCurrentItems, selectedValue}) => {

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = `${selectedValue}`;
  
    useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(pokemons?.results.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(pokemons?.results.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, pokemons?.results])
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % pokemons?.results.length;
      setItemOffset(newOffset);
    };
    
    return (
    
        <ReactPaginate
        breakLabel='...'
        nextLabel= '>>'
        previousLabel= '<<'
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />

    )
}

export default Paginate