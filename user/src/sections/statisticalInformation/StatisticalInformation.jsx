import React from 'react';
import StatisticalInformationComponent from '../../components/statisticalInformation/StatisticalInformationComponent';

const StatisticalInformation = ({data}) => {
    return (
        <>
            <div className=''>
                <StatisticalInformationComponent data={data}/>
            </div>
        </>
    );
};

export default StatisticalInformation;