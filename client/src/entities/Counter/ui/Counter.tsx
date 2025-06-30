import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';

export const Counter = memo(() => {
	const dispatch = useDispatch();
	const counterValue = useSelector(getCounterValue);

	const increment = () => {
		dispatch(counterActions.increment());
	};

	const decrement = () => {
		dispatch(counterActions.decrement());
	};

	return (
		<div>
			<div>value = {counterValue}</div>
			<Button onClick={increment}>increment</Button>
			<Button onClick={decrement}>decrement</Button>
		</div>
	);
});
