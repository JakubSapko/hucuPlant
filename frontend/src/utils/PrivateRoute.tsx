import React, { ReactNode } from 'react';
import {Route} from 'react-router-dom';

interface IProps {
    element: ReactNode;
    path: string;
}
const PrivateRoute: React.FC<IProps> = ({path, element}) => {
    console.log("super mordo");
    return(
        <Route path={path} element={element}/>
    )
}

export default PrivateRoute;