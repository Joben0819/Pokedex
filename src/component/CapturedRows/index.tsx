import type {
  Pokemon,
  TypeStyleMap
} from "../../types";

interface CapturedRowProps {
  pokemon: Pokemon;
  onSelect: (pokemon: Pokemon) => void;
  onRelease: (pokemon: Pokemon) => void;
  toggle: boolean
  setTabBar: (n:boolean) => void
}

const CAPTURED_ROW_IMAGES: Record<string, string> = {
  "025": "https://lh3.googleusercontent.com/aida-public/AB6AXuAJVuVbJESgnoc43T7ToKRtR2Qk7qCqGEvHaJJhoT8-xiaDNcvcHspM57BY63EDPCe00rPG476n-0sE0dAwgQNmNIKG1S6u2RL_LK2mk-UsWsOe-719OLdoIR6GBq7KsKS4e_niRQwFshnONKZT4ppoeYnkch2ETqOZO6_jQppC0hYU9DJPGY9gzvCcSMpHzIoaIMfuRVzrnrM_ulUsR1f2WDcDXKh9ohHSLzVe5nsBHalIzzwN54UQ",
  "906": "https://lh3.googleusercontent.com/aida-public/AB6AXuCuMUwLQVvyTxVPSMVXxuqqwGeLcGFSeyPHyZtGMQL9cke8BRbBn0OUjt21hGuJBKKDMsJGxUiRmORR8UwAXG-WYqjgwltn7YIaECED5sVMpvbuqaLjwkhasc16tTpf9Qq3OcH1FVZRyHjTkjkUTQUrMS87mRYtYyYqYoEkVSkB77pRu5aaSzCRUSGUGzckIrbkkSqewu_JVGp1QLr9eyf4bnj6XkJPq3hbXcKrcqSV3VTizM_jxUr3",
  "007": "https://lh3.googleusercontent.com/aida-public/AB6AXuBbmCksY9EekiseYULXX_ijd9LEfI3cPNZoYoTYjFZuZUdw95N1QB2SbOPPwdmcHScV2JpolzrUkUGXnYAf4g5u1PH9kb6ZOG629bjbFxsa8RCbOumAwrfIIHqE0tBBYPDHoOH9ZcPZcqaeTNY29HF6tQ8q_ja-Ul-NIojOGyI15bQoOna9gMkL_NIK98Q7D9z-T3L311fF5ZdUCQcoZT8U0XV7NyBS1LCG3YFHHLjfvI9QkgduqPlV",
  "094": "https://lh3.googleusercontent.com/aida-public/AB6AXuCXZAMotcOH9NT4WSu3Ya7gmKGtTjQgqgiLF8m2Lsptq0coC_faXshtKAKeRl6vlA5BEp-mgxhTh8orVDosOJ_rdq02jTtqyZqPehW-mdah__UOr5hoq-yhBnpnTQuprC7qiDYARHgnefEyA5JFFD7bGFvqDA7h56HWUjJFJDLfG7c-po3WPEO8D5LFPeQtfrW9G8TD_3znlnJmcDfVcy_GIulV_TVGubuQyUsUq0hQ4WhNuo-xH6ry",
  "133": "https://lh3.googleusercontent.com/aida-public/AB6AXuD1TytMlT9Zl7SSG_LjBDzKUFhZlYl5n3jq55Bxkj0s5SK0vL1t-BceegmbcrG8bRGqzdt347D4OeEetus9yp1zRdNGyoxxEIJCxqLK3N0sYsdArLUhZIo9vDLYkzKMfH2u9VNMQe1sqqEDw_PxENcFqDS6hy-pCt6tKedSvzjaj3T5O7b5ikDSX4ZC3yPA3mvzMbtZBBxO5D9uELOsekemEM_q80jhlPW8wMsCd4alboHTCBgscRB0",
};
const TYPE_STYLES: TypeStyleMap = {
  Electric: "bg-secondary-fixed text-on-secondary-fixed",
  Grass: "bg-surface-container-high text-on-surface",
  Fire: "bg-primary-fixed text-on-primary-fixed-variant",
  Water: "bg-tertiary-fixed text-on-tertiary-fixed",
  Ghost: "bg-surface-container-high text-on-surface",
  Fighting: "bg-surface-container-high text-on-surface",
  Normal: "bg-surface-container-high text-on-surface",
};

export default function index({ pokemon, onSelect, onRelease, toggle, setTabBar }: CapturedRowProps) {
  return (
    <div
      onClick={() => setTabBar(true)}
      className={`${toggle ? 'bg-gray-300' :'bg-surface-container-lowest'} captured-row flex items-center justify-between p-space-md rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group`}
    >
      <button
        type="button"
        onClick={() => onSelect(pokemon)}
        className="flex items-center gap-space-md cursor-pointer flex-1 text-left"
      >
        <div className="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center p-space-xs shrink-0">
          <img
            className="w-full h-full object-contain"
            alt={pokemon.name}
            src={CAPTURED_ROW_IMAGES[pokemon.id] || pokemon.img}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-space-sm">
            <span className="font-headline-sm text-headline-sm text-on-surface">{pokemon.name}</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
              #{pokemon.id}
            </span>
            <span
              className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm uppercase ${
                TYPE_STYLES[pokemon.typeLabel]
              }`}
            >
              {pokemon.typeLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-space-md gap-y-0.5 mt-1 font-body-sm text-body-sm text-on-surface-variant">
            <span>
              Nickname: <strong className="text-on-surface font-semibold">{pokemon.nickname}</strong>
            </span>
            <span className="text-surface-container-highest">•</span>
            <span>
              Captured: <strong className="text-on-surface">{pokemon.date}</strong>
            </span>
            <span className="text-surface-container-highest">•</span>
            <span className="text-secondary font-medium">{pokemon.ball}</span>
          </div>
        </div>
      </button>
      <button
        onClick={() => onRelease(pokemon)}
        title="Release specimen"
        className="w-10 h-10 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-error-container hover:text-on-error-container flex items-center justify-center transition-colors shrink-0"
      >
        <span className="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>
  );
}