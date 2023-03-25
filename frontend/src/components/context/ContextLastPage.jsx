import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom';
import { contextDetail } from '../../redux/actions/contextActions'
import ContextSideBar from './ContextSideBar';
import NavBar from '../NavBar';
import contextsetupicon from '../../images/contextsetupicon.png'
function ContextLastPage() {
    const dispatch = useDispatch();
    const contextdetail = useSelector(state => state.contextDetail);
    const { loading, error, context } = contextdetail;
    const { id } = useParams();
    useEffect(() => {
        dispatch(contextDetail(Number(id)));
    }, [dispatch, id])
    return (
        <div>
            <NavBar />
            <div className='ml-28 grid grid-cols-4 gap-9'>
                <div className='bg-violet-100 col-span-3 mt-5 rounded-2xl p-5'>
                    <h1 className='font-bold text-2xl'>{context.name}</h1>
                    <div>
                        {/* Progress Bar */}
                    </div>
                    <div className='text-center bg-white rounded-2xl shadow-sm ml-20 mr-20 mt-10 p-10'>
                        <div>
                            <img src={contextsetupicon} alt='contextsetupicon' className='mx-auto' />
                        </div>
                        <h1 className='font-bold text-2xl mt-5'>Congratulations!</h1>
                        <h2 className='mt-5 text-gray-500 mb-5'>"{context.name}" added up</h2>
                        <div className='flex flex-row justify-center gap-9 mx-auto'>
                            <NavLink to='/contextsetup'><button className='bg-violet-500 text-white font-bold px-3 py-2 hover:bg-violet-600 transition ease-in rounded-2xl shadow-sm'>Exit</button></NavLink>
                            <NavLink to='/contextsetup/createnew'><button className='bg-violet-500 text-white font-bold px-3 py-2 hover:bg-violet-600 transition ease-in rounded-2xl shadow-sm'>Add new context</button></NavLink>
                        </div>
                    </div>
                </div>
                <ContextSideBar />
            </div>
        </div>
    )
}

export default ContextLastPage