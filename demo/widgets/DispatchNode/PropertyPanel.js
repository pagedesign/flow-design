import React from 'react';
import PropertyForm from '../PropertyForm';
// import {
//     FormItem,
//     NativeField,
// } from 'components/Form';

import CommonPropertyPanel from '../common/CommonPropertyPanel';
import ValidatePropertyPanel from '../common/ValidatePropertyPanel';

export default function (props) {

    return (
        <PropertyForm {...props}>
            <CommonPropertyPanel />
            <ValidatePropertyPanel />
        </PropertyForm>
    );
}