import React from 'react';
import lighticon from '../../images/lighticon2.png';

function DeviceList() {
    return (
        <div className='col-span-1 bg-purple-100 rounded-3xl'>
            <div className='text-xl font-bold m-4'>
                <p>Devices</p>
            </div>
            <div className='grid grid-cols-4 m-3 border rounded-3xl bg-purple-200'>
                <div className='col-span-1 bg-white rounded-3xl p-3 m-2'>
                    <img src={lighticon} alt="" />
                </div>
                <div className='col-span-3 m-2'>
                    <p className='font-bold text-lg text-gray-500'>Light 1</p>
                    <p className='text-sm'>Yellow</p>
                </div>
            </div>
            <div className='grid grid-cols-4 m-3 border rounded-3xl bg-purple-200'>
                <div className='col-span-1 bg-white rounded-3xl p-3 m-2'>
                    <img src={lighticon} alt="" />
                </div>
                <div className='col-span-3 m-2'>
                    <p className='font-bold text-lg text-gray-500'>Light 2</p>
                    <p className='text-sm'>Yellow</p>
                </div>
            </div>
            <div className='grid grid-cols-4 m-3 border rounded-3xl bg-purple-200'>
                <div className='col-span-1 bg-white rounded-3xl p-3 m-2'>
                    <img src={lighticon} alt="" />
                </div>
                <div className='col-span-3 m-2'>
                    <p className='font-bold text-lg text-gray-500'>Light 3</p>
                    <p className='text-sm'>Yellow</p>
                </div>
            </div>
        </div>
    );
}

export default DeviceList;