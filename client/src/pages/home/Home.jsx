import './home.scss'
import {originals,ActionMovies,Comedy,Romance,Horror,Documentary, Adventure ,Animation ,Crime ,Family ,ScienceFiction ,Thriller ,War} from '../../movieApi/urls'
import { english, malayalam, hindi, kannada, tamil, telgu } from '../../assets'
import RowMoviesWide from '../../component/rowMoviesWide/RowMoviesWide'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
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
              <LazyLoadImage effect='blur' className='m-2' src={english} alt="" />
            </Link>
            <Link to='/language/hi'>
              <LazyLoadImage effect='blur' className='m-2' src={hindi} alt="" />
            </Link>
              <Link to='/language/ml'>
            <LazyLoadImage effect='blur' className='m-2' src={malayalam} alt="" />
            </Link>
            <Link to='/language/kn'>
              <LazyLoadImage effect='blur' className='m-2' src={kannada} alt="" />
            </Link>
            <Link to='/language/ta'>
              <LazyLoadImage effect='blur' className='m-2' src={tamil} alt="" />
            </Link>
            <Link to='/language/te'>
              <LazyLoadImage effect='blur' className='m-2' src={telgu} alt="" />
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