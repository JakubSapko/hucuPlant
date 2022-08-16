import {Checkbox} from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { usePlantsContext } from '../../context/PlantsContext';
import { ICardProps } from '../../types/plant';

export const SettingsPanel: React.FC<ICardProps> = ({plant}) => {

    const {updateTracking} = usePlantsContext();

    const onChange = (e: CheckboxChangeEvent) => {
        updateTracking(plant);
    }

    return <div>
        Do you want this plant to be tracked in your email listings?
        <Checkbox 
        defaultChecked={plant.tracked}
        onChange={onChange}/>
    </div>
}