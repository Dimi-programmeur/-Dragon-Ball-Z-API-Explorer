import axios from "axios";
import { useEffect, useState } from "react";
import me from "../screenshots/dimi.jpeg";

const App = () => {
  const [dragon, setDragon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDragon = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://dragonball-api.com/api/characters",
          { signal: controller.signal },
        );
        setDragon(res.data.items ?? []);
        setError(null);
      } catch (err) {
        if (axios.isCancel(err)) return; // requête annulée → on ignore
        setError("Erreur lors du chargement des personnages 🐉");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDragon();

    // Nettoyage : annule la requête si le composant est démonté
    return () => controller.abort();
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full px-[7rem] z-50 bg-white flex justify-between mb-[3rem] items-center text-[1.5rem]">
        <img
          src="https://web.dragonball-api.com/images-compress/android-icon-192x192.webp"
          alt=""
          className="w-20 h-20"
        />
        <div className="flex gap-10 text-gray-600 font-extrabold items-center">
          <a href="https://web.dragonball-api.com/documentation">Docs</a>
          <a href="https://web.dragonball-api.com/about">About</a>
          <a href="https://web.dragonball-api.com/support">
            <button className="btn btn-outline cursor-pointer px-[1.2rem] py-[0.3rem] rounded-xl text-white bg-[#FFDF00]">
              SUPPORT US
            </button>
          </a>
          <img src={me} alt="" className="w-20 h-20" />
        </div>
      </nav>

      <div className="bg-blue-700 pb-[1rem] pt-[5rem] pr-[0.2rem] text-center flex items-center xs:flex-wrap">
        <img
          src="https://web.dragonball-api.com/images-compress/logo_dragonballapi.webp"
          alt="dragon"
        />
        <h1 className="text-[#FFDF00] text-4xl font-extrabold">
          <span className="text-[#FFDF00]">THE</span> DRAGON BALL{" "}
          <span className="text-[#D6F5F5]">Z API</span>
        </h1>
      </div>

      {/* listes des cartes de dragon ball z */}
      <div className="w-screen p-[1rem] flex justify-center bg-blue-700">
        <ul className="text-xl font-bold text-white flex flex-wrap gap-6 justify-center">
          {dragon.map((d) => (
            <li
              key={d.i}
              className="shadow-xl shadow-[#FFDF00] rounded-2xl flex flex-col gap-4 bg-[#2D2D2D]"
            >
              <div className="bg-[#D6F5F5] rounded-t-xl">
                <img
                  src={d.image}
                  alt="image"
                  className="w-70 h-100 hover:scale-120 transition-transform duration-400"
                />
              </div>
              <div className="rounded-b-xl flex flex-col gap-4 px-[1rem] py-[0.5rem]">
                <div>
                  <p className="text-3xl">{d.name}</p>
                  <p className="text-[#FFDF00]">
                    {d.race} - {d.gender}
                  </p>
                </div>
                <p>
                  Base Ki: <span className="text-[#FFDF00]">{d.ki}</span>
                </p>
                <p>
                  Total Ki: <span className="text-[#FFDF00]">{d.maxKi}</span>
                </p>
                <p>
                  Affiliation:{" "}
                  <span className="text-[#FFDF00]">{d.affiliation}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
