'use client';

import ShowMovies from '../../components/showMovies/showMovies'

import './style.css'

export default function Home() {

    return (
        <div id='home'>
            <ShowMovies/>
            <button id='cadastrar'>
                Cadastrar
            </button>
        </div>
    );
}
  