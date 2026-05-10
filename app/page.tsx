import AboutUs from './components/AboutUs';
import Calc from './components/calc' 
import ConslForm from './components/ConslForm';
import "./globals.css"
export default function Home() {
  return (
    <main className="w-full max-w-[1100px] mx-auto px-4 py-12 flex flex-col items-center gap-5">
      <AboutUs/>
      <Calc/>
      <ConslForm/>
    </main>
  );
}
