import React from 'react'
import './home.scss'
import {API_KEY, imageUrl} from '../../utils/constants'
import axios from '../../movieApi/axios'
import {originals,ActionMovies,Comedy,Romance,Horror,Documentary,
        Adventure ,Animation ,Crime ,Family ,ScienceFiction ,Thriller ,War} from '../../movieApi/urls'
import RowMoviesWide from '../../component/rowMoviesWide/RowMoviesWide'
import english from '../../assets/images/languages/english.jpg'
import malayalam from '../../assets/images/languages/malayalam.jpg'
import hindi from '../../assets/images/languages/hindi.jpg'
import kannada from '../../assets/images/languages/kanada.jpg'
import tamil from '../../assets/images/languages/tamil.jpg'
import telgu from '../../assets/images/languages/telgu.jpg'
import marathi from '../../assets/images/languages/marathi.jpg'
// import RowMovies from '../../component/rowMovies/RowMovies'
import HomeMOvieRow from './HomeMovieRow'
import { Link } from 'react-router-dom'
function Explore() {



  return (
    <div className='explore pt-3'>
        <h1 className='m-4 mt-0 mb-0' >Top Picks for you!</h1>
        <RowMoviesWide   url={originals}></RowMoviesWide>

        <h1 className='m-4 mb-0' >Watch in your Languages</h1>
        <div className="languages p-2">
            <Link to='/language/en'>
              <img className='m-2' src={english} alt="" />
            </Link>
            <Link to='/language/hi'>
              <img className='m-2' src={hindi} alt="" />
            </Link>
              <Link to='/language/ml'>
            <img className='m-2' src={malayalam} alt="" />
            </Link>
            <Link to='/language/kn'>
              <img className='m-2' src={kannada} alt="" />
            </Link>
            <Link to='/language/ta'>
              <img className='m-2' src={tamil} alt="" />
            </Link>
            <Link to='/language/te'>
              <img className='m-2' src={telgu} alt="" />
            </Link>
        </div>

        <HomeMOvieRow title='Action Movies'   url={ActionMovies}></HomeMOvieRow>
        <HomeMOvieRow title='Animation Movies'   url={Animation}></HomeMOvieRow>
        <HomeMOvieRow title='Crime Movies'   url={Crime}></HomeMOvieRow>
        <HomeMOvieRow title='Family Movies'   url={Family}></HomeMOvieRow>
        <HomeMOvieRow title='ScienceFiction Movies'   url={ScienceFiction}></HomeMOvieRow>
        <HomeMOvieRow title='Thriller Movies'   url={Thriller}></HomeMOvieRow>
        <HomeMOvieRow title='War Movies'   url={War}></HomeMOvieRow>
        <HomeMOvieRow title='Comedy Movies'   url={Comedy}></HomeMOvieRow>
        <HomeMOvieRow title='Romance Movies'   url={Romance}></HomeMOvieRow>
        <HomeMOvieRow title='Adventure Movies'   url={Adventure}></HomeMOvieRow>
        <HomeMOvieRow title='Horror Movies'   url={Horror}></HomeMOvieRow>
        <HomeMOvieRow title='Documentaries'   url={Documentary}></HomeMOvieRow>

    </div>
  )
}
 
export default Explore



// no movie=> icon