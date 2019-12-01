import { MaterialInput } from "lego-components";
import React, { Fragment, useState } from "react";

export default function App() {
	const [state, setState] = useState("");
	return (
		<Fragment>
			<MaterialInput name="test" mask="cellTelephone" value={state} onChange={(e) => setState(e.target.value)} />
		</Fragment>
	);
}
