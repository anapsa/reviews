'use client';

import FilterReviews from '../../components/filterReviews/filterReviews'
import PostNotFound from '../../components/postNotFound/postNotFound'
import './style.css'

import { useState } from "react";

export default function Home() {
    const [selectedMovies, setSelectedMovies] = useState(null)

    return (
        <div id='container'>
            <div id='filtro'>
                <FilterReviews selectedMovies = {selectedMovies} setSelectedMovies={setSelectedMovies}/>
            </div>
            {Array.isArray(selectedMovies) && selectedMovies.length === 0 && <PostNotFound />}
        </div>
    );
}
  