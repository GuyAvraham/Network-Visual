export type SelectComponentProps = {
    value: string;
    handleChange(event: React.ChangeEvent<HTMLSelectElement>): void;
    DATA_CHOOSE: string[];
    title?: string
}