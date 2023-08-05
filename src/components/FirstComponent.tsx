import { observer } from 'mobx-react-lite';
import globalCounter from '../store/globalCounter';

const FirstComponent = observer(() => {
  return (
    <div>
      <p>This component listens to global store: </p>
      <p>Global counter value: {globalCounter.someValue}</p>
      <button onClick={() => globalCounter.increateValue()}>
        Increate globalCounter from first component
      </button>
    </div>
  );
});

export default FirstComponent;
