import { IonSearchbar } from "@ionic/react";

interface Props {
    value: string;
    onSearch: (value: string) => void;
}

const SearchBar = ({ value, onSearch }: Props) => {
    return (
        <IonSearchbar placeholder="Buscar un lugar..." value={value}
            onIonInput={(e) =>
                onSearch(e.detail.value!)
            }
        />
    );
};

export default SearchBar;