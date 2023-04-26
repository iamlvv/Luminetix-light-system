import React, { useEffect, useState } from 'react'
import Switch from "react-switch";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai"
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { contextToggle, listOfContexts } from '../../redux/actions/contextActions';
import axios from 'axios';
import Swal from 'sweetalert2';
const url = process.env.REACT_APP_API_URL;
const style = {
  height: "570px",
}
function ContextSideBar() {
  const dispatch = useDispatch();
  const contextList = useSelector((state) => state.contextList);
  const { loading, error, contextlist } = contextList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [stateContext, setStateContext] = useState(null)

  useEffect(() => {
    dispatch(listOfContexts());
  }, []);

  const handleToggleContext = async (id) => {
    dispatch(contextToggle(id));
    setStateContext(contextlist.map((scene) => {
      if (scene._id == id) {
        scene.active = !scene.active;
      }
      return scene;
    }
    ))
  }
  const handleDeleteContext = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await axios.delete(`${url}/contexts/${id}`, config);
      const { data } = response;
      dispatch(listOfContexts());
    } catch (error) {
      console.log(error);
    }
  }
  const handleDeleteAll =  () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      // if (result.isConfirmed) {
      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${userInfo.token}`,
      //     },
      //   }
      //   axios.delete(`${url}/users/noti`, config);
      //   setFilteredList([]);
      //   Swal.fire(
      //     'Deleted!',
      //     'Your notifications has been deleted.',
      //     'success'
      //   )
      // }
    })
  }
  return (
    <div className='mt-5 mr-9'>
      <div className='flex justify-between flex-row'>
      <h1 className='text-2xl font-bold'>List of scenes</h1>
      <button className="bg-red-300 font-bold rounded-2xl py-1 px-2 hover:bg-red-400 transition ease-in"
          onClick={handleDeleteAll}>
          Delete all
        </button>
      </div>
      <div className='overflow-y-auto' style={style}>
        {(
          contextlist.map((scene) => (
            <div className='' key={scene._id}>
              <NavLink
                to={`/contextsetup/${scene._id}`}
                className={({ isActive }) =>
                  isActive ? 'bg-violet-200' : 'bg-white'
                }
                
              >
                <div
                  className='mt-5 grid grid-cols-4 gap-5 rounded-2xl p-3 hover:cursor-pointer hover:shadow-md border transition ease-in'
                >
                  <div className='col-span-3'>
                    <h1 className='font-bold'>{scene.name}</h1>
                    <h2 className='text-gray-500 text-sm'>{scene.description}</h2>
                  </div>
                  <div className='my-auto'>
                    <Switch
                      onChange={() => {
                        dispatch(contextToggle(scene._id, !scene.active));
                        setStateContext(contextlist.map((item) => {
                          if (item._id == scene._id) {
                            item.active = !item.active;
                          }
                          return item;
                        }
                        ))
                      }}
                      checked={stateContext !== null ? stateContext.find(x => x._id == scene._id).active : scene.active}
                      onColor="#593EFF"
                      height={24}
                      width={48}
                    //className="react-switch"
                    />
                  </div>
                </div>
              </NavLink>
              <AiOutlineDelete className='inline ml-3 cursor-pointer ' onClick={() => handleDeleteContext(scene._id)} />
            </div>


          ))
        )}
      </div>
      <div>
        <NavLink to='/contextsetup/createnew'>
          <button className='mt-5 border-dashed border-violet-500 border-2 rounded-2xl py-2 px-3 hover:bg-violet-100 transition ease-in leading-8'>Create new scene <AiOutlinePlus className='inline' /></button>
        </NavLink>
      </div>

    </div>
  )
}

export default ContextSideBar