import React from 'react';
import Input from './Input';
import TextArea from '../TextArea';
import Checkbox from './Checkbox';
import SelectBox from './SelectBox';
import RadioButton from './RadioButton';

const FormikElememts = (props) => {
    switch (props.control) {
        case "input":
            return <Input {...props} />
        case "textarea":
            return <TextArea {...props} />
        case "checkbox":
            return <Checkbox {...props} />
        case "select":
            return <SelectBox {...props }/>
        case "radio":
            return <RadioButton {...props }/>

        default:
            break;
    }
}

export default FormikElememts;
