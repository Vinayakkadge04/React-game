import React from 'react'
import './homepage.css'

import tictactoe from '../images/tictactoebanner.webp'
import candycrush from '../images/candycrushBanner.webp'
import hangman from '../images/hangman.webp'
import memory from '../images/memorygameBanner.webp'
import flappy from '../images/flappybird.webp'
import rps from '../images/rockpaperscissor.webp'
import snake from '../images/snake.webp'
import block from '../images/breakout.webp'

function HomePage() {
  return (
   <div>
      <div className='homeBanner'>
        {/* <img className='bannerImg' src={homebanner} alt="" /> */}
      </div>
      <div className='imgGrid'>
          <div className='imgDiv'>
           <a href={'/tictactoe'}> <img className='gameImg' src={tictactoe} alt="" /></a>
          </div>
          <div className='imgDiv'>
            <a href={'/memory'}><img className='gameImg' src={memory} alt="" /></a>
          </div>
          <div className='imgDiv'>
            <a href={'/hangman'}> <img className='gameImg' src={hangman} alt="" /></a>
          </div>
          <div className='imgDiv'>
            <a href={'/candycrush'}><img className='gameImg' src={candycrush} alt="" /></a>
          </div>
          <div className='imgDiv'>
            <a href={'/flapybird'}><img className='gameImg' src={flappy} alt="" /></a>
          </div>
          <div className='imgDiv'>
            <a href={'/rps'}><img className='gameImg' src={rps} alt="" /></a>
          </div>
          <div className='imgDiv'>
            <a href={'/snake'}><img className='gameImg' src={snake} alt="" /></a>
          </div>
          {/* <div className='imgDiv'>
            <a href={'/findword'}><img className='gameImg' src={snake} alt="" /></a>
          </div> */}
          <div className='imgDiv'>
            <a href={'/breakout'}><img className='gameImg' src={block} alt="" /></a>
          </div>

          <div className='imgDiv'>
            <a href={'/snakegame'}><img className='gameImg' src={block} alt="" /></a>
          </div>

      
          

      </div>
   </div>
  )
}

export default HomePage