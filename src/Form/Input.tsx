import React, { useEffect, useReducer, ChangeEvent } from 'react';
import './Input.css';
import validator from '../validator/validate';
import { ValidationRule } from '../types'; 

interface InputProps {
	id: string;
	type?: string;
	placeholder?: string;
	className?: string;
	element?: 'input' | 'textarea';
	validations: ValidationRule[];
	onInputHandeler: (id: string, value: string, isValid: boolean) => void;
}

interface InputState {
	value: string;
	isValid: boolean;
}

type Action = {
	type: 'CHANGE';
	value: string;
	validationRule: ValidationRule[];
};

const inputReducer = (state: InputState, action: Action): InputState => {
	switch (action.type) {
		case 'CHANGE': {
			return {
				...state,
				value: action.value,
				isValid: validator(action.value, action.validationRule),
			};
		}
		default:
			return state;
	}
};

const Input: React.FC<InputProps> = props => {
	const [mainInput, dispatch] = useReducer(inputReducer, {
		value: '',
		isValid: false,
	});

	const { value, isValid } = mainInput;
	const { id, onInputHandeler } = props;

	useEffect(() => {
		onInputHandeler(id, value, isValid);
	}, [value, isValid, id, onInputHandeler]);

	const onChangeHandler = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		dispatch({
			type: 'CHANGE',
			value: e.target.value,
			validationRule: props.validations,
		});
	};

	const element =
		props.element === 'textarea' ? (
			<textarea
				placeholder={props.placeholder}
				className={`${props.className} ${isValid ? 'success' : 'error'}`}
				onChange={onChangeHandler}
				value={value}
			/>
		) : (
			<input
				type={props.type || 'text'}
				placeholder={props.placeholder}
				className={`${props.className} ${isValid ? 'success' : 'error'}`}
				onChange={onChangeHandler}
				value={value}
			/>
		);

	return <>{element}</>;
};

export default Input;
