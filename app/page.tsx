import AboutUs from './components/AboutUs';
import Calc from './components/calc' 
import Case from './components/Case';
import ConslForm from './components/ConslForm';
import "./globals.css"
export default function Home() {
  return (
    <main className="w-full mx-auto px-4 flex flex-col items-center gap-5">
      <AboutUs/>
      <Case/>
      <Calc/>
      <ConslForm/>
    </main>
  );
}
