export type InputProps = {
    handleChange(event: React.ChangeEvent<{ value: unknown }>): void;
    value: string | number;
    title?: string
    type?: string
}