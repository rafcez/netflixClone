import React, { useState, useEffect } from 'react';
import tmDb from './tmDb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import nLoading from './assets/netflixLoading.gif';
import './App.css';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      let list = await tmDb.getHomeList();
      setMovieList(list);
      let originals = list.filter(i => i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInf = await tmDb.getMovieInfo(chosen.id, 'tv');
      setFeatured(chosenInf)
      console.log(chosenInf)
    }

    loadAll();
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])


  return (
    <div className='page'>
      <Header black={blackHeader} />
      {featured && <FeaturedMovie item={featured} />}
      <section className='lists'>
        {
          movieList.map((item, key) => (
            <MovieRow key={key} title={item.title} items={item.items} />
          ))
        }
      </section>
      {
        featured === null &&
        <div className='loading'>
          <img src={nLoading} alt='Carregando'></img>
        </div>
      }
    </div>
  )
}