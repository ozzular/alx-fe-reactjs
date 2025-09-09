import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <UserProfile name="Jane Doe" age={28} bio="Traveler and foodie." />
      <MainContent />
      <Footer />
    </>
  );
}
export default App;