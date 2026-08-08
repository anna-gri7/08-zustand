import css from "./SearchBox.module.css"

interface SearchBoxProps {
 onSearch: (value: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
   
    return (
        <input
            className={css.input}
            onChange={(e) => onSearch(e.target.value)}
            type="text"
            placeholder="Search notes"
 />
    );
}