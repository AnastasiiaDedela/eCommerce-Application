
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
        <Link to="/registrations">Перейти к регистрации</Link>
      <h1>Добро пожаловать на главную страницу!</h1>
    </div>
  );
}

export default Home;