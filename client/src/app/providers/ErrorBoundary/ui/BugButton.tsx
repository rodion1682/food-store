import { memo, useEffect, useState } from 'react';

import { Button } from 'shared/ui/Button';

export const BugButton = memo(() => {
	const [error, setError] = useState(false);

	const throwError = () => setError(true);

	useEffect(() => {
		if (error) {
			throw new Error();
		}
	}, [error]);

	return <Button onClick={throwError}>Throw Error</Button>;
});
