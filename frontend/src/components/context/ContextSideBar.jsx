import React, { useEffect, useState } from 'react'
import Switch from "react-switch";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai"
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { contextToggle, listOfContexts } from '../../redux/actions/contextActions';
import axios from 'axios';
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
      const response = await axios.delete(`http://localhost:5000/api/contexts/${id}`, config);
      const { data } = response;
      dispatch(listOfContexts());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='mt-5 mr-9'>
      <h1 className='text-2xl font-bold'>List of scenes</h1>
      {(
        contextlist.map((scene) => (
          <NavLink
            to={`/contextsetup/${scene._id}`}
            className={({ isActive }) =>
              isActive ? 'bg-violet-200' : 'bg-white'
            }
            key={scene._id}
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
                  onChange={() => handleToggleContext(scene._id)}
                  checked={stateContext !== null ? stateContext.find(x => x._id == scene._id).active : scene.active}
                  onColor="#593EFF"
                  height={24}
                  width={48}
                //className="react-switch"
                />
                <AiOutlineDelete className='inline ml-3 ' onClick={() => handleDeleteContext(scene._id)}/>
              </div>
            </div>
          </NavLink>
        ))
      )}
      <div>
        <NavLink to='/contextsetup/createnew'>
          <button className='mt-5 border-dashed border-violet-500 border-2 rounded-2xl py-2 px-3 hover:bg-violet-100 transition ease-in leading-8'>Create new scene <AiOutlinePlus className='inline' /></button>
        </NavLink>
      </div>

    </div>
  )
}

export default ContextSideBar