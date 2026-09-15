import { useState, useCallback, useMemo, useEffect } from "react";
import type {
  Pokemon,
  FilterType,
  Layout,
  ActiveTab,
  ToastState,
} from "./types";
import Footer from './component/Footer/index'
import FilterToolbar from './component/FilterToolbar/index'
import ElementFilterPills from './component/ElementFilterPills'
import CapturedRow from './component/CapturedRows'
import PokemonCard from './component/PokemonCardProps'
import Inspector from './component/InspectorProps'
import {usePokemonAPi} from './api/api'
import Toast from './component/Toast'

interface UseToastReturn {
  toast: ToastState;
  showToast: (message: string) => void;
}

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [tabBar, setTabBar] = useState(false)
  const [selectedId, setSelectedId] = useState<string>("1");
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [layout, setLayout] = useState<Layout>("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeType, setActiveType] = useState<FilterType>("all");
  const [caughtStatus, setCaughtStatus] = useState<boolean>(true);
  const [nickname, setNickname] = useState<string>("");
  const [date, setDate] = useState<string>("2024-01-01"); 
  const [toggle, setToggle] = useState(false)
  const [pagination , setPagination] = useState(10) 
  const { toast, showToast } = useToast();
  const obj = {
      type: "Normal",
      typeLabel: "Normal",
  }
  const value = usePokemonAPi('https://pokeapi.co/api/v2/pokemon/', '', 150, 0).data;

  function useToast(): UseToastReturn {
    const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });

    const showToast = useCallback((message: string): void => {
        setToast({ visible: true, message });
        setTimeout(() => setToast({ visible: false, message: "" }), 2400);
      }, []);

      return { toast, showToast };
  }

  const selected = useMemo<Pokemon | null>(
    () => {
        // if (tabBar) return null;
        return pokemon.find((p) => p.id === selectedId) ?? pokemon[0] ?? null;
      },
    [pokemon, selectedId]
  );

  const caughtCount = useMemo<number>(
    () => pokemon.filter((p) => p.caught).length,
    [pokemon]
  );

  const filteredGrid = useMemo<Pokemon[]>(() => {
    return pokemon.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.includes(searchQuery) ||
        p.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        activeType === "all" || p.type.toLowerCase().includes(activeType.toLowerCase());
      return matchesSearch && matchesType;
    });
  }, [pokemon, searchQuery, activeType]);

  const capturedList = useMemo<Pokemon[]>(
    () => pokemon.filter((p) => p.caught),
    [pokemon]
  );

  const handleSelect = useCallback(
    (p: Pokemon): void => {
      setSelectedId(p.id);
      setNickname(p.nickname);
      setDate(p.date || new Date().toISOString().split("T")[0]);
      setCaughtStatus(p.caught);
      showToast(`Loaded ${p.name} details`);
    },
    [showToast]
  );

  const handleToggleCapture = useCallback((): void => {
    const next = !caughtStatus;
    setCaughtStatus(next);
    setPokemon(
       pokemon.map((p) =>
        p.id === selectedId ? { ...p, caught: next, nickname: nickname || p.name } : p
      )
    );
    const value = pokemon.map((p) =>
      p.id === selectedId  ? { id: p.id, caught: next, nickname: nickname || p.name, date: date } : p
    ).filter((v) => v.id === selectedId )
    const saved = localStorage.getItem('data');

    let savedArray = [];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        savedArray = Array.isArray(parsed) ? parsed : [];
      } catch {
        savedArray = [];
      }
    }

    if(next){
      const store = [...value, ...savedArray ]
      localStorage.setItem('data', JSON.stringify(store))
    }else{
      const store = [...value, ...savedArray ]
      const filter = store.filter((val: Pokemon) => val.id !== selectedId.toString())
      localStorage.setItem('data', JSON.stringify(filter))
    
    }
    showToast(
      next
        ? `${nickname || selected?.name} marked as Captured!`
        : "Specimen tagged as Unregistered"
    );
  }, [caughtStatus, nickname, selected, selectedId, showToast]);

  const handleRelease = useCallback(
    (p: Pokemon): void => {
      setPokemon((prev) =>
        prev.map((item) =>
          item.id === p.id ? { ...item, caught: false, nickname: "", date: "", ball: "" } : item
        )
      );
      if (selectedId === p.id) {
        setCaughtStatus(false);
        setNickname("");
        setDate("");
      }
      const LocalStorage = localStorage.getItem('data')
      const parse = JSON.parse(LocalStorage ?? '[]')
      const filter = parse.filter((val: Pokemon) => val.id !== p.id)
      localStorage.setItem('data', JSON.stringify(filter))
      showToast(`${p.name} has been released to the wild.`);
    },
    [selectedId, showToast]
  );


  const handleReset = useCallback((): void => {
    setTabBar(false)
  }, [showToast]);

  useEffect(() => {
    const LocalStorage = localStorage.getItem('data')
    const FilteredLocal = (id: number) =>{
      return LocalStorage ? JSON.parse(LocalStorage).filter((val: Pokemon) => val.id === id.toString())[0] : ""
    } 

    const mapping = value?.results?.map((val:any) =>{
      const id = val.url.split('/').filter(Boolean).pop();
      return (
      {
        ...val,
      id:id,
      ...obj,
      nickname: FilteredLocal(id)?.nickname,
      date: FilteredLocal(id)?.date,
      caught: FilteredLocal(id)?.caught,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,}
    ) }).slice(0, pagination)
    if(value){
      setPokemon( mapping)
    }
  }, [value, pagination]);

  return (
    <div className={`${toggle ? 'bg-black' :'bg-background'} font-body-md text-on-surface min-h-screen`}>
      <main className={`${toggle ? 'bg-black' :'.bg-background'} w-full pt-20  max-w-[1280px] mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop`}>
        
        <div className="flex flex-col w-full pb-space-xl">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            <div className={`${tabBar ? 'lg:col-span-7 xl:col-span-8' :'lg:col-span-12 xl:col-span-12'} flex flex-col gap-space-md`}>
              <FilterToolbar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                layout={layout}
                onLayoutChange={setLayout}
                onSearch={setSearchQuery}
                caughtCount={caughtCount}
                DarkMode={setToggle}
                toggle={toggle}
              />

              <ElementFilterPills activeType={activeType} onTypeChange={setActiveType} />

              {activeTab === "all" && layout === "grid" && (


                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-space-md transition-opacity duration-300">
                  {filteredGrid.map((p) => (
                    <PokemonCard key={p.id} pokemon={p} onSelect={handleSelect} toggle={toggle} setTabBar={setTabBar} />
                  ))}
                </div>
              )}

              {activeTab === "all" && layout === "list" && (
                <div className="flex flex-col gap-space-sm transition-opacity duration-300">
                  {filteredGrid.map((p) => (
                    <CapturedRow key={p.id} pokemon={p} onSelect={handleSelect} onRelease={handleRelease} toggle={toggle} setTabBar={setTabBar} />
                  ))}
                </div>
              )}

              {activeTab === "captured" && (
                <div className="flex flex-col gap-space-sm transition-opacity duration-300">
                  {capturedList.map((p) => (
                    <CapturedRow key={p.id} pokemon={p} onSelect={handleSelect} onRelease={handleRelease} toggle={toggle} setTabBar={setTabBar} />
                  ))}
                </div>
              )}

              <div className="flex justify-center my-space-sm">
                <button className="px-space-xl py-space-sm rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md flex items-center gap-space-xs transition-colors">
                  <span onClick={() => {
                    if(pagination === 150){
                      showToast(`already on the limit`);
                    }else{
                    setPagination((prev) => prev + 10)
                    }
                    setTabBar(false)}
                  }>Load more entries ({pagination})</span>
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
              </div>
            </div>

            <div className={`${tabBar ? 'block' : 'hidden'} ${tabBar ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"} lg:col-span-5 xl:col-span-4 sticky top-24`}>
              <Inspector
                pokemon={selected}
                caughtStatus={caughtStatus}
                nickname={nickname}
                date={date}
                onToggleCapture={handleToggleCapture}
                onNicknameChange={setNickname}
                onDateChange={setDate}
                onReset={handleReset}
              />
            </div>
          </div>

          <Toast visible={toast.visible} message={toast.message} />
        </div>
      </main>

      <Footer />
    </div>
  );
}